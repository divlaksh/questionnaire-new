import { Component, ContentChild, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, NgModule, NgZone, Optional, Output, Renderer2, TemplateRef, ViewChild, ViewChildren, forwardRef, isDevMode } from '@angular/core';
import { ComponentMessages, L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { CommonModule } from '@angular/common';
import { ResizeSensorModule } from '@progress/kendo-angular-common';
import { __extends } from 'tslib';
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
var AttachmentTemplateDirective = /** @class */ (function () {
    function AttachmentTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    AttachmentTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoChatAttachmentTemplate]'
                },] },
    ];
    /** @nocollapse */
    AttachmentTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return AttachmentTemplateDirective;
}());

/**
 * Arguments for the `SendMessage` event.
 *
 */
var SendMessageEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function SendMessageEvent(message) {
        this.message = message;
    }
    return SendMessageEvent;
}());

var noop = function () { };
var ɵ1 = function (action, sender) {
    sender.sendMessage.emit(new SendMessageEvent({
        author: sender.user,
        text: action.value,
        timestamp: new Date()
    }));
};
var ɵ2 = function (action) {
    window.open('tel:' + action.value);
};
var ɵ3 = function (action) {
    window.open(action.value);
};
var handlers = {
    'reply': ɵ1,
    'call': ɵ2,
    'openUrl': ɵ3
};
/**
 * @hidden
 */
var makeHandler = function (action) { return handlers[action.type] || noop; };

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
var MessageTemplateDirective = /** @class */ (function () {
    function MessageTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    MessageTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoChatMessageTemplate]'
                },] },
    ];
    /** @nocollapse */
    MessageTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return MessageTemplateDirective;
}());

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

/**
 * @hidden
 */
var AttachmentComponent = /** @class */ (function () {
    function AttachmentComponent() {
    }
    Object.defineProperty(AttachmentComponent.prototype, "attachment", {
        get: function () {
            return this._attachment;
        },
        set: function (value) {
            this._attachment = value;
            this.context = {
                $implicit: this.attachment
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttachmentComponent.prototype, "image", {
        get: function () {
            return this.contentType.indexOf('image/') === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttachmentComponent.prototype, "unknown", {
        get: function () {
            return !this.image;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttachmentComponent.prototype, "contentType", {
        get: function () {
            return this.attachment.contentType || '';
        },
        enumerable: true,
        configurable: true
    });
    AttachmentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-chat-attachment',
                    template: "\n    <ng-container *ngIf=\"template\">\n      <ng-container *ngTemplateOutlet=\"template.templateRef; context: context;\">\n      </ng-container>\n    </ng-container>\n\n    <div *ngIf=\"!template\" class=\"k-card\">\n      <div class=\"k-card-body\">\n        <h5 class=\"k-card-title\" *ngIf=\"attachment.title\">\n          {{ attachment.title }}\n        </h5>\n        <h6 class=\"k-card-subtitle\" *ngIf=\"attachment.subtitle\">\n          {{ attachment.subtitle }}\n        </h6>\n        <img *ngIf=\"image\" [attr.src]=\"attachment.content\" />\n        <ng-container *ngIf=\"unknown\">\n          {{ attachment.content }}\n        </ng-container>\n      </div>\n    </div>\n  "
                },] },
    ];
    AttachmentComponent.propDecorators = {
        attachment: [{ type: Input }],
        template: [{ type: Input }]
    };
    return AttachmentComponent;
}());

/**
 * @hidden
 */
var Messages = /** @class */ (function (_super) {
    __extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Messages.propDecorators = {
        messagePlaceholder: [{ type: Input }],
        send: [{ type: Input }]
    };
    return Messages;
}(ComponentMessages));

// tslint:disable:no-forward-ref
/**
 * Custom component messages override default component messages
 * ([see example]({% slug globalization_chat %}#toc-custom-messages)).
 */
var CustomMessagesComponent = /** @class */ (function (_super) {
    __extends(CustomMessagesComponent, _super);
    function CustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(CustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    CustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return CustomMessagesComponent; })
                        }
                    ],
                    selector: 'kendo-chat-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    CustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return CustomMessagesComponent;
}(Messages));

