import { NgZone, Injectable } from '@angular/core';
import { ItemsService } from './items.service';
import { MenuEvent } from '../menu-event';
import { hasObservers } from '@progress/kendo-angular-common';
var canPerformAction = function (item, action) {
    return !((action === 'open' && item.opened) || (action === 'close' && !item.opened));
};
var ɵ0 = canPerformAction;
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
export { ActionsService };
export { ɵ0 };
