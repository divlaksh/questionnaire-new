import { Message, User, Action, Attachment, AttachmentLayout } from '../main';
/**
 * @hidden
 */
export interface MessageGroup {
    type: 'message-group';
    messages: Message[];
    author: User;
    timestamp: Date;
    trackBy: any;
}
/**
 * @hidden
 */
export interface AttachmentGroup {
    type: 'attachment-group';
    attachments: Attachment[];
    attachmentLayout: AttachmentLayout;
    timestamp: Date;
    trackBy: any;
}
/**
 * @hidden
 */
export interface ActionGroup {
    type: 'action-group';
    actions?: Action[];
    timestamp: Date;
    trackBy: any;
}
/**
 * @hidden
 */
export interface DateMarker {
    type: 'date-marker';
    timestamp: Date;
    trackBy: any;
}
/**
 * @hidden
 */
export declare type ViewItem = MessageGroup | AttachmentGroup | ActionGroup | DateMarker;
/**
 * @hidden
 */
export declare const isAuthor: (user: User, msg: Message) => boolean;
/**
 * @hidden
 */
export declare const chatView: (messages: Message[]) => ViewItem[];
