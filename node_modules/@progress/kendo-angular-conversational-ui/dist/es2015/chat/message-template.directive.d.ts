import { TemplateRef } from "@angular/core";
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
export declare class MessageTemplateDirective {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
