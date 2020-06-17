import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisCrosshairComponentGenerated } from '../category-axis-item/crosshair.component.generated';
/**
 * The crosshair configuration options ([see example]({% slug crosshairs_chart_charts %})).
 */
export declare class CategoryAxisCrosshairComponent extends CategoryAxisCrosshairComponentGenerated {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
