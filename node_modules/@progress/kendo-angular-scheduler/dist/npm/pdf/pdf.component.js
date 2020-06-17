"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var pdf_service_1 = require("./pdf.service");
var kendo_drawing_1 = require("@progress/kendo-drawing");
var kendo_file_saver_1 = require("@progress/kendo-file-saver");
var createElement = function (tagName, className) {
    var element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    return element;
};
var ɵ0 = createElement;
exports.ɵ0 = ɵ0;
var createDiv = function (className) { return createElement('div', className); };
var ɵ1 = createDiv;
exports.ɵ1 = ɵ1;
/**
 * Configures the settings for the export of Scheduler in PDF ([see example]({% slug pdfexport_scheduler %})).
 */
var PDFComponent = /** @class */ (function () {
    function PDFComponent(pdfService, ngZone) {
        this.pdfService = pdfService;
        this.ngZone = ngZone;
        /**
         * The creator of the PDF document.
         * Defaults to `Kendo UI PDF Generator`.
         */
        this.creator = 'Kendo UI PDF Generator';
        this.subscriptions = this.pdfService.elementReady.subscribe(this.createElement.bind(this));
        this.saveDataUri = this.saveDataUri.bind(this);
        this.exportGroup = this.exportGroup.bind(this);
        this.done = this.done.bind(this);
    }
    PDFComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    Object.defineProperty(PDFComponent.prototype, "drawOptions", {
        get: function () {
            return {
                _destructive: true,
                avoidLinks: this.avoidLinks,
                margin: this.margin,
                scale: this.scale
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PDFComponent.prototype, "pdfOptions", {
        get: function () {
            return {
                author: this.author,
                creator: this.creator,
                date: this.date,
                imgDPI: this.imageResolution,
                keywords: this.keywords,
                margin: this.margin,
                producer: this.producer,
                subject: this.subject,
                title: this.title
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PDFComponent.prototype, "saveOptions", {
        get: function () {
            return {
                forceProxy: this.forceProxy,
                proxyData: this.proxyData,
                proxyTarget: this.proxyTarget,
                proxyURL: this.proxyURL
            };
        },
        enumerable: true,
        configurable: true
    });
    PDFComponent.prototype.createElement = function (args) {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var container = _this.container = createDiv();
            container.style.top = container.style.left = '-10000px';
            container.style.position = 'absolute';
            var wrapper = createDiv('k-widget k-scheduler k-floatwrap');
            wrapper.style.position = 'relative';
            wrapper.appendChild(args.element);
            container.appendChild(wrapper);
            document.body.appendChild(container);
            _this.save(wrapper);
        });
    };
    PDFComponent.prototype.save = function (element) {
        this.drawElement(element, this.drawOptions)
            .then(this.exportGroup)
            .then(this.saveDataUri)
            .then(this.done, this.done);
    };
    PDFComponent.prototype.drawElement = function (element, options) {
        return kendo_drawing_1.drawDOM(element, options);
    };
    PDFComponent.prototype.exportGroup = function (group) {
        return kendo_drawing_1.exportPDF(group, this.pdfOptions);
    };
    PDFComponent.prototype.saveDataUri = function (dataUri) {
        kendo_file_saver_1.saveAs(dataUri, this.fileName, this.saveOptions);
    };
    PDFComponent.prototype.done = function () {
        if (this.container) {
            document.body.removeChild(this.container);
            this.container = null;
        }
        this.pdfService.done.emit();
    };
    PDFComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-scheduler-pdf',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    PDFComponent.ctorParameters = function () { return [
        { type: pdf_service_1.PDFService },
        { type: core_1.NgZone }
    ]; };
    PDFComponent.propDecorators = {
        author: [{ type: core_1.Input }],
        avoidLinks: [{ type: core_1.Input }],
        creator: [{ type: core_1.Input }],
        date: [{ type: core_1.Input }],
        imageResolution: [{ type: core_1.Input }],
        fileName: [{ type: core_1.Input }],
        forceProxy: [{ type: core_1.Input }],
        keywords: [{ type: core_1.Input }],
        margin: [{ type: core_1.Input }],
        scale: [{ type: core_1.Input }],
        proxyData: [{ type: core_1.Input }],
        proxyURL: [{ type: core_1.Input }],
        proxyTarget: [{ type: core_1.Input }],
        producer: [{ type: core_1.Input }],
        subject: [{ type: core_1.Input }],
        title: [{ type: core_1.Input }]
    };
    return PDFComponent;
}());
exports.PDFComponent = PDFComponent;
