import { PreventableEvent } from '../preventable-event';
import { ContextMenuComponent } from './context-menu.component';
/**
 * Arguments for the `popupOpen` and `popupClose` events of the ContextMenu.
 */
export declare class ContextMenuPopupEvent extends PreventableEvent {
    /**
     * The target element for which the ContextMenu is opened.
     */
    target: any;
    /**
     * The DOM event that started the action.
     */
    originalEvent: any;
    /**
     * The ContextMenuComponent that triggered the event.
     */
    sender: ContextMenuComponent;
}
