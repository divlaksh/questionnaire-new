import { Directive, Input, ElementRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { BaseSlotDirective } from '../view-items/base-slot.directive';
import { MonthSlotService } from './month-slot.service';
import { firstElementChild } from '../../common/dom-queries';
import { addUTCDays, toUTCDate } from '../utils';
/**
 * @hidden
 */
export class MonthSlotDirective extends BaseSlotDirective {
    constructor(element, slotService, localization) {
        super(element, slotService, localization);
        this.isDaySlot = true;
        this._linkHeight = null;
    }
    set start(value) {
        this.startDate = toUTCDate(value);
    }
    get start() {
        return this.startDate;
    }
    get end() {
        return addUTCDays(this.start, 1);
    }
    get linkHeight() {
        if (this._linkHeight === null) {
            const element = firstElementChild(this.nativeElement);
            this._linkHeight = element ? element.offsetHeight + element.offsetTop : 0;
        }
        return this._linkHeight;
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.removeShowMore();
    }
    showMore(rect) {
        if (!this.showMoreElement) {
            const element = this.showMoreElement = document.createElement('div');
            element.innerHTML = '<span>...</span>';
            element.className = 'k-more-events k-button';
            element.style.width = `${rect.width}px`;
            element.style.left = `${rect.left}px`;
            element.style.top = `${rect.top}px`;
            this.nativeElement.appendChild(element);
        }
    }
    hideMore() {
        this.removeShowMore();
    }
    invalidate() {
        super.invalidate();
        this._linkHeight = null;
        this.removeShowMore();
    }
    removeShowMore() {
        if (this.showMoreElement) {
            this.showMoreElement.parentNode.removeChild(this.showMoreElement);
            this.showMoreElement = null;
        }
    }
}
MonthSlotDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[monthSlot]'
            },] },
];
/** @nocollapse */
MonthSlotDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: MonthSlotService },
    { type: LocalizationService }
];
MonthSlotDirective.propDecorators = {
    start: [{ type: Input }]
};
