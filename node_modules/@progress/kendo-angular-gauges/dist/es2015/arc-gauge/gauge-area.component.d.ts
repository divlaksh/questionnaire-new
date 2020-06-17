import { GaugeAreaComponent } from '../base-components';
import { ConfigurationService } from '../services';
/**
 * The configuration options of the ArcGauge area.
 * Represents the entire visible area of the ArcGauge.
 */
export declare class ArcGaugeAreaComponent extends GaugeAreaComponent {
    protected configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
