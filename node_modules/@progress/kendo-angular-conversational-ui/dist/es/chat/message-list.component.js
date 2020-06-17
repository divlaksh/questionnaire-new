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
var MessageListComponent = /** @class */ (function () {
    function MessageListComponent(element, intl) {
        var _a;
        var _this = this;
        this.element = element;
        this.intl = intl;
        this.executeAction = new EventEmitter();
        this.navigate = new EventEmitter();
        this.resize = new EventEmitter();
        this.cssClass = true;
        this.view = [];
        this.keyActions = (_a = {},
            _a[38 /* up */] = function (e) { return _this.navigateTo(e, -1); },
            _a[40 /* down */] = function (e) { return _this.navigateTo(e, 1); },
            _a);
    }
    Object.defineProperty(MessageListComponent.prototype, "messages", {
        get: function () {
            return this._messages;
        },
        set: function (value) {
            var data = value || [];
            this.view = chatView(data);
            this._messages = data;
        },
        enumerable: true,
        configurable: true
    });
    MessageListComponent.prototype.ngAfterViewInit = function () {
        this.selectedItem = this.items.last;
    };
    MessageListComponent.prototype.onResize = function () {
        this.resize.emit();
    };
    MessageListComponent.prototype.formatTimeStamp = function (date) {
        return this.intl.formatDate(date, { date: 'full' });
    };
    MessageListComponent.prototype.onKeydown = function (e) {
        var action = this.keyActions[e.keyCode];
        if (action) {
            action(e);
        }
    };
    MessageListComponent.prototype.onBlur = function (args) {
        var _this = this;
        var next = args.relatedTarget || document.activeElement;
        var outside = !closest(next, function (node) { return node === _this.element.nativeElement; });
        if (outside) {
            this.select(null);
        }
    };
    MessageListComponent.prototype.isOwnMessage = function (msg) {
        return isAuthor(this.user, msg);
    };
    MessageListComponent.prototype.dispatchAction = function (action, message) {
        var args = new ExecuteActionEvent(action, message);
        this.executeAction.emit(args);
    };
    MessageListComponent.prototype.trackGroup = function (_index, item) {
        return item.trackBy;
    };
    MessageListComponent.prototype.select = function (item) {
        var prevItem = this.selectedItem;
        if (prevItem) {
            prevItem.selected = false;
        }
        if (item) {
            item.selected = true;
            this.selectedItem = item;
        }
    };
    MessageListComponent.prototype.last = function (items) {
        if (!items || items.length === 0) {
            return;
        }
        return items[items.length - 1];
    };
    MessageListComponent.prototype.navigateTo = function (e, offset) {
        var items = this.items.toArray();
        var prevItem = this.selectedItem;
        var prevIndex = items.indexOf(prevItem);
        var nextIndex = Math.max(0, Math.min(prevIndex + offset, this.items.length - 1));
        var nextItem = items[nextIndex];
        if (nextItem !== prevItem) {
            this.select(nextItem);
            nextItem.focus();
            this.navigate.emit();
            e.preventDefault();
        }
    };
    MessageListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-chat-message-list',
                    template: "\n    <ng-container *ngFor=\"let group of view; last as lastGroup; trackBy: trackGroup\">\n      <ng-container [ngSwitch]=\"group.type\">\n        <div\n          *ngSwitchCase=\"'date-marker'\"\n          class=\"k-timestamp\"\n        >\n          {{ formatTimeStamp(group.timestamp) }}\n        </div>\n        <div\n          *ngSwitchCase=\"'message-group'\"\n          class=\"k-message-group\"\n          [class.k-alt]=\"isOwnMessage(group.messages[0])\"\n          [class.k-no-avatar]=\"!group.author.avatarUrl\"\n        >\n          <img\n            *ngIf=\"group.author.avatarUrl\"\n            [attr.src]=\"group.author.avatarUrl\"\n            class=\"k-avatar\"\n          />\n          <p *ngIf=\"group.author.name\" class=\"k-author\">{{ group.author.name }}</p>\n          <ng-container\n              *ngFor=\"let msg of group.messages; first as firstMessage; last as lastMessage\"\n          >\n            <img *ngIf=\"msg.user?.avatarUrl\" [src]=\"msg.user?.avatarUrl\" class=\"k-avatar\">\n            <kendo-chat-message #message\n              [message]=\"msg\"\n              [tabbable]=\"lastGroup && lastMessage\"\n              [template]=\"messageTemplate\"\n              (click)=\"select(message)\"\n              (focus)=\"select(message)\"\n              [class.k-only]=\"group.messages.length === 1\"\n              [class.k-first]=\"group.messages.length > 1 && firstMessage\"\n              [class.k-last]=\"group.messages.length > 1 && lastMessage\"\n            >\n            </kendo-chat-message>\n\n            <kendo-chat-attachment\n              *ngIf=\"msg.attachments && msg.attachments.length === 1\"\n              [attachment]=\"msg.attachments[0]\"\n              [template]=\"attachmentTemplate\"\n              >\n            </kendo-chat-attachment>\n          </ng-container>\n        </div>\n\n        <kendo-chat-message-attachments #attachments\n          *ngSwitchCase=\"'attachment-group'\"\n          [attachments]=\"group.attachments\"\n          [layout]=\"group.attachmentLayout\"\n          [tabbable]=\"lastGroup\"\n          [template]=\"attachmentTemplate\"\n          (click)=\"select(attachments)\"\n          (focus)=\"select(attachments)\"\n        >\n        </kendo-chat-message-attachments>\n\n        <kendo-chat-suggested-actions #actions\n          *ngSwitchCase=\"'action-group'\"\n          [actions]=\"group.actions\"\n          [tabbable]=\"lastGroup\"\n          (dispatch)=\"dispatchAction($event, last(group.messages))\"\n          (click)=\"select(actions)\"\n          (focus)=\"select(actions)\"\n        >\n        </kendo-chat-suggested-actions>\n      </ng-container>\n    </ng-container>\n    <kendo-resize-sensor (resize)=\"onResize()\">\n    </kendo-resize-sensor>\n  "
                },] },
    ];
    /** @nocollapse */
    MessageListComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IntlService }
    ]; };
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
    return MessageListComponent;
}());
export { MessageListComponent };
