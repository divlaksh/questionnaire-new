import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * A directive that selects a [template]({{ site.data.urls.angular['templatesyntax'] }})
 * within the `<kendo-arcgauge>` component which will be used for the center template
 * ([more information and example]({% slug centertemplate_arcgauge %})).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-arcgauge [value]="value">
 *             <ng-template kendoArcGaugeCenterTemplate let-value="value">
 *                 {{ value }}%
 *             </ng-template>
 *         </kendo-arcgauge>
 *
 *     `
 * })
 * export class AppComponent {
 *   public value: number = 10;
 * }
 *
 * ```
 */
export class ArcCenterTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ArcCenterTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoArcGaugeCenterTemplate]'
            },] },
];
/** @nocollapse */
ArcCenterTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
