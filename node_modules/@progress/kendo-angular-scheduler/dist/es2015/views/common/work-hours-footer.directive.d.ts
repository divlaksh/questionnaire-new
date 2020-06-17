import { OnInit, OnChanges } from '@angular/core';
import { ViewFooterComponent } from './view-footer.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare class WorkHoursFooterDirective implements OnInit, OnChanges {
    private footer;
    private localization;
    showWorkHours: boolean;
    footerItems: any[];
    constructor(footer: ViewFooterComponent, localization: LocalizationService);
    ngOnInit(): void;
    ngOnChanges(): void;
    private toggleWorkHours;
}
