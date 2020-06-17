import { RadialLabelsComponent } from '../radial-gauge/labels.component';
import { ConfigurationService } from '../services';
/**
 * The configuration options for the scale labels of the ArcGauge.
 */
export declare class ArcLabelsComponent extends RadialLabelsComponent {
    protected configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
