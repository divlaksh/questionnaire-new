import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { LegendItemComponentGenerated } from '../legend/item.component.generated';
/**
 * The configuration of the Chart legend item.
 *
 * @example
 *
 * ```html-no-run
 * <kendo-chart>
 *   <kendo-chart-legend>
 *      <kendo-chart-legend-item cursor="crosshair"></kendo-chart-legend-item>
 *   </kendo-chart-legend>
 * </kendo-chart>
 * ```
 */
var LegendItemComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LegendItemComponent, _super);
    // Place custom properties here
    function LegendItemComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    LegendItemComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-legend-item',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    LegendItemComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return LegendItemComponent;
}(LegendItemComponentGenerated));
export { LegendItemComponent };
