import { LegendEvent } from './legend-event';
/**
 * Arguments for the `legendItemClick` event.
 */
export class LegendItemClickEvent extends LegendEvent {
    /**
     * If called, the series visibility is not toggled as a result of clicking the legend item.
     */
    preventDefault() {
        super.preventDefault();
    }
}
