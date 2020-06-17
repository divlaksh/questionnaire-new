import * as tslib_1 from "tslib";
import { Input, Component } from '@angular/core';
import { ScaleComponent } from '../base-components';
import { ConfigurationService } from '../services';
/**
 * The configuration options for the scale of the ArcGauge
 * ([see example]({% slug scaleoptions_arcgauge %})).
 */
var ArcScaleComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ArcScaleComponent, _super);
    function ArcScaleComponent(configurationService) {
        var _this = _super.call(this, 'scale', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ArcScaleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-arcgauge-scale',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ArcScaleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    ArcScaleComponent.propDecorators = {
        labels: [{ type: Input }],
        rangeDistance: [{ type: Input }],
        rangeLineCap: [{ type: Input }],
        startAngle: [{ type: Input }],
        endAngle: [{ type: Input }]
    };
    return ArcScaleComponent;
}(ScaleComponent));
export { ArcScaleComponent };
