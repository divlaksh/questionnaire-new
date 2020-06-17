import { Component, ContentChild, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, NgModule, NgZone, Optional, Output, Renderer2, TemplateRef, ViewChild, ViewChildren, forwardRef, isDevMode } from '@angular/core';
import { ComponentMessages, L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { CommonModule } from '@angular/common';
import { ResizeSensorModule } from '@progress/kendo-angular-common';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IntlService } from '@progress/kendo-angular-intl';

/**
 * Defines a template that will be used for displaying message attachments. To define an attachment
 * template, nest an `<ng-template>` tag with the `kendoChatAttachmentTemplate` attribute inside the
 * `<kendo-chat>` component. The template context is set to the attachment instance. For more information,
 * refer to the article on [message attachments]({% slug attachments_chat %}).
 *
 * {% meta height:700 %}
 * {% embed_file attachments/templates/app.component.ts preview %}
 * {% embed_file shared/app.module.ts preview %}
 * {% embed_file shared/main.ts hidden %}
 * {% endmeta %}
 */
class AttachmentTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
AttachmentTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoChatAttachmentTemplate]'
            },] },
];
/** @nocollapse */
AttachmentTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Arguments for the `SendMessage` event.
 *
 */
class SendMessageEvent {
    /**
     * @hidden
     */
    constructor(message) {
        this.message = message;
    }
}

const noop = () => { };
const ɵ1 = (action, sender) => {
    sender.sendMessage.emit(new SendMessageEvent({
        author: sender.user,
        text: action.value,
        timestamp: new Date()
    }));
};
const ɵ2 = (action) => {
    window.open('tel:' + action.value);
};
const ɵ3 = (action) => {
    window.open(action.value);
};
const handlers = {
    'reply': ɵ1,
    'call': ɵ2,
    'openUrl': ɵ3
};
/**
 * @hidden
 */
const makeHandler = (action) => handlers[action.type] || noop;

/**
 * Defines a template that will be used for displaying Chat messages. To define an attachment
 * template, nest an `<ng-template>` tag with the `kendoChatMessageTemplate` attribute inside the
 * `<kendo-chat>` component. The template context is set to the message instance. For more information,
 * refer to the article on [message templates]({% slug message_templates_chat %}).
 *
 * {% meta height:700 %}
 * {% embed_file messages/templates/app.component.ts preview %}
 * {% embed_file shared/app.module.ts preview %}
 * {% embed_file shared/main.ts hidden %}
 * {% endmeta %}
 */
class MessageTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
MessageTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoChatMessageTemplate]'
            },] },
];
/** @nocollapse */
MessageTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

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
class ChatComponent {
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

/**
 * @hidden
 */
class AttachmentComponent {
    set attachment(value) {
        this._attachment = value;
        this.context = {
            $implicit: this.attachment
        };
    }
    get attachment() {
        return this._attachment;
    }
    get image() {
        return this.contentType.indexOf('image/') === 0;
    }
    get unknown() {
        return !this.image;
    }
    get contentType() {
        return this.attachment.contentType || '';
    }
}
AttachmentComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-chat-attachment',
                template: `
    <ng-container *ngIf="template">
      <ng-container *ngTemplateOutlet="template.templateRef; context: context;">
      </ng-container>
    </ng-container>

    <div *ngIf="!template" class="k-card">
      <div class="k-card-body">
        <h5 class="k-card-title" *ngIf="attachment.title">
          {{ attachment.title }}
        </h5>
        <h6 class="k-card-subtitle" *ngIf="attachment.subtitle">
          {{ attachment.subtitle }}
        </h6>
        <img *ngIf="image" [attr.src]="attachment.content" />
        <ng-container *ngIf="unknown">
          {{ attachment.content }}
        </ng-container>
      </div>
    </div>
  `
            },] },
];
AttachmentComponent.propDecorators = {
    attachment: [{ type: Input }],
    template: [{ type: Input }]
};

/**
 * @hidden
 */
