import { ContextMenuComponent } from './context-menu.component';
/**
 * Arguments for the `open` and `close` events of the ContextMenu.
 */
export declare class ContextMenuEvent {
    /**
     * The target element for which the ContextMenu is opened.
     */
    target: any;
    /**
     * The ContextMenuComponent that triggered the event.
     */
    sender: ContextMenuComponent;
    /**
     * The item data of the event.
     */
    item: any;
    /**
     * The item index of the event.
     */
    index: string;
}
