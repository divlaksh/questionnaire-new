import { HostBinding, Component, NgZone, Input, ChangeDetectionStrategy, ContentChild, ViewChild, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { ConfigurationService, ThemeService } from '../services';
import { IntlService } from '@progress/kendo-angular-intl';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { GaugeComponent } from '../base-components';
import { ArcCenterTemplateDirective } from './arc-center-template.directive';
import { ArcGauge } from '@progress/kendo-charts';
import { drawDOM } from '@progress/kendo-drawing';
/* tslint:disable:use-life-cycle-interface */
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
export class ArcGaugeComponent extends GaugeComponent {
    constructor(changeDetector, configurationService, themeService, intlService, localizationService, element, renderer, ngZone) {
        super(configurationService, themeService, intlService, localizationService, element, renderer, ngZone);
        this.changeDetector = changeDetector;
        this.className = true;
        this.centerTemplateContext = {};
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.element) {
            this.renderer.setStyle(this.element.nativeElement, 'position', 'relative');
        }
    }
    ngAfterViewChecked() {
        super.ngAfterViewChecked();
        if (this.labelElement && !this.centerTemplate) {
            this.changeDetector.detectChanges();
        }
        else if (!this.labelElement && this.centerTemplate) {
            this.updateCenterTemplate();
        }
    }
    /**
     * Exports the ArcGauge as a Drawing `Scene`.
     *
     * @returns {Promise<Group>} - A promise that will be resolved with the export visual.
     */
    exportVisual() {
        return drawDOM(this.element.nativeElement);
    }
    /**
     * Detects the size of the container and redraws the Gauge.
     * Resizing is automatic unless you set the `resizeRateLimit` option to `0`.
     */
    resize() {
        super.resize();
        this.updateCenterTemplate();
    }
    createInstance(element, options, theme, context) {
        this.instance = new ArcGauge(element, options, theme, context);
        this.updateElements();
    }
    updateOptions() {
        super.updateOptions();
        this.updateElements();
    }
    setValues() {
        const value = this.configurationService.readValue();
        this.instance.value(value);
        this.updateCenterTemplate();
    }
    updateElements() {
        this.resizeSensor.acceptSize();
        this.updateCenterTemplate();
    }
    updateCenterTemplate() {
        if (!this.instance || !this.centerTemplate) {
            return;
        }
        this.centerTemplateContext.value = this.instance.value();
        this.centerTemplateContext.color = this.instance.currentColor();
        this.changeDetector.detectChanges();
        this.positionLabel();
    }
    positionLabel() {
        if (!this.labelElement) {
            return;
        }
        const element = this.labelElement.nativeElement;
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        const position = this.instance.centerLabelPosition(width, height);
        element.style.top = `${position.top}px`;
        element.style.left = `${position.left}px`;
    }
    //tslint:disable-next-line: no-empty
    updateSize() {
    }
}
ArcGaugeComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'kendoArcGauge',
                providers: [
                    ConfigurationService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.arcgauge'
                    }
                ],
                selector: 'kendo-arcgauge',
                template: `
    <div #surface class='k-chart-surface'></div>
    <div class="k-arcgauge-label" *ngIf="centerTemplate" #label>
        <ng-template [ngTemplateOutlet]="centerTemplate.templateRef" [ngTemplateOutletContext]="centerTemplateContext"></ng-template>
    </div>
    <kendo-resize-sensor (resize)="onResize($event)" [rateLimit]="resizeRateLimit"></kendo-resize-sensor>
  `
            },] },
];
/** @nocollapse */
ArcGaugeComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ConfigurationService },
    { type: ThemeService },
    { type: IntlService },
    { type: LocalizationService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
ArcGaugeComponent.propDecorators = {
    value: [{ type: Input }],
    color: [{ type: Input }],
    colors: [{ type: Input }],
    opacity: [{ type: Input }],
    scale: [{ type: Input }],
    centerTemplate: [{ type: ContentChild, args: [ArcCenterTemplateDirective,] }],
    labelElement: [{ type: ViewChild, args: ["label",] }],
    className: [{ type: HostBinding, args: ['class.k-arcgauge',] }]
};
