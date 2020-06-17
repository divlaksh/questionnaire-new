import { ElementRef } from '@angular/core';
import { Message } from '../api/message.interface';
import { ChatItem } from './chat-item';
import { MessageTemplateDirective } from './message-template.directive';
import { IntlService } from '@progress/kendo-angular-intl';
/**
 * @hidden
 */
export declare class MessageComponent extends ChatItem {
    private element;
    private intl;
    message: Message;
    tabbable: boolean;
    template: MessageTemplateDirective;
    cssClass: boolean;
    selected: boolean;
    readonly tabIndex: string;
    constructor(element: ElementRef, intl: IntlService);
    formatTimeStamp(date: any): string;
    focus(): void;
}
