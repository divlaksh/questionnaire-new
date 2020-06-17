import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, HostBinding, Injectable, Input, NgModule, NgZone, Optional, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizeSensorComponent, ResizeSensorModule } from '@progress/kendo-angular-common';
import { IntlService } from '@progress/kendo-angular-intl';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { drawDOM, exportImage, exportSVG } from '@progress/kendo-drawing';
import { ArcGauge, LinearGauge, RadialGauge } from '@progress/kendo-charts';

function isObject(value) {
    return typeof value === "object";
}
function diffOptions(original, current) {
    if (Object.keys(original).length !== Object.keys(current).length) {
        return true;
    }
    for (let field in original) {
        if (field !== 'value' && original.hasOwnProperty(field)) {
            const originalValue = original[field];
            const currentValue = current[field];
            const diff = isObject(originalValue) && isObject(currentValue) ?
                diffOptions(originalValue, currentValue) : originalValue !== currentValue;
            if (diff) {
                return true;
            }
        }
    }
}
function diffPointerOptions(original, current) {
    if (!original || !current) {
        return true;
    }
    original = [].concat(original);
    current = [].concat(current);
    if (original.length !== current.length) {
        return true;
    }
    for (let idx = 0; idx < original.length; idx++) {
        if (diffOptions(original[idx], current[idx])) {
            return true;
        }
    }
}
/**
 * @hidden
 */
class ConfigurationService {
    constructor() {
        this.options = {};
    }
    copyChanges(prefix, changes) {
        for (let propertyName in changes) {
            if (!changes.hasOwnProperty(propertyName)) {
                continue;
            }
            const value = changes[propertyName].currentValue;
            const optionName = (prefix ? prefix + '.' : '') + propertyName;
            this.set(optionName, value);
        }
    }
    read() {
        this.hasChanges = false;
        this.valueChange = false;
        return this.options;
    }
    readValues() {
        this.valueChange = false;
        const pointers = [].concat(this.options.pointer);
        return pointers.map((pointer) => pointer.value);
    }
    readValue() {
        this.valueChange = false;
        return this.options.value;
    }
    set(field, value) {
        const { key, options } = this.optionContext(field);
        if (!this.hasChanges && (key === 'value' || (key === 'pointer' && !diffPointerOptions(this.options.pointer, value)))) {
            this.valueChange = true;
        }
        else {
            this.hasChanges = true;
            this.valueChange = false;
        }
        options[key] = value;
    }
    optionContext(field) {
        const parts = field.split('.');
        let options = this.options;
        let key = parts.shift();
        while (parts.length > 0) {
            options = options[key] = options[key] || {};
            key = parts.shift();
        }
        return { key: key, options: options };
    }
}
ConfigurationService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
class CollectionChangesService {
}
CollectionChangesService.decorators = [
    { type: Injectable },
];

const template = `
    <div class="k-var--gauge-pointer"></div>
    <div class="k-var--gauge-track"></div>
    <div class="k-var--normal-text-color"></div>
`;
/**
 * @hidden
 */
class ThemeService {
    read() {
        if (!this.options) {
            this.load();
        }
        return this.options;
    }
    load() {
        if (typeof document === 'undefined') {
            this.options = {};
            return;
        }
        const container = document.createElement('div');
        container.style.display = 'none';
        container.innerHTML = template;
        document.body.appendChild(container);
        try {
            const pointerColor = this.getColor(container, 'gauge-pointer');
            const rangePlaceholder = this.getColor(container, 'gauge-track');
            const textColor = this.getColor(container, 'normal-text-color');
            this.options = {
                pointer: {
                    color: pointerColor
                },
                scale: {
                    labels: {
                        color: textColor
                    },
                    rangePlaceholderColor: rangePlaceholder,
                    minorTicks: {
                        color: textColor
                    },
                    majorTicks: {
                        color: textColor
                    },
                    line: {
                        color: textColor
                    }
                }
            };
        }
        finally {
            document.body.removeChild(container);
        }
    }
    getColor(container, varName) {
        return window.getComputedStyle(container.querySelector(`.k-var--${varName}`)).backgroundColor;
    }
}
ThemeService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
class SharedModule {
}
SharedModule.decorators = [
    { type: NgModule, args: [{
                exports: [ResizeSensorModule],
                providers: [
                    ThemeService
                ]
            },] },
];

