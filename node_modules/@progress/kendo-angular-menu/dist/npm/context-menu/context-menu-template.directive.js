"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents a template for the content of the ContextMenu. To define a template, nest an `<ng-template>`
 * tag with the `kendoContextMenuTemplate` directive inside a `<kendo-contextmenu>` component
 * ([more information and examples]({% slug templates_contextmenu %})).
 *
 * {% meta height:200 %}
 * {% embed_file context-menu/template/app.component.ts preview %}
 * {% embed_file context-menu/app.module.ts %}
 * {% embed_file main.ts %}
 * {% endmeta %}
 */
var ContextMenuTemplateDirective = /** @class */ (function () {
    function ContextMenuTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ContextMenuTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoContextMenuTemplate]'
                },] },
    ];
    /** @nocollapse */
    ContextMenuTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return ContextMenuTemplateDirective;
}());
exports.ContextMenuTemplateDirective = ContextMenuTemplateDirective;
