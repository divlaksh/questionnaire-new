import { HostBinding, Input, ViewChild, ElementRef } from '@angular/core';
import { exportSVG, exportImage } from '@progress/kendo-drawing';
import { ResizeSensorComponent } from '@progress/kendo-angular-common';
var inDocument = function (element) {
    var node = element;
    while (node && node !== document.body) {
        node = node.parentNode;
    }
    return Boolean(node);
};
var ɵ0 = inDocument;
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
export { GaugeComponent };
export { ɵ0 };
