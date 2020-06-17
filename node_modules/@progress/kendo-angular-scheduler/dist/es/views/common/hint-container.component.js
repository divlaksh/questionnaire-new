import { Component, ChangeDetectorRef, ContentChild, TemplateRef } from '@angular/core';
/**
 * @hidden
 */
var HintContainerComponent = /** @class */ (function () {
    function HintContainerComponent(changeDetector) {
        this.changeDetector = changeDetector;
        this.changeDetector.detach();
    }
    HintContainerComponent.prototype.detectChanges = function () {
        this.changeDetector.detectChanges();
    };
    HintContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-hint-container',
                    template: "\n        <ng-container [ngTemplateOutlet]=\"hintTemplate\">\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    HintContainerComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    HintContainerComponent.propDecorators = {
        hintTemplate: [{ type: ContentChild, args: [TemplateRef,] }]
    };
    return HintContainerComponent;
}());
export { HintContainerComponent };
