import { Input, Component } from '@angular/core';
import { LabelsComponent } from '../base-components';
import { ConfigurationService } from '../services';
/**
 * The configuration options for the scale labels of the RadialGauge.
 */
export class RadialLabelsComponent extends LabelsComponent {
    constructor(configurationService) {
        super('scale.labels', configurationService);
        this.configurationService = configurationService;
    }
}
RadialLabelsComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-radialgauge-scale-labels',
                template: ''
            },] },
];
/** @nocollapse */
RadialLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
RadialLabelsComponent.propDecorators = {
    position: [{ type: Input }]
};
