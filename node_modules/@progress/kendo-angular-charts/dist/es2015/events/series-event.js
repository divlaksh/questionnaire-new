import { PreventableEvent } from './preventable-event';
/**
 * @hidden
 */
export class SeriesEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.category = e.category;
        this.dataItem = e.dataItem;
        this.originalEvent = e.originalEvent;
        this.percentage = e.percentage;
        this.point = e.point;
        this.series = e.series;
        this.stackValue = e.stackValue;
        this.value = e.value;
    }
}
