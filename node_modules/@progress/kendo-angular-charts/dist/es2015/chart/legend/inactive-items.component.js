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
export class LegendInactiveItemsComponent extends LegendInactiveItemsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
LegendInactiveItemsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-legend-inactive-items',
                template: ''
            },] },
];
/** @nocollapse */
LegendInactiveItemsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
