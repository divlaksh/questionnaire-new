import { CollectionChangesService, ConfigurationService } from '../services';
import { RangeComponent } from '../base-components';
/**
 * The configuration options for a scale range item of a LinearGauge.
 */
export declare class LinearRangeComponent extends RangeComponent {
    constructor(configurationService: ConfigurationService, collectionChangesService: CollectionChangesService);
}
