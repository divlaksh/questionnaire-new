import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, NgZone } from '@angular/core';
import { AttachmentTemplateDirective } from './attachment-template.directive';
import { ExecuteActionEvent } from '../api/execute-action-event';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Message } from '../api/message.interface';
import { MessageTemplateDirective } from './message-template.directive';
import { SendMessageEvent } from '../api/post-message-event';
import { User } from '../api/user.interface';
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
export declare class ChatComponent implements AfterViewInit, OnDestroy {
    private localization;
    private zone;
    /**
     * Sets the messages of the Chat.
     * The message timestamp, if provided, tracks unique messages.
     * For more information, refer to [ngFor - Change Tracking]({{ site.data.urls.angular['ngforof'] }}#change-propagation).
     */
    messages: Message[];
    /**
     * Sets the [`User`]({% slug api_conversational-ui_user %}) instance for the local user.
     * The User ID identifies messages that are authored by the local user.
     */
    user: User;
    /**
     * Fires when the user types a message and clicks the **Send** button or presses **Enter**.
     * Emits the [`SendMessageEvent`]({% slug api_conversational-ui_sendmessageevent %}).
     *
     * > The message is not automatically appended to the `messages` array.
     */
    sendMessage: EventEmitter<SendMessageEvent>;
    /**
     * Fires when the user clicks a quick action button.
     * The Chat internally handles the `reply`, `openUrl`, and `call` [known actions]({% slug api_conversational-ui_actiontype %}).
     *
     * Emits the [`ExecuteActionEvent`]({% slug api_conversational-ui_executeactionevent %}).
     * The event is preventable. If `preventDefault` is called, the built-in action will be suppressed.
     */
    executeAction: EventEmitter<ExecuteActionEvent>;
    readonly className: string;
    readonly dirAttr: string;
    attachmentTemplate: AttachmentTemplateDirective;
    messageTemplate: MessageTemplateDirective;
    /**
     * @hidden
     */
    messageInput: ElementRef;
    /**
     * @hidden
     */
    messageList: ElementRef;
    /**
     * @hidden
     */
    autoScroll: boolean;
    private direction;
    private localizationChangeSubscription;
    constructor(localization: LocalizationService, zone: NgZone);
    ngOnChanges(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    sendClick(): void;
    /**
     * @hidden
     */
    inputKeydown(e: any): void;
    /**
     * @hidden
     */
    dispatchAction(e: ExecuteActionEvent): void;
    /**
     * @hidden
     */
    textFor(key: string): string;
}
