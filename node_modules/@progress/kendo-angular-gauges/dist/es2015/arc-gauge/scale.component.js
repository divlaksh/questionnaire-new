import { Input, Component } from '@angular/core';
import { ScaleComponent } from '../base-components';
import { ConfigurationService } from '../services';
/**
 * The configuration options for the scale of the ArcGauge
 * ([see example]({% slug scaleoptions_arcgauge %})).
 */
export class ArcScaleComponent extends ScaleComponent {
    constructor(configurationService) {
        super('scale', configurationService);
        this.configurationService = configurationService;
    }
}
ArcScaleComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-arcgauge-scale',
                template: ''
            },] },
];
/** @nocollapse */
ArcScaleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
ArcScaleComponent.propDecorators = {
    labels: [{ type: Input }],
    rangeDistance: [{ type: Input }],
    rangeLineCap: [{ type: Input }],
    startAngle: [{ type: Input }],
    endAngle: [{ type: Input }]
};
