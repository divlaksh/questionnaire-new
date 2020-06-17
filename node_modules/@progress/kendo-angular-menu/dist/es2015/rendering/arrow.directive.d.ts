import { OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
/**
 * Represents a directive that can be used in the [`linkTemplate`]({% slug api_menu_itemlinktemplatedirective %})
 * of the items to render the default expand arrow.
 */
export declare class ExpandArrowDirective implements OnInit {
    private itemsService;
    /**
     * The index of the Menu item. The input is mandatory.
     */
    index: string;
    hostClasses: boolean;
    role: string;
    readonly arrowDown: boolean;
    readonly arrowRight: boolean;
    readonly arrowLeft: boolean;
    private item;
    constructor(itemsService: ItemsService);
    ngOnInit(): void;
}
