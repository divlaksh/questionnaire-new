import { Component, Input, HostBinding, EventEmitter, Output, NgZone, Renderer2, Optional, TemplateRef, forwardRef } from '@angular/core';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { ItemsService } from './services/items.service';
import { ActionsService } from './services/actions.service';
import { NavigationService } from './services/navigation.service';
import { HoverService } from './services/hover.service';
import { normalize } from './open-on-click-settings';
import { inMenu } from './dom-queries';
import { ContextMenuService } from './context-menu/context-menu.service';
import { MenuBase } from './menu-base';
import { Keys, isDocumentAvailable } from '@progress/kendo-angular-common';
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
export class MenuComponent extends MenuBase {
    constructor(itemsService, hover, actions, navigation, localization, ngZone, renderer, contextService) {
        super();
        this.itemsService = itemsService;
        this.hover = hover;
        this.actions = actions;
        this.navigation = navigation;
        this.localization = localization;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.contextService = contextService;
        /**
         * Fires when a Menu item is selected ([see example]({% slug routing_menu %})).
         */
        this.select = new EventEmitter();
        /**
         * Fires when a Menu item is opened.
         */
        this.open = new EventEmitter();
        /**
         * Fires when a Menu item is closed.
         */
        this.close = new EventEmitter();
        this.actions.owner = this;
        if (contextService) {
            contextService.items = this.itemsService;
            this.contextKeyDownSubscription = contextService.keydown.subscribe(this.contextKeyDown.bind(this));
        }
    }
    /**
     * @hidden
     */
    get ariaOrientation() {
        if (this.vertical) {
            return 'vertical';
        }
    }
    /**
     * @hidden
     */
    get contextMenuClass() {
        return Boolean(this.contextService);
    }
    get direction() {
        return this.rtl;
    }
    get rtl() {
        return this.localization.rtl;
    }
    /**
     * Opens or closes the specified Menu items.
     *
     * @param open - A Boolean value which indicates if the items will be opened or closed.
     * @param indices - One or more values which represent the hierarchical indices of the items that will be opened or closed.
     */
    toggle(open, ...indices) {
        for (let idx = 0; idx < indices.length; idx++) {
            const item = this.itemsService.get(indices[idx]);
            if (item && !item.disabled) {
                if (open) {
                    item.open();
                }
                else {
                    item.close();
                }
            }
        }
    }
    /**
     * @hidden
     */
    focus(index) {
        this.navigation.focusIndex(index);
    }
    ngOnChanges(changes) {
        this.navigation.vertical = this.vertical;
        this.hover.delay = this.hoverDelay;
        if (changes.openOnClick) {
            const openOnClick = this.openOnClick = normalize(this.openOnClick);
            this.hover.openOnOver = !openOnClick;
            if (openOnClick && openOnClick.toggle === 'click') {
                this.attachCloseClick();
            }
            else {
                this.unsubscribeClick();
            }
        }
    }
    ngAfterViewChecked() {
        this.navigation.updateActive();
    }
    ngOnDestroy() {
        this.unsubscribeClick();
        if (this.contextService) {
            this.contextService.items = null;
            this.contextKeyDownSubscription.unsubscribe();
        }
    }
    attachCloseClick() {
        if (!this.closeClickSubscription && isDocumentAvailable()) {
            this.ngZone.runOutsideAngular(() => {
                this.closeClickSubscription = this.renderer.listen('document', 'click', (e) => {
                    if (!inMenu(e.target, this.itemsService)) {
                        this.hover.openOnOver = false;
                        this.actions.closeAll();
                        this.actions.execute();
                    }
                });
            });
        }
    }
    unsubscribeClick() {
        if (this.closeClickSubscription) {
            this.closeClickSubscription();
        }
    }
    contextKeyDown(e) {
        if (!this.itemsService.hasItems) {
            return;
        }
        const keyCode = e.keyCode;
        const rtl = this.localization.rtl;
        const first = keyCode === Keys.ArrowDown || keyCode === Keys.ArrowRight;
        const last = keyCode === Keys.ArrowUp || keyCode === Keys.ArrowLeft;
        let index;
        if ((first && !rtl) || (last && rtl)) {
            index = 'first';
        }
        else if ((first && rtl) || (last && !rtl)) {
            index = 'last';
        }
        if (index) {
            e.preventDefault();
            this.focus(index);
        }
    }
}
MenuComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoMenu',
                providers: [
                    ItemsService,
                    ActionsService,
                    NavigationService,
                    HoverService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.menu'
                    },
                    {
                        provide: MenuBase,
                        useExisting: forwardRef(() => MenuComponent)
                    }
                ],
                selector: 'kendo-menu',
                template: `
        <ul role="menubar"
            [attr.aria-orientation]="ariaOrientation"
            kendoMenuList [items]="rootItems" [level]="0" class="k-widget k-reset k-header k-menu"
            [vertical]="vertical" [rtl]="rtl" [animate]="animate" [openOnClick]="openOnClick"
            [itemTemplate]="itemTemplate.first?.templateRef || menuItemTemplate"
            [itemLinkTemplate]="itemLinkTemplate.first?.templateRef || menuItemLinkTemplate"
            [class.k-menu-horizontal]="!vertical"
            [class.k-menu-vertical]="vertical"
            [class.k-context-menu]="contextMenuClass">
        </ul>
    `
            },] },
];
/** @nocollapse */
MenuComponent.ctorParameters = () => [
    { type: ItemsService },
    { type: HoverService },
    { type: ActionsService },
    { type: NavigationService },
    { type: LocalizationService },
    { type: NgZone },
    { type: Renderer2 },
    { type: ContextMenuService, decorators: [{ type: Optional }] }
];
MenuComponent.propDecorators = {
    menuItemTemplate: [{ type: Input }],
    menuItemLinkTemplate: [{ type: Input }],
    select: [{ type: Output }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    direction: [{ type: HostBinding, args: ['class.k-rtl',] }]
};
