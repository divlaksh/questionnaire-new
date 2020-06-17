import { MenuComponent } from './menu.component';
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `open` and `close` events of the Menu.
 */
export declare class MenuEvent extends PreventableEvent {
    /**
     * The MenuComponent that triggered the event.
     */
    sender: MenuComponent;
    /**
     * The item data of the event.
     */
    item: any;
    /**
     * The item index of the event.
     */
    index: string;
}
