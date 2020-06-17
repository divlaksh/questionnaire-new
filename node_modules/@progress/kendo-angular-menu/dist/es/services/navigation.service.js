import { Injectable, NgZone } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ItemsService } from './items.service';
import { ActionsService } from './actions.service';
var DEFAULT_ACTIVE = '0';
var NO_SPACE_REGEX = /\S/;
var handlers = {};
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
var handlersRTL = Object.assign({}, handlers, {
    '37': 'right',
    '39': 'left'
});
function isPrintableCharacter(key) {
    return key.length === 1 && NO_SPACE_REGEX.test(key);
}
var resolvedPromise = Promise.resolve(null);
/**
 * @hidden
 */
var NavigationService = /** @class */ (function () {
    function NavigationService(items, actions, localization, ngZone) {
        this.items = items;
        this.actions = actions;
        this.localization = localization;
        this.ngZone = ngZone;
        this.vertical = false;
        this.activeIndex = DEFAULT_ACTIVE;
    }
    Object.defineProperty(NavigationService.prototype, "focusedItem", {
        get: function () {
            return this.items.get(this.focusedIdx);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationService.prototype, "activeItem", {
        get: function () {
            return this.items.get(this.activeIndex);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationService.prototype, "handlers", {
        get: function () {
            return this.localization.rtl ? handlersRTL : handlers;
        },
        enumerable: true,
        configurable: true
    });
    NavigationService.prototype.focus = function (item) {
        if (item.index === this.focusedIdx) {
            return;
        }
        if (!this.activeItem || !this.items.hasParent(item, this.activeItem)) {
            this.setActive(item);
        }
        this.setFocus(item);
    };
    NavigationService.prototype.setFocus = function (item) {
        this.focusedIdx = item.index;
        item.focus();
    };
    NavigationService.prototype.focusLeave = function () {
        var focused = this.focusedItem;
        if (focused) {
            this.actions.closeToRoot(focused);
            this.actions.execute();
        }
        this.focusedIdx = null;
    };
    NavigationService.prototype.updateActive = function () {
        var _this = this;
        if (!this.activeItem && this.items.hasItems) {
            var firstItem = this.items.get(DEFAULT_ACTIVE);
            firstItem.toggleActive(true);
            this.ngZone.runOutsideAngular(function () {
                resolvedPromise.then(function () {
                    _this.activeIndex = DEFAULT_ACTIVE;
                });
            });
        }
    };
    NavigationService.prototype.keydown = function (e) {
        var current = this.focusedItem || this.activeItem;
        var handler = this.handlers[e.keyCode];
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
    };
    NavigationService.prototype.focusIndex = function (index) {
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
            var item = this.items.get(index);
            if (item) {
                this.focus(item);
            }
        }
    };
    NavigationService.prototype.focusFirst = function () {
        var items = this.items.siblings(this.items.get('0'));
        this.focus(items[0]);
    };
    NavigationService.prototype.focusLast = function () {
        var items = this.items.siblings(this.items.get('0'));
        this.focus(items[items.length - 1]);
    };
    NavigationService.prototype.search = function (current, key) {
        var siblings = this.items.siblings(current);
        var startIndex = siblings.indexOf(current);
        var items = siblings.slice(startIndex + 1).concat(siblings.slice(0, startIndex));
        for (var idx = 0; idx < items.length; idx++) {
            var sibling = items[idx];
            var text = sibling.item.text || "";
            if (text.toLowerCase().startsWith(key.toLowerCase())) {
                this.focus(sibling);
                break;
            }
        }
    };
    NavigationService.prototype.down = function (current) {
        if (current.level === 0 && !this.vertical) {
            if (current.hasContent) {
                this.actions.open(current, this.focusChild(current, 0));
            }
        }
        else {
            this.focus(this.items.next(current));
        }
    };
    NavigationService.prototype.up = function (current) {
        if (current.level === 0 && !this.vertical) {
            if (current.hasContent) {
                this.actions.open(current, this.focusChild(current, current.children.length - 1));
            }
        }
        else {
            this.focus(this.items.previous(current));
        }
    };
    NavigationService.prototype.left = function (current) {
        if (this.vertical && current.level === 0 && current.disabled) {
            return;
        }
        if (current.level > 1 || (this.vertical && current.level > 0)) {
            var parent_1 = this.items.parent(current);
            this.focus(parent_1);
            this.actions.close(parent_1);
        }
        else if (this.vertical && current.level === 0 && !current.disabled) {
            if (current.hasContent) {
                this.actions.open(current, this.focusChild(current, current.children.length - 1));
            }
        }
        else {
            this.focus(this.items.previous(this.activeItem));
        }
    };
    NavigationService.prototype.right = function (current) {
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
    };
    NavigationService.prototype.home = function (current) {
        var siblings = this.items.siblings(current);
        this.focus(siblings[0]);
    };
    NavigationService.prototype.end = function (current) {
        var siblings = this.items.siblings(current);
        this.focus(siblings[siblings.length - 1]);
    };
    NavigationService.prototype.enter = function (current, domEvent) {
        var actions = this.actions;
        if (current.disabled) {
            return;
        }
        if (current.hasContent) {
            actions.select(current, domEvent);
            actions.open(current, this.focusChild(current, 0));
        }
        else {
            actions.select(current, domEvent, null, function () {
                current.navigate();
            });
            this.focus(this.items.root(current));
            actions.closeToRoot(current);
        }
    };
    NavigationService.prototype.esc = function (current) {
        if (current.level > 0) {
            var parent_2 = this.items.parent(current);
            this.actions.close(parent_2);
            this.focus(parent_2);
        }
    };
    NavigationService.prototype.tab = function (current) {
        if (current.level > 0) {
            this.activeItem.focus();
        }
    };
    NavigationService.prototype.focusChild = function (item, index) {
        var _this = this;
        return function () {
            var child = _this.items.children(item)[index];
            _this.setFocus(child);
        };
    };
    NavigationService.prototype.setActive = function (item) {
        var focused = this.focusedItem;
        var active = this.items.root(item);
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
    };
    NavigationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return [
        { type: ItemsService },
        { type: ActionsService },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    return NavigationService;
}());
export { NavigationService };