/**
 * @hidden
 */
var FocusedStateDirective = /** @class */ (function () {
    function FocusedStateDirective() {
        this.focused = false;
    }
    FocusedStateDirective.prototype.onFocus = function () {
        this.focused = true;
    };
    FocusedStateDirective.prototype.onBlur = function () {
        this.focused = false;
    };
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
    return FocusedStateDirective;
}());

/**
 * Represents a Hero Card component ([see example]({% slug dialogflow_chat %})).
 * Hero cards host a single large image and action buttons with text content.
 */
var HeroCardComponent = /** @class */ (function () {
    function HeroCardComponent() {
        this.cssClass = true;
        /**
         * Fires when the user clicks a button.
         */
        this.executeAction = new EventEmitter();
    }
    HeroCardComponent.prototype.onClick = function (action) {
        this.executeAction.next(action);
    };
    HeroCardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-chat-hero-card',
                    template: "\n    <img class=\"k-card-image\" [src]=\"imageUrl\" *ngIf=\"imageUrl\" />\n    <div class=\"k-card-body\">\n      <h5 class=\"k-card-title\" *ngIf=\"title\">\n        {{ title }}\n      </h5>\n      <h6 class=\"k-card-subtitle\" *ngIf=\"subtitle\">\n        {{ subtitle }}\n      </h6>\n    </div>\n    <div class=\"k-card-actions k-card-actions-vertical\">\n      <span class=\"k-card-action\"\n            *ngFor=\"let act of actions\"\n      >\n        <button\n          kendoButton look=\"flat\"\n          (click)=\"onClick(act)\">\n          {{ act.title }}\n        </button>\n      </span>\n    </div>\n  "
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
    return HeroCardComponent;
}());

// tslint:disable:no-forward-ref
/**
 * @hidden
 */
var LocalizedMessagesDirective = /** @class */ (function (_super) {
    __extends(LocalizedMessagesDirective, _super);
    function LocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    LocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return LocalizedMessagesDirective; })
                        }
                    ],
                    selector: '[kendoChatLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    LocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LocalizedMessagesDirective;
}(Messages));

/**
 * @hidden
 */
var ChatItem = /** @class */ (function () {
    function ChatItem() {
    }
    return ChatItem;
}());

// tslint:disable:no-forward-ref
/**
 * @hidden
 */
