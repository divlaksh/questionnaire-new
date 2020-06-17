import { ConfigurationService } from '../../common/configuration.service';
import { ValueAxisCrosshairComponentGenerated } from '../value-axis-item/crosshair.component.generated';
/**
 * The crosshair configuration options ([see example]({% slug crosshairs_chart_charts %})).
 */
export declare class ValueAxisCrosshairComponent extends ValueAxisCrosshairComponentGenerated {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
