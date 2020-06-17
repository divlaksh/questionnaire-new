"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
        { type: core_1.Component, args: [{
                    selector: 'kendo-hint-container',
                    template: "\n        <ng-container [ngTemplateOutlet]=\"hintTemplate\">\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    HintContainerComponent.ctorParameters = function () { return [
        { type: core_1.ChangeDetectorRef }
    ]; };
    HintContainerComponent.propDecorators = {
        hintTemplate: [{ type: core_1.ContentChild, args: [core_1.TemplateRef,] }]
    };
    return HintContainerComponent;
}());
exports.HintContainerComponent = HintContainerComponent;
