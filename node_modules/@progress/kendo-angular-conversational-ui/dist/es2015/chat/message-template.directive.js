import { Directive, Optional, TemplateRef } from "@angular/core";
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
export class MessageTemplateDirective {
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
