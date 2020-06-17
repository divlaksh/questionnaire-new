import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisLabelsComponentGenerated } from '../category-axis-item/labels.component.generated';
/**
 * The configuration of the axis labels ([see example]({% slug labels_chart_charts %})).
 */
export declare class CategoryAxisLabelsComponent extends CategoryAxisLabelsComponentGenerated {
    configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService);
}
