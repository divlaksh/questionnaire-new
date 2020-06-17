import { NgZone, Injectable } from '@angular/core';
import { ItemsService } from './items.service';
import { MenuEvent } from '../menu-event';
import { hasObservers } from '@progress/kendo-angular-common';
const canPerformAction = (item, action) => !((action === 'open' && item.opened) || (action === 'close' && !item.opened));
const ɵ0 = canPerformAction;
/**
 * @hidden
 */
export class ActionsService {
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
export { ɵ0 };
