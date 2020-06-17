import { Input } from '@angular/core';
import { DayTimeViewBase } from '../day-time/day-time-view-base';
const COLUMN_WIDTH = 'columnWidth';
/**
 * @hidden
 */
export class TimelineBase extends DayTimeViewBase {
    constructor(localization, changeDetector, viewContext, viewState) {
        super(localization, changeDetector, viewContext, viewState);
    }
    /**
     * @hidden
     */
    get viewColumnWidth() {
        return this.optionValue(COLUMN_WIDTH);
    }
}
TimelineBase.propDecorators = {
    columnWidth: [{ type: Input }]
};
