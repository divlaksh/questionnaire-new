"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_buttons_1 = require("@progress/kendo-angular-buttons");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var pdf_service_1 = require("./pdf.service");
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
var PDFCommandDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PDFCommandDirective, _super);
    function PDFCommandDirective(pdfService, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.pdfService = pdfService;
        return _this;
    }
    /**
     * @hidden
     */
    PDFCommandDirective.prototype.click = function (e) {
        e.preventDefault();
        this.pdfService.exportClick.emit();
    };
    PDFCommandDirective.prototype.ngOnInit = function () {
        this.icon = 'pdf';
    };
    PDFCommandDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoSchedulerPDFCommand]'
                },] },
    ];
    /** @nocollapse */
    PDFCommandDirective.ctorParameters = function () { return [
        { type: pdf_service_1.PDFService },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone }
    ]; };
    PDFCommandDirective.propDecorators = {
        click: [{ type: core_1.HostListener, args: ['click', ['$event'],] }]
    };
    return PDFCommandDirective;
}(kendo_angular_buttons_1.Button));
exports.PDFCommandDirective = PDFCommandDirective;
