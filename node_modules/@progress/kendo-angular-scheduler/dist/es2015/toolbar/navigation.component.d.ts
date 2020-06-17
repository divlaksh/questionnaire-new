import { ElementRef, TemplateRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PopupService } from '@progress/kendo-angular-popup';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ToolbarService } from './toolbar.service';
import { ToolbarContext } from './toolbar-context';
/**
 * A toolbar component which contains the controls for date navigation
 * ([see example]({% slug toolbar_scheduler %}#toc-including-the-built-in-components)).
 *
 * To render the **Previous**, **Today**, **Next**, and **Date picker**
 * buttons, include the component in the
 * [toolbar template]({% slug api_scheduler_toolbartemplatedirective %}).
 *
 * {% meta height:700 %}
 * {% embed_file toolbar/template/app.component.ts preview %}
 * {% embed_file toolbar/template/my-navigation.component.ts %}
 * {% embed_file toolbar/template/app.module.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% embed_file shared/main.ts %}
 * {% endmeta %}
 */
export declare class ToolbarNavigationComponent implements OnDestroy {
    private popupService;
    private toolbarService;
    private localization;
    /**
     * @hidden
     */
    hostClasses: boolean;
    /**
     * @hidden
     */
    min: Date;
    /**
     * @hidden
     */
    max: Date;
    /**
     * @hidden
     */
    readonly todayText: string;
    /**
     * @hidden
     */
    readonly calendarTodayText: string;
    /**
     * @hidden
     */
    readonly nextText: string;
    /**
     * @hidden
     */
    readonly previousText: string;
    /**
     * @hidden
     */
    readonly ctx: ToolbarContext;
    private popupRef;
    private subs;
    constructor(popupService: PopupService, toolbarService: ToolbarService, localization: LocalizationService, cd: ChangeDetectorRef);
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    toggleSelectedDate(anchor: ElementRef, template: TemplateRef<any>): boolean;
    /**
     * @hidden
     */
    selectDate(value: Date): void;
    /**
     * @hidden
     */
    prevClick(): boolean;
    /**
     * @hidden
     */
    nextClick(): boolean;
    /**
     * @hidden
     */
    todayClick(): boolean;
    protected closePopup(): void;
}
