import * as tslib_1 from "tslib";
import { Component, NgZone, Input, ChangeDetectionStrategy, ElementRef, Renderer2 } from '@angular/core';
import { ConfigurationService, ThemeService } from '../services';
import { IntlService } from '@progress/kendo-angular-intl';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { GaugeComponent } from '../base-components';
import { LinearGauge } from '@progress/kendo-charts';
/**
 * Represents the [Kendo UI LinearGauge component for Angular]({% slug overview_lineargauge_gauges %}).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *      <kendo-lineargauge [pointer]="{ value: value }">
 *      </kendo-lineargauge>
 *   `
 * })
 * class AppComponent {
 *   public value: number = 10;
 * }
 *
 * ```
 */
var LinearGaugeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LinearGaugeComponent, _super);
    function LinearGaugeComponent(configurationService, themeService, intlService, localizationService, element, renderer, ngZone) {
        return _super.call(this, configurationService, themeService, intlService, localizationService, element, renderer, ngZone) || this;
    }
    LinearGaugeComponent.prototype.createInstance = function (element, options, theme, context) {
        this.instance = new LinearGauge(element, options, theme, context);
    };
    LinearGaugeComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    exportAs: 'kendoLinearGauge',
                    providers: [
                        ConfigurationService,
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.lineargauge'
                        }
                    ],
                    selector: 'kendo-lineargauge',
                    template: "\n    <div #surface class='k-chart-surface'></div>\n    <kendo-resize-sensor (resize)=\"onResize($event)\" [rateLimit]=\"resizeRateLimit\"></kendo-resize-sensor>\n  "
                },] },
    ];
    /** @nocollapse */
    LinearGaugeComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: ThemeService },
        { type: IntlService },
        { type: LocalizationService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
    LinearGaugeComponent.propDecorators = {
        pointer: [{ type: Input }],
        scale: [{ type: Input }]
    };
    return LinearGaugeComponent;
}(GaugeComponent));
export { LinearGaugeComponent };
