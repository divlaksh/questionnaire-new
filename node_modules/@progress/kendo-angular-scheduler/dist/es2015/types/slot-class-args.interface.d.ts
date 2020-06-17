/**
 * The arguments for the `slotClass` function.
 */
export interface SlotClassArgs {
    /**
     * The start date of the slot.
     */
    start?: Date;
    /**
     * The end date of the slot.
     */
    end?: Date;
    /**
     * Specifies if the slot is an all-day slot.
     */
    isAllDay?: boolean;
    /**
     * The slot resources.
     */
    resources?: any[];
    /**
     * The slot event. Applicable for the **Agenda** view.
     */
    event?: any;
}
