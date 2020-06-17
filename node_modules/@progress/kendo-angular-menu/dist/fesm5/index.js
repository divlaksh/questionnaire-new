import { __extends } from 'tslib';
import { ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, HostBinding, Injectable, Input, NgModule, NgZone, Optional, Output, Renderer2, TemplateRef, ViewChild, forwardRef, isDevMode } from '@angular/core';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { Keys, hasObservers, isDocumentAvailable } from '@progress/kendo-angular-common';
import { POPUP_CONTAINER, PopupModule, PopupService } from '@progress/kendo-angular-popup';
import { CommonModule } from '@angular/common';

var PARENT_REGEX = /_?\d+$/;
var SEPARATOR = '_';
var id = 0;
var itemIndexComparer = function (a, b) { return a.siblingIndex - b.siblingIndex; };
var next = function (idx, items, dir) {
    var current = items[idx + dir];
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
var ItemsService = /** @class */ (function () {
    function ItemsService() {
        this.items = {};
        this.lists = [];
        this.idPrefix = "k-menu" + id++;
    }
    Object.defineProperty(ItemsService.prototype, "hasItems", {
        get: function () {
            return Object.keys(this.items).length > 0;
        },
        enumerable: true,
        configurable: true
    });
    ItemsService.prototype.childId = function (index) {
        return this.idPrefix + "-child" + index;
    };
    ItemsService.prototype.itemIndex = function (parentIndex, index) {
        return (parentIndex ? parentIndex + SEPARATOR : '') + index;
    };
    ItemsService.prototype.get = function (index) {
        return this.items[index];
    };
    ItemsService.prototype.add = function (item) {
        this.items[item.index] = item;
    };
    ItemsService.prototype.remove = function (item) {
        delete this.items[item.index];
    };
    ItemsService.prototype.addList = function (list) {
        this.lists.push(list);
    };
    ItemsService.prototype.removeList = function (list) {
        var index = this.lists.indexOf(list);
        if (index >= 0) {
            this.lists.splice(index, 1);
        }
    };
    ItemsService.prototype.containsList = function (element) {
        return Boolean(this.lists.find(function (list) { return list.element.nativeElement === element; }));
    };
    ItemsService.prototype.siblings = function (item) {
        var _this = this;
        var parentIndex = this.parentIndex(item.index);
        return this.filter(function (index) { return _this.parentIndex(index) === parentIndex; });
    };
    ItemsService.prototype.otherSiblings = function (item) {
        var _this = this;
        var parentIndex = this.parentIndex(item.index);
        return this.filter(function (index) { return _this.parentIndex(index) === parentIndex && index !== item.index; });
    };
    ItemsService.prototype.children = function (item) {
        var _this = this;
        return this.filter(function (index) { return _this.parentIndex(index) === item.index; });
    };
    ItemsService.prototype.parent = function (item) {
        return this.items[this.parentIndex(item.index)];
    };
    ItemsService.prototype.root = function (item) {
        return this.items[this.indices(item.index)[0]];
    };
    ItemsService.prototype.indices = function (index) {
        return index.split(SEPARATOR);
    };
    ItemsService.prototype.filter = function (predicate) {
        var result = [];
        var items = this.items;
        for (var index in items) {
            if (predicate(index, items[index])) {
                result.push(items[index]);
            }
        }
        return result.sort(itemIndexComparer);
    };
    ItemsService.prototype.previous = function (item) {
        var siblings = this.siblings(item);
        var itemIndex = siblings.indexOf(item);
        return next(itemIndex, siblings, -1);
    };
    ItemsService.prototype.next = function (item) {
        var siblings = this.siblings(item);
        var itemIndex = siblings.indexOf(item);
        return next(itemIndex, siblings, 1);
    };
    ItemsService.prototype.hasParent = function (item, parent) {
        return item.index.startsWith(parent.index);
    };
    ItemsService.prototype.areSiblings = function (item1, item2) {
        return item1 !== item2 && this.parent(item1) === this.parent(item2);
    };
    ItemsService.prototype.forEach = function (callback) {
        var items = this.items;
        for (var index in items) {
            if (items.hasOwnProperty(index)) {
                callback(items[index]);
            }
        }
    };
    ItemsService.prototype.parentIndex = function (index) {
        return index.replace(PARENT_REGEX, '');
    };
    ItemsService.decorators = [
        { type: Injectable },
    ];
    return ItemsService;
}());

/**
 * @hidden
 */
var PreventableEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function PreventableEvent(args) {
        this.prevented = false;
        Object.assign(this, args);
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses
     * the built-in behavior that follows the event.
     */
    PreventableEvent.prototype.preventDefault = function () {
        this.prevented = true;
    };
    /**
     * Returns `true` if the event was prevented
     * by any of its subscribers.
     *
     * @returns `true` if the default action was prevented.
     * Otherwise, returns `false`.
     */
    PreventableEvent.prototype.isDefaultPrevented = function () {
        return this.prevented;
    };
    return PreventableEvent;
}());

/**
 * Arguments for the `open` and `close` events of the Menu.
 */
var MenuEvent = /** @class */ (function (_super) {
    __extends(MenuEvent, _super);
    function MenuEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MenuEvent;
}(PreventableEvent));

var canPerformAction = function (item, action) {
    return !((action === 'open' && item.opened) || (action === 'close' && !item.opened));
};
/**
 * @hidden
 */
