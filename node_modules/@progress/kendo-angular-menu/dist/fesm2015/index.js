import { ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, HostBinding, Injectable, Input, NgModule, NgZone, Optional, Output, Renderer2, TemplateRef, ViewChild, forwardRef, isDevMode } from '@angular/core';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { Keys, hasObservers, isDocumentAvailable } from '@progress/kendo-angular-common';
import { POPUP_CONTAINER, PopupModule, PopupService } from '@progress/kendo-angular-popup';
import { CommonModule } from '@angular/common';

const PARENT_REGEX = /_?\d+$/;
const SEPARATOR = '_';
let id = 0;
const itemIndexComparer = (a, b) => a.siblingIndex - b.siblingIndex;
const next = (idx, items, dir) => {
    let current = items[idx + dir];
    while (!current) {
        if (idx < 0) {
            idx = items.length - 1;
        }
        else if (idx >= items.length) {
            idx = 0;
        }
        else {
            idx += dir;
        }
        current = items[idx];
    }
    return current;
};
/**
 * @hidden
 */
class ItemsService {
    constructor() {
        this.items = {};
        this.lists = [];
        this.idPrefix = `k-menu${id++}`;
    }
    get hasItems() {
        return Object.keys(this.items).length > 0;
    }
    childId(index) {
        return `${this.idPrefix}-child${index}`;
    }
    itemIndex(parentIndex, index) {
        return (parentIndex ? parentIndex + SEPARATOR : '') + index;
    }
    get(index) {
        return this.items[index];
    }
    add(item) {
        this.items[item.index] = item;
    }
    remove(item) {
        delete this.items[item.index];
    }
    addList(list) {
        this.lists.push(list);
    }
    removeList(list) {
        const index = this.lists.indexOf(list);
        if (index >= 0) {
            this.lists.splice(index, 1);
        }
    }
    containsList(element) {
        return Boolean(this.lists.find(list => list.element.nativeElement === element));
    }
    siblings(item) {
        const parentIndex = this.parentIndex(item.index);
        return this.filter((index) => this.parentIndex(index) === parentIndex);
    }
    otherSiblings(item) {
        const parentIndex = this.parentIndex(item.index);
        return this.filter((index) => this.parentIndex(index) === parentIndex && index !== item.index);
    }
    children(item) {
        return this.filter((index) => this.parentIndex(index) === item.index);
    }
    parent(item) {
        return this.items[this.parentIndex(item.index)];
    }
    root(item) {
        return this.items[this.indices(item.index)[0]];
    }
    indices(index) {
        return index.split(SEPARATOR);
    }
    filter(predicate) {
        const result = [];
        const items = this.items;
        for (let index in items) {
            if (predicate(index, items[index])) {
                result.push(items[index]);
            }
        }
        return result.sort(itemIndexComparer);
    }
    previous(item) {
        const siblings = this.siblings(item);
        const itemIndex = siblings.indexOf(item);
        return next(itemIndex, siblings, -1);
    }
    next(item) {
        const siblings = this.siblings(item);
        const itemIndex = siblings.indexOf(item);
        return next(itemIndex, siblings, 1);
    }
    hasParent(item, parent) {
        return item.index.startsWith(parent.index);
    }
    areSiblings(item1, item2) {
        return item1 !== item2 && this.parent(item1) === this.parent(item2);
    }
    forEach(callback) {
        const items = this.items;
        for (let index in items) {
            if (items.hasOwnProperty(index)) {
                callback(items[index]);
            }
        }
    }
    parentIndex(index) {
        return index.replace(PARENT_REGEX, '');
    }
}
ItemsService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
class PreventableEvent {
    /**
     * @hidden
     */
    constructor(args) {
        this.prevented = false;
        Object.assign(this, args);
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses
     * the built-in behavior that follows the event.
     */
    preventDefault() {
        this.prevented = true;
    }
    /**
     * Returns `true` if the event was prevented
     * by any of its subscribers.
     *
     * @returns `true` if the default action was prevented.
     * Otherwise, returns `false`.
     */
    isDefaultPrevented() {
        return this.prevented;
    }
}

/**
 * Arguments for the `open` and `close` events of the Menu.
 */
class MenuEvent extends PreventableEvent {
}

const canPerformAction = (item, action) => !((action === 'open' && item.opened) || (action === 'close' && !item.opened));
/**
 * @hidden
 */
class ActionsService {
    constructor(ngZone, items) {
        this.ngZone = ngZone;
        this.items = items;
        this.actions = [];
    }
    open(item, finished) {
        if (item.disabled) {
            return;
        }
        if (item.hasContent && !item.opened) {
            this.actions.push({
                name: 'open',
                requiresZone: item.hasContentTemplates(),
                item,
                finished
            });
        }
        else if (finished) {
            finished();
        }
    }
    close(item) {
        this.closeChildren(item);
        this.closeItem(item);
    }
    closeItem(item) {
        if (item.opened) {
            this.actions.push({
                name: 'close',
                item
            });
        }
    }
    closeToRoot(item) {
        this.closeChildren(item);
        let current = item;
        do {
            this.closeItem(current);
            current = this.items.parent(current);
        } while (current);
    }
    closeOthers(item) {
        this.closeChildren(item);
        let current = item;
        while (current) {
            const siblings = this.items.otherSiblings(current);
            this.closeItems(siblings);
            current = this.items.parent(current);
        }
    }
    closeAll() {
        this.items.forEach((item) => {
            if (item.opened && item.level === 0) {
                this.close(item);
            }
        });
    }
    select(item, domEvent, prevented, finished) {
        this.actions.push({
            name: 'select',
            item,
            prevented,
            finished,
            domEvent
        });
    }
    emit(name, item, domEvent) {
        const owner = this.owner;
        const eventArgs = new MenuEvent({
            sender: owner,
            item: item.item,
            index: item.index,
            originalEvent: domEvent,
            hasContent: item.hasContent
        });
        owner[name].emit(eventArgs);
        if (owner.contextService) {
            owner.contextService.emit(name, eventArgs);
        }
        return eventArgs.isDefaultPrevented();
    }
    get hasPending() {
        return this.actions.length > 0;
    }
    execute(toExecute) {
        if (!this.hasPending && !toExecute) {
            return;
        }
        const actions = toExecute || this.clear();
        if (!NgZone.isInAngularZone() && this.requiresZone(actions)) {
            this.ngZone.run(() => {
                this.executeActions(actions);
            });
        }
        else {
            this.executeActions(actions);
        }
    }
    clear() {
        const actions = this.actions;
        this.actions = [];
        return actions;
    }
    executeActions(actions) {
        for (let idx = 0; idx < actions.length; idx++) {
            const { item, name, prevented, finished, domEvent } = actions[idx];
            if (!canPerformAction(item, name)) {
                continue;
            }
            if (!this.emit(name, item, domEvent)) {
                if (item[name]) {
                    item[name]();
                }
                if (finished) {
                    finished();
                }
            }
            else if (prevented) {
                prevented();
            }
        }
    }
    requiresZone(toExecute) {
        const actions = toExecute || this.actions;
        const owner = this.owner;
        const contextService = owner.contextService;
        for (let idx = 0; idx < actions.length; idx++) {
            const action = actions[idx];
            const name = action.name;
            if (action.requiresZone || (name && (hasObservers(owner[name]) || (contextService && contextService.hasObservers(name))))) {
                return true;
            }
        }
        return false;
    }
    closeChildren(item) {
        if (!item.opened) {
            return;
        }
        const children = this.items.children(item);
        this.closeItems(children);
    }
    closeItems(items) {
        for (let idx = 0; idx < items.length; idx++) {
            this.close(items[idx]);
        }
    }
}
ActionsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ActionsService.ctorParameters = () => [
    { type: NgZone },
    { type: ItemsService }
];

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
class NavigationService {
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

const DISABLE_OPEN_ON_OVER_DELAY = 500;
/**
 * @hidden
 */
class HoverService {
    constructor(actions, items) {
        this.actions = actions;
        this.items = items;
        this.delay = 100;
        this._openOnOver = true;
        this.scheduled = [];
    }
    get openOnOver() {
        return this._openOnOver;
    }
    set openOnOver(value) {
        this.cancelActions();
        this._openOnOver = value;
    }
    get hovered() {
        return this.items.get(this.hoveredIdx);
    }
    set hovered(item) {
        this.hoveredIdx = item ? item.index : null;
    }
    ngOnDestroy() {
        this.cancelActions();
    }
    over(item) {
        this.cancelActions((action) => action.name === 'openOnOver');
        if (!this.hovered || this.hovered !== item) {
            this.actions.closeOthers(item);
            this.hovered = item;
            if ((item.level > 0 || this.openOnOver) && !item.disabled) {
                this.actions.open(item);
                this.cancelActions((action) => (action.name === 'close' && (item === action.item || this.items.hasParent(item, action.item))) ||
                    (action.name === 'open' && !this.items.hasParent(item, action.item)));
            }
            this.scheduleActions();
        }
    }
    leave(disableOpenOnOver) {
        const hovered = this.hovered;
        if (hovered) {
            this.actions.closeToRoot(hovered);
            this.cancelActions(action => action.name === 'open');
            this.scheduleActions();
        }
        if (disableOpenOnOver && this._openOnOver) {
            this.scheduleDisableOpenOnOver();
        }
        this.hovered = null;
    }
    closeCurrent() {
        const hovered = this.hovered;
        if (hovered) {
            this.actions.closeToRoot(hovered);
            this.hovered = null;
        }
    }
    scheduleActions() {
        if (this.actions.hasPending) {
            const item = {};
            item.actions = this.actions.clear();
            item.id = setTimeout(() => {
                this.actions.execute(item.actions);
                this.removeScheduled(item);
            }, this.delay);
            this.scheduled.push(item);
        }
    }
    scheduleDisableOpenOnOver() {
        const item = {
            actions: [{ name: 'openOnOver' }]
        };
        item.id = setTimeout(() => {
            this._openOnOver = false;
            this.removeScheduled(item);
        }, Math.max(this.delay, DISABLE_OPEN_ON_OVER_DELAY));
        this.scheduled.push(item);
    }
    removeScheduled(item) {
        const scheduled = this.scheduled;
        for (let idx = 0; idx < scheduled.length; idx++) {
            if (scheduled[idx] === item) {
                scheduled.splice(idx, 1);
                return;
            }
        }
    }
    cancelActions(predicate) {
        const scheduled = this.scheduled;
        for (let idx = scheduled.length - 1; idx >= 0; idx--) {
            const item = scheduled[idx];
            const actions = item.actions;
            if (predicate) {
                for (let actionIdx = actions.length - 1; actionIdx >= 0; actionIdx--) {
                    if (predicate(actions[actionIdx])) {
                        actions.splice(actionIdx, 1);
                    }
                }
            }
            if (!predicate || actions.length === 0) {
                clearTimeout(item.id);
                scheduled.splice(idx, 1);
            }
        }
    }
}
HoverService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HoverService.ctorParameters = () => [
    { type: ActionsService },
    { type: ItemsService }
];

/* tslint:disable:max-line-length */
/**
 * @hidden
 */
const normalize = (settings) => settings && Object.assign({
    toggle: 'select'
}, settings);

/**
 * @hidden
 */
const NODE_INDEX = 'data-kendo-menu-index';

const DEFAULT_ID = 'kendo-matches-container';
const focusableRegex = /^(?:a|input|select|option|textarea|button|object)$/i;
const matches = (element, selector) => (element.matches || element.msMatchesSelector).call(element, selector);
/**
 * @hidden
 */
const closest = (node, predicate) => {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};
/**
 * @hidden
 */
const closestInScope = (node, predicate, scope) => {
    while (node && node !== scope && !predicate(node)) {
        node = node.parentNode;
    }
    if (node !== scope) {
        return node;
    }
};
/**
 * @hidden
 */
const isFocusable = (element) => {
    if (element.tagName) {
        const tagName = element.tagName.toLowerCase();
        const tabIndex = element.getAttribute('tabIndex');
        const skipTab = tabIndex === '-1';
        let focusable = tabIndex !== null && !skipTab;
        if (focusableRegex.test(tagName)) {
            focusable = !element.disabled && !skipTab;
        }
        return focusable;
    }
    return false;
};
const toClassList = (classNames) => String(classNames).trim().split(' ');
/**
 * @hidden
 */
const hasClass = (element, name) => {
    return toClassList(element.className).indexOf(name) >= 0;
};
/**
 * @hidden
 */
const matchesClasses = (classes) => {
    const list = toClassList(classes);
    return (element) => {
        const classList = toClassList(element.className);
        return Boolean(list.find(name => classList.indexOf(name) >= 0));
    };
};
/**
 * @hidden
 */
const nodeIndex = (node) => node.getAttribute(NODE_INDEX);
/**
 * @hidden
 */
const closestItem = (node, scope) => closestInScope(node, nodeIndex, scope);
/**
 * @hidden
 */
const closestList = (node) => {
    let list = closest(node, matchesClasses('k-menu-popup k-menu k-menu-group'));
    if (list && hasClass(list, 'k-menu-popup')) {
        list = list.querySelector('.k-menu-group');
    }
    return list;
};
/**
 * @hidden
 */
const inMenu = (node, itemsService) => {
    if (node === itemsService.lists[0].element.nativeElement) {
        return false;
    }
    const list = closestList(node);
    return list && itemsService.containsList(list);
};
/**
 * @hidden
 */
const findInContainer = (element, selector, container) => {
    const id = container.getAttribute('id');
    if (!id) {
        container.setAttribute('id', DEFAULT_ID);
    }
    const contextSelector = `#${id || DEFAULT_ID} ${selector}`;
    const match = closestInScope(element, node => matches(node, contextSelector), container);
    if (!id) {
        container.removeAttribute('id');
    }
    return match;
};

/**
 * @hidden
 */
class ContextMenuService {
    constructor() {
        this.keydown = new EventEmitter();
    }
    emit(name, args) {
        this.owner.emitMenuEvent(name, args);
    }
    hasObservers(name) {
        return this.owner && hasObservers(this.owner[name]);
    }
    leaveMenu(e) {
        return this.items ? !inMenu(e.target, this.items) : true;
    }
}
ContextMenuService.decorators = [
    { type: Injectable },
];

/**
 * Represents a template for the Menu items ([see example]({% slug templates_menu %})). To define a template
 * for an item, nest an `<ng-template>` tag with the `kendoMenuItemTemplate` directive inside a `<kendo-menu-item>`
 * component. To define a template for all Menu items, nest the template inside the `<kendo-menu>` component.
 *
 * The available fields in the template context are:
 * - `item`&mdash;The item data.
 * - `index`&mdash;The item index.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-menu>
 *          <kendo-menu-item text="item2">
 *              <ng-template kendoMenuItemTemplate let-item="item" let-index="index">
 *                  <div style="padding: 10px;">
 *                      My Template for: {{ item.text }} at index: {{ index }}
 *                  </div>
 *              </ng-template>
 *          </kendo-menu-item>
 *        </kendo-menu>
 *    `
 * })
 *
 * class AppComponent {
 * }
 * ```
 */
class ItemTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ItemTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoMenuItemTemplate]'
            },] },
];
/** @nocollapse */
ItemTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents a template for the links of the Menu items ([see example]({% slug templates_menu %})). To define a template
 * for an item, nest an `<ng-template>` tag with the `kendoMenuItemLinkTemplate` directive inside a `<kendo-menu-item>`
 * component. To define a template for all Menu items, nest the template inside the `<kendo-menu>` component.
 *
 * The available fields in the template context are:
 * - `item`&mdash;The item data.
 * - `index`&mdash;The item index.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-menu>
 *          <kendo-menu-item text="item2">
 *              <ng-template kendoMenuItemLinkTemplate let-item="item" let-index="index">
 *                  <span [kendoMenuItemLink]="index">
 *                      {{ item.text }}
 *                      <span *ngIf="item.items && item.items.length" [kendoMenuExpandArrow]="index"></span>
 *                  </span>
 *              </ng-template>
 *          </kendo-menu-item>
 *        </kendo-menu>
 *    `
 * })
 *
 * class AppComponent {
 * }
 * ```
 */
class ItemLinkTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ItemLinkTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoMenuItemLinkTemplate]'
            },] },
];
/** @nocollapse */
ItemLinkTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents a template for the content of the Menu items ([see example]({% slug templates_menu %})). To define the template,
 * nest an `<ng-template>` tag with the `kendoMenuItemContentTemplate` directive inside a `<kendo-menu-item>` component.
 *
 * The available fields in the template context are:
 * - `item`&mdash;The item data.
 * - `index`&mdash;The item index.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-menu>
 *          <kendo-menu-item text="item2">
 *              <ng-template kendoMenuItemContentTemplate let-item="item" let-index="index">
 *                  <div style="padding: 10px;">
 *                      My Content Template for: {{ item.text }} at index: {{ index }}
 *                  </div>
 *              </ng-template>
 *          </kendo-menu-item>
 *        </kendo-menu>
 *    `
 * })
 *
 * class AppComponent {
 * }
 * ```
 */
class ItemContentTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ItemContentTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoMenuItemContentTemplate]'
            },] },
];
/** @nocollapse */
ItemContentTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * A component that can be used to specify the Menu items
 * ([more information and examples]({% slug items_menu %})).
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-menu>
 *          <kendo-menu-item text="item1">
 *              <kendo-menu-item text="item1.1" url="https://example.com">
 *              </kendo-menu-item>
 *              <kendo-menu-item text="item1.2" [disabled]="true">
 *              </kendo-menu-item>
 *          </kendo-menu-item>
 *          <kendo-menu-item text="item2">
 *              <ng-template kendoMenuItemContentTemplate let-item="item">
 *                  <div style="padding: 10px;">
 *                      My Content Template: {{ item.text }}
 *                  </div>
 *              </ng-template>
 *              <ng-template kendoMenuItemTemplate let-item="item">
 *                  <div style="padding: 10px;">
 *                      My Template: {{ item.text }}
 *                  </div>
 *              </ng-template>
 *          </kendo-menu-item>
 *          <kendo-menu-item text="item3">
 *              <ng-template kendoMenuItemLinkTemplate let-item="item" let-index="index">
 *                  <span [kendoMenuItemLink]="index">
 *                      {{ item.text }}
 *                      <span *ngIf="item.items && item.items.length" [kendoMenuExpandArrow]="index"></span>
 *                  </span>
 *              </ng-template>
 *          </kendo-menu-item>
 *        </kendo-menu>
 *    `
 * })
 *
 * class AppComponent {
 * }
 * ```
 */
