import { OnInit, OnChanges, OnDestroy, EventEmitter, NgZone, Renderer2, TemplateRef, ElementRef, ViewContainerRef } from '@angular/core';
import { PopupService, Offset, Align, Collision, PopupAnimation } from '@progress/kendo-angular-popup';
import { MenuBase } from '../menu-base';
import { ContextMenuEvent } from './context-menu-event';
import { ContextMenuSelectEvent } from './context-menu-select-event';
import { ContextMenuPopupEvent } from './context-menu-popup-event';
import { ContextMenuService } from './context-menu.service';
import { ContextMenuTemplateDirective } from './context-menu-template.directive';
import { ContextMenuTargetContainerDirective } from './context-menu-target-container.directive';
/**
 * Represents the [Kendo UI ContextMenu component for Angular]({% slug overview_contextmenu %}).
 *
 * {% meta height:200 %}
 * {% embed_file context-menu/basic/app.component.ts preview %}
 * {% embed_file context-menu/items.ts %}
 * {% embed_file context-menu/app.module.ts %}
 * {% embed_file main.ts %}
 * {% endmeta %}
 */
export declare class ContextMenuComponent extends MenuBase implements OnInit, OnChanges, OnDestroy {
    private popupService;
    private service;
    private ngZone;
    private renderer;
    /**
     * Specifies the event on which the ContextMenu will open ([see example]({% slug showon_contextmenu %})).
     * Accepts the name of a native DOM event. Defaults to `contextmenu` which opens the ContextMenu for the target element.
     */
    showOn: string;
    /**
     * Specifies the element for which the ContextMenu will open ([see example]({% slug target_contextmenu %}#toc-configuration)).
     */
    target: HTMLElement | ElementRef | ContextMenuTargetContainerDirective | string;
    /**
     * Specifies a CSS selector which filters the elements in the target for which the ContextMenu will open
     * ([see example]({% slug target_contextmenu %}#toc-defining-specific-targets)).
     */
    filter: string;
    /**
     * Indicates that the ContextMenu will be aligned to the target or to the `filter` element (if specified).
     */
    alignToAnchor: boolean;
    /**
     * Specifies if the Menu will be vertically rendered ([see example]({% slug orientation_contextmenu %})).
     * @default true
     */
    vertical: boolean;
    /**
     * Specifies the popup animation.
     */
    popupAnimate: boolean | PopupAnimation;
    /**
     * Specifies the pivot point of the popup.
     */
    popupAlign: Align;
    /**
     * Specifies the pivot point of the anchor. Applicable if `alignToAnchor` is `true`.
     */
    anchorAlign: Align;
    /**
     * Configures the collision behavior of the popup.
     */
    collision: Collision;
    /**
     * Defines the container to which the popup will be appended.
     */
    appendTo: ViewContainerRef;
    /**
     * Sets the value for the [`aria-label`](https://www.w3.org/TR/wai-aria-1.1/#aria-label) attribute of the ContextMenu.
     */
    ariaLabel: string;
    /**
     * Fires when the Menu is opened ([see example]({% slug target_contextmenu %}#toc-changing-items-for-specified-targets)).
     */
    popupOpen: EventEmitter<ContextMenuPopupEvent>;
    /**
     * Fires when the Menu is closed.
     */
    popupClose: EventEmitter<ContextMenuPopupEvent>;
    /**
     * Fires when a Menu item is selected.
     */
    select: EventEmitter<ContextMenuSelectEvent>;
    /**
     * Fires when a Menu item is opened.
     */
    open: EventEmitter<ContextMenuEvent>;
    /**
     * Fires when a Menu item is closed.
     */
    close: EventEmitter<ContextMenuEvent>;
    /**
     * @hidden
     */
    contentTemplate: ContextMenuTemplateDirective;
    /**
     * @hidden
     */
    defaultContentTemplate: TemplateRef<any>;
    private closeSubscription;
    private showSubscription;
    private keydownSubscription;
    private popupSubscriptions;
    private popupRef;
    private currentTarget;
    private directiveTarget;
    private activeTarget;
    constructor(popupService: PopupService, service: ContextMenuService, ngZone: NgZone, renderer: Renderer2);
    /**
     * Hides the ContextMenu.
     */
    hide(): void;
    /**
     * Shows the ContextMenu for the specified target.
     * @param target - The offset or the target element for which the ContextMenu will open.
     */
    show(target: Offset | HTMLElement | ElementRef): void;
    ngOnChanges(changes: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    emitMenuEvent(name: string, args: any): void;
    private bindShowHandler;
    private showContextMenu;
    private unbindShowHandler;
    private targetElement;
    private targetFilter;
    private closePopup;
    private removePopup;
    private openPopup;
    private createPopup;
    private closeAndFocus;
    private popupKeyDownHandler;
    private popupAction;
    private readonly currentTargetElement;
}