/**
 * @hidden
 */
class CollectionComponent {
    constructor(key, configurationService, collectionChangesService) {
        this.key = key;
        this.configurationService = configurationService;
        this.collectionChangesService = collectionChangesService;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.configurationService.set(this.key, []);
    }
    ngAfterContentInit() {
        this.subscription = this.children.changes.subscribe(() => this.collectionChangesService.hasChanges = true);
    }
    ngAfterContentChecked() {
        if (this.collectionChangesService.hasChanges) {
            this.configurationService.set(this.key, this.readItems());
            this.collectionChangesService.hasChanges = false;
        }
    }
    readItems() {
        return this.children.map(child => Object.assign({}, child.configurationService.read()));
    }
}

/**
 * @hidden
 */
class CollectionItemComponent {
    constructor(configurationService, collectionChangesService) {
        this.configurationService = configurationService;
        this.collectionChangesService = collectionChangesService;
    }
    ngOnChanges(changes) {
        this.configurationService.copyChanges('', changes);
        this.collectionChangesService.hasChanges = true;
    }
}

const inDocument = (element) => {
    let node = element;
    while (node && node !== document.body) {
        node = node.parentNode;
    }
    return Boolean(node);
};
/**
 * @hidden
 */
class GaugeComponent {
    constructor(configurationService, themeService, intlService, localizationService, element, renderer, ngZone) {
        this.configurationService = configurationService;
        this.themeService = themeService;
        this.intlService = intlService;
        this.localizationService = localizationService;
        this.element = element;
        this.renderer = renderer;
        this.ngZone = ngZone;
        /**
         * The maximum number of times the Gauge resizes per second.
         * Defaults to `10`. To disable the automatic resizing, set `resizeRateLimit` to `0`.
         */
        this.resizeRateLimit = 10;
        this.className = true;
        this.theme = null;
        this.rtl = false;
    }
    ngOnInit() {
        this.setDirection();
        this.subscriptions = this.intlService.changes.subscribe(this.intlChange.bind(this));
        this.subscriptions.add(this.localizationService.changes.subscribe(this.rtlChange.bind(this)));
    }
    ngAfterViewChecked() {
        if (typeof document === 'undefined') {
            return;
        }
        let updateMethod;
        if (!this.instance) {
            updateMethod = this.init;
        }
        else if (this.configurationService.hasChanges) {
            updateMethod = this.updateOptions;
        }
        else if (this.configurationService.valueChange) {
            updateMethod = this.setValues;
        }
        if (updateMethod) {
            clearTimeout(this.redrawTimeout);
            if (!this.instance && !inDocument(this.element.nativeElement)) { // required in case the gauge is initialized by ng-content outside of the DOM
                this.defer(() => {
                    this.updateCall(updateMethod);
                });
            }
            else {
                this.updateCall(updateMethod);
            }
        }
    }
    updateCall(updateMethod) {
        this.updateDirection();
        updateMethod.call(this);
        this.updateSize();
    }
    updateOptions() {
        this.instance.setOptions(this.configurationService.read());
    }
    setValues() {
        this.instance.allValues(this.configurationService.readValues());
    }
    ngOnChanges(changes) {
        this.configurationService.copyChanges('', changes);
    }
    ngOnDestroy() {
        if (this.instance) {
            this.instance.destroy();
        }
        this.subscriptions.unsubscribe();
        clearTimeout(this.redrawTimeout);
    }
    /**
     * Exports the Gauge as an image. The export operation is asynchronous and returns a promise.
     *
     * @param {ImageExportOptions} options - The parameters for the exported image.
     * @returns {Promise<string>} - A promise that will be resolved with a PNG image that is encoded as a Data URI.
     */
    exportImage(options = {}) {
        return this.exportVisual().then((visual) => {
            return exportImage(visual, options);
        });
    }
    /**
     * Exports the Gauge as an SVG document. The export operation is asynchronous and returns a promise.
     *
     * @param {SVGExportOptions} options - The parameters for the exported file.
     * @returns {Promise<string>} - A promise that will be resolved with an SVG document that is encoded as a Data URI.
     */
    exportSVG(options = {}) {
        return this.exportVisual().then((visual) => {
            return exportSVG(visual, options);
        });
    }
    /**
     * Exports the Gauge as a Drawing `Scene`.
     *
     * @returns {Promise<Group>} - A promise that will be resolved with the export visual.
     */
    exportVisual() {
        return Promise.resolve(this.instance.exportVisual());
    }
    /**
     * @hidden
     */
    onResize(_event) {
        if (this.autoResize) {
            this.resize();
        }
    }
    /**
     * Detects the size of the container and redraws the Gauge.
     * Resizing is automatic unless you set the `resizeRateLimit` option to `0`.
     */
    resize() {
        if (this.instance) {
            this.instance.resize();
        }
    }
    init() {
        if (!this.surfaceElement) {
            return;
        }
        this.createInstance(this.surfaceElement.nativeElement, this.configurationService.read(), this.themeService.read(), {
            intlService: this.intlService,
            rtl: this.rtl
        });
    }
    get autoResize() {
        return this.resizeRateLimit > 0;
    }
    updateSize() {
        this.resizeSensor.acceptSize();
    }
    intlChange() {
        if (this.instance) {
            this.deferredRedraw();
        }
    }
    rtlChange() {
        if (this.instance && this.rtl !== this.isRTL) {
            this.deferredRedraw();
        }
    }
    deferredRedraw() {
        this.defer(() => {
            this.updateDirection();
            this.instance.noTransitionsRedraw();
        });
    }
    defer(callback) {
        this.ngZone.runOutsideAngular(() => {
            clearTimeout(this.redrawTimeout);
            this.redrawTimeout = setTimeout(callback, 0);
        });
    }
    updateDirection() {
        const current = this.isRTL;
        if (this.rtl !== current) {
            this.setDirection();
            if (this.instance) {
                this.instance.setDirection(current);
            }
        }
    }
    setDirection() {
        this.rtl = this.isRTL;
        if (this.element) {
            this.renderer.setAttribute(this.element.nativeElement, 'dir', this.rtl ? 'rtl' : 'ltr');
        }
    }
    get isRTL() {
        return Boolean(this.localizationService.rtl);
    }
}
GaugeComponent.propDecorators = {
    gaugeArea: [{ type: Input }],
    renderAs: [{ type: Input }],
    resizeRateLimit: [{ type: Input }],
    scale: [{ type: Input }],
    transitions: [{ type: Input }],
    surfaceElement: [{ type: ViewChild, args: ['surface',] }],
    resizeSensor: [{ type: ViewChild, args: [ResizeSensorComponent,] }],
    className: [{ type: HostBinding, args: ['class.k-gauge',] }]
};

