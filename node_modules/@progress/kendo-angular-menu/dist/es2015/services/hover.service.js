import { Injectable } from '@angular/core';
import { ItemsService } from './items.service';
import { ActionsService } from './actions.service';
const DISABLE_OPEN_ON_OVER_DELAY = 500;
/**
 * @hidden
 */
export class HoverService {
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
