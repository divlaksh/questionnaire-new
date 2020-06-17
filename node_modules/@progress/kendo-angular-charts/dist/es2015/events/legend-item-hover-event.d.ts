import { LegendEvent } from './legend-event';
/**
 * Arguments for the `legendItemHover` event.
 */
export declare class LegendItemHoverEvent extends LegendEvent {
    /**
     * If called, the series highlight is not shown as a result of hovering over the legend item.
     */
    preventDefault(): void;
}