/**
 * @hidden
 */
class SettingsComponent {
    constructor(key, configurationService) {
        this.key = key;
        this.configurationService = configurationService;
    }
    ngOnChanges(changes) {
        this.configurationService.copyChanges(this.key, changes);
    }
    ngOnDestroy() {
        this.configurationService.set(this.key, null);
    }
}

/**
 * @hidden
 */
class GaugeAreaComponent extends SettingsComponent {
}
GaugeAreaComponent.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    height: [{ type: Input }],
    margin: [{ type: Input }],
    width: [{ type: Input }]
};

/**
 * @hidden
 */
class LabelsComponent extends SettingsComponent {
}
LabelsComponent.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    content: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * @hidden
 */
class RangeComponent extends CollectionItemComponent {
}
RangeComponent.propDecorators = {
    from: [{ type: Input }],
    to: [{ type: Input }],
    opacity: [{ type: Input }],
    color: [{ type: Input }]
};

/**
 * @hidden
 */
class ScaleComponent extends SettingsComponent {
}
ScaleComponent.propDecorators = {
    labels: [{ type: Input }],
    majorTicks: [{ type: Input }],
    minorTicks: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    minorUnit: [{ type: Input }],
    majorUnit: [{ type: Input }],
    reverse: [{ type: Input }],
    rangeSize: [{ type: Input }],
    rangePlaceholderColor: [{ type: Input }]
};

