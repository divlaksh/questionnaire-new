import { HostBinding, Input, ViewChild, ElementRef } from '@angular/core';
import { exportSVG, exportImage } from '@progress/kendo-drawing';
import { ResizeSensorComponent } from '@progress/kendo-angular-common';
const inDocument = (element) => {
    let node = element;
    while (node && node !== document.body) {
        node = node.parentNode;
    }
    return Boolean(node);
};
const ɵ0 = inDocument;
/**
 * @hidden
 */
export class GaugeComponent {
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
export { ɵ0 };
