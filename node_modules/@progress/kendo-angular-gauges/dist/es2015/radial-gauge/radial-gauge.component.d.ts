import { NgZone, ElementRef, Renderer2 } from '@angular/core';
import { ConfigurationService, ThemeService } from '../services';
import { IntlService } from '@progress/kendo-angular-intl';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { RadialPointer, RadialScale } from '../types';
import { GaugeComponent } from '../base-components';
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
export declare class RadialGaugeComponent extends GaugeComponent {
    /**
     * The configuration of the pointers.
     */
    pointer: RadialPointer | RadialPointer[];
    /**
     * The configuration of the scale.
     */
    scale: RadialScale;
    constructor(configurationService: ConfigurationService, themeService: ThemeService, intlService: IntlService, localizationService: LocalizationService, element: ElementRef, renderer: Renderer2, ngZone: NgZone);
    protected createInstance(element: any, options: any, theme: any, context: any): void;
}
