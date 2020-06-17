import { Component, EventEmitter, forwardRef, HostBinding, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { ChatItem } from './chat-item';
// tslint:disable:no-forward-ref
/**
 * @hidden
 */
export class SuggestedActionsComponent extends ChatItem {
    constructor() {
        super(...arguments);
        this.dispatch = new EventEmitter();
        this.defaultClass = true;
        this.selectedIndex = 0;
        this.keyHandlers = {
            [37 /* left */]: (e) => this.navigateTo(e, -1),
            [39 /* right */]: (e) => this.navigateTo(e, 1),
            [13 /* enter */]: (_, action) => this.actionClick(action)
        };
    }
    isSelected(index) {
        return this.selected && this.selectedIndex === index;
    }
    actionClick(action) {
        this.dispatch.next(action);
    }
    actionKeydown(e, action) {
        const handler = this.keyHandlers[e.keyCode];
        if (handler) {
            handler(e, action);
        }
    }
    focus() {
        this.select(this.selectedIndex);
    }
    select(index) {
        this.selectedIndex = index;
        const item = this.items.toArray()[index];
        if (item) {
            item.nativeElement.focus();
        }
    }
    navigateTo(e, offset) {
        const prevIndex = this.selectedIndex;
        const nextIndex = Math.max(0, Math.min(prevIndex + offset, this.items.length - 1));
        if (nextIndex !== prevIndex) {
            this.select(nextIndex);
            e.preventDefault();
        }
    }
}
SuggestedActionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-chat-suggested-actions',
                providers: [{
                        provide: ChatItem,
                        useExisting: forwardRef(() => SuggestedActionsComponent)
                    }],
                template: `
    <span #item
      *ngFor="let action of actions; index as index; first as first; last as last"
      class="k-quick-reply"
      [class.k-state-selected]="isSelected(index)"
      [class.k-state-focused]="isSelected(index)"
      [class.k-first]="first"
      [class.k-last]="last"
      [attr.tabindex]="tabbable && selectedIndex === index ? '0' : '-1'"
      (click)="actionClick(action)"
      (keydown)="actionKeydown($event, action)"
    >
      {{ action.title || action.value }}
    </span>
  `
            },] },
];
SuggestedActionsComponent.propDecorators = {
    actions: [{ type: Input }],
    tabbable: [{ type: Input }],
    dispatch: [{ type: Output }],
    defaultClass: [{ type: HostBinding, args: ['class.k-quick-replies',] }],
    items: [{ type: ViewChildren, args: ['item',] }]
};
