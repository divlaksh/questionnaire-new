import { PreventableEvent } from './preventable-event';
/**
 * @hidden
 */
export class LegendEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.series = e.series;
        this.seriesIndex = e.seriesIndex;
        this.pointIndex = e.pointIndex;
        this.text = e.text;
    }
}
