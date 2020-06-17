import { OnChanges } from '@angular/core';
import { MenuBase } from '../menu-base';
/**
 * @hidden
 */
export declare abstract class BindingDirectiveBase implements OnChanges {
    protected menu: MenuBase;
    data: any[];
    protected fields: any[];
    constructor(menu: MenuBase);
    ngOnChanges(): void;
    /**
     *  Rebinds the Menu items.
     */
    rebind(): void;
    protected abstract mapItems(items: any[]): any[];
}