/**
 * A directive that selects a [template]({{ site.data.urls.angular['templatesyntax'] }})
 * within the `<kendo-arcgauge>` component which will be used for the center template
 * ([more information and example]({% slug centertemplate_arcgauge %})).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-arcgauge [value]="value">
 *             <ng-template kendoArcGaugeCenterTemplate let-value="value">
 *                 {{ value }}%
 *             </ng-template>
 *         </kendo-arcgauge>
 *
 *     `
 * })
 * export class AppComponent {
 *   public value: number = 10;
 * }
 *
 * ```
 */
class ArcCenterTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ArcCenterTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoArcGaugeCenterTemplate]'
            },] },
];
/** @nocollapse */
ArcCenterTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

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
class ArcGaugeComponent extends GaugeComponent {
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

/**
 * The configuration options of the ArcGauge area.
 * Represents the entire visible area of the ArcGauge.
 */
class ArcGaugeAreaComponent extends GaugeAreaComponent {
    constructor(configurationService) {
        super('gaugeArea', configurationService);
        this.configurationService = configurationService;
    }
}
ArcGaugeAreaComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-arcgauge-area',
                template: ''
            },] },
];
/** @nocollapse */
ArcGaugeAreaComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The configuration options for the scale of the ArcGauge
 * ([see example]({% slug scaleoptions_arcgauge %})).
 */
class ArcScaleComponent extends ScaleComponent {
    constructor(configurationService) {
        super('scale', configurationService);
        this.configurationService = configurationService;
    }
}
ArcScaleComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-arcgauge-scale',
                template: ''
            },] },
];
/** @nocollapse */
ArcScaleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
ArcScaleComponent.propDecorators = {
    labels: [{ type: Input }],
    rangeDistance: [{ type: Input }],
    rangeLineCap: [{ type: Input }],
    startAngle: [{ type: Input }],
    endAngle: [{ type: Input }]
};

/**
 * The configuration options for the scale labels of the RadialGauge.
 */
class RadialLabelsComponent extends LabelsComponent {
    constructor(configurationService) {
        super('scale.labels', configurationService);
        this.configurationService = configurationService;
    }
}
RadialLabelsComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-radialgauge-scale-labels',
                template: ''
            },] },
];
/** @nocollapse */
RadialLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
RadialLabelsComponent.propDecorators = {
    position: [{ type: Input }]
};

/**
 * The configuration options for the scale labels of the ArcGauge.
 */
class ArcLabelsComponent extends RadialLabelsComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        configurationService.set(`${this.key}.visible`, true);
    }
}
ArcLabelsComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-arcgauge-scale-labels',
                template: ''
            },] },
];
/** @nocollapse */
ArcLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The configuration options for an ArcGauge color item.
 */
class ColorComponent extends CollectionItemComponent {
    constructor(configurationService, collectionChangesService) {
        super(configurationService, collectionChangesService);
    }
}
ColorComponent.decorators = [
    { type: Component, args: [{
                providers: [ConfigurationService],
                selector: 'kendo-arcgauge-color',
                template: ''
            },] },
];
/** @nocollapse */
ColorComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionChangesService }
];
ColorComponent.propDecorators = {
    color: [{ type: Input }],
    opacity: [{ type: Input }],
    from: [{ type: Input }],
    to: [{ type: Input }]
};

/**
 * A collection of one or more ArcGauge colors
 * ([more information and example]({% slug colorranges_arcgauge %})).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-arcgauge [value]="value">
 *              <kendo-arcgauge-colors>
 *                  <kendo-arcgauge-color *ngFor="let item of colors"
 *                      [from]="item.from" [to]="item.to" [color]="item.color">
 *                  </kendo-arcgauge-color>
 *              </kendo-arcgauge-colors>
 *         </kendo-arcgauge>
 *     `
 * })
 * export class AppComponent {
 *     public value: number = 10;
 *
 *     public colors: any[] = [{
 *         to: 25,
 *         color: '#0058e9'
 *     }, {
 *         from: 25,
 *         to: 50,
 *         color: '#37b400'
 *     }, {
 *         from: 50,
 *         to: 75,
 *         color: '#ffc000'
 *     }, {
 *         from: 75,
 *         color: '#f31700'
 *     }];
 * }
 *
 * ```
 */
