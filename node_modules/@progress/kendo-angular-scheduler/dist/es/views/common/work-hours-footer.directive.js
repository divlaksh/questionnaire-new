import { Directive, Input } from '@angular/core';
import { ViewFooterComponent } from './view-footer.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
var WorkHoursFooterDirective = /** @class */ (function () {
    function WorkHoursFooterDirective(footer, localization) {
        this.footer = footer;
        this.localization = localization;
        this.showWorkHours = false;
        this.footerItems = [{ cssClass: 'k-scheduler-fullday', iconClass: 'k-i-clock', text: '' }];
    }
    WorkHoursFooterDirective.prototype.ngOnInit = function () {
        this.toggleWorkHours();
        this.footer.items = this.footerItems;
    };
    WorkHoursFooterDirective.prototype.ngOnChanges = function () {
        this.toggleWorkHours();
    };
    WorkHoursFooterDirective.prototype.toggleWorkHours = function () {
        this.footerItems[0].text = this.showWorkHours ? this.localization.get('showFullDay') : this.localization.get('showWorkDay');
    };
    WorkHoursFooterDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoWorkHoursFooter]'
                },] },
    ];
    /** @nocollapse */
    WorkHoursFooterDirective.ctorParameters = function () { return [
        { type: ViewFooterComponent },
        { type: LocalizationService }
    ]; };
    WorkHoursFooterDirective.propDecorators = {
        showWorkHours: [{ type: Input }]
    };
    return WorkHoursFooterDirective;
}());
export { WorkHoursFooterDirective };
