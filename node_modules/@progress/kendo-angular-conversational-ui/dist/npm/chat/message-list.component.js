"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var execute_action_event_1 = require("../api/execute-action-event");
var utils_1 = require("../common/utils");
var chat_item_1 = require("./chat-item");
var chat_view_1 = require("./chat-view");
var chat_directives_1 = require("./chat.directives");
var message_template_directive_1 = require("./message-template.directive");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
/**
 * @hidden
 */
var MessageListComponent = /** @class */ (function () {
    function MessageListComponent(element, intl) {
        var _a;
        var _this = this;
        this.element = element;
        this.intl = intl;
        this.executeAction = new core_1.EventEmitter();
        this.navigate = new core_1.EventEmitter();
        this.resize = new core_1.EventEmitter();
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
            this.view = chat_view_1.chatView(data);
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
        var outside = !utils_1.closest(next, function (node) { return node === _this.element.nativeElement; });
        if (outside) {
            this.select(null);
        }
    };
    MessageListComponent.prototype.isOwnMessage = function (msg) {
        return chat_view_1.isAuthor(this.user, msg);
    };
    MessageListComponent.prototype.dispatchAction = function (action, message) {
        var args = new execute_action_event_1.ExecuteActionEvent(action, message);
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
        { type: core_1.Component, args: [{
                    selector: 'kendo-chat-message-list',
                    template: "\n    <ng-container *ngFor=\"let group of view; last as lastGroup; trackBy: trackGroup\">\n      <ng-container [ngSwitch]=\"group.type\">\n        <div\n          *ngSwitchCase=\"'date-marker'\"\n          class=\"k-timestamp\"\n        >\n          {{ formatTimeStamp(group.timestamp) }}\n        </div>\n        <div\n          *ngSwitchCase=\"'message-group'\"\n          class=\"k-message-group\"\n          [class.k-alt]=\"isOwnMessage(group.messages[0])\"\n          [class.k-no-avatar]=\"!group.author.avatarUrl\"\n        >\n          <img\n            *ngIf=\"group.author.avatarUrl\"\n            [attr.src]=\"group.author.avatarUrl\"\n            class=\"k-avatar\"\n          />\n          <p *ngIf=\"group.author.name\" class=\"k-author\">{{ group.author.name }}</p>\n          <ng-container\n              *ngFor=\"let msg of group.messages; first as firstMessage; last as lastMessage\"\n          >\n            <img *ngIf=\"msg.user?.avatarUrl\" [src]=\"msg.user?.avatarUrl\" class=\"k-avatar\">\n            <kendo-chat-message #message\n              [message]=\"msg\"\n              [tabbable]=\"lastGroup && lastMessage\"\n              [template]=\"messageTemplate\"\n              (click)=\"select(message)\"\n              (focus)=\"select(message)\"\n              [class.k-only]=\"group.messages.length === 1\"\n              [class.k-first]=\"group.messages.length > 1 && firstMessage\"\n              [class.k-last]=\"group.messages.length > 1 && lastMessage\"\n            >\n            </kendo-chat-message>\n\n            <kendo-chat-attachment\n              *ngIf=\"msg.attachments && msg.attachments.length === 1\"\n              [attachment]=\"msg.attachments[0]\"\n              [template]=\"attachmentTemplate\"\n              >\n            </kendo-chat-attachment>\n          </ng-container>\n        </div>\n\n        <kendo-chat-message-attachments #attachments\n          *ngSwitchCase=\"'attachment-group'\"\n          [attachments]=\"group.attachments\"\n          [layout]=\"group.attachmentLayout\"\n          [tabbable]=\"lastGroup\"\n          [template]=\"attachmentTemplate\"\n          (click)=\"select(attachments)\"\n          (focus)=\"select(attachments)\"\n        >\n        </kendo-chat-message-attachments>\n\n        <kendo-chat-suggested-actions #actions\n          *ngSwitchCase=\"'action-group'\"\n          [actions]=\"group.actions\"\n          [tabbable]=\"lastGroup\"\n          (dispatch)=\"dispatchAction($event, last(group.messages))\"\n          (click)=\"select(actions)\"\n          (focus)=\"select(actions)\"\n        >\n        </kendo-chat-suggested-actions>\n      </ng-container>\n    </ng-container>\n    <kendo-resize-sensor (resize)=\"onResize()\">\n    </kendo-resize-sensor>\n  "
                },] },
    ];
    /** @nocollapse */
    MessageListComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: kendo_angular_intl_1.IntlService }
    ]; };
    MessageListComponent.propDecorators = {
        messages: [{ type: core_1.Input }],
        attachmentTemplate: [{ type: core_1.Input }],
        messageTemplate: [{ type: core_1.Input }],
        user: [{ type: core_1.Input }],
        executeAction: [{ type: core_1.Output }],
        navigate: [{ type: core_1.Output }],
        resize: [{ type: core_1.Output }],
        items: [{ type: core_1.ViewChildren, args: [chat_item_1.ChatItem,] }],
        cssClass: [{ type: core_1.HostBinding, args: ['class.k-message-list-content',] }],
        onKeydown: [{ type: core_1.HostListener, args: ['keydown', ['$event'],] }],
        onBlur: [{ type: core_1.HostListener, args: ['focusout', ['$event'],] }]
    };
    return MessageListComponent;
}());
exports.MessageListComponent = MessageListComponent;
