import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, isDevMode, Output, ViewChild, NgZone } from '@angular/core';
import { AttachmentTemplateDirective } from './attachment-template.directive';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { makeHandler } from './builtin-actions';
import { MessageTemplateDirective } from './message-template.directive';
import { SendMessageEvent } from '../api/post-message-event';
// tslint:disable-next-line:max-line-length
const sendIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 16"><path d="M0,14.3c-0.1,0.6,0.3,0.8,0.8,0.6l14.8-6.5c0.5-0.2,0.5-0.6,0-0.8L0.8,1.1C0.3,0.9-0.1,1.1,0,1.7l0.7,4.2C0.8,6.5,1.4,7,1.9,7.1l8.8,0.8c0.6,0.1,0.6,0.1,0,0.2L1.9,8.9C1.4,9,0.8,9.5,0.7,10.1L0,14.3z"/></svg>';
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
export class ChatComponent {
    constructor(localization, zone) {
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
        this.localizationChangeSubscription = localization.changes.subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
        });
    }
    get className() {
        return 'k-widget k-chat';
    }
    get dirAttr() {
        return this.direction;
    }
    ngOnChanges() {
        this.zone.runOutsideAngular(() => setTimeout(() => {
            this.messageList.nativeElement.style.flex = '1 1 auto';
        }));
    }
    ngAfterViewInit() {
        if (!isDevMode()) {
            return;
        }
        if (!this.user) {
            throw new Error('User must be set and have a valid id.');
        }
    }
    ngOnDestroy() {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    sendClick() {
        const input = this.messageInput.nativeElement;
        const value = input.value;
        if (!value) {
            return;
        }
        const message = {
            author: this.user,
            text: value,
            timestamp: new Date()
        };
        this.sendMessage.emit(new SendMessageEvent(message));
        input.value = null;
        input.focus();
        this.autoScroll = true;
    }
    /**
     * @hidden
     */
    inputKeydown(e) {
        if (e.keyCode === 13 /* enter */) {
            this.sendClick();
        }
    }
    /**
     * @hidden
     */
    dispatchAction(e) {
        this.executeAction.emit(e);
        if (!e.isDefaultPrevented()) {
            const handler = makeHandler(e.action);
            handler(e.action, this);
            this.messageInput.nativeElement.focus();
        }
    }
    /**
     * @hidden
     */
    textFor(key) {
        return this.localization.get(key);
    }
}
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
                template: `
    <ng-container
      kendoChatLocalizedMessages
      i18n-messagePlaceholder="kendo.chat.messagePlaceholder|The placholder text of the message text input"
      messagePlaceholder="Type a message..."

      i18n-send="kendo.chat.send|The text for the Send button"
      send="Send..."
    >
    </ng-container>

    <div
      #messageList
      class="k-message-list k-avatars"
      aria-live="polite" role="log"
      kendoChatScrollAnchor
        #anchor="scrollAnchor"
        [(autoScroll)]="autoScroll"
    >
      <kendo-chat-message-list
        [messages]="messages"
        [messageTemplate]="messageTemplate"
        [attachmentTemplate]="attachmentTemplate"
        [user]="user"
        (executeAction)="dispatchAction($event)"
        (resize)="anchor.scrollToBottom()"
        (navigate)="this.autoScroll = false"
      >
      </kendo-chat-message-list>
    </div>

    <div class="k-message-box">
      <input
        #messageInput
        kendoChatFocusedState
        type="text"
        class="k-input"
        [placeholder]="textFor('messagePlaceholder')"
        (keydown)="inputKeydown($event)"
      >
      <button
        kendoButton
            look="flat"
        class="k-button-send"
        tabindex="-1"
        [attr.title]="textFor('send')"
        (click)="sendClick()"
      >${sendIcon}</button>
    </div>
  `
            },] },
];
/** @nocollapse */
ChatComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: NgZone }
];
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