class MenuItemComponent {
    /**
     * @hidden
     */
    get template() {
        if (this.itemTemplate && this.itemTemplate.length) {
            return this.itemTemplate.first.templateRef;
        }
    }
    /**
     * @hidden
     */
    get linkTemplate() {
        if (this.itemLinkTemplate && this.itemLinkTemplate.length) {
            return this.itemLinkTemplate.first.templateRef;
        }
    }
    /**
     * @hidden
     */
    get contentTemplate() {
        if (this.itemContentTemplate && this.itemContentTemplate.length) {
            return this.itemContentTemplate.first.templateRef;
        }
    }
    /**
     * @hidden
     */
    get items() {
        if (this.children.length) {
            return this.children.toArray().slice(1);
        }
    }
}
MenuItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-menu-item',
                template: ``
            },] },
];
MenuItemComponent.propDecorators = {
    text: [{ type: Input }],
    url: [{ type: Input }],
    disabled: [{ type: Input }],
    cssClass: [{ type: Input }],
    cssStyle: [{ type: Input }],
    icon: [{ type: Input }],
    data: [{ type: Input }],
    separator: [{ type: Input }],
    itemTemplate: [{ type: ContentChildren, args: [ItemTemplateDirective,] }],
    itemLinkTemplate: [{ type: ContentChildren, args: [ItemLinkTemplateDirective,] }],
    itemContentTemplate: [{ type: ContentChildren, args: [ItemContentTemplateDirective,] }],
    children: [{ type: ContentChildren, args: [MenuItemComponent,] }]
};

/**
 * @hidden
 */
class MenuBase {
    constructor() {
        /**
         * Specifies if the Menu will be vertical ([see example]({% slug vertical_menu %})).
         */
        this.vertical = false;
        /**
         * Specifies that the root items can be opened only on click
         * ([see example]({% slug openclose_menu %}#toc-opening-on-click)).
         */
        this.openOnClick = false;
        /**
         * Specifies the delay in milliseconds before the Menu items are opened or closed on item hover
         * or leave ([see example]({% slug openclose_menu %}#toc-delay-on-hover)). Used to avoid the accidental
         * opening or closing of the items.
         */
        this.hoverDelay = 100;
        /**
         * Sets the Menu animation.
         */
        this.animate = true;
    }
    /**
     * @hidden
     */
    get rootItems() {
        return this.items || (this.children ? this.children.toArray() : []);
    }
}
MenuBase.propDecorators = {
    items: [{ type: Input }],
    vertical: [{ type: Input }],
    openOnClick: [{ type: Input }],
    hoverDelay: [{ type: Input }],
    animate: [{ type: Input }],
    itemTemplate: [{ type: ContentChildren, args: [ItemTemplateDirective,] }],
    itemLinkTemplate: [{ type: ContentChildren, args: [ItemLinkTemplateDirective,] }],
    children: [{ type: ContentChildren, args: [MenuItemComponent,] }]
};

/**
 * Represents the [Kendo UI Menu component for Angular]({% slug overview_menu %}).
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-menu [items]="items">
 *        </kendo-menu>
 *    `
 * })
 * class AppComponent {
 *    public items: any[] = [{ text: 'item1', items: [{ text: 'item1.1' }] }, { text: 'item2', disabled: true }];
 * }
 * ```
 */
