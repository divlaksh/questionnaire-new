import { AfterViewInit, ElementRef, EventEmitter, QueryList } from '@angular/core';
import { Action } from '../api/action.interface';
import { ExecuteActionEvent } from '../api/execute-action-event';
import { Message } from '../api/message.interface';
import { User } from '../api/user.interface';
import { ChatItem } from './chat-item';
import { ViewItem } from './chat-view';
import { AttachmentTemplateDirective } from './chat.directives';
import { MessageTemplateDirective } from './message-template.directive';
import { IntlService } from '@progress/kendo-angular-intl';
/**
 * @hidden
 */
export declare class MessageListComponent implements AfterViewInit {
    private element;
    private intl;
    messages: Message[];
    attachmentTemplate: AttachmentTemplateDirective;
    messageTemplate: MessageTemplateDirective;
    user: User;
    executeAction: EventEmitter<ExecuteActionEvent>;
    navigate: EventEmitter<any>;
    resize: EventEmitter<any>;
    items: QueryList<ChatItem>;
    cssClass: boolean;
    view: ViewItem[];
    private _messages;
    private selectedItem;
    private keyActions;
    constructor(element: ElementRef, intl: IntlService);
    ngAfterViewInit(): void;
    onResize(): void;
    formatTimeStamp(date: any): string;
    onKeydown(e: any): void;
    onBlur(args: FocusEvent): void;
    isOwnMessage(msg: Message): boolean;
    dispatchAction(action: Action, message: Message): void;
    trackGroup(_index: number, item: ViewItem): any;
    select(item: ChatItem): void;
    last(items: any): any;
    private navigateTo;
}