class ColorsComponent extends CollectionComponent {
    constructor(configurationService, collectionChangesService) {
        super('colors', configurationService, collectionChangesService);
    }
}
ColorsComponent.decorators = [
    { type: Component, args: [{
                providers: [CollectionChangesService],
                selector: 'kendo-arcgauge-colors',
                template: ''
            },] },
];
/** @nocollapse */
ColorsComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionChangesService }
];
ColorsComponent.propDecorators = {
    children: [{ type: ContentChildren, args: [ColorComponent,] }]
};

const DIRECTIVES = [ArcGaugeComponent, ArcCenterTemplateDirective, ArcGaugeAreaComponent, ArcScaleComponent, ArcLabelsComponent,
    ColorsComponent, ColorComponent];
/**
 * A [module]({{ site.data.urls.angular['ngmodules'] }}) that includes the ArcGauge component and its directives.
 * Imports the `ArcGaugeModule` into your application
 * [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity) or any other sub-module
 * that will use the ArcGauge component.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { ArcGaugeModule } from '@progress/kendo-angular-gauges';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, ArcGaugeModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
class ArcGaugeModule {
}
ArcGaugeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DIRECTIVES],
                exports: [DIRECTIVES],
                imports: [SharedModule, CommonModule]
            },] },
];

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
class LinearGaugeComponent extends GaugeComponent {
    constructor(configurationService, themeService, intlService, localizationService, element, renderer, ngZone) {
        super(configurationService, themeService, intlService, localizationService, element, renderer, ngZone);
    }
    createInstance(element, options, theme, context) {
        this.instance = new LinearGauge(element, options, theme, context);
    }
}
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
                template: `
    <div #surface class='k-chart-surface'></div>
    <kendo-resize-sensor (resize)="onResize($event)" [rateLimit]="resizeRateLimit"></kendo-resize-sensor>
  `
            },] },
];
/** @nocollapse */
LinearGaugeComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: ThemeService },
    { type: IntlService },
    { type: LocalizationService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
LinearGaugeComponent.propDecorators = {
    pointer: [{ type: Input }],
    scale: [{ type: Input }]
};

/**
 * The configuration options for the LinearGauge area.
 * Represents the entire visible area of the LinearGauge.
 */
class LinearGaugeAreaComponent extends GaugeAreaComponent {
    constructor(configurationService) {
        super('gaugeArea', configurationService);
        this.configurationService = configurationService;
    }
}
LinearGaugeAreaComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-lineargauge-area',
                template: ''
            },] },
];
/** @nocollapse */
LinearGaugeAreaComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The configuration options for the scale of the LinearGauge
 * ([see example]({% slug scaleoptions_lineargauge %})).
 */
class LinearScaleComponent extends ScaleComponent {
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

/**
 * The configuration options for the scale labels of the LinearGauge.
 */
class LinearLabelsComponent extends LabelsComponent {
    constructor(configurationService) {
        super('scale.labels', configurationService);
        this.configurationService = configurationService;
    }
}
LinearLabelsComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-lineargauge-scale-labels',
                template: ''
            },] },
];
/** @nocollapse */
LinearLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The configuration options for a pointer item of a LinearGauge.
 */
class LinearPointerComponent extends CollectionItemComponent {
    constructor(configurationService, collectionChangesService) {
        super(configurationService, collectionChangesService);
    }
}
LinearPointerComponent.decorators = [
    { type: Component, args: [{
                providers: [ConfigurationService],
                selector: 'kendo-lineargauge-pointer',
                template: ''
            },] },
];
/** @nocollapse */
LinearPointerComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionChangesService }
];
LinearPointerComponent.propDecorators = {
    border: [{ type: Input }],
    color: [{ type: Input }],
    margin: [{ type: Input }],
    opacity: [{ type: Input }],
    shape: [{ type: Input }],
    size: [{ type: Input }],
    value: [{ type: Input }]
};

