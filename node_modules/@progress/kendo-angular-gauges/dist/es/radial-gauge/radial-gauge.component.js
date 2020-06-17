import * as tslib_1 from "tslib";
import { Component, NgZone, Input, ChangeDetectionStrategy, ElementRef, Renderer2 } from '@angular/core';
import { ConfigurationService, ThemeService } from '../services';
import { IntlService } from '@progress/kendo-angular-intl';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { GaugeComponent } from '../base-components';
import { RadialGauge } from '@progress/kendo-charts';
/**
 * Represents the [Kendo UI RadialGauge component for Angular]({% slug overview_radialgauge_gauges %}).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *      <kendo-radialgauge [pointer]="{ value: value }">
 *      </kendo-radialgauge>
 *   `
 * })
 * class AppComponent {
 *   public value: number = 10;
 * }
 *
 * ```
 */
var RadialGaugeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RadialGaugeComponent, _super);
    function RadialGaugeComponent(configurationService, themeService, intlService, localizationService, element, renderer, ngZone) {
        return _super.call(this, configurationService, themeService, intlService, localizationService, element, renderer, ngZone) || this;
    }
    RadialGaugeComponent.prototype.createInstance = function (element, options, theme, context) {
        this.instance = new RadialGauge(element, options, theme, context);
    };
    RadialGaugeComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    exportAs: 'kendoRadialGauge',
                    providers: [
                        ConfigurationService,
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.radialgauge'
                        }
                    ],
                    selector: 'kendo-radialgauge',
                    template: "\n    <div #surface class='k-chart-surface'></div>\n    <kendo-resize-sensor (resize)=\"onResize($event)\" [rateLimit]=\"resizeRateLimit\"></kendo-resize-sensor>\n  "
                },] },
    ];
    /** @nocollapse */
    RadialGaugeComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: ThemeService },
        { type: IntlService },
        { type: LocalizationService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
    RadialGaugeComponent.propDecorators = {
        pointer: [{ type: Input }],
        scale: [{ type: Input }]
    };
    return RadialGaugeComponent;
}(GaugeComponent));
export { RadialGaugeComponent };
