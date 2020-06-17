import { Border } from '../../common/property-types';
/**
 * The configuration options of the series markers highlight.
 */
export interface MarkersHighlight {
    /**
     * The border of the markers highlight.
     */
    border?: Border;
    /**
     * The color of the markers highlight. Accepts a valid CSS color string, including hex and rgb.
     */
    color?: string;
    /**
     * The opacity of the highlighted marker.
     */
    opacity?: number;
}
