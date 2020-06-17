import { LegendEvent } from './legend-event';
/* tslint:disable:no-empty */
/**
 * Arguments for the `legendItemLeave` event.
 */
export class LegendItemLeaveEvent extends LegendEvent {
    /**
     * @hidden
     */
    preventDefault() {
    }
    /**
     * @hidden
     */
    isDefaultPrevented() {
        return false;
    }
}
