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
export class RadialGaugeComponent extends GaugeComponent {
    constructor(configurationService, themeService, intlService, localizationService, element, renderer, ngZone) {
        super(configurationService, themeService, intlService, localizationService, element, renderer, ngZone);
    }
    createInstance(element, options, theme, context) {
        this.instance = new RadialGauge(element, options, theme, context);
    }
}
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
                template: `
    <div #surface class='k-chart-surface'></div>
    <kendo-resize-sensor (resize)="onResize($event)" [rateLimit]="resizeRateLimit"></kendo-resize-sensor>
  `
            },] },
];
/** @nocollapse */
RadialGaugeComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: ThemeService },
    { type: IntlService },
    { type: LocalizationService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
RadialGaugeComponent.propDecorators = {
    pointer: [{ type: Input }],
    scale: [{ type: Input }]
};