class Messages extends ComponentMessages {
}
Messages.propDecorators = {
    messagePlaceholder: [{ type: Input }],
    send: [{ type: Input }]
};

// tslint:disable:no-forward-ref
/**
 * Custom component messages override default component messages
 * ([see example]({% slug globalization_chat %}#toc-custom-messages)).
 */
class CustomMessagesComponent extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
CustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => CustomMessagesComponent)
                    }
                ],
                selector: 'kendo-chat-messages',
                template: ``
            },] },
];
/** @nocollapse */
CustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * @hidden
 */
class FocusedStateDirective {
    constructor() {
        this.focused = false;
    }
    onFocus() {
        this.focused = true;
    }
    onBlur() {
        this.focused = false;
    }
}
FocusedStateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoChatFocusedState]'
            },] },
];
FocusedStateDirective.propDecorators = {
    focused: [{ type: HostBinding, args: ['class.k-state-focused',] }],
    onFocus: [{ type: HostListener, args: ['focusin',] }],
    onBlur: [{ type: HostListener, args: ['focusout',] }]
};

/**
 * Represents a Hero Card component ([see example]({% slug dialogflow_chat %})).
 * Hero cards host a single large image and action buttons with text content.
 */
class HeroCardComponent {
    constructor() {
        this.cssClass = true;
        /**
         * Fires when the user clicks a button.
         */
        this.executeAction = new EventEmitter();
    }
    onClick(action) {
        this.executeAction.next(action);
    }
}
HeroCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-chat-hero-card',
                template: `
    <img class="k-card-image" [src]="imageUrl" *ngIf="imageUrl" />
    <div class="k-card-body">
      <h5 class="k-card-title" *ngIf="title">
        {{ title }}
      </h5>
      <h6 class="k-card-subtitle" *ngIf="subtitle">
        {{ subtitle }}
      </h6>
    </div>
    <div class="k-card-actions k-card-actions-vertical">
      <span class="k-card-action"
            *ngFor="let act of actions"
      >
        <button
          kendoButton look="flat"
          (click)="onClick(act)">
          {{ act.title }}
        </button>
      </span>
    </div>
  `
            },] },
];
HeroCardComponent.propDecorators = {
    imageUrl: [{ type: Input }],
    title: [{ type: Input }],
    subtitle: [{ type: Input }],
    actions: [{ type: Input }],
    cssClass: [{ type: HostBinding, args: ['class.k-card',] }],
    executeAction: [{ type: Output }]
};

// tslint:disable:no-forward-ref
/**
 * @hidden
 */
class LocalizedMessagesDirective extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
}
LocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => LocalizedMessagesDirective)
                    }
                ],
                selector: '[kendoChatLocalizedMessages]'
            },] },
];
/** @nocollapse */
LocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * @hidden
 */
class ChatItem {
}

// tslint:disable:no-forward-ref
/**
 * @hidden
 */