var MessageAttachmentsComponent = /** @class */ (function (_super) {
    __extends(MessageAttachmentsComponent, _super);
    function MessageAttachmentsComponent(zone) {
        var _a, _b;
        var _this = _super.call(this) || this;
        _this.zone = zone;
        _this.scrollPosition = 0;
        _this.selectedIndex = 0;
        _this.carouselKeyHandlers = (_a = {}, _a[37 /* left */] = function (e) { return _this.navigateTo(e, -1); }, _a[39 /* right */] = function (e) { return _this.navigateTo(e, 1); }, _a);
        _this.listKeyHandlers = (_b = {}, _b[38 /* up */] = function (e) { return _this.navigateTo(e, -1); }, _b[40 /* down */] = function (e) { return _this.navigateTo(e, 1); }, _b);
        return _this;
    }
    Object.defineProperty(MessageAttachmentsComponent.prototype, "carousel", {
        get: function () {
            return this.layout !== 'list';
        },
        enumerable: true,
        configurable: true
    });
    MessageAttachmentsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            var scrollDebounceTime = 100;
            _this.scrollSubscription = fromEvent(_this.deck.nativeElement, 'scroll')
                .pipe(debounceTime(scrollDebounceTime))
                .subscribe(function () { return _this.onScroll(); });
        });
    };
    MessageAttachmentsComponent.prototype.ngOnDestroy = function () {
        this.scrollSubscription.unsubscribe();
    };
    MessageAttachmentsComponent.prototype.isSelected = function (index) {
        return this.selectedIndex === index;
    };
    MessageAttachmentsComponent.prototype.itemKeydown = function (e, attachment) {
        var keyHandlers = this.layout === 'list' ?
            this.listKeyHandlers : this.carouselKeyHandlers;
        var handler = keyHandlers[e.keyCode];
        if (handler) {
            handler(e, attachment);
        }
    };
    MessageAttachmentsComponent.prototype.itemClick = function (index) {
        this.select(index);
    };
    MessageAttachmentsComponent.prototype.focus = function () {
        this.select(this.selectedIndex);
    };
    MessageAttachmentsComponent.prototype.scrollTo = function (dir) {
        var el = this.deck.nativeElement;
        var scrollStep = el.scrollWidth / this.items.length;
        var max = el.scrollWidth - el.offsetWidth;
        var pos = el.scrollLeft + scrollStep * dir;
        el.scrollLeft = Math.max(0, Math.min(max, pos));
    };
    MessageAttachmentsComponent.prototype.select = function (index) {
        this.selectedIndex = index;
        var item = this.items.toArray()[index];
        if (item) {
            item.nativeElement.focus();
        }
    };
    MessageAttachmentsComponent.prototype.navigateTo = function (e, offset) {
        var prevIndex = this.selectedIndex;
        var nextIndex = Math.max(0, Math.min(prevIndex + offset, this.items.length - 1));
        if (nextIndex !== prevIndex) {
            this.select(nextIndex);
            e.preventDefault();
        }
    };
    MessageAttachmentsComponent.prototype.onScroll = function () {
        var _this = this;
        var el = this.deck.nativeElement;
        if (el.scrollWidth === 0) {
            return;
        }
        var pos = el.scrollLeft / (el.scrollWidth - el.offsetWidth);
        if (pos !== this.scrollPosition) {
            this.zone.run(function () {
                _this.scrollPosition = pos;
            });
        }
    };
    MessageAttachmentsComponent.decorators = [
        { type: Component, args: [{
                    providers: [{
                            provide: ChatItem,
                            useExisting: forwardRef(function () { return MessageAttachmentsComponent; })
                        }],
                    selector: 'kendo-chat-message-attachments',
                    template: "\n    <button\n      *ngIf=\"carousel && scrollPosition > 0\"\n      (click)=\"scrollTo(-1)\"\n      class=\"k-button k-button-icon\"\n      tabindex=\"-1\">\n        <span class=\"k-icon k-i-arrow-chevron-left\"></span>\n    </button>\n    <div #deck [class.k-card-deck]=\"carousel\">\n      <kendo-chat-attachment #item\n        *ngFor=\"let att of attachments; index as index; first as first; last as last\"\n        [attachment]=\"att\"\n        [template]=\"template\"\n        [class.k-state-selected]=\"isSelected(index)\"\n        [class.k-state-focused]=\"isSelected(index)\"\n        [class.k-card-wrap]=\"true\"\n        [class.k-first]=\"first\"\n        [class.k-last]=\"last\"\n        [attr.tabindex]=\"tabbable && isSelected(index) ? '0' : '-1'\"\n        (click)=\"itemClick(index)\"\n        (keydown)=\"itemKeydown($event, att)\"\n      >\n      </kendo-chat-attachment>\n    </div>\n    <button\n      *ngIf=\"carousel && scrollPosition < 1\"\n      (click)=\"scrollTo(1)\"\n      class=\"k-button k-button-icon\"\n      tabindex=\"-1\">\n        <span class=\"k-icon k-i-arrow-chevron-right\"></span>\n    </button>\n  "
                },] },
    ];
    /** @nocollapse */
    MessageAttachmentsComponent.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    MessageAttachmentsComponent.propDecorators = {
        attachments: [{ type: Input }],
        layout: [{ type: Input }],
        tabbable: [{ type: Input }],
        template: [{ type: Input }],
        carousel: [{ type: HostBinding, args: ['class.k-card-deck-scrollwrap',] }],
        deck: [{ type: ViewChild, args: ['deck', { read: ElementRef },] }],
        items: [{ type: ViewChildren, args: ['item', { read: ElementRef },] }]
    };
    return MessageAttachmentsComponent;
}(ChatItem));