class MenuComponent extends MenuBase {
    constructor(itemsService, hover, actions, navigation, localization, ngZone, renderer, contextService) {
        super();
        this.itemsService = itemsService;
        this.hover = hover;
        this.actions = actions;
        this.navigation = navigation;
        this.localization = localization;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.contextService = contextService;
        /**
         * Fires when a Menu item is selected ([see example]({% slug routing_menu %})).
         */
        this.select = new EventEmitter();
        /**
         * Fires when a Menu item is opened.
         */
        this.open = new EventEmitter();
        /**
         * Fires when a Menu item is closed.
         */
        this.close = new EventEmitter();
        this.actions.owner = this;
        if (contextService) {
            contextService.items = this.itemsService;
            this.contextKeyDownSubscription = contextService.keydown.subscribe(this.contextKeyDown.bind(this));
        }
    }
    /**
     * @hidden
     */
    get ariaOrientation() {
        if (this.vertical) {
            return 'vertical';
        }
    }
    /**
     * @hidden
     */
    get contextMenuClass() {
        return Boolean(this.contextService);
    }
    get direction() {
        return this.rtl;
    }
    get rtl() {
        return this.localization.rtl;
    }
    /**
     * Opens or closes the specified Menu items.
     *
     * @param open - A Boolean value which indicates if the items will be opened or closed.
     * @param indices - One or more values which represent the hierarchical indices of the items that will be opened or closed.
     */
    toggle(open, ...indices) {
        for (let idx = 0; idx < indices.length; idx++) {
            const item = this.itemsService.get(indices[idx]);
            if (item && !item.disabled) {
                if (open) {
                    item.open();
                }
                else {
                    item.close();
                }
            }
        }
    }
    /**
     * @hidden
     */
    focus(index) {
        this.navigation.focusIndex(index);
    }
    ngOnChanges(changes) {
        this.navigation.vertical = this.vertical;
        this.hover.delay = this.hoverDelay;
        if (changes.openOnClick) {
            const openOnClick = this.openOnClick = normalize(this.openOnClick);
            this.hover.openOnOver = !openOnClick;
            if (openOnClick && openOnClick.toggle === 'click') {
                this.attachCloseClick();
            }
            else {
                this.unsubscribeClick();
            }
        }
    }
    ngAfterViewChecked() {
        this.navigation.updateActive();
    }
    ngOnDestroy() {
        this.unsubscribeClick();
        if (this.contextService) {
            this.contextService.items = null;
            this.contextKeyDownSubscription.unsubscribe();
        }
    }
    attachCloseClick() {
        if (!this.closeClickSubscription && isDocumentAvailable()) {
            this.ngZone.runOutsideAngular(() => {
                this.closeClickSubscription = this.renderer.listen('document', 'click', (e) => {
                    if (!inMenu(e.target, this.itemsService)) {
                        this.hover.openOnOver = false;
                        this.actions.closeAll();
                        this.actions.execute();
                    }
                });
            });
        }
    }
    unsubscribeClick() {
        if (this.closeClickSubscription) {
            this.closeClickSubscription();
        }
    }
    contextKeyDown(e) {
        if (!this.itemsService.hasItems) {
            return;
        }
        const keyCode = e.keyCode;
        const rtl = this.localization.rtl;
        const first = keyCode === Keys.ArrowDown || keyCode === Keys.ArrowRight;
        const last = keyCode === Keys.ArrowUp || keyCode === Keys.ArrowLeft;
        let index;
        if ((first && !rtl) || (last && rtl)) {
            index = 'first';
        }
        else if ((first && rtl) || (last && !rtl)) {
            index = 'last';
        }
        if (index) {
            e.preventDefault();
            this.focus(index);
        }
    }
}
MenuComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoMenu',
                providers: [
                    ItemsService,
                    ActionsService,
                    NavigationService,
                    HoverService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.menu'
                    },
                    {
                        provide: MenuBase,
                        useExisting: forwardRef(() => MenuComponent)
                    }
                ],
                selector: 'kendo-menu',
                template: `
        <ul role="menubar"
            [attr.aria-orientation]="ariaOrientation"
            kendoMenuList [items]="rootItems" [level]="0" class="k-widget k-reset k-header k-menu"
            [vertical]="vertical" [rtl]="rtl" [animate]="animate" [openOnClick]="openOnClick"
            [itemTemplate]="itemTemplate.first?.templateRef || menuItemTemplate"
            [itemLinkTemplate]="itemLinkTemplate.first?.templateRef || menuItemLinkTemplate"
            [class.k-menu-horizontal]="!vertical"
            [class.k-menu-vertical]="vertical"
            [class.k-context-menu]="contextMenuClass">
        </ul>
    `
            },] },
];
/** @nocollapse */
MenuComponent.ctorParameters = () => [
    { type: ItemsService },
    { type: HoverService },
    { type: ActionsService },
    { type: NavigationService },
    { type: LocalizationService },
    { type: NgZone },
    { type: Renderer2 },
    { type: ContextMenuService, decorators: [{ type: Optional }] }
];
MenuComponent.propDecorators = {
    menuItemTemplate: [{ type: Input }],
    menuItemLinkTemplate: [{ type: Input }],
    select: [{ type: Output }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    direction: [{ type: HostBinding, args: ['class.k-rtl',] }]
};

/* tslint:disable:component-selector */
/**
 * @hidden
 */
class ListComponent {
    constructor(itemsService, hover, actions, navigation, renderer, ngZone, element) {
        this.itemsService = itemsService;
        this.hover = hover;
        this.actions = actions;
        this.navigation = navigation;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.element = element;
        this.animate = true;
    }
    hierarchyIndex(index) {
        return this.itemsService.itemIndex(this.index, index);
    }
    ngOnInit() {
        this.itemsService.addList(this);
        this.initDomEvents();
    }
    ngOnDestroy() {
        this.itemsService.removeList(this);
        if (this.domSubscriptions) {
            this.domSubscriptions();
        }
    }
    initDomEvents() {
        if (!this.element) {
            return;
        }
        this.ngZone.runOutsideAngular(() => {
            const element = this.element.nativeElement;
            const container = this.level > 0 ? closest(element, (node) => hasClass(node, 'k-menu-popup')) : element;
            const overSubscription = this.renderer.listen(element, 'mouseover', (e) => {
                if (e.target === element && this.level === 0) {
                    this.onLeave();
                }
                else {
                    const item = this.nodeItem(e.target) || this.itemsService.get(this.index);
                    if (item && !(this.openOnClick && this.openOnClick.toggle === 'click' && item.level === 0 && !item.hasContent)) {
                        this.hover.over(item);
                    }
                }
            });
            const leaveSubscription = this.renderer.listen(container, 'mouseleave', (e) => {
                if (this.leavesMenu(e)) {
                    this.onLeave();
                }
            });
            const keydownSubscription = this.renderer.listen(element, 'keydown', (e) => {
                if (hasClass(e.target, 'k-menu-item')) {
                    this.navigation.keydown(e);
                }
            });
            const blurSubscription = this.renderer.listen(element, 'focusout', (e) => {
                if (this.leavesMenu(e)) {
                    this.navigation.focusLeave();
                }
            });
            const clickSubscription = this.renderer.listen(element, 'click', this.clickHandler.bind(this));
            this.domSubscriptions = () => {
                overSubscription();
                leaveSubscription();
                keydownSubscription();
                blurSubscription();
                clickSubscription();
            };
        });
    }
    leavesMenu(e) {
        if (!e.relatedTarget) {
            return true;
        }
        return !inMenu(e.relatedTarget, this.itemsService);
    }
    onLeave() {
        const openOnClick = this.openOnClick;
        if (!openOnClick || openOnClick.toggle !== 'click') {
            this.hover.leave(openOnClick && openOnClick.toggle === 'leave');
        }
    }
    nodeItem(target) {
        const node = closestItem(target, this.element.nativeElement);
        if (node) {
            const index = nodeIndex(node);
            return this.itemsService.get(index);
        }
    }
    clickHandler(e) {
        if (isFocusable(e.target) && !hasClass(e.target, 'k-menu-item')) {
            return;
        }
        const item = this.nodeItem(e.target);
        if (!item || item.isContent || item.navigating) {
            return;
        }
        if (item.disabled) {
            e.preventDefault();
            return;
        }
        this.actions.select(item, e, () => {
            e.preventDefault();
        });
        this.navigation.focus(item);
        if (item.level > 0 && !item.hasContent) {
            this.actions.closeToRoot(item);
        }
        if (this.openOnClick) {
            const hover = this.hover;
            if (item.opened) {
                if (item.level === 0) {
                    hover.openOnOver = false;
                    this.actions.close(item);
                }
            }
            else if (item.hasContent) {
                hover.openOnOver = true;
                this.actions.closeOthers(item);
                this.actions.open(item);
            }
            else {
                hover.openOnOver = false;
                if (item.level === 0 && this.openOnClick.toggle === 'click') {
                    this.hover.closeCurrent();
                }
            }
        }
        this.actions.execute();
    }
}
ListComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoMenuList]',
                template: `
        <ng-container *ngFor="let item of items; let idx = index">
            <li *ngIf="!item.separator" kendoMenuItem
                [item]="item" [level]="level" [vertical]="vertical" [animate]="animate" [rtl]="rtl"
                [itemTemplate]="itemTemplate" [itemLinkTemplate]="itemLinkTemplate" [openOnClick]="openOnClick"
                [index]="hierarchyIndex(idx)" [siblingIndex]="idx" [attr.${NODE_INDEX}]="hierarchyIndex(idx)"
                [ngClass]="item.cssClass" [ngStyle]="item.cssStyle"
                role="menuitem"
                class="k-item k-menu-item"
                [class.k-first]="idx === 0" [class.k-last]="idx === items.length - 1"
                [class.k-state-disabled]="item.disabled"></li>
            <li *ngIf="item.separator" class="k-separator k-item"
                role="separator" [ngClass]="item.cssClass" [ngStyle]="item.cssStyle">
                &nbsp;
            </li>
        </ng-container>
    `
            },] },
];
/** @nocollapse */
ListComponent.ctorParameters = () => [
    { type: ItemsService },
    { type: HoverService },
    { type: ActionsService },
    { type: NavigationService },
    { type: Renderer2 },
    { type: NgZone },
    { type: ElementRef }
];
ListComponent.propDecorators = {
    items: [{ type: Input }],
    level: [{ type: Input }],
    index: [{ type: Input }],
    animate: [{ type: Input }],
    vertical: [{ type: Input }],
    rtl: [{ type: Input }],
    openOnClick: [{ type: Input }],
    itemTemplate: [{ type: Input }],
    itemLinkTemplate: [{ type: Input }]
};

const POPUP_ALIGN = {
    vertical: 'top',
    horizontal: 'left'
};
const POPUP_ALIGN_RTL = {
    vertical: 'top',
    horizontal: 'right'
};
const VERTICAL_COLLISION = {
    vertical: 'flip',
    horizontal: 'fit'
};
const HORIZONTAL_COLLISION = {
    vertical: 'fit',
    horizontal: 'flip'
};
/**
 * @hidden
 */
const POPUP_SETTINGS_RTL = {
    vertical: {
        anchor: {
            vertical: 'bottom',
            horizontal: 'right'
        },
        popup: POPUP_ALIGN_RTL,
        collision: VERTICAL_COLLISION,
        animate: 'down'
    },
    horizontal: {
        anchor: {
            vertical: 'top',
            horizontal: 'left'
        },
        popup: POPUP_ALIGN_RTL,
        collision: HORIZONTAL_COLLISION,
        animate: 'left'
    }
};
/**
 * @hidden
 */
const POPUP_SETTINGS = {
    vertical: {
        anchor: {
            vertical: 'bottom',
            horizontal: 'left'
        },
        popup: POPUP_ALIGN,
        collision: VERTICAL_COLLISION,
        animate: 'down'
    },
    horizontal: {
        anchor: {
            vertical: 'top',
            horizontal: 'right'
        },
        popup: POPUP_ALIGN,
        collision: HORIZONTAL_COLLISION,
        animate: 'right'
    }
};

