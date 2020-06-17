"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
        { type: core_1.Directive, args: [{
                    selector: '[kendoChatAttachmentTemplate]'
                },] },
    ];
    /** @nocollapse */
    AttachmentTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return AttachmentTemplateDirective;
}());
exports.AttachmentTemplateDirective = AttachmentTemplateDirective;
