import { GaugeAreaComponent } from '../base-components';
import { ConfigurationService } from '../services';
/**
 * The configuration options for the RadialGauge area.
 * Represents the entire visible area of the RadialGauge.
 */
export declare class RadialGaugeAreaComponent extends GaugeAreaComponent {
    protected configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
