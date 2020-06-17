import { Input } from '@angular/core';
import { DayTimeViewBase } from '../day-time/day-time-view-base';
const SLOT_FILL = 'slotFill';
/**
 * @hidden
 */
export class MultiDayViewBase extends DayTimeViewBase {
    constructor(localization, changeDetector, viewContext, viewState) {
        super(localization, changeDetector, viewContext, viewState);
    }
    /**
     * @hidden
     */
    get viewSlotFill() {
        return this.optionValue(SLOT_FILL);
    }
}
MultiDayViewBase.propDecorators = {
    slotFill: [{ type: Input }]
};
