import { CollectionChangesService, ConfigurationService } from '../services';
import { CollectionItemComponent } from '../base-components';
import { RadialPointer, Cap } from '../types';
/**
 * The configuration options for a pointer item of a RadialGauge.
 */
export declare class RadialPointerComponent extends CollectionItemComponent implements RadialPointer {
    cap?: Cap;
    color?: string;
    length?: number;
    value?: number;
    constructor(configurationService: ConfigurationService, collectionChangesService: CollectionChangesService);
}
