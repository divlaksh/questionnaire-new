import { Component, ChangeDetectorRef, ContentChild, TemplateRef } from '@angular/core';
/**
 * @hidden
 */
export class HintContainerComponent {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.changeDetector.detach();
    }
    detectChanges() {
        this.changeDetector.detectChanges();
    }
}
HintContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-hint-container',
                template: `
        <ng-container [ngTemplateOutlet]="hintTemplate">
        </ng-container>
    `
            },] },
];
/** @nocollapse */
HintContainerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
HintContainerComponent.propDecorators = {
    hintTemplate: [{ type: ContentChild, args: [TemplateRef,] }]
};