/**
 * @hidden
 */
const defined = (value) => typeof value !== 'undefined';
/**
 * @hidden
 */
const bodyFactory = () => {
    if (isDocumentAvailable()) {
        return new ElementRef(document.body);
    }
};

const ɵ0$3 = bodyFactory;
/* tslint:disable:component-selector */
/**
 * @hidden
 */
class ItemComponent {
    constructor(itemsService, navigation, changeDetector, renderer, popupService, element) {
        this.itemsService = itemsService;
        this.navigation = navigation;
        this.changeDetector = changeDetector;
        this.renderer = renderer;
        this.popupService = popupService;
        this.element = element;
        this.animate = true;
        this.openOnClick = false;
        this.opened = false;
        this.navigating = false;
        this.destroyed = false;
    }
    set index(index) {
        if (this._index && this._index !== index) {
            this.itemsService.remove(this);
            this._index = index;
            this.itemsService.add(this);
        }
        else {
            this._index = index;
        }
        this.childId = this.itemsService.childId(index);
    }
    get index() {
        return this._index;
    }
    get disabled() {
        return this.item.disabled;
    }
    get hasPopup() {
        return this.hasContent ? true : null;
    }
    get expanded() {
        return this.hasContent ? this.opened : null;
    }
    get label() {
        return this.item.text ? this.item.text : null;
    }
    get activeId() {
        return this.index === this.navigation.activeIndex ? '0' : '-1';
    }
    get popupSettings() {
        const settings = this.rtl ? POPUP_SETTINGS_RTL : POPUP_SETTINGS;
        return this.horizontal ? settings.horizontal : settings.vertical;
    }
    get horizontal() {
        return this.vertical || this.level > 0;
    }
    get hasLink() {
        return Boolean(this.item.url);
    }
    get linkTemplate() {
        return this.item.linkTemplate || this.itemLinkTemplate;
    }
    get hasContent() {
        const items = this.item.items;
        return items && items.length || this.item.contentTemplate;
    }
    get isContent() {
        return Boolean(this.item.content);
    }
    get iconClass() {
        return `k-i-${this.item.icon}`;
    }
    get children() {
        const item = this.item;
        if (item.contentTemplate) {
            if (!this.contentItems) {
                this.contentItems = [{
                        content: item.contentTemplate,
                        owner: item,
                        ownerIndex: this.index
                    }];
            }
            return this.contentItems;
        }
        return item.items;
    }
    get template() {
        return this.item.template || this.itemTemplate;
    }
    hasContentTemplates() {
        const item = this.item;
        return this.itemTemplate || item.contentTemplate || this.itemLinkTemplate ||
            (item.items && item.items.find(current => current.template || current.linkTemplate));
    }
    ngOnInit() {
        this.itemsService.add(this);
    }
    ngOnDestroy() {
        this.itemsService.remove(this);
        this.destroyed = true;
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    }
    focus() {
        this.element.nativeElement.focus();
    }
    toggleActive(isActive) {
        if (isActive) {
            this.setAttribute('tabindex', '0');
        }
        else {
            this.setAttribute('tabindex', '-1');
        }
    }
    open() {
        if (!this.destroyed && this.hasContent && !this.opened) {
            const popupSettings = this.popupSettings;
            const animate = this.animate ? Object.assign({}, this.animate, {
                direction: popupSettings.animate
            }) : false;
            this.opened = true;
            this.popupRef = this.popupService.open({
                popupAlign: popupSettings.popup,
                anchorAlign: popupSettings.anchor,
                collision: popupSettings.collision,
                anchor: this.element,
                positionMode: 'absolute',
                content: this.popupTemplate,
                popupClass: {
                    'k-rtl': this.rtl,
                    'k-menu-popup': true
                },
                animate: animate
            });
            this.setAttribute('aria-expanded', 'true');
            this.setAttribute('aria-owns', this.childId);
            this.changeDetector.detectChanges();
        }
    }
    close() {
        if (!this.destroyed && this.opened) {
            this.opened = false;
            if (this.popupRef) {
                this.popupRef.close();
                this.popupRef = null;
            }
            this.changeDetector.detectChanges();
            this.setAttribute('aria-expanded', 'false');
            this.renderer.removeAttribute(this.element.nativeElement, 'aria-owns');
        }
    }
    navigate() {
        let link;
        if (this.linkTemplate) {
            link = this.element.nativeElement.querySelector('a.k-menu-link');
        }
        else if (this.hasLink) {
            link = this.link.nativeElement;
        }
        if (link) {
            this.navigating = true;
            link.click();
            this.navigating = false;
        }
    }
    setAttribute(name, value) {
        this.renderer.setAttribute(this.element.nativeElement, name, value);
    }
}
ItemComponent.decorators = [
    { type: Component, args: [{
                providers: [PopupService, {
                        provide: POPUP_CONTAINER,
                        useFactory: ɵ0$3
                    }],
                selector: '[kendoMenuItem]',
                template: `
    <span *ngIf="!hasLink && !item.content && !linkTemplate" class="k-link k-menu-link" #link
        [class.k-state-active]="opened" role="presentation">
        <ng-template [ngTemplateOutlet]="itemcontent">
        </ng-template>
    </span>
    <a *ngIf="item.url && !linkTemplate" class="k-link k-menu-link" #link [attr.href]="item.url"
        [class.k-state-active]="opened" tabindex="-1" role="presentation">
        <ng-template [ngTemplateOutlet]="itemcontent">
        </ng-template>
    </a>
    <ng-template *ngIf="linkTemplate && !item.content" [ngTemplateOutlet]="linkTemplate"
        [ngTemplateOutletContext]="{ item: item, index: index }">
    </ng-template>

    <div class="k-content" *ngIf="item.content" role="presentation">
        <ng-template [ngTemplateOutlet]="item.content" [ngTemplateOutletContext]="{ item: item.owner, index: item.ownerIndex }">
        </ng-template>
    </div>

    <ng-template #popupTemplate>
        <ul kendoMenuList
            [attr.id]="childId"
            [animate]="animate"
            [rtl]="rtl"
            [vertical]="vertical"
            [openOnClick]="openOnClick"
            [items]="children"
            [level]="level + 1"
            [index]="index"
            [itemTemplate]="itemTemplate"
            [itemLinkTemplate]="itemLinkTemplate"
            role="menu"
            class="k-group k-menu-group k-reset">
        </ul>
    </ng-template>

    <ng-template #itemcontent>
        <span *ngIf="item.icon" class="k-icon" [ngClass]="iconClass" role="presentation"></span>
        <ng-container *ngIf="!template">
            {{ item.text }}
        </ng-container>
        <ng-template *ngIf="template" [ngTemplateOutlet]="template" [ngTemplateOutletContext]="{ item: item, index: index }">
        </ng-template>
        <span class="k-icon k-menu-expand-arrow" *ngIf="hasContent"
            role="presentation"
            [class.k-i-arrow-60-down]="!horizontal"
            [class.k-i-arrow-60-right]="horizontal && !rtl"
            [class.k-i-arrow-60-left]="horizontal && rtl">
        </span>
    </ng-template>
  `
            },] },
];
/** @nocollapse */
ItemComponent.ctorParameters = () => [
    { type: ItemsService },
    { type: NavigationService },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: PopupService },
    { type: ElementRef }
];
ItemComponent.propDecorators = {
    item: [{ type: Input }],
    level: [{ type: Input }],
    index: [{ type: Input }],
    siblingIndex: [{ type: Input }],
    animate: [{ type: Input }],
    vertical: [{ type: Input }],
    rtl: [{ type: Input }],
    openOnClick: [{ type: Input }],
    itemTemplate: [{ type: Input }],
    itemLinkTemplate: [{ type: Input }],
    link: [{ type: ViewChild, args: ['link',] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
    disabled: [{ type: HostBinding, args: ['attr.aria-disabled',] }],
    hasPopup: [{ type: HostBinding, args: ['attr.aria-haspopup',] }],
    expanded: [{ type: HostBinding, args: ['attr.aria-expanded',] }],
    label: [{ type: HostBinding, args: ['attr.aria-label',] }],
    activeId: [{ type: HostBinding, args: ['attr.tabindex',] }]
};

/**
 * Represents a directive that can be used in the [`linkTemplate`]({% slug api_menu_itemlinktemplatedirective %})
 * of the items to apply the default styling and behavior.
 */
class LinkDirective {
    constructor(itemsService) {
        this.itemsService = itemsService;
        this.hostClasses = true;
        this.role = 'presentation';
        this.tabindex = '-1';
    }
    get activeClass() {
        return this.item.opened;
    }
    ngOnInit() {
        if (isDevMode() && !this.index) {
            throw new Error('The kendoMenuItemLink directive requires the item index to be set.');
        }
        this.item = this.itemsService.get(this.index) || {};
    }
}
LinkDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoMenuItemLink]'
            },] },
];
/** @nocollapse */
LinkDirective.ctorParameters = () => [
    { type: ItemsService }
];
LinkDirective.propDecorators = {
    index: [{ type: Input, args: ['kendoMenuItemLink',] }],
    hostClasses: [{ type: HostBinding, args: ['class.k-link',] }, { type: HostBinding, args: ['class.k-menu-link',] }],
    role: [{ type: HostBinding, args: ['attr.role',] }],
    tabindex: [{ type: HostBinding, args: ['attr.tabindex',] }],
    activeClass: [{ type: HostBinding, args: ['class.k-state-active',] }]
};

