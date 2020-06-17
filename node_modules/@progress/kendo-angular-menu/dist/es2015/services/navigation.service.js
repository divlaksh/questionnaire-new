import { Injectable, NgZone } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ItemsService } from './items.service';
import { ActionsService } from './actions.service';
const DEFAULT_ACTIVE = '0';
const NO_SPACE_REGEX = /\S/;
const handlers = {};
handlers['37'] = 'left';
handlers['39'] = 'right';
handlers['38'] = 'up';
handlers['40'] = 'down';
handlers['36'] = 'home';
handlers['35'] = 'end';
handlers['32'] = 'enter';
handlers['13'] = 'enter';
handlers['27'] = 'esc';
handlers['9'] = 'tab';
const handlersRTL = Object.assign({}, handlers, {
    '37': 'right',
    '39': 'left'
});
function isPrintableCharacter(key) {
    return key.length === 1 && NO_SPACE_REGEX.test(key);
}
const resolvedPromise = Promise.resolve(null);
/**
 * @hidden
 */
export class NavigationService {
    constructor(items, actions, localization, ngZone) {
        this.items = items;
        this.actions = actions;
        this.localization = localization;
        this.ngZone = ngZone;
        this.vertical = false;
        this.activeIndex = DEFAULT_ACTIVE;
    }
    get focusedItem() {
        return this.items.get(this.focusedIdx);
    }
    get activeItem() {
        return this.items.get(this.activeIndex);
    }
    get handlers() {
        return this.localization.rtl ? handlersRTL : handlers;
    }
    focus(item) {
        if (item.index === this.focusedIdx) {
            return;
        }
        if (!this.activeItem || !this.items.hasParent(item, this.activeItem)) {
            this.setActive(item);
        }
        this.setFocus(item);
    }
    setFocus(item) {
        this.focusedIdx = item.index;
        item.focus();
    }
    focusLeave() {
        const focused = this.focusedItem;
        if (focused) {
            this.actions.closeToRoot(focused);
            this.actions.execute();
        }
        this.focusedIdx = null;
    }
    updateActive() {
        if (!this.activeItem && this.items.hasItems) {
            const firstItem = this.items.get(DEFAULT_ACTIVE);
            firstItem.toggleActive(true);
            this.ngZone.runOutsideAngular(() => {
                resolvedPromise.then(() => {
                    this.activeIndex = DEFAULT_ACTIVE;
                });
            });
        }
    }
    keydown(e) {
        const current = this.focusedItem || this.activeItem;
        const handler = this.handlers[e.keyCode];
        if (!current) {
            return;
        }
        if (handler) {
            if (handler !== 'tab') {
                e.preventDefault();
            }
            this[handler](current, e);
        }
        else if (isPrintableCharacter(e.key)) {
            this.search(current, e.key);
        }
        this.actions.execute();
    }
    focusIndex(index) {
        if (!index && this.activeItem) {
            this.setFocus(this.activeItem);
        }
        else if (index === 'first') {
            this.focusFirst();
        }
        else if (index === 'last') {
            this.focusLast();
        }
        else {
            const item = this.items.get(index);
            if (item) {
                this.focus(item);
            }
        }
    }
    focusFirst() {
        const items = this.items.siblings(this.items.get('0'));
        this.focus(items[0]);
    }
    focusLast() {
        const items = this.items.siblings(this.items.get('0'));
        this.focus(items[items.length - 1]);
    }
    search(current, key) {
        const siblings = this.items.siblings(current);
        const startIndex = siblings.indexOf(current);
        const items = siblings.slice(startIndex + 1).concat(siblings.slice(0, startIndex));
        for (let idx = 0; idx < items.length; idx++) {
            const sibling = items[idx];
            const text = sibling.item.text || "";
            if (text.toLowerCase().startsWith(key.toLowerCase())) {
                this.focus(sibling);
                break;
            }
        }
    }
    down(current) {
        if (current.level === 0 && !this.vertical) {
            if (current.hasContent) {
                this.actions.open(current, this.focusChild(current, 0));
            }
        }
        else {
            this.focus(this.items.next(current));
        }
    }
    up(current) {
        if (current.level === 0 && !this.vertical) {
            if (current.hasContent) {
                this.actions.open(current, this.focusChild(current, current.children.length - 1));
            }
        }
        else {
            this.focus(this.items.previous(current));
        }
    }
    left(current) {
        if (this.vertical && current.level === 0 && current.disabled) {
            return;
        }
        if (current.level > 1 || (this.vertical && current.level > 0)) {
            const parent = this.items.parent(current);
            this.focus(parent);
            this.actions.close(parent);
        }
        else if (this.vertical && current.level === 0 && !current.disabled) {
            if (current.hasContent) {
                this.actions.open(current, this.focusChild(current, current.children.length - 1));
            }
        }
        else {
            this.focus(this.items.previous(this.activeItem));
        }
    }
    right(current) {
        if (this.vertical && current.level === 0 && current.disabled) {
            return;
        }
        if (current.horizontal && !current.disabled) {
            if (current.hasContent) {
                this.actions.open(current, this.focusChild(current, 0));
            }
            else if (!this.vertical || current.level > 0) {
                this.focus(this.items.next(this.activeItem));
            }
        }
        else {
            this.focus(this.items.next(this.activeItem));
        }
    }
    home(current) {
        const siblings = this.items.siblings(current);
        this.focus(siblings[0]);
    }
    end(current) {
        const siblings = this.items.siblings(current);
        this.focus(siblings[siblings.length - 1]);
    }
    enter(current, domEvent) {
        const actions = this.actions;
        if (current.disabled) {
            return;
        }
        if (current.hasContent) {
            actions.select(current, domEvent);
            actions.open(current, this.focusChild(current, 0));
        }
        else {
            actions.select(current, domEvent, null, () => {
                current.navigate();
            });
            this.focus(this.items.root(current));
            actions.closeToRoot(current);
        }
    }
    esc(current) {
        if (current.level > 0) {
            const parent = this.items.parent(current);
            this.actions.close(parent);
            this.focus(parent);
        }
    }
    tab(current) {
        if (current.level > 0) {
            this.activeItem.focus();
        }
    }
    focusChild(item, index) {
        return () => {
            const child = this.items.children(item)[index];
            this.setFocus(child);
        };
    }
    setActive(item) {
        const focused = this.focusedItem;
        const active = this.items.root(item);
        if (this.activeItem) {
            this.activeItem.toggleActive(false);
        }
        this.activeIndex = active.index;
        active.toggleActive(true);
        if (focused) {
            this.actions.closeToRoot(focused);
            if (focused.level > 0) {
                this.actions.open(active);
            }
        }
    }
}
NavigationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NavigationService.ctorParameters = () => [
    { type: ItemsService },
    { type: ActionsService },
    { type: LocalizationService },
    { type: NgZone }
];
