"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var base_slot_directive_1 = require("../view-items/base-slot.directive");
var month_slot_service_1 = require("./month-slot.service");
var dom_queries_1 = require("../../common/dom-queries");
var utils_1 = require("../utils");
/**
 * @hidden
 */
var MonthSlotDirective = /** @class */ (function (_super) {
    tslib_1.__extends(MonthSlotDirective, _super);
    function MonthSlotDirective(element, slotService, localization) {
        var _this = _super.call(this, element, slotService, localization) || this;
        _this.isDaySlot = true;
        _this._linkHeight = null;
        return _this;
    }
    Object.defineProperty(MonthSlotDirective.prototype, "start", {
        get: function () {
            return this.startDate;
        },
        set: function (value) {
            this.startDate = utils_1.toUTCDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthSlotDirective.prototype, "end", {
        get: function () {
            return utils_1.addUTCDays(this.start, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthSlotDirective.prototype, "linkHeight", {
        get: function () {
            if (this._linkHeight === null) {
                var element = dom_queries_1.firstElementChild(this.nativeElement);
                this._linkHeight = element ? element.offsetHeight + element.offsetTop : 0;
            }
            return this._linkHeight;
        },
        enumerable: true,
        configurable: true
    });
    MonthSlotDirective.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.removeShowMore();
    };
    MonthSlotDirective.prototype.showMore = function (rect) {
        if (!this.showMoreElement) {
            var element = this.showMoreElement = document.createElement('div');
            element.innerHTML = '<span>...</span>';
            element.className = 'k-more-events k-button';
            element.style.width = rect.width + "px";
            element.style.left = rect.left + "px";
            element.style.top = rect.top + "px";
            this.nativeElement.appendChild(element);
        }
    };
    MonthSlotDirective.prototype.hideMore = function () {
        this.removeShowMore();
    };
    MonthSlotDirective.prototype.invalidate = function () {
        _super.prototype.invalidate.call(this);
        this._linkHeight = null;
        this.removeShowMore();
    };
    MonthSlotDirective.prototype.removeShowMore = function () {
        if (this.showMoreElement) {
            this.showMoreElement.parentNode.removeChild(this.showMoreElement);
            this.showMoreElement = null;
        }
    };
    MonthSlotDirective.decorators = [
        { type: core_1.Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[monthSlot]'
                },] },
    ];
    /** @nocollapse */
    MonthSlotDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: month_slot_service_1.MonthSlotService },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    MonthSlotDirective.propDecorators = {
        start: [{ type: core_1.Input }]
    };
    return MonthSlotDirective;
}(base_slot_directive_1.BaseSlotDirective));
exports.MonthSlotDirective = MonthSlotDirective;