class MessageAttachmentsComponent extends ChatItem {
    constructor(zone) {
        super();
        this.zone = zone;
        this.scrollPosition = 0;
        this.selectedIndex = 0;
        this.carouselKeyHandlers = {
            [37 /* left */]: (e) => this.navigateTo(e, -1),
            [39 /* right */]: (e) => this.navigateTo(e, 1)
        };
        this.listKeyHandlers = {
            [38 /* up */]: (e) => this.navigateTo(e, -1),
            [40 /* down */]: (e) => this.navigateTo(e, 1)
        };
    }
    get carousel() {
        return this.layout !== 'list';
    }
    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            const scrollDebounceTime = 100;
            this.scrollSubscription = fromEvent(this.deck.nativeElement, 'scroll')
                .pipe(debounceTime(scrollDebounceTime))
                .subscribe(() => this.onScroll());
        });
    }
    ngOnDestroy() {
        this.scrollSubscription.unsubscribe();
    }
    isSelected(index) {
        return this.selectedIndex === index;
    }
    itemKeydown(e, attachment) {
        const keyHandlers = this.layout === 'list' ?
            this.listKeyHandlers : this.carouselKeyHandlers;
        const handler = keyHandlers[e.keyCode];
        if (handler) {
            handler(e, attachment);
        }
    }
    itemClick(index) {
        this.select(index);
    }
    focus() {
        this.select(this.selectedIndex);
    }
    scrollTo(dir) {
        const el = this.deck.nativeElement;
        const scrollStep = el.scrollWidth / this.items.length;
        const max = el.scrollWidth - el.offsetWidth;
        const pos = el.scrollLeft + scrollStep * dir;
        el.scrollLeft = Math.max(0, Math.min(max, pos));
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
    onScroll() {
        const el = this.deck.nativeElement;
        if (el.scrollWidth === 0) {
            return;
        }
        const pos = el.scrollLeft / (el.scrollWidth - el.offsetWidth);
        if (pos !== this.scrollPosition) {
            this.zone.run(() => {
                this.scrollPosition = pos;
            });
        }
    }
}
MessageAttachmentsComponent.decorators = [
    { type: Component, args: [{
                providers: [{
                        provide: ChatItem,
                        useExisting: forwardRef(() => MessageAttachmentsComponent)
                    }],
                selector: 'kendo-chat-message-attachments',
                template: `
    <button
      *ngIf="carousel && scrollPosition > 0"
      (click)="scrollTo(-1)"
      class="k-button k-button-icon"
      tabindex="-1">
        <span class="k-icon k-i-arrow-chevron-left"></span>
    </button>
    <div #deck [class.k-card-deck]="carousel">
      <kendo-chat-attachment #item
        *ngFor="let att of attachments; index as index; first as first; last as last"
        [attachment]="att"
        [template]="template"
        [class.k-state-selected]="isSelected(index)"
        [class.k-state-focused]="isSelected(index)"
        [class.k-card-wrap]="true"
        [class.k-first]="first"
        [class.k-last]="last"
        [attr.tabindex]="tabbable && isSelected(index) ? '0' : '-1'"
        (click)="itemClick(index)"
        (keydown)="itemKeydown($event, att)"
      >
      </kendo-chat-attachment>
    </div>
    <button
      *ngIf="carousel && scrollPosition < 1"
      (click)="scrollTo(1)"
      class="k-button k-button-icon"
      tabindex="-1">
        <span class="k-icon k-i-arrow-chevron-right"></span>
    </button>
  `
            },] },
];
/** @nocollapse */
MessageAttachmentsComponent.ctorParameters = () => [
    { type: NgZone }
];
MessageAttachmentsComponent.propDecorators = {
    attachments: [{ type: Input }],
    layout: [{ type: Input }],
    tabbable: [{ type: Input }],
    template: [{ type: Input }],
    carousel: [{ type: HostBinding, args: ['class.k-card-deck-scrollwrap',] }],
    deck: [{ type: ViewChild, args: ['deck', { read: ElementRef },] }],
    items: [{ type: ViewChildren, args: ['item', { read: ElementRef },] }]
};

// tslint:disable:no-forward-ref
/**
 * @hidden
 */
