/**
 * An interface for the Scheduler groups.
 */
export interface Group {
    /**
     * An array of the resource names that will be grouped.
     */
    resources: string[];
    /**
     * Specifies the orientation of the groups.
     */
    orientation: 'horizontal' | 'vertical';
}
