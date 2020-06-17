import { Component, NgZone, Input } from '@angular/core';
import { PDFService } from './pdf.service';
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';
var createElement = function (tagName, className) {
    var element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    return element;
};
var ɵ0 = createElement;
var createDiv = function (className) { return createElement('div', className); };
var ɵ1 = createDiv;
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
        return drawDOM(element, options);
    };
    PDFComponent.prototype.exportGroup = function (group) {
        return exportPDF(group, this.pdfOptions);
    };
    PDFComponent.prototype.saveDataUri = function (dataUri) {
        saveAs(dataUri, this.fileName, this.saveOptions);
    };
    PDFComponent.prototype.done = function () {
        if (this.container) {
            document.body.removeChild(this.container);
            this.container = null;
        }
        this.pdfService.done.emit();
    };
    PDFComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-scheduler-pdf',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    PDFComponent.ctorParameters = function () { return [
        { type: PDFService },
        { type: NgZone }
    ]; };
    PDFComponent.propDecorators = {
        author: [{ type: Input }],
        avoidLinks: [{ type: Input }],
        creator: [{ type: Input }],
        date: [{ type: Input }],
        imageResolution: [{ type: Input }],
        fileName: [{ type: Input }],
        forceProxy: [{ type: Input }],
        keywords: [{ type: Input }],
        margin: [{ type: Input }],
        scale: [{ type: Input }],
        proxyData: [{ type: Input }],
        proxyURL: [{ type: Input }],
        proxyTarget: [{ type: Input }],
        producer: [{ type: Input }],
        subject: [{ type: Input }],
        title: [{ type: Input }]
    };
    return PDFComponent;
}());
export { PDFComponent };
export { ɵ0, ɵ1 };