class MessageComponent extends ChatItem {
    constructor(element, intl) {
        super();
        this.element = element;
        this.intl = intl;
        this.cssClass = true;
    }
    get tabIndex() {
        return this.tabbable ? '0' : '-1';
    }
    formatTimeStamp(date) {
        return this.intl.formatDate(date, { datetime: 'short' });
    }
    focus() {
        this.element.nativeElement.focus();
    }
}
MessageComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-chat-message',
                providers: [{
                        provide: ChatItem,
                        useExisting: forwardRef(() => MessageComponent)
                    }],
                template: `
    <time
      [attr.aria-hidden]="!selected"
      class="k-message-time"
      *ngIf="message.timestamp"
    >
      {{ formatTimeStamp(message.timestamp) }}
    </time>

    <ng-container *ngIf="!message.typing; else typing">
      <div class="k-bubble" *ngIf="template">
        <ng-container
          *ngTemplateOutlet="template.templateRef; context: { $implicit: message };"
        >
        </ng-container>
      </div>

      <div class="k-bubble" *ngIf="!template && message.text">
        {{message.text}}
      </div>
    </ng-container>

    <span
      class="k-message-status"
      *ngIf="message.status"
    >
      {{ message.status }}
    </span>

    <ng-template #typing>
      <div class="k-bubble">
        <div class="k-typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </ng-template>
  `
            },] },
];
/** @nocollapse */
MessageComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: IntlService }
];
MessageComponent.propDecorators = {
    message: [{ type: Input }],
    tabbable: [{ type: Input }],
    template: [{ type: Input }],
    cssClass: [{ type: HostBinding, args: ['class.k-message',] }],
    selected: [{ type: HostBinding, args: ['class.k-state-selected',] }, { type: HostBinding, args: ['class.k-state-focused',] }],
    tabIndex: [{ type: HostBinding, args: ['attr.tabIndex',] }]
};

/**
 * @hidden
 */
class PreventableEvent {
    constructor() {
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses
     * the built-in behavior that follows the event.
     */
    preventDefault() {
        this.prevented = true;
    }
    /**
     * Returns `true` if the event was prevented
     * by any of its subscribers.
     *
     * @returns `true` if the default action was prevented.
     * Otherwise, returns `false`.
     */
    isDefaultPrevented() {
        return this.prevented;
    }
}

/**
 * Arguments for the `executeAction` event. The `executeAction` event fires when the user clicks
 * a quick action button. Calling `preventDefault()` suppresses the built-in action handler.
 */
class ExecuteActionEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(action, message) {
        super();
        this.action = action;
        this.message = message;
    }
}

/**
 * @hidden
 */
const closest = (node, predicate) => {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};

/**
 * @hidden
 */
const isAuthor = (user, msg) => user && msg.author && user.id === msg.author.id;
const last = (arr) => arr[arr.length - 1];
const dateChanged = (curr, prev) => (curr && prev) && (prev.getDate() !== curr.getDate() ||
    prev.getMonth() !== curr.getMonth() ||
    prev.getFullYear() !== curr.getFullYear());
const addDateMarker = (acc, msg) => {
    const timestamp = msg.timestamp;
    const lastItem = last(acc);
    if (!timestamp) {
        return;
    }
    if (!lastItem || dateChanged(timestamp, lastItem.timestamp)) {
        const dateMarker = {
            type: 'date-marker',
            timestamp: timestamp,
            trackBy: timestamp.getTime()
        };
        acc.push(dateMarker);
    }
};
const groupMessages = (acc, msg, isLastMessage) => {
    const lastItem = last(acc);
    let messages;
    if (isDevMode() && !msg.author) {
        throw new Error('Author must be set for message: ' + JSON.stringify(msg));
    }
    if (msg.typing && !isLastMessage) {
        return;
    }
    if (lastItem && lastItem.type === 'message-group') {
        messages = lastItem.messages;
    }
    if (messages && isAuthor(msg.author, last(messages))) {
        messages.push(msg);
    }
    else {
        acc.push({
            type: 'message-group',
            messages: [msg],
            author: msg.author,
            timestamp: msg.timestamp,
            trackBy: msg
        });
    }
};
const groupItems = (total) => (acc, msg, index) => {
    const isLastMessage = index === total - 1;
    addDateMarker(acc, msg);
    groupMessages(acc, msg, isLastMessage);
    if (msg.attachments && msg.attachments.length > 1) {
        acc.push({
            type: 'attachment-group',
            attachments: msg.attachments,
            attachmentLayout: msg.attachmentLayout,
            timestamp: msg.timestamp,
            trackBy: msg
        });
    }
    if (msg.suggestedActions && isLastMessage) {
        acc.push({
            type: 'action-group',
            actions: msg.suggestedActions,
            timestamp: msg.timestamp,
            trackBy: msg
        });
    }
    return acc;
};
/**
 * @hidden
 */
