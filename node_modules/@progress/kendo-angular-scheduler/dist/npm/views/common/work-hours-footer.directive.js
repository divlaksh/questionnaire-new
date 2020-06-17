"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var view_footer_component_1 = require("./view-footer.component");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
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
        { type: core_1.Directive, args: [{
                    selector: '[kendoWorkHoursFooter]'
                },] },
    ];
    /** @nocollapse */
    WorkHoursFooterDirective.ctorParameters = function () { return [
        { type: view_footer_component_1.ViewFooterComponent },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    WorkHoursFooterDirective.propDecorators = {
        showWorkHours: [{ type: core_1.Input }]
    };
    return WorkHoursFooterDirective;
}());
exports.WorkHoursFooterDirective = WorkHoursFooterDirective;