// tslint:disable:no-forward-ref
/**
 * @hidden
 */
var MessageComponent = /** @class */ (function (_super) {
    __extends(MessageComponent, _super);
    function MessageComponent(element, intl) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.intl = intl;
        _this.cssClass = true;
        return _this;
    }
    Object.defineProperty(MessageComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabbable ? '0' : '-1';
        },
        enumerable: true,
        configurable: true
    });
    MessageComponent.prototype.formatTimeStamp = function (date) {
        return this.intl.formatDate(date, { datetime: 'short' });
    };
    MessageComponent.prototype.focus = function () {
        this.element.nativeElement.focus();
    };
    MessageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-chat-message',
                    providers: [{
                            provide: ChatItem,
                            useExisting: forwardRef(function () { return MessageComponent; })
                        }],
                    template: "\n    <time\n      [attr.aria-hidden]=\"!selected\"\n      class=\"k-message-time\"\n      *ngIf=\"message.timestamp\"\n    >\n      {{ formatTimeStamp(message.timestamp) }}\n    </time>\n\n    <ng-container *ngIf=\"!message.typing; else typing\">\n      <div class=\"k-bubble\" *ngIf=\"template\">\n        <ng-container\n          *ngTemplateOutlet=\"template.templateRef; context: { $implicit: message };\"\n        >\n        </ng-container>\n      </div>\n\n      <div class=\"k-bubble\" *ngIf=\"!template && message.text\">\n        {{message.text}}\n      </div>\n    </ng-container>\n\n    <span\n      class=\"k-message-status\"\n      *ngIf=\"message.status\"\n    >\n      {{ message.status }}\n    </span>\n\n    <ng-template #typing>\n      <div class=\"k-bubble\">\n        <div class=\"k-typing-indicator\">\n          <span></span>\n          <span></span>\n          <span></span>\n        </div>\n      </div>\n    </ng-template>\n  "
                },] },
    ];
    /** @nocollapse */
    MessageComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IntlService }
    ]; };
    MessageComponent.propDecorators = {
        message: [{ type: Input }],
        tabbable: [{ type: Input }],
        template: [{ type: Input }],
        cssClass: [{ type: HostBinding, args: ['class.k-message',] }],
        selected: [{ type: HostBinding, args: ['class.k-state-selected',] }, { type: HostBinding, args: ['class.k-state-focused',] }],
        tabIndex: [{ type: HostBinding, args: ['attr.tabIndex',] }]
    };
    return MessageComponent;
}(ChatItem));

/**
 * @hidden
 */
