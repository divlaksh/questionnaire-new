import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, isDevMode, Output, ViewChild, NgZone } from '@angular/core';
import { AttachmentTemplateDirective } from './attachment-template.directive';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { makeHandler } from './builtin-actions';
import { MessageTemplateDirective } from './message-template.directive';
import { SendMessageEvent } from '../api/post-message-event';
// tslint:disable-next-line:max-line-length
var sendIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 16"><path d="M0,14.3c-0.1,0.6,0.3,0.8,0.8,0.6l14.8-6.5c0.5-0.2,0.5-0.6,0-0.8L0.8,1.1C0.3,0.9-0.1,1.1,0,1.7l0.7,4.2C0.8,6.5,1.4,7,1.9,7.1l8.8,0.8c0.6,0.1,0.6,0.1,0,0.2L1.9,8.9C1.4,9,0.8,9.5,0.7,10.1L0,14.3z"/></svg>';
/**
 * Represents the Kendo UI Chat component for Angular.
 *
 * {% meta height:700 %}
 * {% embed_file echo/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts hidden %}
 * {% endmeta %}
 *
 */
var ChatComponent = /** @class */ (function () {
    function ChatComponent(localization, zone) {
        var _this = this;
        this.localization = localization;
        this.zone = zone;
        /**
         * Fires when the user types a message and clicks the **Send** button or presses **Enter**.
         * Emits the [`SendMessageEvent`]({% slug api_conversational-ui_sendmessageevent %}).
         *
         * > The message is not automatically appended to the `messages` array.
         */
        this.sendMessage = new EventEmitter();
        /**
         * Fires when the user clicks a quick action button.
         * The Chat internally handles the `reply`, `openUrl`, and `call` [known actions]({% slug api_conversational-ui_actiontype %}).
         *
         * Emits the [`ExecuteActionEvent`]({% slug api_conversational-ui_executeactionevent %}).
         * The event is preventable. If `preventDefault` is called, the built-in action will be suppressed.
         */
        this.executeAction = new EventEmitter();
        /**
         * @hidden
         */
        this.autoScroll = true;
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.localizationChangeSubscription = localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
        });
    }
    Object.defineProperty(ChatComponent.prototype, "className", {
        get: function () {
            return 'k-widget k-chat';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChatComponent.prototype, "dirAttr", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    ChatComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () { return setTimeout(function () {
            _this.messageList.nativeElement.style.flex = '1 1 auto';
        }); });
    };
    ChatComponent.prototype.ngAfterViewInit = function () {
        if (!isDevMode()) {
            return;
        }
        if (!this.user) {
            throw new Error('User must be set and have a valid id.');
        }
    };
    ChatComponent.prototype.ngOnDestroy = function () {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    ChatComponent.prototype.sendClick = function () {
        var input = this.messageInput.nativeElement;
        var value = input.value;
        if (!value) {
            return;
        }
        var message = {
            author: this.user,
            text: value,
            timestamp: new Date()
        };
        this.sendMessage.emit(new SendMessageEvent(message));
        input.value = null;
        input.focus();
        this.autoScroll = true;
    };
    /**
     * @hidden
     */
    ChatComponent.prototype.inputKeydown = function (e) {
        if (e.keyCode === 13 /* enter */) {
            this.sendClick();
        }
    };
    /**
     * @hidden
     */
    ChatComponent.prototype.dispatchAction = function (e) {
        this.executeAction.emit(e);
        if (!e.isDefaultPrevented()) {
            var handler = makeHandler(e.action);
            handler(e.action, this);
            this.messageInput.nativeElement.focus();
        }
    };
    /**
     * @hidden
     */
    ChatComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    ChatComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.chat'
                        }
                    ],
                    selector: 'kendo-chat',
                    template: "\n    <ng-container\n      kendoChatLocalizedMessages\n      i18n-messagePlaceholder=\"kendo.chat.messagePlaceholder|The placholder text of the message text input\"\n      messagePlaceholder=\"Type a message...\"\n\n      i18n-send=\"kendo.chat.send|The text for the Send button\"\n      send=\"Send...\"\n    >\n    </ng-container>\n\n    <div\n      #messageList\n      class=\"k-message-list k-avatars\"\n      aria-live=\"polite\" role=\"log\"\n      kendoChatScrollAnchor\n        #anchor=\"scrollAnchor\"\n        [(autoScroll)]=\"autoScroll\"\n    >\n      <kendo-chat-message-list\n        [messages]=\"messages\"\n        [messageTemplate]=\"messageTemplate\"\n        [attachmentTemplate]=\"attachmentTemplate\"\n        [user]=\"user\"\n        (executeAction)=\"dispatchAction($event)\"\n        (resize)=\"anchor.scrollToBottom()\"\n        (navigate)=\"this.autoScroll = false\"\n      >\n      </kendo-chat-message-list>\n    </div>\n\n    <div class=\"k-message-box\">\n      <input\n        #messageInput\n        kendoChatFocusedState\n        type=\"text\"\n        class=\"k-input\"\n        [placeholder]=\"textFor('messagePlaceholder')\"\n        (keydown)=\"inputKeydown($event)\"\n      >\n      <button\n        kendoButton\n            look=\"flat\"\n        class=\"k-button-send\"\n        tabindex=\"-1\"\n        [attr.title]=\"textFor('send')\"\n        (click)=\"sendClick()\"\n      >" + sendIcon + "</button>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    ChatComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    ChatComponent.propDecorators = {
        messages: [{ type: Input }],
        user: [{ type: Input }],
        sendMessage: [{ type: Output }],
        executeAction: [{ type: Output }],
        className: [{ type: HostBinding, args: ['class',] }],
        dirAttr: [{ type: HostBinding, args: ['attr.dir',] }],
        attachmentTemplate: [{ type: ContentChild, args: [AttachmentTemplateDirective,] }],
        messageTemplate: [{ type: ContentChild, args: [MessageTemplateDirective,] }],
        messageInput: [{ type: ViewChild, args: ['messageInput',] }],
        messageList: [{ type: ViewChild, args: ['messageList',] }]
    };
    return ChatComponent;
}());
export { ChatComponent };