/**
 * A collection of one or more LinearGauge pointers
 * ([more information]({% slug multiplepointers_lineargauge %})).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-lineargauge>
 *             <kendo-lineargauge-pointers>
 *                 <kendo-lineargauge-pointer *ngFor="let pointer of pointers"
 *                     [value]="pointer.value" [color]="pointer.color" shape="barIndicator">
 *                 </kendo-lineargauge-pointer>
 *             </kendo-lineargauge-pointers>
 *         </kendo-lineargauge>
 *     `
 * })
 * export class AppComponent {
 *     public pointers: any[] = [{
 *         value: 10,
 *         color: '#ff4500'
 *     }, {
 *         value: 12,
 *         color: '#28b4c8'
 *     }, {
 *         value: 20,
 *         color: '#8b0000'
 *     }];
 * }
 *
 * ```
 */
class LinearPointersComponent extends CollectionComponent {
    constructor(configurationService, collectionChangesService) {
        super('pointer', configurationService, collectionChangesService);
    }
}
LinearPointersComponent.decorators = [
    { type: Component, args: [{
                providers: [CollectionChangesService],
                selector: 'kendo-lineargauge-pointers',
                template: ''
            },] },
];
/** @nocollapse */
LinearPointersComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionChangesService }
];
LinearPointersComponent.propDecorators = {
    children: [{ type: ContentChildren, args: [LinearPointerComponent,] }]
};

/**
 * The configuration options for a scale range item of a LinearGauge.
 */
class LinearRangeComponent extends RangeComponent {
    constructor(configurationService, collectionChangesService) {
        super(configurationService, collectionChangesService);
    }
}
LinearRangeComponent.decorators = [
    { type: Component, args: [{
                providers: [ConfigurationService],
                selector: 'kendo-lineargauge-scale-range',
                template: ''
            },] },
];
/** @nocollapse */
LinearRangeComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionChangesService }
];

/**
 * A collection of one or more LinearGauge scale ranges
 * ([more information and example]({% slug scaleranghes_lineargauge %})).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-lineargauge>
 *             <kendo-lineargauge-scale>
 *                 <kendo-lineargauge-scale-ranges>
 *                     <kendo-lineargauge-scale-range *ngFor="let range of ranges"
 *                         [from]="range.from" [to]="range.to" [color]="range.color">
 *                     </kendo-lineargauge-scale-range>
 *                 </kendo-lineargauge-scale-ranges>
 *             </kendo-lineargauge-scale>
 *         </kendo-lineargauge>
 *     `
 * })
 * export class AppComponent {
 *     public ranges: any[] = [{
 *         from: 0,
 *         to: 15,
 *         color: '#ffd246'
 *     }, {
 *         from: 15,
 *         to: 30,
 *         color: '#28b4c8'
 *     }, {
 *         from: 30,
 *         to: 50,
 *         color: '#78d237'
 *     }];
 * }
 *
 * ```
 */
class LinearRangesComponent extends CollectionComponent {
    constructor(configurationService, collectionChangesService) {
        super('scale.ranges', configurationService, collectionChangesService);
    }
}
LinearRangesComponent.decorators = [
    { type: Component, args: [{
                providers: [CollectionChangesService],
                selector: 'kendo-lineargauge-scale-ranges',
                template: ''
            },] },
];
/** @nocollapse */
LinearRangesComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionChangesService }
];
LinearRangesComponent.propDecorators = {
    children: [{ type: ContentChildren, args: [LinearRangeComponent,] }]
};

const DIRECTIVES$1 = [LinearGaugeComponent, LinearGaugeAreaComponent, LinearScaleComponent, LinearLabelsComponent,
    LinearPointersComponent, LinearPointerComponent, LinearRangeComponent, LinearRangesComponent];
