import { MenuBase } from '../menu-base';
import { BindingDirectiveBase } from './binding-directive-base';
/**
 * A directive that converts the provided flat data to [MenuItems]({% slug api_menu_menuitem %}) and binds them to the Menu.
 */
export declare class FlatBindingDirective extends BindingDirectiveBase {
    /**
     *  The array of data which will be used to populate the Menu.
     */
    data: any[];
    /**
     * Defines the `text` field of the items.
     */
    textField: string;
    /**
     * Defines the `url` field of the items.
     */
    urlField: string;
    /**
     * Defines the `icon` field of the items.
     */
    iconField: string | string[];
    /**
     * Defines the `disabled` field of the items.
     */
    disabledField: string;
    /**
     * Defines the `cssClass` field of the items.
     */
    cssClassField: string;
    /**
     * Defines the `cssStyle` field of the items.
     */
    cssStyleField: string;
    /**
     * Defines the `separator` field of the items.
     */
    separatorField: string;
    /**
     * Defines the `id` field of the items.
     */
    idField: string;
    /**
     * Defines the parent `id` field of the items.
     */
    parentIdField: string;
    constructor(menu: MenuBase);
    protected mapItems(items: any[]): any[];
    protected createItem(dataItem: any): any;
}
