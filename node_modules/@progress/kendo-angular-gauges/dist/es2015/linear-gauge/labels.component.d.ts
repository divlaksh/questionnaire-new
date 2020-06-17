import { LabelsComponent } from '../base-components';
import { ConfigurationService } from '../services';
/**
 * The configuration options for the scale labels of the LinearGauge.
 */
export declare class LinearLabelsComponent extends LabelsComponent {
    protected configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