var PreventableEvent = /** @class */ (function () {
    function PreventableEvent() {
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses
     * the built-in behavior that follows the event.
     */
    PreventableEvent.prototype.preventDefault = function () {
        this.prevented = true;
    };
    /**
     * Returns `true` if the event was prevented
     * by any of its subscribers.
     *
     * @returns `true` if the default action was prevented.
     * Otherwise, returns `false`.
     */
    PreventableEvent.prototype.isDefaultPrevented = function () {
        return this.prevented;
    };
    return PreventableEvent;
}());

/**
 * Arguments for the `executeAction` event. The `executeAction` event fires when the user clicks
 * a quick action button. Calling `preventDefault()` suppresses the built-in action handler.
 */
var ExecuteActionEvent = /** @class */ (function (_super) {
    __extends(ExecuteActionEvent, _super);
    /**
     * @hidden
     */
    function ExecuteActionEvent(action, message) {
        var _this = _super.call(this) || this;
        _this.action = action;
        _this.message = message;
        return _this;
    }
    return ExecuteActionEvent;
}(PreventableEvent));

/**
 * @hidden
 */
var closest = function (node, predicate) {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};

/**
 * @hidden
 */
var isAuthor = function (user, msg) {
    return user && msg.author && user.id === msg.author.id;
};
var last = function (arr) { return arr[arr.length - 1]; };
var dateChanged = function (curr, prev) {
    return (curr && prev) && (prev.getDate() !== curr.getDate() ||
        prev.getMonth() !== curr.getMonth() ||
        prev.getFullYear() !== curr.getFullYear());
};
var addDateMarker = function (acc, msg) {
    var timestamp = msg.timestamp;
    var lastItem = last(acc);
    if (!timestamp) {
        return;
    }
    if (!lastItem || dateChanged(timestamp, lastItem.timestamp)) {
        var dateMarker = {
            type: 'date-marker',
            timestamp: timestamp,
            trackBy: timestamp.getTime()
        };
        acc.push(dateMarker);
    }
};
var groupMessages = function (acc, msg, isLastMessage) {
    var lastItem = last(acc);
    var messages;
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
var groupItems = function (total) { return function (acc, msg, index) {
    var isLastMessage = index === total - 1;
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
}; };
/**
 * @hidden
 */
var chatView = function (messages) {
    return messages.reduce(groupItems(messages.length), []);
};

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
        this.keyActions = (_a = {}, _a[38 /* up */] = function (e) { return _this.navigateTo(e, -1); }, _a[40 /* down */] = function (e) { return _this.navigateTo(e, 1); }, _a);
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

// Consider scroll to be at the bottom when within this number of pixels from the container height.
var maxDelta = 2;
/**
 * @hidden
 */
var ScrollAnchorDirective = /** @class */ (function () {
    function ScrollAnchorDirective(element, zone, renderer) {
        this.element = element;
        this.zone = zone;
        this.renderer = renderer;
        this.autoScroll = true;
        this.autoScrollChange = new EventEmitter();
        this.overflowAnchor = 'none';
        this.scrolling = false;
    }
    ScrollAnchorDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.unsubscribe = _this.renderer.listen(_this.element.nativeElement, 'scroll', function () { return _this.onScroll(); });
        });
    };
    ScrollAnchorDirective.prototype.ngAfterViewInit = function () {
        this.scrollToBottom();
    };
    ScrollAnchorDirective.prototype.ngOnDestroy = function () {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    };
    ScrollAnchorDirective.prototype.onScroll = function () {
        var _this = this;
        if (this.scrolling) {
            return;
        }
        var el = this.element.nativeElement;
        var bottom = el.scrollTop + el.offsetHeight;
        var height = el.scrollHeight;
        var atBottom = height - bottom < maxDelta;
        if (this.autoScroll !== atBottom) {
            this.zone.run(function () {
                _this.autoScroll = atBottom;
                _this.autoScrollChange.emit(_this.autoScroll);
            });
        }
    };
    ScrollAnchorDirective.prototype.scrollToBottom = function () {
        var _this = this;
        if (!this.autoScroll) {
            return;
        }
        var el = this.element.nativeElement;
        el.scrollTop = el.scrollHeight - el.clientHeight;
        this.scrolling = true;
        this.zone.runOutsideAngular(function () {
            return setTimeout(function () { return _this.scrolling = false; }, 1000);
        });
    };
    ScrollAnchorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoChatScrollAnchor]',
                    exportAs: 'scrollAnchor'
                },] },
    ];
    /** @nocollapse */
    ScrollAnchorDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    ScrollAnchorDirective.propDecorators = {
        autoScroll: [{ type: Input }],
        autoScrollChange: [{ type: Output }],
        overflowAnchor: [{ type: HostBinding, args: ['style.overflow-anchor',] }]
    };
    return ScrollAnchorDirective;
}());

// tslint:disable:no-forward-ref
/**
 * @hidden
 */
