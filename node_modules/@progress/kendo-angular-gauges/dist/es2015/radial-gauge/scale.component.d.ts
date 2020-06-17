import { ScaleComponent } from '../base-components';
import { ConfigurationService } from '../services';
import { RadialScale, RadialLabels, Range } from '../types';
/**
 * The configuration options for the scale of the RadialGauge
 * ([more information and example]({% slug scaleoptions_radialgauge %})).
 */
export declare class RadialScaleComponent extends ScaleComponent implements RadialScale {
    protected configurationService: ConfigurationService;
    labels?: RadialLabels;
    rangeDistance?: number;
    ranges?: Range[];
    startAngle?: number;
    endAngle?: number;
    constructor(configurationService: ConfigurationService);
}
