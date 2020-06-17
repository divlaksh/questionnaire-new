import { ElementRef, TemplateRef, OnInit, OnDestroy, Renderer2, NgZone } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { ActionsService } from '../services/actions.service';
import { NavigationService } from '../services/navigation.service';
import { HoverService } from '../services/hover.service';
import { MenuAnimation } from '../menu-animation.interface';
/**
 * @hidden
 */
export declare class ListComponent implements OnInit, OnDestroy {
    private itemsService;
    private hover;
    private actions;
    private navigation;
    private renderer;
    private ngZone;
    element: ElementRef;
    items: any[];
    level: number;
    index: string;
    animate: boolean | MenuAnimation;
    vertical: boolean;
    rtl: boolean;
    openOnClick: any;
    itemTemplate: TemplateRef<any>;
    itemLinkTemplate: TemplateRef<any>;
    private domSubscriptions;
    constructor(itemsService: ItemsService, hover: HoverService, actions: ActionsService, navigation: NavigationService, renderer: Renderer2, ngZone: NgZone, element: ElementRef);
    hierarchyIndex(index: number): string;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private initDomEvents;
    private leavesMenu;
    private onLeave;
    private nodeItem;
    private clickHandler;
}
