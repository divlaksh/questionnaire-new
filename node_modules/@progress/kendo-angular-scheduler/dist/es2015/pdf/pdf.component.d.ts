import { OnDestroy, NgZone } from '@angular/core';
import { PDFService } from './pdf.service';
import { PageMargin } from '@progress/kendo-drawing/pdf';
/**
 * Configures the settings for the export of Scheduler in PDF ([see example]({% slug pdfexport_scheduler %})).
 */
export declare class PDFComponent implements OnDestroy {
    protected pdfService: PDFService;
    protected ngZone: NgZone;
    /**
     * The author (metadata) of the PDF document.
     */
    author: string;
    /**
     * A flag that indicates whether to produce actual hyperlinks in the exported PDF file.
     * It is also possible to set a CSS selector. All matching links will be ignored.
     */
    avoidLinks: boolean | string;
    /**
     * The creator of the PDF document.
     * Defaults to `Kendo UI PDF Generator`.
     */
    creator: string;
    /**
     * The date when the PDF document is created. Defaults to `new Date()`.
     */
    date: Date;
    /**
     * The forced resolution of the images in the exported PDF document.
     * By default, the images are exported at their full resolution.
     */
    imageResolution: number;
    /**
     * Specifies the name of the exported PDF file.
     */
    fileName: string;
    /**
     * If set to `true`, the content is forwarded to `proxyURL` even if the
     * browser supports local saving of files.
     */
    forceProxy: boolean;
    /**
     * The keywords (metadata) of the PDF document.
     */
    keywords: string;
    /**
     * Specifies the margins of the page.
     *
     * > Numbers are treated as points (`"pt"`).
     *
     * The supported units are:
     * * `"mm"`
     * * `"cm"`
     * * `"in"`
     * * `"pt"` (default).
     *
     */
    margin: string | number | PageMargin;
    /**
     * A scale factor. The text size on the screen might be too big for printing.
     * To scale down the output in PDF, use this option.
     * Defaults to `1`.
     */
    scale: number;
    /**
     * A key/value dictionary of form values which will be sent to the proxy.
     * Can be used to submit Anti-Forgery tokens and other metadata.
     */
    proxyData?: {
        [key: string]: string;
    };
    /**
     * The URL of the server-side proxy which streams the file to the end user. You need to use a proxy if
     * the browser is not capable of saving files locally&mdash;for example, Internet Explorer 9 and Safari.
     * It is your responsibility to implement the server-side proxy. The proxy returns the decoded file with
     * the `"Content-Disposition"` header set to `attachment; filename="<fileName.pdf>"`.
     *
     * In the request body, the proxy receives a POST request with the following parameters:
     * - `"contentType"`&mdash;The MIME type of the file.
     * - `"base64"`&mdash;The base-64 encoded file content.
     * - `"fileName"`&mdash;The file name, as requested by the caller.
     *
     */
    proxyURL: string;
    /**
     * A name or keyword which indicates where to display the document that is
     * returned from the proxy. Defaults to `_self`.
     *
     * To display the document in a new window or iframe, the proxy has to have the
     * `"Content-Disposition"` header set to `inline; filename="<fileName.pdf>"`.
     */
    proxyTarget: string;
    /**
     * The producer (metadata) of the PDF document.
     */
    producer: string;
    /**
     * The subject (metadata) of the PDF document.
     */
    subject: string;
    /**
     * The title (metadata) of the PDF document.
     */
    title: string;
    private subscriptions;
    private container;
    constructor(pdfService: PDFService, ngZone: NgZone);
    ngOnDestroy(): void;
    protected readonly drawOptions: any;
    protected readonly pdfOptions: any;
    protected readonly saveOptions: any;
    protected createElement(args: any): void;
    protected save(element: any): void;
    protected drawElement(element: any, options: any): any;
    protected exportGroup(group: any): Promise<string>;
    protected saveDataUri(dataUri: string): void;
    protected done(): void;
}
