import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { LegendInactiveItemsComponentGenerated } from '../legend/inactive-items.component.generated';
/**
 * The configuration of the inactive Chart legend items.
 *
 * @example
 *
 * ```html-no-run
 * <kendo-chart>
 *   <kendo-chart-legend>
 *      <kendo-chart-legend-inactive-items [labels]="{color: 'pink'}"></kendo-chart-legend-inactive-items>
 *   </kendo-chart-legend>
 * </kendo-chart>
 * ```
 */
var LegendInactiveItemsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LegendInactiveItemsComponent, _super);
    // Place custom properties here
    function LegendInactiveItemsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    LegendInactiveItemsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-legend-inactive-items',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    LegendInactiveItemsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return LegendInactiveItemsComponent;
}(LegendInactiveItemsComponentGenerated));
export { LegendInactiveItemsComponent };
