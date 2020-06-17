import { Component, NgZone, Input } from '@angular/core';
import { PDFService } from './pdf.service';
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';
const createElement = (tagName, className) => {
    const element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    return element;
};
const ɵ0 = createElement;
const createDiv = (className) => createElement('div', className);
const ɵ1 = createDiv;
/**
 * Configures the settings for the export of Scheduler in PDF ([see example]({% slug pdfexport_scheduler %})).
 */
export class PDFComponent {
    constructor(pdfService, ngZone) {
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
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    get drawOptions() {
        return {
            _destructive: true,
            avoidLinks: this.avoidLinks,
            margin: this.margin,
            scale: this.scale
        };
    }
    get pdfOptions() {
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
    }
    get saveOptions() {
        return {
            forceProxy: this.forceProxy,
            proxyData: this.proxyData,
            proxyTarget: this.proxyTarget,
            proxyURL: this.proxyURL
        };
    }
    createElement(args) {
        this.ngZone.runOutsideAngular(() => {
            const container = this.container = createDiv();
            container.style.top = container.style.left = '-10000px';
            container.style.position = 'absolute';
            const wrapper = createDiv('k-widget k-scheduler k-floatwrap');
            wrapper.style.position = 'relative';
            wrapper.appendChild(args.element);
            container.appendChild(wrapper);
            document.body.appendChild(container);
            this.save(wrapper);
        });
    }
    save(element) {
        this.drawElement(element, this.drawOptions)
            .then(this.exportGroup)
            .then(this.saveDataUri)
            .then(this.done, this.done);
    }
    drawElement(element, options) {
        return drawDOM(element, options);
    }
    exportGroup(group) {
        return exportPDF(group, this.pdfOptions);
    }
    saveDataUri(dataUri) {
        saveAs(dataUri, this.fileName, this.saveOptions);
    }
    done() {
        if (this.container) {
            document.body.removeChild(this.container);
            this.container = null;
        }
        this.pdfService.done.emit();
    }
}
PDFComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-scheduler-pdf',
                template: ''
            },] },
];
/** @nocollapse */
PDFComponent.ctorParameters = () => [
    { type: PDFService },
    { type: NgZone }
];
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
export { ɵ0, ɵ1 };
