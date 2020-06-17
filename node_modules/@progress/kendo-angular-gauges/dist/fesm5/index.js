import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, HostBinding, Injectable, Input, NgModule, NgZone, Optional, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizeSensorComponent, ResizeSensorModule } from '@progress/kendo-angular-common';
import { __extends } from 'tslib';
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
    for (var field in original) {
        if (field !== 'value' && original.hasOwnProperty(field)) {
            var originalValue = original[field];
            var currentValue = current[field];
            var diff = isObject(originalValue) && isObject(currentValue) ?
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
    for (var idx = 0; idx < original.length; idx++) {
        if (diffOptions(original[idx], current[idx])) {
            return true;
        }
    }
}
/**
 * @hidden
 */
var ConfigurationService = /** @class */ (function () {
    function ConfigurationService() {
        this.options = {};
    }
    ConfigurationService.prototype.copyChanges = function (prefix, changes) {
        for (var propertyName in changes) {
            if (!changes.hasOwnProperty(propertyName)) {
                continue;
            }
            var value = changes[propertyName].currentValue;
            var optionName = (prefix ? prefix + '.' : '') + propertyName;
            this.set(optionName, value);
        }
    };
    ConfigurationService.prototype.read = function () {
        this.hasChanges = false;
        this.valueChange = false;
        return this.options;
    };
    ConfigurationService.prototype.readValues = function () {
        this.valueChange = false;
        var pointers = [].concat(this.options.pointer);
        return pointers.map(function (pointer) { return pointer.value; });
    };
    ConfigurationService.prototype.readValue = function () {
        this.valueChange = false;
        return this.options.value;
    };
    ConfigurationService.prototype.set = function (field, value) {
        var _a = this.optionContext(field), key = _a.key, options = _a.options;
        if (!this.hasChanges && (key === 'value' || (key === 'pointer' && !diffPointerOptions(this.options.pointer, value)))) {
            this.valueChange = true;
        }
        else {
            this.hasChanges = true;
            this.valueChange = false;
        }
        options[key] = value;
    };
    ConfigurationService.prototype.optionContext = function (field) {
        var parts = field.split('.');
        var options = this.options;
        var key = parts.shift();
        while (parts.length > 0) {
            options = options[key] = options[key] || {};
            key = parts.shift();
        }
        return { key: key, options: options };
    };
    ConfigurationService.decorators = [
        { type: Injectable },
    ];
    return ConfigurationService;
}());

/**
 * @hidden
 */
var CollectionChangesService = /** @class */ (function () {
    function CollectionChangesService() {
    }
    CollectionChangesService.decorators = [
        { type: Injectable },
    ];
    return CollectionChangesService;
}());

var template = "\n    <div class=\"k-var--gauge-pointer\"></div>\n    <div class=\"k-var--gauge-track\"></div>\n    <div class=\"k-var--normal-text-color\"></div>\n";
/**
 * @hidden
 */
var ThemeService = /** @class */ (function () {
    function ThemeService() {
    }
    ThemeService.prototype.read = function () {
        if (!this.options) {
            this.load();
        }
        return this.options;
    };
    ThemeService.prototype.load = function () {
        if (typeof document === 'undefined') {
            this.options = {};
            return;
        }
        var container = document.createElement('div');
        container.style.display = 'none';
        container.innerHTML = template;
        document.body.appendChild(container);
        try {
            var pointerColor = this.getColor(container, 'gauge-pointer');
            var rangePlaceholder = this.getColor(container, 'gauge-track');
            var textColor = this.getColor(container, 'normal-text-color');
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
    };
    ThemeService.prototype.getColor = function (container, varName) {
        return window.getComputedStyle(container.querySelector(".k-var--" + varName)).backgroundColor;
    };
    ThemeService.decorators = [
        { type: Injectable },
    ];
    return ThemeService;
}());

/**
 * @hidden
 */
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule.decorators = [
        { type: NgModule, args: [{
                    exports: [ResizeSensorModule],
                    providers: [
                        ThemeService
                    ]
                },] },
    ];
    return SharedModule;
}());

