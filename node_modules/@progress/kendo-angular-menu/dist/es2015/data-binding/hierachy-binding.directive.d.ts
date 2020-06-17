import { MenuBase } from '../menu-base';
import { BindingDirectiveBase } from './binding-directive-base';
/**
 * A directive that converts the provided hierarchical data to [MenuItems]({% slug api_menu_menuitem %}) and binds them to the Menu.
 */
export declare class HierarchyBindingDirective extends BindingDirectiveBase {
    /**
     *  The array of data which will be used to populate the Menu.
     */
    data: any[];
    /**
     * Defines the `text` field (or fields) of an item.
     */
    textField: string | string[];
    /**
     * Defines the `url` field (or fields) of an item.
     */
    urlField: string | string[];
    /**
     * Defines the `icon` field (or fields) of an item.
     */
    iconField: string | string[];
    /**
     * Defines the `disabled` field (or fields) of an item.
     */
    disabledField: string | string[];
    /**
     * Defines the `cssClass` field (or fields) of an item.
     */
    cssClassField: string | string[];
    /**
     * Defines the `cssStyle` field (or fields) of an item.
     */
    cssStyleField: string | string[];
    /**
     * Defines the `separator` field (or fields) of the items.
     */
    separatorField: string | string[];
    /**
     * Defines the `children` field (or fields) of the items.
     */
    childrenField: string | string[];
    constructor(menu: MenuBase);
    protected mapItems(items: any[], level?: number): any[];
    protected createItem(item: any, level: number): any;
    protected getChildren(item: any, level: number): any;
}
