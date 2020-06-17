import { Component, Input, ViewChild, TemplateRef } from '@angular/core';
import { BaseTooltip } from './base-tooltip';
import { PopupService, POPUP_CONTAINER } from '@progress/kendo-angular-popup';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { bodyFactory } from './body-factory';
const ɵ0 = bodyFactory;
// Codelyzer 2.0.0-beta2 doesn't handle inherited members
/* tslint:disable:no-access-missing-member */
/**
 * @hidden
 */
export class CrosshairTooltipComponent extends BaseTooltip {
    constructor(popupService, localizationService) {
        super(popupService, localizationService);
        this.animate = false;
    }
    show(e) {
        super.show(e);
        this.value = e.value;
        this.popupRef.popup.changeDetectorRef.detectChanges();
    }
}
CrosshairTooltipComponent.decorators = [
    { type: Component, args: [{
                providers: [PopupService, {
                        provide: POPUP_CONTAINER,
                        useFactory: ɵ0
                    }],
                selector: 'kendo-chart-crosshair-tooltip',
                template: `
        <ng-template #content>
            <div class="k-chart-tooltip k-chart-crosshair-tooltip" [ngStyle]="style">
                {{ value }}
            </div>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
CrosshairTooltipComponent.ctorParameters = () => [
    { type: PopupService },
    { type: LocalizationService }
];
CrosshairTooltipComponent.propDecorators = {
    templateRef: [{ type: ViewChild, args: ['content',] }],
    key: [{ type: Input }],
    popupSettings: [{ type: Input }]
};
export { ɵ0 };