/**
 * A [module]({{ site.data.urls.angular['ngmodules'] }}) that includes the LinearGauge component and its directives.
 * Imports the `LinearGaugeModule` into your application
 * [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity) or any other sub-module
 * that will use the LinearGauge component.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { LinearGaugeModule } from '@progress/kendo-angular-gauges';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, LinearGaugeModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
class LinearGaugeModule {
}
LinearGaugeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DIRECTIVES$1],
                exports: [DIRECTIVES$1],
                imports: [SharedModule]
            },] },
];

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
class RadialGaugeComponent extends GaugeComponent {
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

/**
 * The configuration options for the RadialGauge area.
 * Represents the entire visible area of the RadialGauge.
 */
class RadialGaugeAreaComponent extends GaugeAreaComponent {
    constructor(configurationService) {
        super('gaugeArea', configurationService);
        this.configurationService = configurationService;
    }
}
RadialGaugeAreaComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-radialgauge-area',
                template: ''
            },] },
];
/** @nocollapse */
RadialGaugeAreaComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The configuration options for the scale of the RadialGauge
 * ([more information and example]({% slug scaleoptions_radialgauge %})).
 */
class RadialScaleComponent extends ScaleComponent {
    constructor(configurationService) {
        super('scale', configurationService);
        this.configurationService = configurationService;
    }
}
RadialScaleComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-radialgauge-scale',
                template: ''
            },] },
];
/** @nocollapse */
RadialScaleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
RadialScaleComponent.propDecorators = {
    labels: [{ type: Input }],
    rangeDistance: [{ type: Input }],
    ranges: [{ type: Input }],
    startAngle: [{ type: Input }],
    endAngle: [{ type: Input }]
};

/**
 * The configuration options for a pointer item of a RadialGauge.
 */
class RadialPointerComponent extends CollectionItemComponent {
    constructor(configurationService, collectionChangesService) {
        super(configurationService, collectionChangesService);
    }
}
RadialPointerComponent.decorators = [
    { type: Component, args: [{
                providers: [ConfigurationService],
                selector: 'kendo-radialgauge-pointer',
                template: ''
            },] },
];
/** @nocollapse */
RadialPointerComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionChangesService }
];
RadialPointerComponent.propDecorators = {
    cap: [{ type: Input }],
    color: [{ type: Input }],
    length: [{ type: Input }],
    value: [{ type: Input }]
};

/**
 * A collection of one or more RadialGauge pointers
 * ([more information and example]({% slug multiplepointers_radialgauge %})).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-radialgauge>
 *             <kendo-radialgauge-pointers>
 *                 <kendo-radialgauge-pointer *ngFor="let pointer of pointers"
 *                     [value]="pointer.value" [color]="pointer.color">
 *                 </kendo-radialgauge-pointer>
 *             </kendo-radialgauge-pointers>
 *         </kendo-radialgauge>
 *     `
 * })
 * export class AppComponent {
 *     public pointers: any[] = [{
 *         value: 10,
 *         color: '#ffd246'
 *     }, {
 *         value: 20,
 *         color: '#28b4c8'
 *     }, {
 *         value: 30,
 *         color: '#78d237'
 *     }];
 * }
 *
 * ```
 */
class RadialPointersComponent extends CollectionComponent {
    constructor(configurationService, collectionChangesService) {
        super('pointer', configurationService, collectionChangesService);
    }
}
RadialPointersComponent.decorators = [
    { type: Component, args: [{
                providers: [CollectionChangesService],
                selector: 'kendo-radialgauge-pointers',
                template: ''
            },] },
];
/** @nocollapse */
RadialPointersComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionChangesService }
];
RadialPointersComponent.propDecorators = {
    children: [{ type: ContentChildren, args: [RadialPointerComponent,] }]
};

/**
 * The configuration options for a scale range item of a RadialGauge.
 */
class RadialRangeComponent extends RangeComponent {
    constructor(configurationService, collectionChangesService) {
        super(configurationService, collectionChangesService);
    }
}
RadialRangeComponent.decorators = [
    { type: Component, args: [{
                providers: [ConfigurationService],
                selector: 'kendo-radialgauge-scale-range',
                template: ''
            },] },
];
/** @nocollapse */
RadialRangeComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionChangesService }
];

