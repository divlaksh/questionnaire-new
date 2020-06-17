import { Attachment } from '../api/attachment.interface';
import { AttachmentTemplateDirective } from './chat.directives';
/**
 * @hidden
 */
export declare class AttachmentComponent {
    attachment: Attachment;
    template: AttachmentTemplateDirective;
    readonly image: boolean;
    readonly unknown: boolean;
    context: any;
    private readonly contentType;
    private _attachment;
}
