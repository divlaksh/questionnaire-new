import { NgZone, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { ConfigurationService, ThemeService } from '../services';
import { IntlService } from '@progress/kendo-angular-intl';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ArcScale, ColorRange } from '../types';
import { GaugeComponent } from '../base-components';
import { ArcCenterTemplateDirective } from './arc-center-template.directive';
import { Group } from '@progress/kendo-drawing';
/**
 * Represents the [Kendo UI ArcGauge component for Angular]({% slug overview_arcgauge_gauges %}).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *      <kendo-arcgauge [value]="value" [scale]="{ max: 100 }">
 *          <ng-template kendoArcGaugeCenterTemplate let-value="value">
 *              {{ value }}%
 *          </ng-template>
 *      </kendo-arcgauge>
 *   `
 * })
 * class AppComponent {
 *   public value: number = 10;
 * }
 *
 * ```
 */
export declare class ArcGaugeComponent extends GaugeComponent {
    protected changeDetector: ChangeDetectorRef;
    /**
     * The value of the ArcGauge.
     */
    value: number;
    /**
     * The color of the value pointer. Accepts a valid CSS color string, including hex and rgb.
     */
    color: string;
    /**
     * The color ranges of the value pointer.
     */
    colors: ColorRange[];
    /**
     * The opacity of the value pointer.
     */
    opacity: number;
    /**
     * The scale options of the ArcGauge.
     */
    scale: ArcScale;
    centerTemplate: ArcCenterTemplateDirective;
    labelElement: ElementRef;
    className: boolean;
    centerTemplateContext: any;
    constructor(changeDetector: ChangeDetectorRef, configurationService: ConfigurationService, themeService: ThemeService, intlService: IntlService, localizationService: LocalizationService, element: ElementRef, renderer: Renderer2, ngZone: NgZone);
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    /**
     * Exports the ArcGauge as a Drawing `Scene`.
     *
     * @returns {Promise<Group>} - A promise that will be resolved with the export visual.
     */
    exportVisual(): Promise<Group>;
    /**
     * Detects the size of the container and redraws the Gauge.
     * Resizing is automatic unless you set the `resizeRateLimit` option to `0`.
     */
    resize(): void;
    protected createInstance(element: any, options: any, theme: any, context: any): void;
    protected updateOptions(): void;
    protected setValues(): void;
    protected updateElements(): void;
    protected updateCenterTemplate(): void;
    protected positionLabel(): void;
    protected updateSize(): void;
}
