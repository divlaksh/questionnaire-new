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
export declare class LegendInactiveItemsComponent extends LegendInactiveItemsComponentGenerated {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
