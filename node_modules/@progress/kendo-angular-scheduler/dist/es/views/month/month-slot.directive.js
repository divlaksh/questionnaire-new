import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { BaseSlotDirective } from '../view-items/base-slot.directive';
import { MonthSlotService } from './month-slot.service';
import { firstElementChild } from '../../common/dom-queries';
import { addUTCDays, toUTCDate } from '../utils';
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
            this.startDate = toUTCDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthSlotDirective.prototype, "end", {
        get: function () {
            return addUTCDays(this.start, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthSlotDirective.prototype, "linkHeight", {
        get: function () {
            if (this._linkHeight === null) {
                var element = firstElementChild(this.nativeElement);
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
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[monthSlot]'
                },] },
    ];
    /** @nocollapse */
    MonthSlotDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: MonthSlotService },
        { type: LocalizationService }
    ]; };
    MonthSlotDirective.propDecorators = {
        start: [{ type: Input }]
    };
    return MonthSlotDirective;
}(BaseSlotDirective));
export { MonthSlotDirective };
