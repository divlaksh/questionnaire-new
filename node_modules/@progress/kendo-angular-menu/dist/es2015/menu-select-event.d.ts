import { MenuEvent } from './menu-event';
/**
 * Arguments for the `select` event of the Menu.
 */
export declare class MenuSelectEvent extends MenuEvent {
    /**
     * The DOM event that triggered the selection.
     */
    originalEvent: any;
}
