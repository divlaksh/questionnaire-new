import { Input, Component } from '@angular/core';
import { ScaleComponent } from '../base-components';
import { ConfigurationService } from '../services';
/**
 * The configuration options for the scale of the LinearGauge
 * ([see example]({% slug scaleoptions_lineargauge %})).
 */
export class LinearScaleComponent extends ScaleComponent {
    constructor(configurationService) {
        super('scale', configurationService);
        this.configurationService = configurationService;
    }
}
LinearScaleComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-lineargauge-scale',
                template: ''
            },] },
];
/** @nocollapse */
LinearScaleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
LinearScaleComponent.propDecorators = {
    line: [{ type: Input }],
    ranges: [{ type: Input }],
    mirror: [{ type: Input }],
    vertical: [{ type: Input }]
};
