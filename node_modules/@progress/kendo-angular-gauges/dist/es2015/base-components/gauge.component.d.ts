import { NgZone, ElementRef, Renderer2, SimpleChange, AfterViewChecked, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ConfigurationService, ThemeService } from '../services';
import { IntlService } from '@progress/kendo-angular-intl';
import { GaugeArea, Scale } from '../types';
import { ImageExportOptions, Group, SVGExportOptions } from '@progress/kendo-drawing';
import { ResizeSensorComponent } from '@progress/kendo-angular-common';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare abstract class GaugeComponent implements AfterViewChecked, OnChanges, OnDestroy, OnInit {
    protected configurationService: ConfigurationService;
    protected themeService: ThemeService;
    protected intlService: IntlService;
    protected localizationService: LocalizationService;
    protected element: ElementRef;
    protected renderer: Renderer2;
    protected ngZone: NgZone;
    /**
     * Specifies options for the Gauge area.
     */
    gaugeArea: GaugeArea;
    /**
     * Specifies the output type.
     */
    renderAs: 'canvas' | 'svg';
    /**
     * The maximum number of times the Gauge resizes per second.
     * Defaults to `10`. To disable the automatic resizing, set `resizeRateLimit` to `0`.
     */
    resizeRateLimit: number;
    /**
     * Specifies the scale options.
     */
    scale: Scale;
    /**
     * Specifies if the changes will be animated.
     */
    transitions: boolean;
    surfaceElement: ElementRef;
    resizeSensor: ResizeSensorComponent;
    className: boolean;
    protected options: any;
    protected theme: any;
    protected instance: any;
    protected subscriptions: any;
    protected redrawTimeout: any;
    protected rtl: boolean;
    constructor(configurationService: ConfigurationService, themeService: ThemeService, intlService: IntlService, localizationService: LocalizationService, element: ElementRef, renderer: Renderer2, ngZone: NgZone);
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    protected updateCall(updateMethod: any): void;
    protected updateOptions(): void;
    protected setValues(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
    /**
     * Exports the Gauge as an image. The export operation is asynchronous and returns a promise.
     *
     * @param {ImageExportOptions} options - The parameters for the exported image.
     * @returns {Promise<string>} - A promise that will be resolved with a PNG image that is encoded as a Data URI.
     */
    exportImage(options?: ImageExportOptions): Promise<string>;
    /**
     * Exports the Gauge as an SVG document. The export operation is asynchronous and returns a promise.
     *
     * @param {SVGExportOptions} options - The parameters for the exported file.
     * @returns {Promise<string>} - A promise that will be resolved with an SVG document that is encoded as a Data URI.
     */
    exportSVG(options?: SVGExportOptions): Promise<string>;
    /**
     * Exports the Gauge as a Drawing `Scene`.
     *
     * @returns {Promise<Group>} - A promise that will be resolved with the export visual.
     */
    exportVisual(): Promise<Group>;
    /**
     * @hidden
     */
    onResize(_event?: any): void;
    /**
     * Detects the size of the container and redraws the Gauge.
     * Resizing is automatic unless you set the `resizeRateLimit` option to `0`.
     */
    resize(): void;
    protected abstract createInstance(element: any, options: any, theme: any, context: any): void;
    protected init(): void;
    protected readonly autoResize: boolean;
    protected updateSize(): void;
    protected intlChange(): void;
    protected rtlChange(): void;
    protected deferredRedraw(): void;
    protected defer(callback: any): void;
    protected updateDirection(): void;
    protected setDirection(): void;
    protected readonly isRTL: boolean;
}
