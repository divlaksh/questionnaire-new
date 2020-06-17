import { CollectionChangesService, ConfigurationService } from '../services';
import { CollectionItemComponent } from '../base-components';
import { LinearPointer, LinearPointerShape, Border, Margin } from '../types';
/**
 * The configuration options for a pointer item of a LinearGauge.
 */
export declare class LinearPointerComponent extends CollectionItemComponent implements LinearPointer {
    border?: Border;
    color?: string;
    margin?: number | Margin;
    opacity?: number;
    shape?: LinearPointerShape;
    size?: number;
    value?: number;
    constructor(configurationService: ConfigurationService, collectionChangesService: CollectionChangesService);
}