var ActionsService = /** @class */ (function () {
    function ActionsService(ngZone, items) {
        this.ngZone = ngZone;
        this.items = items;
        this.actions = [];
    }
    ActionsService.prototype.open = function (item, finished) {
        if (item.disabled) {
            return;
        }
        if (item.hasContent && !item.opened) {
            this.actions.push({
                name: 'open',
                requiresZone: item.hasContentTemplates(),
                item: item,
                finished: finished
            });
        }
        else if (finished) {
            finished();
        }
    };
    ActionsService.prototype.close = function (item) {
        this.closeChildren(item);
        this.closeItem(item);
    };
    ActionsService.prototype.closeItem = function (item) {
        if (item.opened) {
            this.actions.push({
                name: 'close',
                item: item
            });
        }
    };
    ActionsService.prototype.closeToRoot = function (item) {
        this.closeChildren(item);
        var current = item;
        do {
            this.closeItem(current);
            current = this.items.parent(current);
        } while (current);
    };
    ActionsService.prototype.closeOthers = function (item) {
        this.closeChildren(item);
        var current = item;
        while (current) {
            var siblings = this.items.otherSiblings(current);
            this.closeItems(siblings);
            current = this.items.parent(current);
        }
    };
    ActionsService.prototype.closeAll = function () {
        var _this = this;
        this.items.forEach(function (item) {
            if (item.opened && item.level === 0) {
                _this.close(item);
            }
        });
    };
    ActionsService.prototype.select = function (item, domEvent, prevented, finished) {
        this.actions.push({
            name: 'select',
            item: item,
            prevented: prevented,
            finished: finished,
            domEvent: domEvent
        });
    };
    ActionsService.prototype.emit = function (name, item, domEvent) {
        var owner = this.owner;
        var eventArgs = new MenuEvent({
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
    };
    Object.defineProperty(ActionsService.prototype, "hasPending", {
        get: function () {
            return this.actions.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    ActionsService.prototype.execute = function (toExecute) {
        var _this = this;
        if (!this.hasPending && !toExecute) {
            return;
        }
        var actions = toExecute || this.clear();
        if (!NgZone.isInAngularZone() && this.requiresZone(actions)) {
            this.ngZone.run(function () {
                _this.executeActions(actions);
            });
        }
        else {
            this.executeActions(actions);
        }
    };
    ActionsService.prototype.clear = function () {
        var actions = this.actions;
        this.actions = [];
        return actions;
    };
    ActionsService.prototype.executeActions = function (actions) {
        for (var idx = 0; idx < actions.length; idx++) {
            var _a = actions[idx], item = _a.item, name_1 = _a.name, prevented = _a.prevented, finished = _a.finished, domEvent = _a.domEvent;
            if (!canPerformAction(item, name_1)) {
                continue;
            }
            if (!this.emit(name_1, item, domEvent)) {
                if (item[name_1]) {
                    item[name_1]();
                }
                if (finished) {
                    finished();
                }
            }
            else if (prevented) {
                prevented();
            }
        }
    };
    ActionsService.prototype.requiresZone = function (toExecute) {
        var actions = toExecute || this.actions;
        var owner = this.owner;
        var contextService = owner.contextService;
        for (var idx = 0; idx < actions.length; idx++) {
            var action = actions[idx];
            var name_2 = action.name;
            if (action.requiresZone || (name_2 && (hasObservers(owner[name_2]) || (contextService && contextService.hasObservers(name_2))))) {
                return true;
            }
        }
        return false;
    };
    ActionsService.prototype.closeChildren = function (item) {
        if (!item.opened) {
            return;
        }
        var children = this.items.children(item);
        this.closeItems(children);
    };
    ActionsService.prototype.closeItems = function (items) {
        for (var idx = 0; idx < items.length; idx++) {
            this.close(items[idx]);
        }
    };
    ActionsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ActionsService.ctorParameters = function () { return [
        { type: NgZone },
        { type: ItemsService }
    ]; };
    return ActionsService;
}());

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

var DISABLE_OPEN_ON_OVER_DELAY = 500;
/**
 * @hidden
 */
var HoverService = /** @class */ (function () {
    function HoverService(actions, items) {
        this.actions = actions;
        this.items = items;
        this.delay = 100;
        this._openOnOver = true;
        this.scheduled = [];
    }
    Object.defineProperty(HoverService.prototype, "openOnOver", {
        get: function () {
            return this._openOnOver;
        },
        set: function (value) {
            this.cancelActions();
            this._openOnOver = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HoverService.prototype, "hovered", {
        get: function () {
            return this.items.get(this.hoveredIdx);
        },
        set: function (item) {
            this.hoveredIdx = item ? item.index : null;
        },
        enumerable: true,
        configurable: true
    });
    HoverService.prototype.ngOnDestroy = function () {
        this.cancelActions();
    };
    HoverService.prototype.over = function (item) {
        var _this = this;
        this.cancelActions(function (action) { return action.name === 'openOnOver'; });
        if (!this.hovered || this.hovered !== item) {
            this.actions.closeOthers(item);
            this.hovered = item;
            if ((item.level > 0 || this.openOnOver) && !item.disabled) {
                this.actions.open(item);
                this.cancelActions(function (action) {
                    return (action.name === 'close' && (item === action.item || _this.items.hasParent(item, action.item))) ||
                        (action.name === 'open' && !_this.items.hasParent(item, action.item));
                });
            }
            this.scheduleActions();
        }
    };
    HoverService.prototype.leave = function (disableOpenOnOver) {
        var hovered = this.hovered;
        if (hovered) {
            this.actions.closeToRoot(hovered);
            this.cancelActions(function (action) { return action.name === 'open'; });
            this.scheduleActions();
        }
        if (disableOpenOnOver && this._openOnOver) {
            this.scheduleDisableOpenOnOver();
        }
        this.hovered = null;
    };
    HoverService.prototype.closeCurrent = function () {
        var hovered = this.hovered;
        if (hovered) {
            this.actions.closeToRoot(hovered);
            this.hovered = null;
        }
    };
    HoverService.prototype.scheduleActions = function () {
        var _this = this;
        if (this.actions.hasPending) {
            var item_1 = {};
            item_1.actions = this.actions.clear();
            item_1.id = setTimeout(function () {
                _this.actions.execute(item_1.actions);
                _this.removeScheduled(item_1);
            }, this.delay);
            this.scheduled.push(item_1);
        }
    };
    HoverService.prototype.scheduleDisableOpenOnOver = function () {
        var _this = this;
        var item = {
            actions: [{ name: 'openOnOver' }]
        };
        item.id = setTimeout(function () {
            _this._openOnOver = false;
            _this.removeScheduled(item);
        }, Math.max(this.delay, DISABLE_OPEN_ON_OVER_DELAY));
        this.scheduled.push(item);
    };
    HoverService.prototype.removeScheduled = function (item) {
        var scheduled = this.scheduled;
        for (var idx = 0; idx < scheduled.length; idx++) {
            if (scheduled[idx] === item) {
                scheduled.splice(idx, 1);
                return;
            }
        }
    };
    HoverService.prototype.cancelActions = function (predicate) {
        var scheduled = this.scheduled;
        for (var idx = scheduled.length - 1; idx >= 0; idx--) {
            var item = scheduled[idx];
            var actions = item.actions;
            if (predicate) {
                for (var actionIdx = actions.length - 1; actionIdx >= 0; actionIdx--) {
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
    };
    HoverService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HoverService.ctorParameters = function () { return [
        { type: ActionsService },
        { type: ItemsService }
    ]; };
    return HoverService;
}());

/* tslint:disable:max-line-length */
/**
 * @hidden
 */
var normalize = function (settings) {
    return settings && Object.assign({
        toggle: 'select'
    }, settings);
};

/**
 * @hidden
 */
var NODE_INDEX = 'data-kendo-menu-index';

var DEFAULT_ID = 'kendo-matches-container';
var focusableRegex = /^(?:a|input|select|option|textarea|button|object)$/i;
var matches = function (element, selector) { return (element.matches || element.msMatchesSelector).call(element, selector); };
/**
 * @hidden
 */
var closest = function (node, predicate) {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};
/**
 * @hidden
 */
var closestInScope = function (node, predicate, scope) {
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
var isFocusable = function (element) {
    if (element.tagName) {
        var tagName = element.tagName.toLowerCase();
        var tabIndex = element.getAttribute('tabIndex');
        var skipTab = tabIndex === '-1';
        var focusable = tabIndex !== null && !skipTab;
        if (focusableRegex.test(tagName)) {
            focusable = !element.disabled && !skipTab;
        }
        return focusable;
    }
    return false;
};
var toClassList = function (classNames) { return String(classNames).trim().split(' '); };
/**
 * @hidden
 */
var hasClass = function (element, name) {
    return toClassList(element.className).indexOf(name) >= 0;
};
/**
 * @hidden
 */
var matchesClasses = function (classes) {
    var list = toClassList(classes);
    return function (element) {
        var classList = toClassList(element.className);
        return Boolean(list.find(function (name) { return classList.indexOf(name) >= 0; }));
    };
};
/**
 * @hidden
 */
var nodeIndex = function (node) { return node.getAttribute(NODE_INDEX); };
/**
 * @hidden
 */
var closestItem = function (node, scope) { return closestInScope(node, nodeIndex, scope); };
/**
 * @hidden
 */
var closestList = function (node) {
    var list = closest(node, matchesClasses('k-menu-popup k-menu k-menu-group'));
    if (list && hasClass(list, 'k-menu-popup')) {
        list = list.querySelector('.k-menu-group');
    }
    return list;
};
/**
 * @hidden
 */
var inMenu = function (node, itemsService) {
    if (node === itemsService.lists[0].element.nativeElement) {
        return false;
    }
    var list = closestList(node);
    return list && itemsService.containsList(list);
};
/**
 * @hidden
 */
var findInContainer = function (element, selector, container) {
    var id = container.getAttribute('id');
    if (!id) {
        container.setAttribute('id', DEFAULT_ID);
    }
    var contextSelector = "#" + (id || DEFAULT_ID) + " " + selector;
    var match = closestInScope(element, function (node) { return matches(node, contextSelector); }, container);
    if (!id) {
        container.removeAttribute('id');
    }
    return match;
};

/**
 * @hidden
 */
var ContextMenuService = /** @class */ (function () {
    function ContextMenuService() {
        this.keydown = new EventEmitter();
    }
    ContextMenuService.prototype.emit = function (name, args) {
        this.owner.emitMenuEvent(name, args);
    };
    ContextMenuService.prototype.hasObservers = function (name) {
        return this.owner && hasObservers(this.owner[name]);
    };
    ContextMenuService.prototype.leaveMenu = function (e) {
        return this.items ? !inMenu(e.target, this.items) : true;
    };
    ContextMenuService.decorators = [
        { type: Injectable },
    ];
    return ContextMenuService;
}());

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
var ItemTemplateDirective = /** @class */ (function () {
    function ItemTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ItemTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoMenuItemTemplate]'
                },] },
    ];
    /** @nocollapse */
    ItemTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return ItemTemplateDirective;
}());

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
var ItemLinkTemplateDirective = /** @class */ (function () {
    function ItemLinkTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ItemLinkTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoMenuItemLinkTemplate]'
                },] },
    ];
    /** @nocollapse */
    ItemLinkTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return ItemLinkTemplateDirective;
}());

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
var ItemContentTemplateDirective = /** @class */ (function () {
    function ItemContentTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ItemContentTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoMenuItemContentTemplate]'
                },] },
    ];
    /** @nocollapse */
    ItemContentTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return ItemContentTemplateDirective;
}());

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
var MenuItemComponent = /** @class */ (function () {
    function MenuItemComponent() {
    }
    Object.defineProperty(MenuItemComponent.prototype, "template", {
        /**
         * @hidden
         */
        get: function () {
            if (this.itemTemplate && this.itemTemplate.length) {
                return this.itemTemplate.first.templateRef;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItemComponent.prototype, "linkTemplate", {
        /**
         * @hidden
         */
        get: function () {
            if (this.itemLinkTemplate && this.itemLinkTemplate.length) {
                return this.itemLinkTemplate.first.templateRef;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItemComponent.prototype, "contentTemplate", {
        /**
         * @hidden
         */
        get: function () {
            if (this.itemContentTemplate && this.itemContentTemplate.length) {
                return this.itemContentTemplate.first.templateRef;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuItemComponent.prototype, "items", {
        /**
         * @hidden
         */
        get: function () {
            if (this.children.length) {
                return this.children.toArray().slice(1);
            }
        },
        enumerable: true,
        configurable: true
    });
    MenuItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-menu-item',
                    template: ""
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
    return MenuItemComponent;
}());

/**
 * @hidden
 */
var MenuBase = /** @class */ (function () {
    function MenuBase() {
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
    Object.defineProperty(MenuBase.prototype, "rootItems", {
        /**
         * @hidden
         */
        get: function () {
            return this.items || (this.children ? this.children.toArray() : []);
        },
        enumerable: true,
        configurable: true
    });
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
    return MenuBase;
}());

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
var MenuComponent = /** @class */ (function (_super) {
    __extends(MenuComponent, _super);
    function MenuComponent(itemsService, hover, actions, navigation, localization, ngZone, renderer, contextService) {
        var _this = _super.call(this) || this;
        _this.itemsService = itemsService;
        _this.hover = hover;
        _this.actions = actions;
        _this.navigation = navigation;
        _this.localization = localization;
        _this.ngZone = ngZone;
        _this.renderer = renderer;
        _this.contextService = contextService;
        /**
         * Fires when a Menu item is selected ([see example]({% slug routing_menu %})).
         */
        _this.select = new EventEmitter();
        /**
         * Fires when a Menu item is opened.
         */
        _this.open = new EventEmitter();
        /**
         * Fires when a Menu item is closed.
         */
        _this.close = new EventEmitter();
        _this.actions.owner = _this;
        if (contextService) {
            contextService.items = _this.itemsService;
            _this.contextKeyDownSubscription = contextService.keydown.subscribe(_this.contextKeyDown.bind(_this));
        }
        return _this;
    }
    Object.defineProperty(MenuComponent.prototype, "ariaOrientation", {
        /**
         * @hidden
         */
        get: function () {
            if (this.vertical) {
                return 'vertical';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuComponent.prototype, "contextMenuClass", {
        /**
         * @hidden
         */
        get: function () {
            return Boolean(this.contextService);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuComponent.prototype, "direction", {
        get: function () {
            return this.rtl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuComponent.prototype, "rtl", {
        get: function () {
            return this.localization.rtl;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens or closes the specified Menu items.
     *
     * @param open - A Boolean value which indicates if the items will be opened or closed.
     * @param indices - One or more values which represent the hierarchical indices of the items that will be opened or closed.
     */
    MenuComponent.prototype.toggle = function (open) {
        var indices = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            indices[_i - 1] = arguments[_i];
        }
        for (var idx = 0; idx < indices.length; idx++) {
            var item = this.itemsService.get(indices[idx]);
            if (item && !item.disabled) {
                if (open) {
                    item.open();
                }
                else {
                    item.close();
                }
            }
        }
    };
    /**
     * @hidden
     */
    MenuComponent.prototype.focus = function (index) {
        this.navigation.focusIndex(index);
    };
    MenuComponent.prototype.ngOnChanges = function (changes) {
        this.navigation.vertical = this.vertical;
        this.hover.delay = this.hoverDelay;
        if (changes.openOnClick) {
            var openOnClick = this.openOnClick = normalize(this.openOnClick);
            this.hover.openOnOver = !openOnClick;
            if (openOnClick && openOnClick.toggle === 'click') {
                this.attachCloseClick();
            }
            else {
                this.unsubscribeClick();
            }
        }
    };
    MenuComponent.prototype.ngAfterViewChecked = function () {
        this.navigation.updateActive();
    };
    MenuComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeClick();
        if (this.contextService) {
            this.contextService.items = null;
            this.contextKeyDownSubscription.unsubscribe();
        }
    };
    MenuComponent.prototype.attachCloseClick = function () {
        var _this = this;
        if (!this.closeClickSubscription && isDocumentAvailable()) {
            this.ngZone.runOutsideAngular(function () {
                _this.closeClickSubscription = _this.renderer.listen('document', 'click', function (e) {
                    if (!inMenu(e.target, _this.itemsService)) {
                        _this.hover.openOnOver = false;
                        _this.actions.closeAll();
                        _this.actions.execute();
                    }
                });
            });
        }
    };
    MenuComponent.prototype.unsubscribeClick = function () {
        if (this.closeClickSubscription) {
            this.closeClickSubscription();
        }
    };
    MenuComponent.prototype.contextKeyDown = function (e) {
        if (!this.itemsService.hasItems) {
            return;
        }
        var keyCode = e.keyCode;
        var rtl = this.localization.rtl;
        var first = keyCode === Keys.ArrowDown || keyCode === Keys.ArrowRight;
        var last = keyCode === Keys.ArrowUp || keyCode === Keys.ArrowLeft;
        var index;
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
    };
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
                            useExisting: forwardRef(function () { return MenuComponent; })
                        }
                    ],
                    selector: 'kendo-menu',
                    template: "\n        <ul role=\"menubar\"\n            [attr.aria-orientation]=\"ariaOrientation\"\n            kendoMenuList [items]=\"rootItems\" [level]=\"0\" class=\"k-widget k-reset k-header k-menu\"\n            [vertical]=\"vertical\" [rtl]=\"rtl\" [animate]=\"animate\" [openOnClick]=\"openOnClick\"\n            [itemTemplate]=\"itemTemplate.first?.templateRef || menuItemTemplate\"\n            [itemLinkTemplate]=\"itemLinkTemplate.first?.templateRef || menuItemLinkTemplate\"\n            [class.k-menu-horizontal]=\"!vertical\"\n            [class.k-menu-vertical]=\"vertical\"\n            [class.k-context-menu]=\"contextMenuClass\">\n        </ul>\n    "
                },] },
    ];
    /** @nocollapse */
    MenuComponent.ctorParameters = function () { return [
        { type: ItemsService },
        { type: HoverService },
        { type: ActionsService },
        { type: NavigationService },
        { type: LocalizationService },
        { type: NgZone },
        { type: Renderer2 },
        { type: ContextMenuService, decorators: [{ type: Optional }] }
    ]; };
    MenuComponent.propDecorators = {
        menuItemTemplate: [{ type: Input }],
        menuItemLinkTemplate: [{ type: Input }],
        select: [{ type: Output }],
        open: [{ type: Output }],
        close: [{ type: Output }],
        direction: [{ type: HostBinding, args: ['class.k-rtl',] }]
    };
    return MenuComponent;
}(MenuBase));

/* tslint:disable:component-selector */
/**
 * @hidden
 */
var ListComponent = /** @class */ (function () {
    function ListComponent(itemsService, hover, actions, navigation, renderer, ngZone, element) {
        this.itemsService = itemsService;
        this.hover = hover;
        this.actions = actions;
        this.navigation = navigation;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.element = element;
        this.animate = true;
    }
    ListComponent.prototype.hierarchyIndex = function (index) {
        return this.itemsService.itemIndex(this.index, index);
    };
    ListComponent.prototype.ngOnInit = function () {
        this.itemsService.addList(this);
        this.initDomEvents();
    };
    ListComponent.prototype.ngOnDestroy = function () {
        this.itemsService.removeList(this);
        if (this.domSubscriptions) {
            this.domSubscriptions();
        }
    };
    ListComponent.prototype.initDomEvents = function () {
        var _this = this;
        if (!this.element) {
            return;
        }
        this.ngZone.runOutsideAngular(function () {
            var element = _this.element.nativeElement;
            var container = _this.level > 0 ? closest(element, function (node) { return hasClass(node, 'k-menu-popup'); }) : element;
            var overSubscription = _this.renderer.listen(element, 'mouseover', function (e) {
                if (e.target === element && _this.level === 0) {
                    _this.onLeave();
                }
                else {
                    var item = _this.nodeItem(e.target) || _this.itemsService.get(_this.index);
                    if (item && !(_this.openOnClick && _this.openOnClick.toggle === 'click' && item.level === 0 && !item.hasContent)) {
                        _this.hover.over(item);
                    }
                }
            });
            var leaveSubscription = _this.renderer.listen(container, 'mouseleave', function (e) {
                if (_this.leavesMenu(e)) {
                    _this.onLeave();
                }
            });
            var keydownSubscription = _this.renderer.listen(element, 'keydown', function (e) {
                if (hasClass(e.target, 'k-menu-item')) {
                    _this.navigation.keydown(e);
                }
            });
            var blurSubscription = _this.renderer.listen(element, 'focusout', function (e) {
                if (_this.leavesMenu(e)) {
                    _this.navigation.focusLeave();
                }
            });
            var clickSubscription = _this.renderer.listen(element, 'click', _this.clickHandler.bind(_this));
            _this.domSubscriptions = function () {
                overSubscription();
                leaveSubscription();
                keydownSubscription();
                blurSubscription();
                clickSubscription();
            };
        });
    };
    ListComponent.prototype.leavesMenu = function (e) {
        if (!e.relatedTarget) {
            return true;
        }
        return !inMenu(e.relatedTarget, this.itemsService);
    };
    ListComponent.prototype.onLeave = function () {
        var openOnClick = this.openOnClick;
        if (!openOnClick || openOnClick.toggle !== 'click') {
            this.hover.leave(openOnClick && openOnClick.toggle === 'leave');
        }
    };
    ListComponent.prototype.nodeItem = function (target) {
        var node = closestItem(target, this.element.nativeElement);
        if (node) {
            var index = nodeIndex(node);
            return this.itemsService.get(index);
        }
    };
    ListComponent.prototype.clickHandler = function (e) {
        if (isFocusable(e.target) && !hasClass(e.target, 'k-menu-item')) {
            return;
        }
        var item = this.nodeItem(e.target);
        if (!item || item.isContent || item.navigating) {
            return;
        }
        if (item.disabled) {
            e.preventDefault();
            return;
        }
        this.actions.select(item, e, function () {
            e.preventDefault();
        });
        this.navigation.focus(item);
        if (item.level > 0 && !item.hasContent) {
            this.actions.closeToRoot(item);
        }
        if (this.openOnClick) {
            var hover = this.hover;
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
    };
    ListComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoMenuList]',
                    template: "\n        <ng-container *ngFor=\"let item of items; let idx = index\">\n            <li *ngIf=\"!item.separator\" kendoMenuItem\n                [item]=\"item\" [level]=\"level\" [vertical]=\"vertical\" [animate]=\"animate\" [rtl]=\"rtl\"\n                [itemTemplate]=\"itemTemplate\" [itemLinkTemplate]=\"itemLinkTemplate\" [openOnClick]=\"openOnClick\"\n                [index]=\"hierarchyIndex(idx)\" [siblingIndex]=\"idx\" [attr." + NODE_INDEX + "]=\"hierarchyIndex(idx)\"\n                [ngClass]=\"item.cssClass\" [ngStyle]=\"item.cssStyle\"\n                role=\"menuitem\"\n                class=\"k-item k-menu-item\"\n                [class.k-first]=\"idx === 0\" [class.k-last]=\"idx === items.length - 1\"\n                [class.k-state-disabled]=\"item.disabled\"></li>\n            <li *ngIf=\"item.separator\" class=\"k-separator k-item\"\n                role=\"separator\" [ngClass]=\"item.cssClass\" [ngStyle]=\"item.cssStyle\">\n                &nbsp;\n            </li>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    ListComponent.ctorParameters = function () { return [
        { type: ItemsService },
        { type: HoverService },
        { type: ActionsService },
        { type: NavigationService },
        { type: Renderer2 },
        { type: NgZone },
        { type: ElementRef }
    ]; };
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
    return ListComponent;
}());

var POPUP_ALIGN = {
    vertical: 'top',
    horizontal: 'left'
};
var POPUP_ALIGN_RTL = {
    vertical: 'top',
    horizontal: 'right'
};
var VERTICAL_COLLISION = {
    vertical: 'flip',
    horizontal: 'fit'
};
var HORIZONTAL_COLLISION = {
    vertical: 'fit',
    horizontal: 'flip'
};
/**
 * @hidden
 */
var POPUP_SETTINGS_RTL = {
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
var POPUP_SETTINGS = {
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
var defined = function (value) { return typeof value !== 'undefined'; };
/**
 * @hidden
 */
var bodyFactory = function () {
    if (isDocumentAvailable()) {
        return new ElementRef(document.body);
    }
};

var ɵ0$3 = bodyFactory;
/* tslint:disable:component-selector */
/**
 * @hidden
 */
var ItemComponent = /** @class */ (function () {
    function ItemComponent(itemsService, navigation, changeDetector, renderer, popupService, element) {
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
    Object.defineProperty(ItemComponent.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (index) {
            if (this._index && this._index !== index) {
                this.itemsService.remove(this);
                this._index = index;
                this.itemsService.add(this);
            }
            else {
                this._index = index;
            }
            this.childId = this.itemsService.childId(index);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "disabled", {
        get: function () {
            return this.item.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "hasPopup", {
        get: function () {
            return this.hasContent ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "expanded", {
        get: function () {
            return this.hasContent ? this.opened : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "label", {
        get: function () {
            return this.item.text ? this.item.text : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "activeId", {
        get: function () {
            return this.index === this.navigation.activeIndex ? '0' : '-1';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "popupSettings", {
        get: function () {
            var settings = this.rtl ? POPUP_SETTINGS_RTL : POPUP_SETTINGS;
            return this.horizontal ? settings.horizontal : settings.vertical;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "horizontal", {
        get: function () {
            return this.vertical || this.level > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "hasLink", {
        get: function () {
            return Boolean(this.item.url);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "linkTemplate", {
        get: function () {
            return this.item.linkTemplate || this.itemLinkTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "hasContent", {
        get: function () {
            var items = this.item.items;
            return items && items.length || this.item.contentTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "isContent", {
        get: function () {
            return Boolean(this.item.content);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "iconClass", {
        get: function () {
            return "k-i-" + this.item.icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "children", {
        get: function () {
            var item = this.item;
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "template", {
        get: function () {
            return this.item.template || this.itemTemplate;
        },
        enumerable: true,
        configurable: true
    });
    ItemComponent.prototype.hasContentTemplates = function () {
        var item = this.item;
        return this.itemTemplate || item.contentTemplate || this.itemLinkTemplate ||
            (item.items && item.items.find(function (current) { return current.template || current.linkTemplate; }));
    };
    ItemComponent.prototype.ngOnInit = function () {
        this.itemsService.add(this);
    };
    ItemComponent.prototype.ngOnDestroy = function () {
        this.itemsService.remove(this);
        this.destroyed = true;
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    ItemComponent.prototype.focus = function () {
        this.element.nativeElement.focus();
    };
    ItemComponent.prototype.toggleActive = function (isActive) {
        if (isActive) {
            this.setAttribute('tabindex', '0');
        }
        else {
            this.setAttribute('tabindex', '-1');
        }
    };
    ItemComponent.prototype.open = function () {
        if (!this.destroyed && this.hasContent && !this.opened) {
            var popupSettings = this.popupSettings;
            var animate = this.animate ? Object.assign({}, this.animate, {
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
    };
    ItemComponent.prototype.close = function () {
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
    };
    ItemComponent.prototype.navigate = function () {
        var link;
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
    };
    ItemComponent.prototype.setAttribute = function (name, value) {
        this.renderer.setAttribute(this.element.nativeElement, name, value);
    };
    ItemComponent.decorators = [
        { type: Component, args: [{
                    providers: [PopupService, {
                            provide: POPUP_CONTAINER,
                            useFactory: ɵ0$3
                        }],
                    selector: '[kendoMenuItem]',
                    template: "\n    <span *ngIf=\"!hasLink && !item.content && !linkTemplate\" class=\"k-link k-menu-link\" #link\n        [class.k-state-active]=\"opened\" role=\"presentation\">\n        <ng-template [ngTemplateOutlet]=\"itemcontent\">\n        </ng-template>\n    </span>\n    <a *ngIf=\"item.url && !linkTemplate\" class=\"k-link k-menu-link\" #link [attr.href]=\"item.url\"\n        [class.k-state-active]=\"opened\" tabindex=\"-1\" role=\"presentation\">\n        <ng-template [ngTemplateOutlet]=\"itemcontent\">\n        </ng-template>\n    </a>\n    <ng-template *ngIf=\"linkTemplate && !item.content\" [ngTemplateOutlet]=\"linkTemplate\"\n        [ngTemplateOutletContext]=\"{ item: item, index: index }\">\n    </ng-template>\n\n    <div class=\"k-content\" *ngIf=\"item.content\" role=\"presentation\">\n        <ng-template [ngTemplateOutlet]=\"item.content\" [ngTemplateOutletContext]=\"{ item: item.owner, index: item.ownerIndex }\">\n        </ng-template>\n    </div>\n\n    <ng-template #popupTemplate>\n        <ul kendoMenuList\n            [attr.id]=\"childId\"\n            [animate]=\"animate\"\n            [rtl]=\"rtl\"\n            [vertical]=\"vertical\"\n            [openOnClick]=\"openOnClick\"\n            [items]=\"children\"\n            [level]=\"level + 1\"\n            [index]=\"index\"\n            [itemTemplate]=\"itemTemplate\"\n            [itemLinkTemplate]=\"itemLinkTemplate\"\n            role=\"menu\"\n            class=\"k-group k-menu-group k-reset\">\n        </ul>\n    </ng-template>\n\n    <ng-template #itemcontent>\n        <span *ngIf=\"item.icon\" class=\"k-icon\" [ngClass]=\"iconClass\" role=\"presentation\"></span>\n        <ng-container *ngIf=\"!template\">\n            {{ item.text }}\n        </ng-container>\n        <ng-template *ngIf=\"template\" [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{ item: item, index: index }\">\n        </ng-template>\n        <span class=\"k-icon k-menu-expand-arrow\" *ngIf=\"hasContent\"\n            role=\"presentation\"\n            [class.k-i-arrow-60-down]=\"!horizontal\"\n            [class.k-i-arrow-60-right]=\"horizontal && !rtl\"\n            [class.k-i-arrow-60-left]=\"horizontal && rtl\">\n        </span>\n    </ng-template>\n  "
                },] },
    ];
    /** @nocollapse */
    ItemComponent.ctorParameters = function () { return [
        { type: ItemsService },
        { type: NavigationService },
        { type: ChangeDetectorRef },
        { type: Renderer2 },
        { type: PopupService },
        { type: ElementRef }
    ]; };
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
    return ItemComponent;
}());

/**
 * Represents a directive that can be used in the [`linkTemplate`]({% slug api_menu_itemlinktemplatedirective %})
 * of the items to apply the default styling and behavior.
 */
var LinkDirective = /** @class */ (function () {
    function LinkDirective(itemsService) {
        this.itemsService = itemsService;
        this.hostClasses = true;
        this.role = 'presentation';
        this.tabindex = '-1';
    }
    Object.defineProperty(LinkDirective.prototype, "activeClass", {
        get: function () {
            return this.item.opened;
        },
        enumerable: true,
        configurable: true
    });
    LinkDirective.prototype.ngOnInit = function () {
        if (isDevMode() && !this.index) {
            throw new Error('The kendoMenuItemLink directive requires the item index to be set.');
        }
        this.item = this.itemsService.get(this.index) || {};
    };
    LinkDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoMenuItemLink]'
                },] },
    ];
    /** @nocollapse */
    LinkDirective.ctorParameters = function () { return [
        { type: ItemsService }
    ]; };
    LinkDirective.propDecorators = {
        index: [{ type: Input, args: ['kendoMenuItemLink',] }],
        hostClasses: [{ type: HostBinding, args: ['class.k-link',] }, { type: HostBinding, args: ['class.k-menu-link',] }],
        role: [{ type: HostBinding, args: ['attr.role',] }],
        tabindex: [{ type: HostBinding, args: ['attr.tabindex',] }],
        activeClass: [{ type: HostBinding, args: ['class.k-state-active',] }]
    };
    return LinkDirective;
}());

/**
 * Represents a directive that can be used in the [`linkTemplate`]({% slug api_menu_itemlinktemplatedirective %})
 * of the items to render the default expand arrow.
 */
var ExpandArrowDirective = /** @class */ (function () {
    function ExpandArrowDirective(itemsService) {
        this.itemsService = itemsService;
        this.hostClasses = true;
        this.role = 'presentation';
    }
    Object.defineProperty(ExpandArrowDirective.prototype, "arrowDown", {
        get: function () {
            return !this.item.horizontal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpandArrowDirective.prototype, "arrowRight", {
        get: function () {
            return this.item.horizontal && !this.item.rtl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpandArrowDirective.prototype, "arrowLeft", {
        get: function () {
            return this.item.horizontal && this.item.rtl;
        },
        enumerable: true,
        configurable: true
    });
    ExpandArrowDirective.prototype.ngOnInit = function () {
        if (isDevMode() && !this.index) {
            throw new Error('The kendoMenuExpandArrow directive requires the item index to be set.');
        }
        this.item = this.itemsService.get(this.index) || {};
    };
    ExpandArrowDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoMenuExpandArrow]'
                },] },
    ];
    /** @nocollapse */
    ExpandArrowDirective.ctorParameters = function () { return [
        { type: ItemsService }
    ]; };
    ExpandArrowDirective.propDecorators = {
        index: [{ type: Input, args: ['kendoMenuExpandArrow',] }],
        hostClasses: [{ type: HostBinding, args: ['class.k-icon',] }, { type: HostBinding, args: ['class.k-menu-expand-arrow',] }],
        role: [{ type: HostBinding, args: ['attr.role',] }],
        arrowDown: [{ type: HostBinding, args: ['class.k-i-arrow-60-down',] }],
        arrowRight: [{ type: HostBinding, args: ['class.k-i-arrow-60-right',] }],
        arrowLeft: [{ type: HostBinding, args: ['class.k-i-arrow-60-left',] }]
    };
    return ExpandArrowDirective;
}());

/**
 * Arguments for the `select` event of the Menu.
 */
var MenuSelectEvent = /** @class */ (function (_super) {
    __extends(MenuSelectEvent, _super);
    function MenuSelectEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MenuSelectEvent;
}(MenuEvent));

var ITEM_FIELDS = ['textField', 'urlField', 'iconField', 'disabledField', 'cssClassField', 'cssStyleField', 'separatorField'];
/**
 * @hidden
 */
var BindingDirectiveBase = /** @class */ (function () {
    function BindingDirectiveBase(menu) {
        this.menu = menu;
    }
    BindingDirectiveBase.prototype.ngOnChanges = function () {
        this.rebind();
    };
    /**
     *  Rebinds the Menu items.
     */
    BindingDirectiveBase.prototype.rebind = function () {
        var fields = this.fields = [];
        for (var idx = 0; idx < ITEM_FIELDS.length; idx++) {
            var inputName = ITEM_FIELDS[idx];
            var inputValue = this[inputName];
            if (inputValue) {
                fields.push({ target: inputName.replace('Field', ''), source: inputValue });
            }
        }
        this.menu.items = this.data ? this.mapItems(this.data) : [];
    };
    return BindingDirectiveBase;
}());

var FIELD_REGEX = /\[(?:(\d+)|['"](.*?)['"])\]|((?:(?!\[.*?\]|\.).)+)/g;
var getterCache = {};
// tslint:disable-next-line:no-string-literal
getterCache['undefined'] = function (obj) { return obj; };
/**
 * @hidden
 */
var getter = function (field) {
    if (getterCache[field]) {
        return getterCache[field];
    }
    var fields = [];
    field.replace(FIELD_REGEX, function (_match, index, indexAccessor, name) {
        fields.push(index !== undefined ? index : (indexAccessor || name));
    });
    getterCache[field] = function (obj) {
        var result = obj;
        for (var idx = 0; idx < fields.length && result; idx++) {
            result = result[fields[idx]];
        }
        return result;
    };
    return getterCache[field];
};
/**
 * @hidden
 */
var last = function (arr) { return arr[arr.length - 1]; };

var getField = function (field, level) { return Array.isArray(field) ? field[level] || last(field) : field; };
/* tslint:disable:no-input-rename */
/**
 * A directive that converts the provided hierarchical data to [MenuItems]({% slug api_menu_menuitem %}) and binds them to the Menu.
 */
var HierarchyBindingDirective = /** @class */ (function (_super) {
    __extends(HierarchyBindingDirective, _super);
    function HierarchyBindingDirective(menu) {
        return _super.call(this, menu) || this;
    }
    HierarchyBindingDirective.prototype.mapItems = function (items, level) {
        var _this = this;
        if (level === void 0) { level = 0; }
        return items.map(function (item) {
            var menuItem = _this.createItem(item, level);
            var children = _this.getChildren(item, level);
            if (children) {
                menuItem.items = _this.mapItems(children, level + 1);
            }
            return menuItem;
        });
    };
    HierarchyBindingDirective.prototype.createItem = function (item, level) {
        var result = { data: item };
        var fields = this.fields;
        for (var idx = 0; idx < fields.length; idx++) {
            var _a = fields[idx], target = _a.target, source = _a.source;
            result[target] = getter(getField(source, level))(item);
        }
        return result;
    };
    HierarchyBindingDirective.prototype.getChildren = function (item, level) {
        if (this.childrenField) {
            var field = getField(this.childrenField, level);
            return item[field];
        }
    };
    HierarchyBindingDirective.decorators = [
        { type: Directive, args: [{
                    exportAs: 'kendoMenuHierarchyBinding',
                    selector: '[kendoMenuHierarchyBinding]'
                },] },
    ];
    /** @nocollapse */
    HierarchyBindingDirective.ctorParameters = function () { return [
        { type: MenuBase }
    ]; };
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
    return HierarchyBindingDirective;
}(BindingDirectiveBase));

/* tslint:disable:no-input-rename */
/**
 * A directive that converts the provided flat data to [MenuItems]({% slug api_menu_menuitem %}) and binds them to the Menu.
 */
var FlatBindingDirective = /** @class */ (function (_super) {
    __extends(FlatBindingDirective, _super);
    function FlatBindingDirective(menu) {
        return _super.call(this, menu) || this;
    }
    FlatBindingDirective.prototype.mapItems = function (items) {
        var _this = this;
        if (!this.idField || !this.parentIdField) {
            return items.map(function (item) { return _this.createItem(item); });
        }
        var result = [];
        var map = {};
        for (var idx = 0; idx < items.length; idx++) {
            var item = items[idx];
            var menuItem = this.createItem(item);
            var id = getter(this.idField)(item);
            var parentId = getter(this.parentIdField)(item);
            if (parentId === null || parentId === undefined) {
                result.push(menuItem);
            }
            else {
                var parent_1 = map[parentId] = map[parentId] || {};
                parent_1.items = parent_1.items || [];
                parent_1.items.push(menuItem);
            }
            if (map[id]) {
                menuItem.items = map[id].items;
            }
            map[id] = menuItem;
        }
        return result;
    };
    FlatBindingDirective.prototype.createItem = function (dataItem) {
        var result = { data: dataItem };
        var fields = this.fields;
        for (var idx = 0; idx < fields.length; idx++) {
            var _a = fields[idx], source = _a.source, target = _a.target;
            result[target] = getter(source)(dataItem);
        }
        return result;
    };
    FlatBindingDirective.decorators = [
        { type: Directive, args: [{
                    exportAs: 'kendoMenuFlatBinding',
                    selector: '[kendoMenuFlatBinding]'
                },] },
    ];
    /** @nocollapse */
    FlatBindingDirective.ctorParameters = function () { return [
        { type: MenuBase }
    ]; };
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
    return FlatBindingDirective;
}(BindingDirectiveBase));

var COMPONENT_EXPORTS = [
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
var COMPONENT_DIRECTIVES = COMPONENT_EXPORTS.concat([
    ListComponent,
    ItemComponent
]);
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
var MenuModule = /** @class */ (function () {
    function MenuModule() {
    }
    MenuModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_EXPORTS],
                    imports: [PopupModule, CommonModule]
                },] },
    ];
    return MenuModule;
}());

/**
 * Arguments for the `open` and `close` events of the ContextMenu.
 */
var ContextMenuEvent = /** @class */ (function () {
    function ContextMenuEvent() {
    }
    return ContextMenuEvent;
}());

/**
 * Arguments for the `select` event of the ContextMenu.
 */
var ContextMenuSelectEvent = /** @class */ (function (_super) {
    __extends(ContextMenuSelectEvent, _super);
    function ContextMenuSelectEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContextMenuSelectEvent;
}(ContextMenuEvent));

/**
 * Arguments for the `popupOpen` and `popupClose` events of the ContextMenu.
 */
var ContextMenuPopupEvent = /** @class */ (function (_super) {
    __extends(ContextMenuPopupEvent, _super);
    function ContextMenuPopupEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContextMenuPopupEvent;
}(PreventableEvent));

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
var ContextMenuTemplateDirective = /** @class */ (function () {
    function ContextMenuTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ContextMenuTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoContextMenuTemplate]'
                },] },
    ];
    /** @nocollapse */
    ContextMenuTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return ContextMenuTemplateDirective;
}());

/**
 * @hidden
 */
var ContextMenuItemsService = /** @class */ (function () {
    function ContextMenuItemsService(contextService) {
        this.contextService = contextService;
    }
    ContextMenuItemsService.prototype.get = function (index) {
        if (this.contextService.items) {
            return this.contextService.items.get(index);
        }
    };
    ContextMenuItemsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ContextMenuItemsService.ctorParameters = function () { return [
        { type: ContextMenuService }
    ]; };
    return ContextMenuItemsService;
}());

/**
 * @hidden
 */
var ContextMenuTargetService = /** @class */ (function () {
    function ContextMenuTargetService() {
        this.targets = [];
    }
    ContextMenuTargetService.prototype.add = function (target) {
        this.targets.push(target);
    };
    ContextMenuTargetService.prototype.remove = function (target) {
        var index = this.targets.indexOf(target);
        this.targets.splice(index, 1);
    };
    ContextMenuTargetService.prototype.find = function (targetElement) {
        return this.targets.find(function (target) { return target.element === targetElement; });
    };
    ContextMenuTargetService.decorators = [
        { type: Injectable },
    ];
    return ContextMenuTargetService;
}());

/**
 * Specifies a container for the [targets]({% slug api_menu_contextmenutargetdirective %}) of the ContextMenu.
 */
var ContextMenuTargetContainerDirective = /** @class */ (function () {
    /**
     * @hidden
     */
    function ContextMenuTargetContainerDirective(elementRef, targetService) {
        this.targetService = targetService;
        if (elementRef) {
            this.element = elementRef.nativeElement;
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
    ContextMenuTargetContainerDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ContextMenuTargetService }
    ]; };
    return ContextMenuTargetContainerDirective;
}());

/**
 * @hidden
 */
var TARGET_CLASS = 'k-contextmenu-target';
/**
 * Specifies a [target]({% slug api_menu_contextmenutargetdirective %}) for the ContextMenu
 * ([see example]({% slug target_contextmenu %}#toc-directives)).
 */
var ContextMenuTargetDirective = /** @class */ (function () {
    function ContextMenuTargetDirective(elementRef, targetService) {
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
    ContextMenuTargetDirective.prototype.ngOnDestroy = function () {
        this.targetService.remove(this);
    };
    ContextMenuTargetDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoContextMenuTarget]',
                    exportAs: 'kendoContextMenuTarget'
                },] },
    ];
    /** @nocollapse */
    ContextMenuTargetDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ContextMenuTargetService }
    ]; };
    ContextMenuTargetDirective.propDecorators = {
        data: [{ type: Input, args: ['kendoContextMenuTarget',] }],
        hostClass: [{ type: HostBinding, args: ["class." + TARGET_CLASS,] }]
    };
    return ContextMenuTargetDirective;
}());

var CONTEXT_MENU = 'contextmenu';
var DEFAULT_ANCHOR_ALIGN = { horizontal: 'left', vertical: 'bottom' };
var DEFAULT_POPUP_ALIGN = { horizontal: 'left', vertical: 'top' };
var DEFAULT_COLLISION = { horizontal: 'fit', vertical: 'flip' };
var preventDefault = function (e) { return e.preventDefault(); };
var ɵ1$2 = bodyFactory;
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
var ContextMenuComponent = /** @class */ (function (_super) {
    __extends(ContextMenuComponent, _super);
    function ContextMenuComponent(popupService, service, ngZone, renderer) {
        var _this = _super.call(this) || this;
        _this.popupService = popupService;
        _this.service = service;
        _this.ngZone = ngZone;
        _this.renderer = renderer;
        /**
         * Specifies the event on which the ContextMenu will open ([see example]({% slug showon_contextmenu %})).
         * Accepts the name of a native DOM event. Defaults to `contextmenu` which opens the ContextMenu for the target element.
         */
        _this.showOn = CONTEXT_MENU;
        /**
         * Indicates that the ContextMenu will be aligned to the target or to the `filter` element (if specified).
         */
        _this.alignToAnchor = false;
        /**
         * Specifies if the Menu will be vertically rendered ([see example]({% slug orientation_contextmenu %})).
         * @default true
         */
        _this.vertical = true;
        /**
         * Fires when the Menu is opened ([see example]({% slug target_contextmenu %}#toc-changing-items-for-specified-targets)).
         */
        _this.popupOpen = new EventEmitter();
        /**
         * Fires when the Menu is closed.
         */
        _this.popupClose = new EventEmitter();
        /**
         * Fires when a Menu item is selected.
         */
        _this.select = new EventEmitter();
        /**
         * Fires when a Menu item is opened.
         */
        _this.open = new EventEmitter();
        /**
         * Fires when a Menu item is closed.
         */
        _this.close = new EventEmitter();
        _this.service.owner = _this;
        _this.popupKeyDownHandler = _this.popupKeyDownHandler.bind(_this);
        return _this;
    }
    /**
     * Hides the ContextMenu.
     */
    ContextMenuComponent.prototype.hide = function () {
        this.removePopup();
    };
    /**
     * Shows the ContextMenu for the specified target.
     * @param target - The offset or the target element for which the ContextMenu will open.
     */
    ContextMenuComponent.prototype.show = function (target) {
        if (!target) {
            return;
        }
        var showTarget = target;
        this.removePopup();
        if (defined(showTarget.left) && defined(showTarget.top)) {
            this.createPopup({ offset: showTarget });
        }
        else {
            this.currentTarget = showTarget.nativeElement || showTarget;
            this.createPopup({ anchor: this.currentTarget });
        }
    };
    ContextMenuComponent.prototype.ngOnChanges = function (changes) {
        if (changes.target || changes.showOn) {
            this.bindShowHandler();
        }
    };
    ContextMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var closeClickSubscription = _this.renderer.listen('document', 'mousedown', function (e) {
                if (_this.popupRef && !closest(e.target, function (node) { return node === _this.popupRef.popupElement; }) && _this.service.leaveMenu(e)) {
                    _this.closePopup(e);
                }
            });
            var closeBlurSubscription = _this.renderer.listen('window', 'blur', function (e) {
                if (_this.popupRef) {
                    _this.closePopup(e);
                }
            });
            _this.closeSubscription = function () {
                closeClickSubscription();
                closeBlurSubscription();
            };
        });
    };
    ContextMenuComponent.prototype.ngOnDestroy = function () {
        if (this.closeSubscription) {
            this.closeSubscription();
            this.closeSubscription = null;
        }
        this.unbindShowHandler();
        this.removePopup();
    };
    /**
     * @hidden
     */
    ContextMenuComponent.prototype.emitMenuEvent = function (name, args) {
        args.target = this.currentTarget;
        args.sender = this;
        this[name].emit(args);
        if (name === 'select' && !args.hasContent) {
            this.closeAndFocus(args.originalEvent);
        }
    };
    ContextMenuComponent.prototype.bindShowHandler = function () {
        var _this = this;
        this.unbindShowHandler();
        this.ngZone.runOutsideAngular(function () {
            var element = _this.targetElement();
            if (!element) {
                return;
            }
            var eventName = _this.showOn || CONTEXT_MENU;
            _this.showSubscription = _this.renderer.listen(element, _this.showOn || CONTEXT_MENU, function (e) {
                _this.showContextMenu(e, element);
            });
            if (eventName === CONTEXT_MENU) {
                _this.keydownSubscription = _this.renderer.listen(element, 'keydown', function (e) {
                    if (e.shiftKey && e.keyCode === Keys.F10) {
                        _this.showContextMenu(e, element);
                    }
                });
            }
        });
    };
    ContextMenuComponent.prototype.showContextMenu = function (e, element) {
        var _this = this;
        var filter = this.targetFilter();
        var currentTarget = element;
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
        this.ngZone.run(function () {
            if (!_this.closePopup(e)) {
                _this.currentTarget = currentTarget;
                _this.openPopup(e);
            }
        });
    };
    ContextMenuComponent.prototype.unbindShowHandler = function () {
        if (this.showSubscription) {
            this.showSubscription();
            this.showSubscription = null;
        }
        if (this.keydownSubscription) {
            this.keydownSubscription();
            this.keydownSubscription = null;
        }
    };
    ContextMenuComponent.prototype.targetElement = function () {
        if (!isDocumentAvailable()) {
            return;
        }
        this.directiveTarget = false;
        var target = this.target;
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
    };
    ContextMenuComponent.prototype.targetFilter = function () {
        if (this.directiveTarget) {
            return "." + TARGET_CLASS;
        }
        return this.filter;
    };
    ContextMenuComponent.prototype.closePopup = function (e) {
        var _this = this;
        if (!this.popupRef) {
            return;
        }
        return this.popupAction('popupClose', e, function () {
            _this.removePopup();
        });
    };
    ContextMenuComponent.prototype.removePopup = function () {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
            this.currentTarget = null;
        }
        if (this.popupSubscriptions) {
            this.popupSubscriptions();
            this.popupSubscriptions = null;
        }
    };
    ContextMenuComponent.prototype.openPopup = function (e) {
        var _this = this;
        this.popupAction('popupOpen', e, function () {
            e.preventDefault();
            var anchor, offset;
            if (_this.alignToAnchor || e.type === 'keydown') {
                anchor = _this.currentTargetElement;
            }
            else {
                offset = { left: e.pageX, top: e.pageY };
            }
            _this.createPopup({ anchor: anchor, offset: offset });
        });
    };
    ContextMenuComponent.prototype.createPopup = function (options) {
        var _this = this;
        this.popupRef = this.popupService.open(Object.assign({
            animate: defined(this.popupAnimate) ? this.popupAnimate : true,
            appendTo: this.appendTo,
            collision: this.collision || DEFAULT_COLLISION,
            popupAlign: this.popupAlign || DEFAULT_POPUP_ALIGN,
            anchorAlign: this.anchorAlign || DEFAULT_ANCHOR_ALIGN,
            content: this.contentTemplate ? this.contentTemplate.templateRef : this.defaultContentTemplate
        }, options));
        var element = this.popupRef.popupElement;
        this.renderer.setAttribute(element, 'tabindex', '-1');
        this.renderer.setStyle(element, 'outline', '0'); //possibly move to styles
        if (this.ariaLabel) {
            this.renderer.setAttribute(element, 'aria-label', this.ariaLabel);
        }
        this.activeTarget = this.currentTargetElement === document.activeElement;
        this.ngZone.runOutsideAngular(function () {
            var unbindKeyDown = _this.renderer.listen(element, 'keydown', _this.popupKeyDownHandler);
            var unbindContextmenu = _this.renderer.listen(element, 'contextmenu', preventDefault);
            _this.popupSubscriptions = function () {
                unbindKeyDown();
                unbindContextmenu();
            };
        });
        element.focus();
    };
    ContextMenuComponent.prototype.closeAndFocus = function (e) {
        var currentTarget = this.currentTargetElement;
        if (!this.closePopup(e) && this.activeTarget) {
            currentTarget.focus();
        }
    };
    ContextMenuComponent.prototype.popupKeyDownHandler = function (e) {
        var element = this.popupRef.popupElement;
        if (e.keyCode === Keys.Escape && (hasClass(e.target, 'k-menu-item') || e.target === element)) {
            this.closeAndFocus(e);
        }
        else if (e.target === element) {
            this.service.keydown.emit(e);
        }
    };
    ContextMenuComponent.prototype.popupAction = function (name, originalEvent, callback) {
        var _this = this;
        var emitter = this[name];
        var prevented = false;
        if (hasObservers(emitter)) {
            this.ngZone.run(function () {
                var args = new ContextMenuPopupEvent({
                    originalEvent: originalEvent,
                    sender: _this,
                    target: _this.currentTarget
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
    };
    Object.defineProperty(ContextMenuComponent.prototype, "currentTargetElement", {
        get: function () {
            return this.directiveTarget && this.currentTarget ? this.currentTarget.element : this.currentTarget;
        },
        enumerable: true,
        configurable: true
    });
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
                            useExisting: forwardRef(function () { return ContextMenuComponent; })
                        },
                        PopupService,
                        {
                            provide: POPUP_CONTAINER,
                            useFactory: ɵ1$2
                        }
                    ],
                    selector: 'kendo-contextmenu',
                    template: "\n        <ng-template #default>\n            <kendo-menu [items]=\"rootItems\"\n                [vertical]=\"vertical\"\n                [openOnClick]=\"openOnClick\"\n                [hoverDelay]=\"hoverDelay\"\n                [animate]=\"animate\"\n                [menuItemTemplate]=\"itemTemplate.first?.templateRef\"\n                [menuItemLinkTemplate]=\"itemLinkTemplate.first?.templateRef\"\n                ></kendo-menu>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ContextMenuComponent.ctorParameters = function () { return [
        { type: PopupService },
        { type: ContextMenuService },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
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
    return ContextMenuComponent;
}(MenuBase));

var COMPONENT_DIRECTIVES$1 = [
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
var ContextMenuModule = /** @class */ (function () {
    function ContextMenuModule() {
    }
    ContextMenuModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES$1],
                    exports: [COMPONENT_DIRECTIVES$1, MenuModule],
                    imports: [PopupModule, CommonModule, MenuModule]
                },] },
    ];
    return ContextMenuModule;
}());

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
var MenusModule = /** @class */ (function () {
    function MenusModule() {
    }
    MenusModule.decorators = [
        { type: NgModule, args: [{
                    exports: [MenuModule, ContextMenuModule]
                },] },
    ];
    return MenusModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { NODE_INDEX, ContextMenuItemsService, ContextMenuTargetContainerDirective, ContextMenuTargetDirective, ContextMenuTargetService, BindingDirectiveBase, MenuBase, PreventableEvent, ActionsService, HoverService, ItemsService, NavigationService, bodyFactory, MenuComponent, ListComponent, ItemComponent, LinkDirective, ExpandArrowDirective, MenuItemComponent, MenuEvent, MenuSelectEvent, ItemContentTemplateDirective, ItemTemplateDirective, ItemLinkTemplateDirective, HierarchyBindingDirective, FlatBindingDirective, MenuModule, ContextMenuEvent, ContextMenuSelectEvent, ContextMenuPopupEvent, ContextMenuTemplateDirective, ContextMenuComponent, ContextMenuModule, ContextMenuService, MenusModule };
