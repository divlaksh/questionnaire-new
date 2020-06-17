import { TemplateRef } from '@angular/core';
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
export declare class ContextMenuTemplateDirective {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
