import { OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
/**
 * Represents a directive that can be used in the [`linkTemplate`]({% slug api_menu_itemlinktemplatedirective %})
 * of the items to apply the default styling and behavior.
 */
export declare class LinkDirective implements OnInit {
    private itemsService;
    /**
     * The index of the Menu item. The input is mandatory.
     */
    index: string;
    hostClasses: boolean;
    role: string;
    tabindex: string;
    readonly activeClass: boolean;
    private item;
    constructor(itemsService: ItemsService);
    ngOnInit(): void;
}