/**
 * Represents a directive that can be used in the [`linkTemplate`]({% slug api_menu_itemlinktemplatedirective %})
 * of the items to render the default expand arrow.
 */
class ExpandArrowDirective {
    constructor(itemsService) {
        this.itemsService = itemsService;
        this.hostClasses = true;
        this.role = 'presentation';
    }
    get arrowDown() {
        return !this.item.horizontal;
    }
    get arrowRight() {
        return this.item.horizontal && !this.item.rtl;
    }
    get arrowLeft() {
        return this.item.horizontal && this.item.rtl;
    }
    ngOnInit() {
        if (isDevMode() && !this.index) {
            throw new Error('The kendoMenuExpandArrow directive requires the item index to be set.');
        }
        this.item = this.itemsService.get(this.index) || {};
    }
}
ExpandArrowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoMenuExpandArrow]'
            },] },
];
/** @nocollapse */
ExpandArrowDirective.ctorParameters = () => [
    { type: ItemsService }
];
ExpandArrowDirective.propDecorators = {
    index: [{ type: Input, args: ['kendoMenuExpandArrow',] }],
    hostClasses: [{ type: HostBinding, args: ['class.k-icon',] }, { type: HostBinding, args: ['class.k-menu-expand-arrow',] }],
    role: [{ type: HostBinding, args: ['attr.role',] }],
    arrowDown: [{ type: HostBinding, args: ['class.k-i-arrow-60-down',] }],
    arrowRight: [{ type: HostBinding, args: ['class.k-i-arrow-60-right',] }],
    arrowLeft: [{ type: HostBinding, args: ['class.k-i-arrow-60-left',] }]
};

/**
 * Arguments for the `select` event of the Menu.
 */
class MenuSelectEvent extends MenuEvent {
}

const ITEM_FIELDS = ['textField', 'urlField', 'iconField', 'disabledField', 'cssClassField', 'cssStyleField', 'separatorField'];
/**
 * @hidden
 */
class BindingDirectiveBase {
    constructor(menu) {
        this.menu = menu;
    }
    ngOnChanges() {
        this.rebind();
    }
    /**
     *  Rebinds the Menu items.
     */
    rebind() {
        const fields = this.fields = [];
        for (let idx = 0; idx < ITEM_FIELDS.length; idx++) {
            const inputName = ITEM_FIELDS[idx];
            const inputValue = this[inputName];
            if (inputValue) {
                fields.push({ target: inputName.replace('Field', ''), source: inputValue });
            }
        }
        this.menu.items = this.data ? this.mapItems(this.data) : [];
    }
}

const FIELD_REGEX = /\[(?:(\d+)|['"](.*?)['"])\]|((?:(?!\[.*?\]|\.).)+)/g;
const getterCache = {};
// tslint:disable-next-line:no-string-literal
getterCache['undefined'] = (obj) => obj;
/**
 * @hidden
 */
const getter = (field) => {
    if (getterCache[field]) {
        return getterCache[field];
    }
    const fields = [];
    field.replace(FIELD_REGEX, (_match, index, indexAccessor, name) => {
        fields.push(index !== undefined ? index : (indexAccessor || name));
    });
    getterCache[field] = (obj) => {
        let result = obj;
        for (let idx = 0; idx < fields.length && result; idx++) {
            result = result[fields[idx]];
        }
        return result;
    };
    return getterCache[field];
};
/**
 * @hidden
 */
const last = (arr) => arr[arr.length - 1];

const getField = (field, level) => Array.isArray(field) ? field[level] || last(field) : field;
/* tslint:disable:no-input-rename */
/**
 * A directive that converts the provided hierarchical data to [MenuItems]({% slug api_menu_menuitem %}) and binds them to the Menu.
 */
class HierarchyBindingDirective extends BindingDirectiveBase {
    constructor(menu) {
        super(menu);
    }
    mapItems(items, level = 0) {
        return items.map((item) => {
            const menuItem = this.createItem(item, level);
            const children = this.getChildren(item, level);
            if (children) {
                menuItem.items = this.mapItems(children, level + 1);
            }
            return menuItem;
        });
    }
    createItem(item, level) {
        const result = { data: item };
        const fields = this.fields;
        for (let idx = 0; idx < fields.length; idx++) {
            const { target, source } = fields[idx];
            result[target] = getter(getField(source, level))(item);
        }
        return result;
    }
    getChildren(item, level) {
        if (this.childrenField) {
            const field = getField(this.childrenField, level);
            return item[field];
        }
    }
}
HierarchyBindingDirective.decorators = [
    { type: Directive, args: [{
                exportAs: 'kendoMenuHierarchyBinding',
                selector: '[kendoMenuHierarchyBinding]'
            },] },
];
/** @nocollapse */
HierarchyBindingDirective.ctorParameters = () => [
    { type: MenuBase }
];
HierarchyBindingDirective.propDecorators = {
    data: [{ type: Input, args: ["kendoMenuHierarchyBinding",] }],
    textField: [{ type: Input }],
    urlField: [{ type: Input }],
    iconField: [{ type: Input }],
    disabledField: [{ type: Input }],
    cssClassField: [{ type: Input }],
    cssStyleField: [{ type: Input }],
    separatorField: [{ type: Input }],
    childrenField: [{ type: Input }]
};

/* tslint:disable:no-input-rename */
/**
 * A directive that converts the provided flat data to [MenuItems]({% slug api_menu_menuitem %}) and binds them to the Menu.
 */
class FlatBindingDirective extends BindingDirectiveBase {
    constructor(menu) {
        super(menu);
    }
    mapItems(items) {
        if (!this.idField || !this.parentIdField) {
            return items.map(item => this.createItem(item));
        }
        const result = [];
        const map = {};
        for (let idx = 0; idx < items.length; idx++) {
            const item = items[idx];
            const menuItem = this.createItem(item);
            const id = getter(this.idField)(item);
            const parentId = getter(this.parentIdField)(item);
            if (parentId === null || parentId === undefined) {
                result.push(menuItem);
            }
            else {
                const parent = map[parentId] = map[parentId] || {};
                parent.items = parent.items || [];
                parent.items.push(menuItem);
            }
            if (map[id]) {
                menuItem.items = map[id].items;
            }
            map[id] = menuItem;
        }
        return result;
    }
    createItem(dataItem) {
        const result = { data: dataItem };
        const fields = this.fields;
        for (let idx = 0; idx < fields.length; idx++) {
            const { source, target } = fields[idx];
            result[target] = getter(source)(dataItem);
        }
        return result;
    }
}
FlatBindingDirective.decorators = [
    { type: Directive, args: [{
                exportAs: 'kendoMenuFlatBinding',
                selector: '[kendoMenuFlatBinding]'
            },] },
];
/** @nocollapse */
FlatBindingDirective.ctorParameters = () => [
    { type: MenuBase }
];
FlatBindingDirective.propDecorators = {
    data: [{ type: Input, args: ["kendoMenuFlatBinding",] }],
    textField: [{ type: Input }],
    urlField: [{ type: Input }],
    iconField: [{ type: Input }],
    disabledField: [{ type: Input }],
    cssClassField: [{ type: Input }],
    cssStyleField: [{ type: Input }],
    separatorField: [{ type: Input }],
    idField: [{ type: Input }],
    parentIdField: [{ type: Input }]
};

const COMPONENT_EXPORTS = [
    MenuComponent,
    MenuItemComponent,
    ItemTemplateDirective,
    ItemLinkTemplateDirective,
    ItemContentTemplateDirective,
    HierarchyBindingDirective,
    FlatBindingDirective,
    LinkDirective,
    ExpandArrowDirective
];
const COMPONENT_DIRECTIVES = [
    ...COMPONENT_EXPORTS,
    ListComponent,
    ItemComponent
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Menu component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Menu module
 * import { MenuModule } from '@progress/kendo-angular-menu';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, BrowserAnimationsModule, MenuModule], // import Menu module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class MenuModule {
}
MenuModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES],
                exports: [COMPONENT_EXPORTS],
                imports: [PopupModule, CommonModule]
            },] },
];

