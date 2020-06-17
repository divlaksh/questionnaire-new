import { Directive, Input } from '@angular/core';
import { ViewFooterComponent } from './view-footer.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class WorkHoursFooterDirective {
    constructor(footer, localization) {
        this.footer = footer;
        this.localization = localization;
        this.showWorkHours = false;
        this.footerItems = [{ cssClass: 'k-scheduler-fullday', iconClass: 'k-i-clock', text: '' }];
    }
    ngOnInit() {
        this.toggleWorkHours();
        this.footer.items = this.footerItems;
    }
    ngOnChanges() {
        this.toggleWorkHours();
    }
    toggleWorkHours() {
        this.footerItems[0].text = this.showWorkHours ? this.localization.get('showFullDay') : this.localization.get('showWorkDay');
    }
}
WorkHoursFooterDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoWorkHoursFooter]'
            },] },
];
/** @nocollapse */
WorkHoursFooterDirective.ctorParameters = () => [
    { type: ViewFooterComponent },
    { type: LocalizationService }
];
WorkHoursFooterDirective.propDecorators = {
    showWorkHours: [{ type: Input }]
};
