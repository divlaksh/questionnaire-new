import { Input, Component } from '@angular/core';
import { CollectionChangesService, ConfigurationService } from '../services';
import { CollectionItemComponent } from '../base-components';
/**
 * The configuration options for a pointer item of a RadialGauge.
 */
export class RadialPointerComponent extends CollectionItemComponent {
    constructor(configurationService, collectionChangesService) {
        super(configurationService, collectionChangesService);
    }
}
RadialPointerComponent.decorators = [
    { type: Component, args: [{
                providers: [ConfigurationService],
                selector: 'kendo-radialgauge-pointer',
                template: ''
            },] },
];
/** @nocollapse */
RadialPointerComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionChangesService }
];
RadialPointerComponent.propDecorators = {
    cap: [{ type: Input }],
    color: [{ type: Input }],
    length: [{ type: Input }],
    value: [{ type: Input }]
};
