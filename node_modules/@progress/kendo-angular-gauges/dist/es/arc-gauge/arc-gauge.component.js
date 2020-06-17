import * as tslib_1 from "tslib";
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
var ArcGaugeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ArcGaugeComponent, _super);
    function ArcGaugeComponent(changeDetector, configurationService, themeService, intlService, localizationService, element, renderer, ngZone) {
        var _this = _super.call(this, configurationService, themeService, intlService, localizationService, element, renderer, ngZone) || this;
        _this.changeDetector = changeDetector;
        _this.className = true;
        _this.centerTemplateContext = {};
        return _this;
    }
    ArcGaugeComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (this.element) {
            this.renderer.setStyle(this.element.nativeElement, 'position', 'relative');
        }
    };
    ArcGaugeComponent.prototype.ngAfterViewChecked = function () {
        _super.prototype.ngAfterViewChecked.call(this);
        if (this.labelElement && !this.centerTemplate) {
            this.changeDetector.detectChanges();
        }
        else if (!this.labelElement && this.centerTemplate) {
            this.updateCenterTemplate();
        }
    };
    /**
     * Exports the ArcGauge as a Drawing `Scene`.
     *
     * @returns {Promise<Group>} - A promise that will be resolved with the export visual.
     */
    ArcGaugeComponent.prototype.exportVisual = function () {
        return drawDOM(this.element.nativeElement);
    };
    /**
     * Detects the size of the container and redraws the Gauge.
     * Resizing is automatic unless you set the `resizeRateLimit` option to `0`.
     */
    ArcGaugeComponent.prototype.resize = function () {
        _super.prototype.resize.call(this);
        this.updateCenterTemplate();
    };
    ArcGaugeComponent.prototype.createInstance = function (element, options, theme, context) {
        this.instance = new ArcGauge(element, options, theme, context);
        this.updateElements();
    };
    ArcGaugeComponent.prototype.updateOptions = function () {
        _super.prototype.updateOptions.call(this);
        this.updateElements();
    };
    ArcGaugeComponent.prototype.setValues = function () {
        var value = this.configurationService.readValue();
        this.instance.value(value);
        this.updateCenterTemplate();
    };
    ArcGaugeComponent.prototype.updateElements = function () {
        this.resizeSensor.acceptSize();
        this.updateCenterTemplate();
    };
    ArcGaugeComponent.prototype.updateCenterTemplate = function () {
        if (!this.instance || !this.centerTemplate) {
            return;
        }
        this.centerTemplateContext.value = this.instance.value();
        this.centerTemplateContext.color = this.instance.currentColor();
        this.changeDetector.detectChanges();
        this.positionLabel();
    };
    ArcGaugeComponent.prototype.positionLabel = function () {
        if (!this.labelElement) {
            return;
        }
        var element = this.labelElement.nativeElement;
        var width = element.offsetWidth;
        var height = element.offsetHeight;
        var position = this.instance.centerLabelPosition(width, height);
        element.style.top = position.top + "px";
        element.style.left = position.left + "px";
    };
    //tslint:disable-next-line: no-empty
    ArcGaugeComponent.prototype.updateSize = function () {
    };
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
                    template: "\n    <div #surface class='k-chart-surface'></div>\n    <div class=\"k-arcgauge-label\" *ngIf=\"centerTemplate\" #label>\n        <ng-template [ngTemplateOutlet]=\"centerTemplate.templateRef\" [ngTemplateOutletContext]=\"centerTemplateContext\"></ng-template>\n    </div>\n    <kendo-resize-sensor (resize)=\"onResize($event)\" [rateLimit]=\"resizeRateLimit\"></kendo-resize-sensor>\n  "
                },] },
    ];
    /** @nocollapse */
    ArcGaugeComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ConfigurationService },
        { type: ThemeService },
        { type: IntlService },
        { type: LocalizationService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
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
    return ArcGaugeComponent;
}(GaugeComponent));
export { ArcGaugeComponent };