/**
 * Arguments for the `open` and `close` events of the ContextMenu.
 */
class ContextMenuEvent {
}

/**
 * Arguments for the `select` event of the ContextMenu.
 */
class ContextMenuSelectEvent extends ContextMenuEvent {
}

/**
 * Arguments for the `popupOpen` and `popupClose` events of the ContextMenu.
 */
class ContextMenuPopupEvent extends PreventableEvent {
}

/**
 * Represents a template for the content of the ContextMenu. To define a template, nest an `<ng-template>`
 * tag with the `kendoContextMenuTemplate` directive inside a `<kendo-contextmenu>` component
 * ([more information and examples]({% slug templates_contextmenu %})).
 *
 * {% meta height:200 %}
 * {% embed_file context-menu/template/app.component.ts preview %}
 * {% embed_file context-menu/app.module.ts %}
 * {% embed_file main.ts %}
 * {% endmeta %}
 */
class ContextMenuTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ContextMenuTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoContextMenuTemplate]'
            },] },
];
/** @nocollapse */
ContextMenuTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * @hidden
 */
class ContextMenuItemsService {
    constructor(contextService) {
        this.contextService = contextService;
    }
    get(index) {
        if (this.contextService.items) {
            return this.contextService.items.get(index);
        }
    }
}
ContextMenuItemsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ContextMenuItemsService.ctorParameters = () => [
    { type: ContextMenuService }
];

/**
 * @hidden
 */
class ContextMenuTargetService {
    constructor() {
        this.targets = [];
    }
    add(target) {
        this.targets.push(target);
    }
    remove(target) {
        const index = this.targets.indexOf(target);
        this.targets.splice(index, 1);
    }
    find(targetElement) {
        return this.targets.find(target => target.element === targetElement);
    }
}
ContextMenuTargetService.decorators = [
    { type: Injectable },
];

/**
 * Specifies a container for the [targets]({% slug api_menu_contextmenutargetdirective %}) of the ContextMenu.
 */
class ContextMenuTargetContainerDirective {
    /**
     * @hidden
     */
    constructor(elementRef, targetService) {
        this.targetService = targetService;
        if (elementRef) {
            this.element = elementRef.nativeElement;
        }
    }
}
ContextMenuTargetContainerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoContextMenuTargetContainer]',
                exportAs: 'kendoContextMenuTargetContainer',
                providers: [ContextMenuTargetService]
            },] },
];
/** @nocollapse */
ContextMenuTargetContainerDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ContextMenuTargetService }
];

/**
 * @hidden
 */
const TARGET_CLASS = 'k-contextmenu-target';
/**
 * Specifies a [target]({% slug api_menu_contextmenutargetdirective %}) for the ContextMenu
 * ([see example]({% slug target_contextmenu %}#toc-directives)).
 */
class ContextMenuTargetDirective {
    constructor(elementRef, targetService) {
        this.targetService = targetService;
        /**
         * @hidden
         */
        this.hostClass = true;
        if (elementRef) {
            this.element = elementRef.nativeElement;
        }
        targetService.add(this);
    }
    ngOnDestroy() {
        this.targetService.remove(this);
    }
}
ContextMenuTargetDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoContextMenuTarget]',
                exportAs: 'kendoContextMenuTarget'
            },] },
];
/** @nocollapse */
ContextMenuTargetDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ContextMenuTargetService }
];
ContextMenuTargetDirective.propDecorators = {
    data: [{ type: Input, args: ['kendoContextMenuTarget',] }],
    hostClass: [{ type: HostBinding, args: [`class.${TARGET_CLASS}`,] }]
};

const CONTEXT_MENU = 'contextmenu';
const DEFAULT_ANCHOR_ALIGN = { horizontal: 'left', vertical: 'bottom' };
const DEFAULT_POPUP_ALIGN = { horizontal: 'left', vertical: 'top' };
const DEFAULT_COLLISION = { horizontal: 'fit', vertical: 'flip' };
const preventDefault = e => e.preventDefault();
const ɵ1$2 = bodyFactory;
/**
 * Represents the [Kendo UI ContextMenu component for Angular]({% slug overview_contextmenu %}).
 *
 * {% meta height:200 %}
 * {% embed_file context-menu/basic/app.component.ts preview %}
 * {% embed_file context-menu/items.ts %}
 * {% embed_file context-menu/app.module.ts %}
 * {% embed_file main.ts %}
 * {% endmeta %}
 */
