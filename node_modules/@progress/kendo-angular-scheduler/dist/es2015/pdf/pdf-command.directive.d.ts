import { ElementRef, Renderer2, NgZone } from '@angular/core';
import { Button } from '@progress/kendo-angular-buttons';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PDFService } from './pdf.service';
/**
 * Represents the `export-to-PDF` command of the Scheduler.
 * You can apply this directive to any `button` element inside a
 * [`ToolbarTemplate`]({% slug toolbar_scheduler %}).
 * When the user clicks a button that is associated with the directive, the
 * [`pdfExport`]({% slug api_scheduler_schedulercomponent %}#toc-pdfexport) event
 * fires ([see example]({% slug pdfexport_scheduler %})).
 *
 * @example
 * ```html-no-run
 * <kendo-scheduler>
 *      <ng-template kendoSchedulerToolbarTemplate>
 *          <button kendoSchedulerPDFCommand>Export PDF</button>
 *          <ul kendoSchedulerToolbarNavigation></ul>
 *          <ul kendoSchedulerToolbarViewSelector></ul>
 *      </ng-template>
 *      <kendo-scheduler-pdf fileName="Scheduler.pdf">
 *      </kendo-scheduler-pdf>
 * </kendo-scheduler>
 * ```
 */
export declare class PDFCommandDirective extends Button {
    private pdfService;
    /**
     * @hidden
     */
    click(e: any): void;
    constructor(pdfService: PDFService, element: ElementRef, renderer: Renderer2, localization: LocalizationService, ngZone: NgZone);
    ngOnInit(): void;
}
