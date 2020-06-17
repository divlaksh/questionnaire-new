import { ScaleComponent } from '../base-components';
import { ConfigurationService } from '../services';
import { LinearScale, Line, Range } from '../types';
/**
 * The configuration options for the scale of the LinearGauge
 * ([see example]({% slug scaleoptions_lineargauge %})).
 */
export declare class LinearScaleComponent extends ScaleComponent implements LinearScale {
    protected configurationService: ConfigurationService;
    line?: Line;
    ranges?: Range[];
    mirror?: boolean;
    vertical?: boolean;
    constructor(configurationService: ConfigurationService);
}
