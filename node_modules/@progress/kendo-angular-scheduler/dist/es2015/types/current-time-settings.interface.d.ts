/**
 * The settings for the current time marker.
 */
export interface CurrentTimeSettings {
    /**
     * The update interval (in milliseconds) of the current time marker.
     * Defaults to `60000` (a minute).
     */
    updateInterval?: number;
    /**
     * Specifies if the local timezone will be used.
     * If set to `false`, the Scheduler will use its own timezone.
     * Defaults to `true`.
     */
    localTimezone?: boolean;
    /**
     * Specifies if the current time marker will be displayed.
     * Defaults to `true`.
     */
    enabled?: boolean;
}