/**
 * @hidden
 */
var CollectionComponent = /** @class */ (function () {
    function CollectionComponent(key, configurationService, collectionChangesService) {
        this.key = key;
        this.configurationService = configurationService;
        this.collectionChangesService = collectionChangesService;
    }
    CollectionComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.configurationService.set(this.key, []);
    };
    CollectionComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.subscription = this.children.changes.subscribe(function () { return _this.collectionChangesService.hasChanges = true; });
    };
    CollectionComponent.prototype.ngAfterContentChecked = function () {
        if (this.collectionChangesService.hasChanges) {
            this.configurationService.set(this.key, this.readItems());
            this.collectionChangesService.hasChanges = false;
        }
    };
    CollectionComponent.prototype.readItems = function () {
        return this.children.map(function (child) { return Object.assign({}, child.configurationService.read()); });
    };
    return CollectionComponent;
}());

/**
 * @hidden
 */
var CollectionItemComponent = /** @class */ (function () {
    function CollectionItemComponent(configurationService, collectionChangesService) {
        this.configurationService = configurationService;
        this.collectionChangesService = collectionChangesService;
    }
    CollectionItemComponent.prototype.ngOnChanges = function (changes) {
        this.configurationService.copyChanges('', changes);
        this.collectionChangesService.hasChanges = true;
    };
    return CollectionItemComponent;
}());

var inDocument = function (element) {
    var node = element;
    while (node && node !== document.body) {
        node = node.parentNode;
    }
    return Boolean(node);
};
/**
 * @hidden
 */
