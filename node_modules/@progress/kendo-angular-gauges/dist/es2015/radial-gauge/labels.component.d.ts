import { LabelsComponent } from '../base-components';
import { ConfigurationService } from '../services';
import { RadialLabels, RadialLabelPosition } from '../types';
/**
 * The configuration options for the scale labels of the RadialGauge.
 */
export declare class RadialLabelsComponent extends LabelsComponent implements RadialLabels {
    protected configurationService: ConfigurationService;
    position: RadialLabelPosition;
    constructor(configurationService: ConfigurationService);
}
