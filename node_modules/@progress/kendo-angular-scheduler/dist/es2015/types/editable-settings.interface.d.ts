/**
 * The editable settings of the Scheduler.
 */
export interface EditableSettings {
    /**
     * Specifies if the events can be removed by using a **Remove** icon.
     */
    remove: boolean;
    /**
     * Specifies if the events can be dragged.
     */
    drag: boolean;
    /**
     * Specifies if the events can be resized.
     */
    resize: boolean;
    /**
     * Specifies if new events can be added on `slotDblClick` when using the editing directives.
     */
    add: boolean;
    /**
     * Specifies if the events can be edited on `eventDblClick` when using the editing directives.
     */
    edit: boolean;
}