var GaugeComponent = /** @class */ (function () {
    function GaugeComponent(configurationService, themeService, intlService, localizationService, element, renderer, ngZone) {
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
    GaugeComponent.prototype.ngOnInit = function () {
        this.setDirection();
        this.subscriptions = this.intlService.changes.subscribe(this.intlChange.bind(this));
        this.subscriptions.add(this.localizationService.changes.subscribe(this.rtlChange.bind(this)));
    };
    GaugeComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (typeof document === 'undefined') {
            return;
        }
        var updateMethod;
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
                this.defer(function () {
                    _this.updateCall(updateMethod);
                });
            }
            else {
                this.updateCall(updateMethod);
            }
        }
    };
    GaugeComponent.prototype.updateCall = function (updateMethod) {
        this.updateDirection();
        updateMethod.call(this);
        this.updateSize();
    };
    GaugeComponent.prototype.updateOptions = function () {
        this.instance.setOptions(this.configurationService.read());
    };
    GaugeComponent.prototype.setValues = function () {
        this.instance.allValues(this.configurationService.readValues());
    };
    GaugeComponent.prototype.ngOnChanges = function (changes) {
        this.configurationService.copyChanges('', changes);
    };
    GaugeComponent.prototype.ngOnDestroy = function () {
        if (this.instance) {
            this.instance.destroy();
        }
        this.subscriptions.unsubscribe();
        clearTimeout(this.redrawTimeout);
    };
    /**
     * Exports the Gauge as an image. The export operation is asynchronous and returns a promise.
     *
     * @param {ImageExportOptions} options - The parameters for the exported image.
     * @returns {Promise<string>} - A promise that will be resolved with a PNG image that is encoded as a Data URI.
     */
    GaugeComponent.prototype.exportImage = function (options) {
        if (options === void 0) { options = {}; }
        return this.exportVisual().then(function (visual) {
            return exportImage(visual, options);
        });
    };
    /**
     * Exports the Gauge as an SVG document. The export operation is asynchronous and returns a promise.
     *
     * @param {SVGExportOptions} options - The parameters for the exported file.
     * @returns {Promise<string>} - A promise that will be resolved with an SVG document that is encoded as a Data URI.
     */
    GaugeComponent.prototype.exportSVG = function (options) {
        if (options === void 0) { options = {}; }
        return this.exportVisual().then(function (visual) {
            return exportSVG(visual, options);
        });
    };
    /**
     * Exports the Gauge as a Drawing `Scene`.
     *
     * @returns {Promise<Group>} - A promise that will be resolved with the export visual.
     */
    GaugeComponent.prototype.exportVisual = function () {
        return Promise.resolve(this.instance.exportVisual());
    };
    /**
     * @hidden
     */
    GaugeComponent.prototype.onResize = function (_event) {
        if (this.autoResize) {
            this.resize();
        }
    };
    /**
     * Detects the size of the container and redraws the Gauge.
     * Resizing is automatic unless you set the `resizeRateLimit` option to `0`.
     */
    GaugeComponent.prototype.resize = function () {
        if (this.instance) {
            this.instance.resize();
        }
    };
    GaugeComponent.prototype.init = function () {
        if (!this.surfaceElement) {
            return;
        }
        this.createInstance(this.surfaceElement.nativeElement, this.configurationService.read(), this.themeService.read(), {
            intlService: this.intlService,
            rtl: this.rtl
        });
    };
    Object.defineProperty(GaugeComponent.prototype, "autoResize", {
        get: function () {
            return this.resizeRateLimit > 0;
        },
        enumerable: true,
        configurable: true
    });
    GaugeComponent.prototype.updateSize = function () {
        this.resizeSensor.acceptSize();
    };
    GaugeComponent.prototype.intlChange = function () {
        if (this.instance) {
            this.deferredRedraw();
        }
    };
    GaugeComponent.prototype.rtlChange = function () {
        if (this.instance && this.rtl !== this.isRTL) {
            this.deferredRedraw();
        }
    };
    GaugeComponent.prototype.deferredRedraw = function () {
        var _this = this;
        this.defer(function () {
            _this.updateDirection();
            _this.instance.noTransitionsRedraw();
        });
    };
    GaugeComponent.prototype.defer = function (callback) {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            clearTimeout(_this.redrawTimeout);
            _this.redrawTimeout = setTimeout(callback, 0);
        });
    };
    GaugeComponent.prototype.updateDirection = function () {
        var current = this.isRTL;
        if (this.rtl !== current) {
            this.setDirection();
            if (this.instance) {
                this.instance.setDirection(current);
            }
        }
    };
    GaugeComponent.prototype.setDirection = function () {
        this.rtl = this.isRTL;
        if (this.element) {
            this.renderer.setAttribute(this.element.nativeElement, 'dir', this.rtl ? 'rtl' : 'ltr');
        }
    };
    Object.defineProperty(GaugeComponent.prototype, "isRTL", {
        get: function () {
            return Boolean(this.localizationService.rtl);
        },
        enumerable: true,
        configurable: true
    });
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
    return GaugeComponent;
}());

/**
 * @hidden
 */
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(key, configurationService) {
        this.key = key;
        this.configurationService = configurationService;
    }
    SettingsComponent.prototype.ngOnChanges = function (changes) {
        this.configurationService.copyChanges(this.key, changes);
    };
    SettingsComponent.prototype.ngOnDestroy = function () {
        this.configurationService.set(this.key, null);
    };
    return SettingsComponent;
}());

/**
 * @hidden
 */
var GaugeAreaComponent = /** @class */ (function (_super) {
    __extends(GaugeAreaComponent, _super);
    function GaugeAreaComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GaugeAreaComponent.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        height: [{ type: Input }],
        margin: [{ type: Input }],
        width: [{ type: Input }]
    };
    return GaugeAreaComponent;
}(SettingsComponent));

/**
 * @hidden
 */
var LabelsComponent = /** @class */ (function (_super) {
    __extends(LabelsComponent, _super);
    function LabelsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return LabelsComponent;
}(SettingsComponent));

/**
 * @hidden
 */
