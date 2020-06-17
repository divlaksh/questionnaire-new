/**
 * The animation settings for the Popup component.
 */
export interface MenuAnimation {
    /**
     * The type of the animation.
     * @default 'slide'
     */
    type?: 'slide' | 'expand' | 'zoom' | 'fade';
    /**
     * The animation duration in milliseconds.
     * @default 100
     */
    duration: number;
}
