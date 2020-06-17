import { Input, Component } from '@angular/core';
import { ScaleComponent } from '../base-components';
import { ConfigurationService } from '../services';
/**
 * The configuration options for the scale of the RadialGauge
 * ([more information and example]({% slug scaleoptions_radialgauge %})).
 */
export class RadialScaleComponent extends ScaleComponent {
    constructor(configurationService) {
        super('scale', configurationService);
        this.configurationService = configurationService;
    }
}
RadialScaleComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-radialgauge-scale',
                template: ''
            },] },
];
/** @nocollapse */
RadialScaleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
RadialScaleComponent.propDecorators = {
    labels: [{ type: Input }],
    rangeDistance: [{ type: Input }],
    ranges: [{ type: Input }],
    startAngle: [{ type: Input }],
    endAngle: [{ type: Input }]
};
