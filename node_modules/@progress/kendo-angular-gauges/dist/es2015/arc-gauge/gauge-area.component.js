import { Component } from '@angular/core';
import { GaugeAreaComponent } from '../base-components';
import { ConfigurationService } from '../services';
/**
 * The configuration options of the ArcGauge area.
 * Represents the entire visible area of the ArcGauge.
 */
export class ArcGaugeAreaComponent extends GaugeAreaComponent {
    constructor(configurationService) {
        super('gaugeArea', configurationService);
        this.configurationService = configurationService;
    }
}
ArcGaugeAreaComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-arcgauge-area',
                template: ''
            },] },
];
/** @nocollapse */
ArcGaugeAreaComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