var RangeComponent = /** @class */ (function (_super) {
    __extends(RangeComponent, _super);
    function RangeComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeComponent.propDecorators = {
        from: [{ type: Input }],
        to: [{ type: Input }],
        opacity: [{ type: Input }],
        color: [{ type: Input }]
    };
    return RangeComponent;
}(CollectionItemComponent));

/**
 * @hidden
 */
var ScaleComponent = /** @class */ (function (_super) {
    __extends(ScaleComponent, _super);
    function ScaleComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return ScaleComponent;
}(SettingsComponent));

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
var ArcCenterTemplateDirective = /** @class */ (function () {
    function ArcCenterTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ArcCenterTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoArcGaugeCenterTemplate]'
                },] },
    ];
    /** @nocollapse */
    ArcCenterTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return ArcCenterTemplateDirective;
}());

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
    __extends(ArcGaugeComponent, _super);
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

/**
 * The configuration options of the ArcGauge area.
 * Represents the entire visible area of the ArcGauge.
 */
var ArcGaugeAreaComponent = /** @class */ (function (_super) {
    __extends(ArcGaugeAreaComponent, _super);
    function ArcGaugeAreaComponent(configurationService) {
        var _this = _super.call(this, 'gaugeArea', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ArcGaugeAreaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-arcgauge-area',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ArcGaugeAreaComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return ArcGaugeAreaComponent;
}(GaugeAreaComponent));

/**
 * The configuration options for the scale of the ArcGauge
 * ([see example]({% slug scaleoptions_arcgauge %})).
 */
var ArcScaleComponent = /** @class */ (function (_super) {
    __extends(ArcScaleComponent, _super);
    function ArcScaleComponent(configurationService) {
        var _this = _super.call(this, 'scale', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ArcScaleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-arcgauge-scale',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ArcScaleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    ArcScaleComponent.propDecorators = {
        labels: [{ type: Input }],
        rangeDistance: [{ type: Input }],
        rangeLineCap: [{ type: Input }],
        startAngle: [{ type: Input }],
        endAngle: [{ type: Input }]
    };
    return ArcScaleComponent;
}(ScaleComponent));

/**
 * The configuration options for the scale labels of the RadialGauge.
 */
var RadialLabelsComponent = /** @class */ (function (_super) {
    __extends(RadialLabelsComponent, _super);
    function RadialLabelsComponent(configurationService) {
        var _this = _super.call(this, 'scale.labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    RadialLabelsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-radialgauge-scale-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    RadialLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    RadialLabelsComponent.propDecorators = {
        position: [{ type: Input }]
    };
    return RadialLabelsComponent;
}(LabelsComponent));

/**
 * The configuration options for the scale labels of the ArcGauge.
 */
var ArcLabelsComponent = /** @class */ (function (_super) {
    __extends(ArcLabelsComponent, _super);
    function ArcLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        configurationService.set(_this.key + ".visible", true);
        return _this;
    }
    ArcLabelsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-arcgauge-scale-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ArcLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return ArcLabelsComponent;
}(RadialLabelsComponent));

/**
 * The configuration options for an ArcGauge color item.
 */
var ColorComponent = /** @class */ (function (_super) {
    __extends(ColorComponent, _super);
    function ColorComponent(configurationService, collectionChangesService) {
        return _super.call(this, configurationService, collectionChangesService) || this;
    }
    ColorComponent.decorators = [
        { type: Component, args: [{
                    providers: [ConfigurationService],
                    selector: 'kendo-arcgauge-color',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ColorComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionChangesService }
    ]; };
    ColorComponent.propDecorators = {
        color: [{ type: Input }],
        opacity: [{ type: Input }],
        from: [{ type: Input }],
        to: [{ type: Input }]
    };
    return ColorComponent;
}(CollectionItemComponent));

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
var ColorsComponent = /** @class */ (function (_super) {
    __extends(ColorsComponent, _super);
    function ColorsComponent(configurationService, collectionChangesService) {
        return _super.call(this, 'colors', configurationService, collectionChangesService) || this;
    }
    ColorsComponent.decorators = [
        { type: Component, args: [{
                    providers: [CollectionChangesService],
                    selector: 'kendo-arcgauge-colors',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ColorsComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionChangesService }
    ]; };
    ColorsComponent.propDecorators = {
        children: [{ type: ContentChildren, args: [ColorComponent,] }]
    };
    return ColorsComponent;
}(CollectionComponent));

var DIRECTIVES = [ArcGaugeComponent, ArcCenterTemplateDirective, ArcGaugeAreaComponent, ArcScaleComponent, ArcLabelsComponent,
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
var ArcGaugeModule = /** @class */ (function () {
    function ArcGaugeModule() {
    }
    ArcGaugeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DIRECTIVES],
                    exports: [DIRECTIVES],
                    imports: [SharedModule, CommonModule]
                },] },
    ];
    return ArcGaugeModule;
}());

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
    __extends(LinearGaugeComponent, _super);
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

/**
 * The configuration options for the LinearGauge area.
 * Represents the entire visible area of the LinearGauge.
 */
var LinearGaugeAreaComponent = /** @class */ (function (_super) {
    __extends(LinearGaugeAreaComponent, _super);
    function LinearGaugeAreaComponent(configurationService) {
        var _this = _super.call(this, 'gaugeArea', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    LinearGaugeAreaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-lineargauge-area',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    LinearGaugeAreaComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return LinearGaugeAreaComponent;
}(GaugeAreaComponent));

/**
 * The configuration options for the scale of the LinearGauge
 * ([see example]({% slug scaleoptions_lineargauge %})).
 */
var LinearScaleComponent = /** @class */ (function (_super) {
    __extends(LinearScaleComponent, _super);
    function LinearScaleComponent(configurationService) {
        var _this = _super.call(this, 'scale', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    LinearScaleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-lineargauge-scale',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    LinearScaleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    LinearScaleComponent.propDecorators = {
        line: [{ type: Input }],
        ranges: [{ type: Input }],
        mirror: [{ type: Input }],
        vertical: [{ type: Input }]
    };
    return LinearScaleComponent;
}(ScaleComponent));

/**
 * The configuration options for the scale labels of the LinearGauge.
 */
var LinearLabelsComponent = /** @class */ (function (_super) {
    __extends(LinearLabelsComponent, _super);
    function LinearLabelsComponent(configurationService) {
        var _this = _super.call(this, 'scale.labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    LinearLabelsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-lineargauge-scale-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    LinearLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return LinearLabelsComponent;
}(LabelsComponent));

/**
 * The configuration options for a pointer item of a LinearGauge.
 */
var LinearPointerComponent = /** @class */ (function (_super) {
    __extends(LinearPointerComponent, _super);
    function LinearPointerComponent(configurationService, collectionChangesService) {
        return _super.call(this, configurationService, collectionChangesService) || this;
    }
    LinearPointerComponent.decorators = [
        { type: Component, args: [{
                    providers: [ConfigurationService],
                    selector: 'kendo-lineargauge-pointer',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    LinearPointerComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionChangesService }
    ]; };
    LinearPointerComponent.propDecorators = {
        border: [{ type: Input }],
        color: [{ type: Input }],
        margin: [{ type: Input }],
        opacity: [{ type: Input }],
        shape: [{ type: Input }],
        size: [{ type: Input }],
        value: [{ type: Input }]
    };
    return LinearPointerComponent;
}(CollectionItemComponent));

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
var LinearPointersComponent = /** @class */ (function (_super) {
    __extends(LinearPointersComponent, _super);
    function LinearPointersComponent(configurationService, collectionChangesService) {
        return _super.call(this, 'pointer', configurationService, collectionChangesService) || this;
    }
    LinearPointersComponent.decorators = [
        { type: Component, args: [{
                    providers: [CollectionChangesService],
                    selector: 'kendo-lineargauge-pointers',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    LinearPointersComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionChangesService }
    ]; };
    LinearPointersComponent.propDecorators = {
        children: [{ type: ContentChildren, args: [LinearPointerComponent,] }]
    };
    return LinearPointersComponent;
}(CollectionComponent));

/**
 * The configuration options for a scale range item of a LinearGauge.
 */
var LinearRangeComponent = /** @class */ (function (_super) {
    __extends(LinearRangeComponent, _super);
    function LinearRangeComponent(configurationService, collectionChangesService) {
        return _super.call(this, configurationService, collectionChangesService) || this;
    }
    LinearRangeComponent.decorators = [
        { type: Component, args: [{
                    providers: [ConfigurationService],
                    selector: 'kendo-lineargauge-scale-range',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    LinearRangeComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionChangesService }
    ]; };
    return LinearRangeComponent;
}(RangeComponent));

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
var LinearRangesComponent = /** @class */ (function (_super) {
    __extends(LinearRangesComponent, _super);
    function LinearRangesComponent(configurationService, collectionChangesService) {
        return _super.call(this, 'scale.ranges', configurationService, collectionChangesService) || this;
    }
    LinearRangesComponent.decorators = [
        { type: Component, args: [{
                    providers: [CollectionChangesService],
                    selector: 'kendo-lineargauge-scale-ranges',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    LinearRangesComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionChangesService }
    ]; };
    LinearRangesComponent.propDecorators = {
        children: [{ type: ContentChildren, args: [LinearRangeComponent,] }]
    };
    return LinearRangesComponent;
}(CollectionComponent));

var DIRECTIVES$1 = [LinearGaugeComponent, LinearGaugeAreaComponent, LinearScaleComponent, LinearLabelsComponent,
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
var LinearGaugeModule = /** @class */ (function () {
    function LinearGaugeModule() {
    }
    LinearGaugeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DIRECTIVES$1],
                    exports: [DIRECTIVES$1],
                    imports: [SharedModule]
                },] },
    ];
    return LinearGaugeModule;
}());

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
    __extends(RadialGaugeComponent, _super);
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

/**
 * The configuration options for the RadialGauge area.
 * Represents the entire visible area of the RadialGauge.
 */
var RadialGaugeAreaComponent = /** @class */ (function (_super) {
    __extends(RadialGaugeAreaComponent, _super);
    function RadialGaugeAreaComponent(configurationService) {
        var _this = _super.call(this, 'gaugeArea', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    RadialGaugeAreaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-radialgauge-area',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    RadialGaugeAreaComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return RadialGaugeAreaComponent;
}(GaugeAreaComponent));

/**
 * The configuration options for the scale of the RadialGauge
 * ([more information and example]({% slug scaleoptions_radialgauge %})).
 */
var RadialScaleComponent = /** @class */ (function (_super) {
    __extends(RadialScaleComponent, _super);
    function RadialScaleComponent(configurationService) {
        var _this = _super.call(this, 'scale', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    RadialScaleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-radialgauge-scale',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    RadialScaleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    RadialScaleComponent.propDecorators = {
        labels: [{ type: Input }],
        rangeDistance: [{ type: Input }],
        ranges: [{ type: Input }],
        startAngle: [{ type: Input }],
        endAngle: [{ type: Input }]
    };
    return RadialScaleComponent;
}(ScaleComponent));

/**
 * The configuration options for a pointer item of a RadialGauge.
 */
var RadialPointerComponent = /** @class */ (function (_super) {
    __extends(RadialPointerComponent, _super);
    function RadialPointerComponent(configurationService, collectionChangesService) {
        return _super.call(this, configurationService, collectionChangesService) || this;
    }
    RadialPointerComponent.decorators = [
        { type: Component, args: [{
                    providers: [ConfigurationService],
                    selector: 'kendo-radialgauge-pointer',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    RadialPointerComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionChangesService }
    ]; };
    RadialPointerComponent.propDecorators = {
        cap: [{ type: Input }],
        color: [{ type: Input }],
        length: [{ type: Input }],
        value: [{ type: Input }]
    };
    return RadialPointerComponent;
}(CollectionItemComponent));

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
var RadialPointersComponent = /** @class */ (function (_super) {
    __extends(RadialPointersComponent, _super);
    function RadialPointersComponent(configurationService, collectionChangesService) {
        return _super.call(this, 'pointer', configurationService, collectionChangesService) || this;
    }
    RadialPointersComponent.decorators = [
        { type: Component, args: [{
                    providers: [CollectionChangesService],
                    selector: 'kendo-radialgauge-pointers',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    RadialPointersComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionChangesService }
    ]; };
    RadialPointersComponent.propDecorators = {
        children: [{ type: ContentChildren, args: [RadialPointerComponent,] }]
    };
    return RadialPointersComponent;
}(CollectionComponent));

/**
 * The configuration options for a scale range item of a RadialGauge.
 */
var RadialRangeComponent = /** @class */ (function (_super) {
    __extends(RadialRangeComponent, _super);
    function RadialRangeComponent(configurationService, collectionChangesService) {
        return _super.call(this, configurationService, collectionChangesService) || this;
    }
    RadialRangeComponent.decorators = [
        { type: Component, args: [{
                    providers: [ConfigurationService],
                    selector: 'kendo-radialgauge-scale-range',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    RadialRangeComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionChangesService }
    ]; };
    return RadialRangeComponent;
}(RangeComponent));

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
var RadialRangesComponent = /** @class */ (function (_super) {
    __extends(RadialRangesComponent, _super);
    function RadialRangesComponent(configurationService, collectionChangesService) {
        return _super.call(this, 'scale.ranges', configurationService, collectionChangesService) || this;
    }
    RadialRangesComponent.decorators = [
        { type: Component, args: [{
                    providers: [CollectionChangesService],
                    selector: 'kendo-radialgauge-scale-ranges',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    RadialRangesComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionChangesService }
    ]; };
    RadialRangesComponent.propDecorators = {
        children: [{ type: ContentChildren, args: [RadialRangeComponent,] }]
    };
    return RadialRangesComponent;
}(CollectionComponent));

var DIRECTIVES$2 = [RadialGaugeComponent, RadialGaugeAreaComponent, RadialScaleComponent, RadialLabelsComponent,
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
var RadialGaugeModule = /** @class */ (function () {
    function RadialGaugeModule() {
    }
    RadialGaugeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DIRECTIVES$2],
                    exports: [DIRECTIVES$2],
                    imports: [SharedModule]
                },] },
    ];
    return RadialGaugeModule;
}());

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
var GaugesModule = /** @class */ (function () {
    function GaugesModule() {
    }
    GaugesModule.decorators = [
        { type: NgModule, args: [{
                    exports: [ArcGaugeModule, LinearGaugeModule, RadialGaugeModule]
                },] },
    ];
    return GaugesModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { SharedModule, ArcGaugeModule, LinearGaugeModule, RadialGaugeModule, GaugesModule, CollectionComponent, CollectionItemComponent, GaugeComponent, GaugeAreaComponent, LabelsComponent, RangeComponent, ScaleComponent, SettingsComponent, ConfigurationService, CollectionChangesService, ThemeService, ArcGaugeComponent, ArcGaugeAreaComponent, ArcScaleComponent, ArcLabelsComponent, ArcCenterTemplateDirective, ColorsComponent, ColorComponent, LinearGaugeComponent, LinearGaugeAreaComponent, LinearScaleComponent, LinearLabelsComponent, LinearPointersComponent, LinearPointerComponent, LinearRangeComponent, LinearRangesComponent, RadialGaugeComponent, RadialGaugeAreaComponent, RadialScaleComponent, RadialLabelsComponent, RadialPointersComponent, RadialPointerComponent, RadialRangeComponent, RadialRangesComponent };
export { ResizeSensorComponent } from '@progress/kendo-angular-common';
