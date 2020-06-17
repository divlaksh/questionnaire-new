import { NgZone, ElementRef, Renderer2 } from '@angular/core';
import { ConfigurationService, ThemeService } from '../services';
import { IntlService } from '@progress/kendo-angular-intl';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { LinearPointer, LinearScale } from '../types';
import { GaugeComponent } from '../base-components';
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
export declare class LinearGaugeComponent extends GaugeComponent {
    /**
     * The configuration of the pointers.
     */
    pointer: LinearPointer | LinearPointer[];
    /**
     * The configuration of the scale.
     */
    scale: LinearScale;
    constructor(configurationService: ConfigurationService, themeService: ThemeService, intlService: IntlService, localizationService: LocalizationService, element: ElementRef, renderer: Renderer2, ngZone: NgZone);
    protected createInstance(element: any, options: any, theme: any, context: any): void;
}
