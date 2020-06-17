import { Injectable } from '@angular/core';
import { ItemsService } from './items.service';
import { ActionsService } from './actions.service';
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
export { HoverService };
