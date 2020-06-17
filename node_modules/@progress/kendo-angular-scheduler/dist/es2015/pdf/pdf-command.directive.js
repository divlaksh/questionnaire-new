import { Directive, HostListener, ElementRef, Renderer2, NgZone } from '@angular/core';
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
export class PDFCommandDirective extends Button {
    constructor(pdfService, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.pdfService = pdfService;
    }
    /**
     * @hidden
     */
    click(e) {
        e.preventDefault();
        this.pdfService.exportClick.emit();
    }
    ngOnInit() {
        this.icon = 'pdf';
    }
}
PDFCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerPDFCommand]'
            },] },
];
/** @nocollapse */
PDFCommandDirective.ctorParameters = () => [
    { type: PDFService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: NgZone }
];
PDFCommandDirective.propDecorators = {
    click: [{ type: HostListener, args: ['click', ['$event'],] }]
};