/**
 * A collection of one or more RadialGauge scale ranges
 * ([more information and example]({% slug scaleranghes_radialgauge %})).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-radialgauge>
 *             <kendo-radialgauge-scale>
 *                 <kendo-radialgauge-scale-ranges>
 *                     <kendo-radialgauge-scale-range *ngFor="let range of ranges"
 *                         [from]="range.from" [to]="range.to" [color]="range.color">
 *                     </kendo-radialgauge-scale-range>
 *                 </kendo-radialgauge-scale-ranges>
 *             </kendo-radialgauge-scale>
 *         </kendo-radialgauge>
 *     `
 * })
 * export class AppComponent {
 *     public ranges: any[] = [{
 *         from: 0,
 *         to: 15,
 *         color: '#ffd246'
 *     }, {
 *         from: 15,
 *         to: 30,
 *         color: '#28b4c8'
 *     }, {
 *         from: 30,
 *         to: 50,
 *         color: '#78d237'
 *     }];
 * }
 *
 * ```
 */
class RadialRangesComponent extends CollectionComponent {
    constructor(configurationService, collectionChangesService) {
        super('scale.ranges', configurationService, collectionChangesService);
    }
}
RadialRangesComponent.decorators = [
    { type: Component, args: [{
                providers: [CollectionChangesService],
                selector: 'kendo-radialgauge-scale-ranges',
                template: ''
            },] },
];
/** @nocollapse */
RadialRangesComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionChangesService }
];
RadialRangesComponent.propDecorators = {
    children: [{ type: ContentChildren, args: [RadialRangeComponent,] }]
};

const DIRECTIVES$2 = [RadialGaugeComponent, RadialGaugeAreaComponent, RadialScaleComponent, RadialLabelsComponent,
    RadialPointersComponent, RadialPointerComponent, RadialRangeComponent, RadialRangesComponent];
/**
 * A [module]({{ site.data.urls.angular['ngmodules'] }}) that includes the RadialGauge component and its directives.
 * Imports the `RadialGaugeModule` into your application
 * [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity) or any other sub-module
 * that will use the RadialGauge component.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { RadialGaugeModule } from '@progress/kendo-angular-gauges';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, RadialGaugeModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
class RadialGaugeModule {
}
RadialGaugeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DIRECTIVES$2],
                exports: [DIRECTIVES$2],
                imports: [SharedModule]
            },] },
];

/**
 * A [module]({{ site.data.urls.angular['ngmodules'] }}) that includes all Gauge components and directives.
 *
 * Imports the `GaugesModule` into your application
 * [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity) or any other sub-module
 * that will use the Gauge components.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { GaugesModule } from '@progress/kendo-angular-charts';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, GaugesModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
class GaugesModule {
}
GaugesModule.decorators = [
    { type: NgModule, args: [{
                exports: [ArcGaugeModule, LinearGaugeModule, RadialGaugeModule]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { SharedModule, ArcGaugeModule, LinearGaugeModule, RadialGaugeModule, GaugesModule, CollectionComponent, CollectionItemComponent, GaugeComponent, GaugeAreaComponent, LabelsComponent, RangeComponent, ScaleComponent, SettingsComponent, ConfigurationService, CollectionChangesService, ThemeService, ArcGaugeComponent, ArcGaugeAreaComponent, ArcScaleComponent, ArcLabelsComponent, ArcCenterTemplateDirective, ColorsComponent, ColorComponent, LinearGaugeComponent, LinearGaugeAreaComponent, LinearScaleComponent, LinearLabelsComponent, LinearPointersComponent, LinearPointerComponent, LinearRangeComponent, LinearRangesComponent, RadialGaugeComponent, RadialGaugeAreaComponent, RadialScaleComponent, RadialLabelsComponent, RadialPointersComponent, RadialPointerComponent, RadialRangeComponent, RadialRangesComponent };
export { ResizeSensorComponent } from '@progress/kendo-angular-common';
