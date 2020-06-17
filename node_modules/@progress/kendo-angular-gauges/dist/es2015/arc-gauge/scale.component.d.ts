import { ScaleComponent } from '../base-components';
import { ConfigurationService } from '../services';
import { ArcScale, RadialLabels, LineCap } from '../types';
/**
 * The configuration options for the scale of the ArcGauge
 * ([see example]({% slug scaleoptions_arcgauge %})).
 */
export declare class ArcScaleComponent extends ScaleComponent implements ArcScale {
    protected configurationService: ConfigurationService;
    labels?: RadialLabels;
    rangeDistance?: number;
    rangeLineCap?: LineCap;
    startAngle?: number;
    endAngle?: number;
    constructor(configurationService: ConfigurationService);
}
