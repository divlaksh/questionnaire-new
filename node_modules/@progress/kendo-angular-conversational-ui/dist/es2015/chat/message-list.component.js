import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { ExecuteActionEvent } from '../api/execute-action-event';
import { closest } from '../common/utils';
import { ChatItem } from './chat-item';
import { chatView, isAuthor } from './chat-view';
import { AttachmentTemplateDirective } from './chat.directives';
import { MessageTemplateDirective } from './message-template.directive';
import { IntlService } from '@progress/kendo-angular-intl';
/**
 * @hidden
 */
export class MessageListComponent {
    constructor(element, intl) {
        this.element = element;
        this.intl = intl;
        this.executeAction = new EventEmitter();
        this.navigate = new EventEmitter();
        this.resize = new EventEmitter();
        this.cssClass = true;
        this.view = [];
        this.keyActions = {
            [38 /* up */]: (e) => this.navigateTo(e, -1),
            [40 /* down */]: (e) => this.navigateTo(e, 1)
        };
    }
    set messages(value) {
        const data = value || [];
        this.view = chatView(data);
        this._messages = data;
    }
    get messages() {
        return this._messages;
    }
    ngAfterViewInit() {
        this.selectedItem = this.items.last;
    }
    onResize() {
        this.resize.emit();
    }
    formatTimeStamp(date) {
        return this.intl.formatDate(date, { date: 'full' });
    }
    onKeydown(e) {
        const action = this.keyActions[e.keyCode];
        if (action) {
            action(e);
        }
    }
    onBlur(args) {
        const next = args.relatedTarget || document.activeElement;
        const outside = !closest(next, (node) => node === this.element.nativeElement);
        if (outside) {
            this.select(null);
        }
    }
    isOwnMessage(msg) {
        return isAuthor(this.user, msg);
    }
    dispatchAction(action, message) {
        const args = new ExecuteActionEvent(action, message);
        this.executeAction.emit(args);
    }
    trackGroup(_index, item) {
        return item.trackBy;
    }
    select(item) {
        const prevItem = this.selectedItem;
        if (prevItem) {
            prevItem.selected = false;
        }
        if (item) {
            item.selected = true;
            this.selectedItem = item;
        }
    }
    last(items) {
        if (!items || items.length === 0) {
            return;
        }
        return items[items.length - 1];
    }
    navigateTo(e, offset) {
        const items = this.items.toArray();
        const prevItem = this.selectedItem;
        const prevIndex = items.indexOf(prevItem);
        const nextIndex = Math.max(0, Math.min(prevIndex + offset, this.items.length - 1));
        const nextItem = items[nextIndex];
        if (nextItem !== prevItem) {
            this.select(nextItem);
            nextItem.focus();
            this.navigate.emit();
            e.preventDefault();
        }
    }
}
MessageListComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-chat-message-list',
                template: `
    <ng-container *ngFor="let group of view; last as lastGroup; trackBy: trackGroup">
      <ng-container [ngSwitch]="group.type">
        <div
          *ngSwitchCase="'date-marker'"
          class="k-timestamp"
        >
          {{ formatTimeStamp(group.timestamp) }}
        </div>
        <div
          *ngSwitchCase="'message-group'"
          class="k-message-group"
          [class.k-alt]="isOwnMessage(group.messages[0])"
          [class.k-no-avatar]="!group.author.avatarUrl"
        >
          <img
            *ngIf="group.author.avatarUrl"
            [attr.src]="group.author.avatarUrl"
            class="k-avatar"
          />
          <p *ngIf="group.author.name" class="k-author">{{ group.author.name }}</p>
          <ng-container
              *ngFor="let msg of group.messages; first as firstMessage; last as lastMessage"
          >
            <img *ngIf="msg.user?.avatarUrl" [src]="msg.user?.avatarUrl" class="k-avatar">
            <kendo-chat-message #message
              [message]="msg"
              [tabbable]="lastGroup && lastMessage"
              [template]="messageTemplate"
              (click)="select(message)"
              (focus)="select(message)"
              [class.k-only]="group.messages.length === 1"
              [class.k-first]="group.messages.length > 1 && firstMessage"
              [class.k-last]="group.messages.length > 1 && lastMessage"
            >
            </kendo-chat-message>

            <kendo-chat-attachment
              *ngIf="msg.attachments && msg.attachments.length === 1"
              [attachment]="msg.attachments[0]"
              [template]="attachmentTemplate"
              >
            </kendo-chat-attachment>
          </ng-container>
        </div>

        <kendo-chat-message-attachments #attachments
          *ngSwitchCase="'attachment-group'"
          [attachments]="group.attachments"
          [layout]="group.attachmentLayout"
          [tabbable]="lastGroup"
          [template]="attachmentTemplate"
          (click)="select(attachments)"
          (focus)="select(attachments)"
        >
        </kendo-chat-message-attachments>

        <kendo-chat-suggested-actions #actions
          *ngSwitchCase="'action-group'"
          [actions]="group.actions"
          [tabbable]="lastGroup"
          (dispatch)="dispatchAction($event, last(group.messages))"
          (click)="select(actions)"
          (focus)="select(actions)"
        >
        </kendo-chat-suggested-actions>
      </ng-container>
    </ng-container>
    <kendo-resize-sensor (resize)="onResize()">
    </kendo-resize-sensor>
  `
            },] },
];
/** @nocollapse */
MessageListComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: IntlService }
];
MessageListComponent.propDecorators = {
    messages: [{ type: Input }],
    attachmentTemplate: [{ type: Input }],
    messageTemplate: [{ type: Input }],
    user: [{ type: Input }],
    executeAction: [{ type: Output }],
    navigate: [{ type: Output }],
    resize: [{ type: Output }],
    items: [{ type: ViewChildren, args: [ChatItem,] }],
    cssClass: [{ type: HostBinding, args: ['class.k-message-list-content',] }],
    onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    onBlur: [{ type: HostListener, args: ['focusout', ['$event'],] }]
};