var SuggestedActionsComponent = /** @class */ (function (_super) {
    __extends(SuggestedActionsComponent, _super);
    function SuggestedActionsComponent() {
        var _a;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dispatch = new EventEmitter();
        _this.defaultClass = true;
        _this.selectedIndex = 0;
        _this.keyHandlers = (_a = {}, _a[37 /* left */] = function (e) { return _this.navigateTo(e, -1); }, _a[39 /* right */] = function (e) { return _this.navigateTo(e, 1); }, _a[13 /* enter */] = function (_, action) { return _this.actionClick(action); }, _a);
        return _this;
    }
    SuggestedActionsComponent.prototype.isSelected = function (index) {
        return this.selected && this.selectedIndex === index;
    };
    SuggestedActionsComponent.prototype.actionClick = function (action) {
        this.dispatch.next(action);
    };
    SuggestedActionsComponent.prototype.actionKeydown = function (e, action) {
        var handler = this.keyHandlers[e.keyCode];
        if (handler) {
            handler(e, action);
        }
    };
    SuggestedActionsComponent.prototype.focus = function () {
        this.select(this.selectedIndex);
    };
    SuggestedActionsComponent.prototype.select = function (index) {
        this.selectedIndex = index;
        var item = this.items.toArray()[index];
        if (item) {
            item.nativeElement.focus();
        }
    };
    SuggestedActionsComponent.prototype.navigateTo = function (e, offset) {
        var prevIndex = this.selectedIndex;
        var nextIndex = Math.max(0, Math.min(prevIndex + offset, this.items.length - 1));
        if (nextIndex !== prevIndex) {
            this.select(nextIndex);
            e.preventDefault();
        }
    };
    SuggestedActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-chat-suggested-actions',
                    providers: [{
                            provide: ChatItem,
                            useExisting: forwardRef(function () { return SuggestedActionsComponent; })
                        }],
                    template: "\n    <span #item\n      *ngFor=\"let action of actions; index as index; first as first; last as last\"\n      class=\"k-quick-reply\"\n      [class.k-state-selected]=\"isSelected(index)\"\n      [class.k-state-focused]=\"isSelected(index)\"\n      [class.k-first]=\"first\"\n      [class.k-last]=\"last\"\n      [attr.tabindex]=\"tabbable && selectedIndex === index ? '0' : '-1'\"\n      (click)=\"actionClick(action)\"\n      (keydown)=\"actionKeydown($event, action)\"\n    >\n      {{ action.title || action.value }}\n    </span>\n  "
                },] },
    ];
    SuggestedActionsComponent.propDecorators = {
        actions: [{ type: Input }],
        tabbable: [{ type: Input }],
        dispatch: [{ type: Output }],
        defaultClass: [{ type: HostBinding, args: ['class.k-quick-replies',] }],
        items: [{ type: ViewChildren, args: ['item',] }]
    };
    return SuggestedActionsComponent;
}(ChatItem));

var PUBLIC_DIRECTIVES = [
    ChatComponent,
    CustomMessagesComponent,
    AttachmentTemplateDirective,
    MessageTemplateDirective,
    HeroCardComponent
];
var PRIVATE_DIRECTIVES = [
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
var ChatModule = /** @class */ (function () {
    function ChatModule() {
    }
    ChatModule.decorators = [
        { type: NgModule, args: [{
                    declarations: PUBLIC_DIRECTIVES.concat(PRIVATE_DIRECTIVES),
                    exports: [PUBLIC_DIRECTIVES],
                    imports: [
                        ButtonModule,
                        CommonModule,
                        ResizeSensorModule
                    ]
                },] },
    ];
    return ChatModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { PreventableEvent, HeroCardComponent, AttachmentComponent, ChatItem, CustomMessagesComponent, LocalizedMessagesDirective, Messages, MessageAttachmentsComponent, MessageListComponent, MessageComponent, SuggestedActionsComponent, FocusedStateDirective, ScrollAnchorDirective, ChatComponent, AttachmentTemplateDirective, MessageTemplateDirective, ChatModule, ExecuteActionEvent, SendMessageEvent };