class ContextMenuComponent extends MenuBase {
    constructor(popupService, service, ngZone, renderer) {
        super();
        this.popupService = popupService;
        this.service = service;
        this.ngZone = ngZone;
        this.renderer = renderer;
        /**
         * Specifies the event on which the ContextMenu will open ([see example]({% slug showon_contextmenu %})).
         * Accepts the name of a native DOM event. Defaults to `contextmenu` which opens the ContextMenu for the target element.
         */
        this.showOn = CONTEXT_MENU;
        /**
         * Indicates that the ContextMenu will be aligned to the target or to the `filter` element (if specified).
         */
        this.alignToAnchor = false;
        /**
         * Specifies if the Menu will be vertically rendered ([see example]({% slug orientation_contextmenu %})).
         * @default true
         */
        this.vertical = true;
        /**
         * Fires when the Menu is opened ([see example]({% slug target_contextmenu %}#toc-changing-items-for-specified-targets)).
         */
        this.popupOpen = new EventEmitter();
        /**
         * Fires when the Menu is closed.
         */
        this.popupClose = new EventEmitter();
        /**
         * Fires when a Menu item is selected.
         */
        this.select = new EventEmitter();
        /**
         * Fires when a Menu item is opened.
         */
        this.open = new EventEmitter();
        /**
         * Fires when a Menu item is closed.
         */
        this.close = new EventEmitter();
        this.service.owner = this;
        this.popupKeyDownHandler = this.popupKeyDownHandler.bind(this);
    }
    /**
     * Hides the ContextMenu.
     */
    hide() {
        this.removePopup();
    }
    /**
     * Shows the ContextMenu for the specified target.
     * @param target - The offset or the target element for which the ContextMenu will open.
     */
    show(target) {
        if (!target) {
            return;
        }
        const showTarget = target;
        this.removePopup();
        if (defined(showTarget.left) && defined(showTarget.top)) {
            this.createPopup({ offset: showTarget });
        }
        else {
            this.currentTarget = showTarget.nativeElement || showTarget;
            this.createPopup({ anchor: this.currentTarget });
        }
    }
    ngOnChanges(changes) {
        if (changes.target || changes.showOn) {
            this.bindShowHandler();
        }
    }
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            const closeClickSubscription = this.renderer.listen('document', 'mousedown', (e) => {
                if (this.popupRef && !closest(e.target, node => node === this.popupRef.popupElement) && this.service.leaveMenu(e)) {
                    this.closePopup(e);
                }
            });
            const closeBlurSubscription = this.renderer.listen('window', 'blur', (e) => {
                if (this.popupRef) {
                    this.closePopup(e);
                }
            });
            this.closeSubscription = () => {
                closeClickSubscription();
                closeBlurSubscription();
            };
        });
    }
    ngOnDestroy() {
        if (this.closeSubscription) {
            this.closeSubscription();
            this.closeSubscription = null;
        }
        this.unbindShowHandler();
        this.removePopup();
    }
    /**
     * @hidden
     */
    emitMenuEvent(name, args) {
        args.target = this.currentTarget;
        args.sender = this;
        this[name].emit(args);
        if (name === 'select' && !args.hasContent) {
            this.closeAndFocus(args.originalEvent);
        }
    }
    bindShowHandler() {
        this.unbindShowHandler();
        this.ngZone.runOutsideAngular(() => {
            const element = this.targetElement();
            if (!element) {
                return;
            }
            const eventName = this.showOn || CONTEXT_MENU;
            this.showSubscription = this.renderer.listen(element, this.showOn || CONTEXT_MENU, (e) => {
                this.showContextMenu(e, element);
            });
            if (eventName === CONTEXT_MENU) {
                this.keydownSubscription = this.renderer.listen(element, 'keydown', (e) => {
                    if (e.shiftKey && e.keyCode === Keys.F10) {
                        this.showContextMenu(e, element);
                    }
                });
            }
        });
    }
    showContextMenu(e, element) {
        const filter = this.targetFilter();
        let currentTarget = element;
        if (filter) {
            currentTarget = findInContainer(e.target, filter, element);
            if (currentTarget && currentTarget !== e.target && isFocusable(e.target)) {
                return;
            }
            if (currentTarget && this.directiveTarget) {
                currentTarget = this.target.targetService.find(currentTarget);
            }
        }
        if (!currentTarget) {
            this.closePopup(e);
            return;
        }
        this.ngZone.run(() => {
            if (!this.closePopup(e)) {
                this.currentTarget = currentTarget;
                this.openPopup(e);
            }
        });
    }
    unbindShowHandler() {
        if (this.showSubscription) {
            this.showSubscription();
            this.showSubscription = null;
        }
        if (this.keydownSubscription) {
            this.keydownSubscription();
            this.keydownSubscription = null;
        }
    }
    targetElement() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.directiveTarget = false;
        let target = this.target;
        if (typeof target === 'string') {
            target = document.querySelector(target); // maybe querySelectorAll?
        }
        else if (target && target.nativeElement) {
            target = target.nativeElement;
        }
        else if (target instanceof ContextMenuTargetContainerDirective) {
            target = target.element;
            this.directiveTarget = true;
        }
        return target;
    }
    targetFilter() {
        if (this.directiveTarget) {
            return `.${TARGET_CLASS}`;
        }
        return this.filter;
    }
    closePopup(e) {
        if (!this.popupRef) {
            return;
        }
        return this.popupAction('popupClose', e, () => {
            this.removePopup();
        });
    }
    removePopup() {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
            this.currentTarget = null;
        }
        if (this.popupSubscriptions) {
            this.popupSubscriptions();
            this.popupSubscriptions = null;
        }
    }
    openPopup(e) {
        this.popupAction('popupOpen', e, () => {
            e.preventDefault();
            let anchor, offset;
            if (this.alignToAnchor || e.type === 'keydown') {
                anchor = this.currentTargetElement;
            }
            else {
                offset = { left: e.pageX, top: e.pageY };
            }
            this.createPopup({ anchor, offset });
        });
    }
    createPopup(options) {
        this.popupRef = this.popupService.open(Object.assign({
            animate: defined(this.popupAnimate) ? this.popupAnimate : true,
            appendTo: this.appendTo,
            collision: this.collision || DEFAULT_COLLISION,
            popupAlign: this.popupAlign || DEFAULT_POPUP_ALIGN,
            anchorAlign: this.anchorAlign || DEFAULT_ANCHOR_ALIGN,
            content: this.contentTemplate ? this.contentTemplate.templateRef : this.defaultContentTemplate
        }, options));
        const element = this.popupRef.popupElement;
        this.renderer.setAttribute(element, 'tabindex', '-1');
        this.renderer.setStyle(element, 'outline', '0'); //possibly move to styles
        if (this.ariaLabel) {
            this.renderer.setAttribute(element, 'aria-label', this.ariaLabel);
        }
        this.activeTarget = this.currentTargetElement === document.activeElement;
        this.ngZone.runOutsideAngular(() => {
            const unbindKeyDown = this.renderer.listen(element, 'keydown', this.popupKeyDownHandler);
            const unbindContextmenu = this.renderer.listen(element, 'contextmenu', preventDefault);
            this.popupSubscriptions = () => {
                unbindKeyDown();
                unbindContextmenu();
            };
        });
        element.focus();
    }
    closeAndFocus(e) {
        const currentTarget = this.currentTargetElement;
        if (!this.closePopup(e) && this.activeTarget) {
            currentTarget.focus();
        }
    }
    popupKeyDownHandler(e) {
        const element = this.popupRef.popupElement;
        if (e.keyCode === Keys.Escape && (hasClass(e.target, 'k-menu-item') || e.target === element)) {
            this.closeAndFocus(e);
        }
        else if (e.target === element) {
            this.service.keydown.emit(e);
        }
    }
    popupAction(name, originalEvent, callback) {
        const emitter = this[name];
        let prevented = false;
        if (hasObservers(emitter)) {
            this.ngZone.run(() => {
                const args = new ContextMenuPopupEvent({
                    originalEvent: originalEvent,
                    sender: this,
                    target: this.currentTarget
                });
                emitter.emit(args);
                if (!args.isDefaultPrevented()) {
                    callback();
                }
                prevented = args.isDefaultPrevented();
            });
        }
        else {
            callback();
        }
        return prevented;
    }
    get currentTargetElement() {
        return this.directiveTarget && this.currentTarget ? this.currentTarget.element : this.currentTarget;
    }
}
ContextMenuComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoContextMenu',
                providers: [
                    ContextMenuService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.contextmenu'
                    },
                    {
                        provide: ItemsService,
                        useClass: ContextMenuItemsService
                    },
                    {
                        provide: MenuBase,
                        useExisting: forwardRef(() => ContextMenuComponent)
                    },
                    PopupService,
                    {
                        provide: POPUP_CONTAINER,
                        useFactory: ɵ1$2
                    }
                ],
                selector: 'kendo-contextmenu',
                template: `
        <ng-template #default>
            <kendo-menu [items]="rootItems"
                [vertical]="vertical"
                [openOnClick]="openOnClick"
                [hoverDelay]="hoverDelay"
                [animate]="animate"
                [menuItemTemplate]="itemTemplate.first?.templateRef"
                [menuItemLinkTemplate]="itemLinkTemplate.first?.templateRef"
                ></kendo-menu>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ContextMenuComponent.ctorParameters = () => [
    { type: PopupService },
    { type: ContextMenuService },
    { type: NgZone },
    { type: Renderer2 }
];
ContextMenuComponent.propDecorators = {
    showOn: [{ type: Input }],
    target: [{ type: Input }],
    filter: [{ type: Input }],
    alignToAnchor: [{ type: Input }],
    vertical: [{ type: Input }],
    popupAnimate: [{ type: Input }],
    popupAlign: [{ type: Input }],
    anchorAlign: [{ type: Input }],
    collision: [{ type: Input }],
    appendTo: [{ type: Input }],
    ariaLabel: [{ type: Input }],
    popupOpen: [{ type: Output }],
    popupClose: [{ type: Output }],
    select: [{ type: Output }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    contentTemplate: [{ type: ContentChild, args: [ContextMenuTemplateDirective,] }],
    defaultContentTemplate: [{ type: ViewChild, args: ['default',] }]
};

const COMPONENT_DIRECTIVES$1 = [
    ContextMenuComponent,
    ContextMenuTemplateDirective,
    ContextMenuTargetDirective,
    ContextMenuTargetContainerDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the ContextMenu component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the ContextMenu module
 * import { ContextMenuModule } from '@progress/kendo-angular-menu';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, BrowserAnimationsModule, ContextMenuModule], // import ContextMenuModule module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class ContextMenuModule {
}
ContextMenuModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES$1],
                exports: [COMPONENT_DIRECTIVES$1, MenuModule],
                imports: [PopupModule, CommonModule, MenuModule]
            },] },
];

/**
 * A [module]({{ site.data.urls.angular['ngmoduleapi'] }}) that includes the Menu and ContextMenu components and directives.
 * Imports the MenusModule into your application [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity)
 * or any other sub-module that will use the Menu and ContextMenu components.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 * import { MenusModule } from '@progress/kendo-angular-menu';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, BrowserAnimationsModule, MenusModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
class MenusModule {
}
MenusModule.decorators = [
    { type: NgModule, args: [{
                exports: [MenuModule, ContextMenuModule]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { NODE_INDEX, ContextMenuItemsService, ContextMenuTargetContainerDirective, ContextMenuTargetDirective, ContextMenuTargetService, BindingDirectiveBase, MenuBase, PreventableEvent, ActionsService, HoverService, ItemsService, NavigationService, bodyFactory, MenuComponent, ListComponent, ItemComponent, LinkDirective, ExpandArrowDirective, MenuItemComponent, MenuEvent, MenuSelectEvent, ItemContentTemplateDirective, ItemTemplateDirective, ItemLinkTemplateDirective, HierarchyBindingDirective, FlatBindingDirective, MenuModule, ContextMenuEvent, ContextMenuSelectEvent, ContextMenuPopupEvent, ContextMenuTemplateDirective, ContextMenuComponent, ContextMenuModule, ContextMenuService, MenusModule };