const chatView = (messages) => messages.reduce(groupItems(messages.length), []);

/**
 * @hidden
 */
class MessageListComponent {
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

// Consider scroll to be at the bottom when within this number of pixels from the container height.
const maxDelta = 2;
/**
 * @hidden
 */
class ScrollAnchorDirective {
    constructor(element, zone, renderer) {
        this.element = element;
        this.zone = zone;
        this.renderer = renderer;
        this.autoScroll = true;
        this.autoScrollChange = new EventEmitter();
        this.overflowAnchor = 'none';
        this.scrolling = false;
    }
    ngOnInit() {
        this.zone.runOutsideAngular(() => {
            this.unsubscribe = this.renderer.listen(this.element.nativeElement, 'scroll', () => this.onScroll());
        });
    }
    ngAfterViewInit() {
        this.scrollToBottom();
    }
    ngOnDestroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
    onScroll() {
        if (this.scrolling) {
            return;
        }
        const el = this.element.nativeElement;
        const bottom = el.scrollTop + el.offsetHeight;
        const height = el.scrollHeight;
        const atBottom = height - bottom < maxDelta;
        if (this.autoScroll !== atBottom) {
            this.zone.run(() => {
                this.autoScroll = atBottom;
                this.autoScrollChange.emit(this.autoScroll);
            });
        }
    }
    scrollToBottom() {
        if (!this.autoScroll) {
            return;
        }
        const el = this.element.nativeElement;
        el.scrollTop = el.scrollHeight - el.clientHeight;
        this.scrolling = true;
        this.zone.runOutsideAngular(() => setTimeout(() => this.scrolling = false, 1000));
    }
}
ScrollAnchorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoChatScrollAnchor]',
                exportAs: 'scrollAnchor'
            },] },
];
/** @nocollapse */
ScrollAnchorDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 }
];
ScrollAnchorDirective.propDecorators = {
    autoScroll: [{ type: Input }],
    autoScrollChange: [{ type: Output }],
    overflowAnchor: [{ type: HostBinding, args: ['style.overflow-anchor',] }]
};

// tslint:disable:no-forward-ref
/**
 * @hidden
 */
class SuggestedActionsComponent extends ChatItem {
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

const PUBLIC_DIRECTIVES = [
    ChatComponent,
    CustomMessagesComponent,
    AttachmentTemplateDirective,
    MessageTemplateDirective,
    HeroCardComponent
];
const PRIVATE_DIRECTIVES = [
    AttachmentComponent,
    FocusedStateDirective,
    LocalizedMessagesDirective,
    MessageAttachmentsComponent,
    MessageComponent,
    MessageListComponent,
    MessageTemplateDirective,
    ScrollAnchorDirective,
    SuggestedActionsComponent
];
/**
 * The [NgModule]({{ site.data.urls.angular['ngmodules'] }}) for the Chat component.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { Component } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 *
 * import { ChatModule } from '@progress/kendo-angular-conversational-ui';
 * import { AppComponent }   from './app.component';
 *
 * _@NgModule({
 *   imports:      [ BrowserModule, ChatModule ],
 *   declarations: [ AppComponent ],
 *   bootstrap:    [ AppComponent ]
 * })
 *
 * export class AppModule { }
 * ```
 */
class ChatModule {
}
ChatModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ...PUBLIC_DIRECTIVES,
                    ...PRIVATE_DIRECTIVES
                ],
                exports: [PUBLIC_DIRECTIVES],
                imports: [
                    ButtonModule,
                    CommonModule,
                    ResizeSensorModule
                ]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { PreventableEvent, HeroCardComponent, AttachmentComponent, ChatItem, CustomMessagesComponent, LocalizedMessagesDirective, Messages, MessageAttachmentsComponent, MessageListComponent, MessageComponent, SuggestedActionsComponent, FocusedStateDirective, ScrollAnchorDirective, ChatComponent, AttachmentTemplateDirective, MessageTemplateDirective, ChatModule, ExecuteActionEvent, SendMessageEvent };
