import { EventEmitter, OnChanges, AfterViewChecked, NgZone, Renderer2, TemplateRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ItemsService } from './services/items.service';
import { ActionsService } from './services/actions.service';
import { NavigationService } from './services/navigation.service';
import { HoverService } from './services/hover.service';
import { MenuEvent } from './menu-event';
import { MenuSelectEvent } from './menu-select-event';
import { ContextMenuService } from './context-menu/context-menu.service';
import { MenuBase } from './menu-base';
/**
 * Represents the [Kendo UI Menu component for Angular]({% slug overview_menu %}).
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-menu [items]="items">
 *        </kendo-menu>
 *    `
 * })
 * class AppComponent {
 *    public items: any[] = [{ text: 'item1', items: [{ text: 'item1.1' }] }, { text: 'item2', disabled: true }];
 * }
 * ```
 */
export declare class MenuComponent extends MenuBase implements OnChanges, AfterViewChecked {
    private itemsService;
    private hover;
    private actions;
    private navigation;
    private localization;
    private ngZone;
    private renderer;
    private contextService?;
    /**
     * @hidden
     */
    menuItemTemplate: TemplateRef<any>;
    /**
     * @hidden
     */
    menuItemLinkTemplate: TemplateRef<any>;
    /**
     * Fires when a Menu item is selected ([see example]({% slug routing_menu %})).
     */
    select: EventEmitter<MenuSelectEvent>;
    /**
     * Fires when a Menu item is opened.
     */
    open: EventEmitter<MenuEvent>;
    /**
     * Fires when a Menu item is closed.
     */
    close: EventEmitter<MenuEvent>;
    /**
     * @hidden
     */
    readonly ariaOrientation: string;
    /**
     * @hidden
     */
    readonly contextMenuClass: boolean;
    readonly direction: boolean;
    readonly rtl: boolean;
    private closeClickSubscription;
    private contextKeyDownSubscription;
    constructor(itemsService: ItemsService, hover: HoverService, actions: ActionsService, navigation: NavigationService, localization: LocalizationService, ngZone: NgZone, renderer: Renderer2, contextService?: ContextMenuService);
    /**
     * Opens or closes the specified Menu items.
     *
     * @param open - A Boolean value which indicates if the items will be opened or closed.
     * @param indices - One or more values which represent the hierarchical indices of the items that will be opened or closed.
     */
    toggle(open: boolean, ...indices: string[]): void;
    /**
     * @hidden
     */
    focus(index?: string): void;
    ngOnChanges(changes: any): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    private attachCloseClick;
    private unsubscribeClick;
    private contextKeyDown;
}
