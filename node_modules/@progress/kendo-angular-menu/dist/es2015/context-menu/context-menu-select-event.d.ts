import { ContextMenuEvent } from './context-menu-event';
/**
 * Arguments for the `select` event of the ContextMenu.
 */
export declare class ContextMenuSelectEvent extends ContextMenuEvent {
    /**
     * The DOM event that triggered the selection.
     */
    originalEvent: any;
}
