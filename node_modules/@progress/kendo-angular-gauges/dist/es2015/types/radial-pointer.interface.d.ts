import { Cap } from './cap.interface';
/**
 * The configuration options for the RadialGauge pointer.
 */
export interface RadialPointer {
    /**
     * The configuration options for the cap.
     */
    cap?: Cap;
    /**
     * The color of the pointer.
     * Accepts valid CSS color strings, including hex and rgb.
     */
    color?: string;
    /**
     * The pointer length (in percent) that is based on the distance to the scale.
     * The default length of `1` indicates that the pointer exactly reaches the scale.
     * Accepts values between `0.1` and `1.5`.
     */
    length?: number;
    /**
     * The pointer value.
     */
    value?: number;
}
