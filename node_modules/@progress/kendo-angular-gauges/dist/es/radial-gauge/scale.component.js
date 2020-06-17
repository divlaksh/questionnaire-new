import * as tslib_1 from "tslib";
import { Input, Component } from '@angular/core';
import { ScaleComponent } from '../base-components';
import { ConfigurationService } from '../services';
/**
 * The configuration options for the scale of the RadialGauge
 * ([more information and example]({% slug scaleoptions_radialgauge %})).
 */
var RadialScaleComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RadialScaleComponent, _super);
    function RadialScaleComponent(configurationService) {
        var _this = _super.call(this, 'scale', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    RadialScaleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-radialgauge-scale',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    RadialScaleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    RadialScaleComponent.propDecorators = {
        labels: [{ type: Input }],
        rangeDistance: [{ type: Input }],
        ranges: [{ type: Input }],
        startAngle: [{ type: Input }],
        endAngle: [{ type: Input }]
    };
    return RadialScaleComponent;
}(ScaleComponent));
export { RadialScaleComponent };
