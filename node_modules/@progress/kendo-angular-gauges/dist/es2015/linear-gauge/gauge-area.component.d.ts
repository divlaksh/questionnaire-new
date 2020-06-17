import { GaugeAreaComponent } from '../base-components';
import { ConfigurationService } from '../services';
/**
 * The configuration options for the LinearGauge area.
 * Represents the entire visible area of the LinearGauge.
 */
export declare class LinearGaugeAreaComponent extends GaugeAreaComponent {
    protected configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
