import { ElementRef, Renderer2, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { NavigationService } from '../services/navigation.service';
import { PopupService } from '@progress/kendo-angular-popup';
import { MenuAnimation } from '../menu-animation.interface';
/**
 * @hidden
 */
export declare class ItemComponent {
    private itemsService;
    private navigation;
    private changeDetector;
    private renderer;
    private popupService;
    element: ElementRef;
    item: any;
    level: number;
    index: string;
    siblingIndex: number;
    animate: boolean | MenuAnimation;
    vertical: boolean;
    rtl: boolean;
    openOnClick: boolean;
    itemTemplate: TemplateRef<any>;
    itemLinkTemplate: TemplateRef<any>;
    link: ElementRef;
    popupTemplate: TemplateRef<any>;
    readonly disabled: boolean;
    readonly hasPopup: boolean;
    readonly expanded: boolean;
    readonly label: boolean;
    readonly activeId: string;
    readonly popupSettings: any;
    readonly horizontal: boolean;
    readonly hasLink: boolean;
    readonly linkTemplate: TemplateRef<any>;
    readonly hasContent: boolean;
    readonly isContent: boolean;
    readonly iconClass: string;
    readonly children: any[];
    readonly template: TemplateRef<any>;
    opened: boolean;
    navigating: boolean;
    childId: string;
    private contentItems;
    private popupRef;
    private _index;
    private destroyed;
    constructor(itemsService: ItemsService, navigation: NavigationService, changeDetector: ChangeDetectorRef, renderer: Renderer2, popupService: PopupService, element: ElementRef);
    hasContentTemplates(): boolean;
    ngOnInit(): void;
    ngOnDestroy(): void;
    focus(): void;
    toggleActive(isActive: boolean): void;
    open(): void;
    close(): void;
    navigate(): void;
    private setAttribute;
}
