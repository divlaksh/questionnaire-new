import { Component } from '@angular/core';
import { GaugeAreaComponent } from '../base-components';
import { ConfigurationService } from '../services';
/**
 * The configuration options for the LinearGauge area.
 * Represents the entire visible area of the LinearGauge.
 */
export class LinearGaugeAreaComponent extends GaugeAreaComponent {
    constructor(configurationService) {
        super('gaugeArea', configurationService);
        this.configurationService = configurationService;
    }
}
LinearGaugeAreaComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-lineargauge-area',
                template: ''
            },] },
];
/** @nocollapse */
LinearGaugeAreaComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
