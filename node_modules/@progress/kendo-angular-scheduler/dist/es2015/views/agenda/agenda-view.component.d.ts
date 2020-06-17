import { ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ConfigurationViewBase } from '../common/configuration-view-base';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { EventTemplateDirective, AgendaTimeTemplateDirective, AgendaDateTemplateDirective } from '../templates';
/**
 * The component for rendering the **Agenda** view.
 */
export declare class AgendaViewComponent extends ConfigurationViewBase {
    /**
     * @hidden
     */
    readonly title: string;
    /**
     * The long-date format for displaying the
     * selected date in the Scheduler toolbar.
     * Defaults to `{0:D} - {1:D}`,
     * where `0` is the start and `1` is the end date
     * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
     */
    selectedDateFormat: string;
    /**
     * The short-date format for displaying the
     * selected date in the Scheduler toolbar.
     * Defaults to `{0:d} - {1:d}`,
     * where `0` is the start and `1` is the end date
     * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
     */
    selectedShortDateFormat: string;
    /**
     * @hidden
     */
    eventTemplate: EventTemplateDirective;
    /**
     * @hidden
     */
    agendaTimeTemplate: AgendaTimeTemplateDirective;
    /**
     * @hidden
     */
    agendaDateTemplate: AgendaDateTemplateDirective;
    /**
     * The invariant name for this view (`agenda`).
     */
    readonly name: string;
    constructor(localization: LocalizationService, changeDetector: ChangeDetectorRef, viewContext: ViewContextService, viewState: ViewStateService);
}
