import { Component } from '@angular/core';
import { RadialLabelsComponent } from '../radial-gauge/labels.component';
import { ConfigurationService } from '../services';
/**
 * The configuration options for the scale labels of the ArcGauge.
 */
export class ArcLabelsComponent extends RadialLabelsComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        configurationService.set(`${this.key}.visible`, true);
    }
}
ArcLabelsComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-arcgauge-scale-labels',
                template: ''
            },] },
];
/** @nocollapse */
ArcLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
