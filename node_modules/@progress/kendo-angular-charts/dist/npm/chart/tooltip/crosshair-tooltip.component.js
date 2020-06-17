"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var base_tooltip_1 = require("./base-tooltip");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var body_factory_1 = require("./body-factory");
var ɵ0 = body_factory_1.bodyFactory;
exports.ɵ0 = ɵ0;
// Codelyzer 2.0.0-beta2 doesn't handle inherited members
/* tslint:disable:no-access-missing-member */
/**
 * @hidden
 */
var CrosshairTooltipComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CrosshairTooltipComponent, _super);
    function CrosshairTooltipComponent(popupService, localizationService) {
        var _this = _super.call(this, popupService, localizationService) || this;
        _this.animate = false;
        return _this;
    }
    CrosshairTooltipComponent.prototype.show = function (e) {
        _super.prototype.show.call(this, e);
        this.value = e.value;
        this.popupRef.popup.changeDetectorRef.detectChanges();
    };
    CrosshairTooltipComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [kendo_angular_popup_1.PopupService, {
                            provide: kendo_angular_popup_1.POPUP_CONTAINER,
                            useFactory: ɵ0
                        }],
                    selector: 'kendo-chart-crosshair-tooltip',
                    template: "\n        <ng-template #content>\n            <div class=\"k-chart-tooltip k-chart-crosshair-tooltip\" [ngStyle]=\"style\">\n                {{ value }}\n            </div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    CrosshairTooltipComponent.ctorParameters = function () { return [
        { type: kendo_angular_popup_1.PopupService },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    CrosshairTooltipComponent.propDecorators = {
        templateRef: [{ type: core_1.ViewChild, args: ['content',] }],
        key: [{ type: core_1.Input }],
        popupSettings: [{ type: core_1.Input }]
    };
    return CrosshairTooltipComponent;
}(base_tooltip_1.BaseTooltip));
exports.CrosshairTooltipComponent = CrosshairTooltipComponent;
