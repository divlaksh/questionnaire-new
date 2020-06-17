import { Component, Input, ContentChild, ViewChild, EventEmitter, Output, NgZone, Renderer2, TemplateRef, ViewContainerRef, forwardRef } from '@angular/core';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { PopupService, POPUP_CONTAINER } from '@progress/kendo-angular-popup';
import { hasObservers, Keys, isDocumentAvailable } from '@progress/kendo-angular-common';
import { MenuBase } from '../menu-base';
import { ContextMenuPopupEvent } from './context-menu-popup-event';
import { ContextMenuService } from './context-menu.service';
import { ContextMenuItemsService } from './context-menu-items.service';
import { ContextMenuTemplateDirective } from './context-menu-template.directive';
import { closest, findInContainer, isFocusable, hasClass } from '../dom-queries';
import { defined } from '../utils';
import { ItemsService } from '../services/items.service';
import { ContextMenuTargetContainerDirective } from './context-menu-target-container.directive';
import { TARGET_CLASS } from './context-menu-target.directive';
import { bodyFactory } from '../utils';
const CONTEXT_MENU = 'contextmenu';
const DEFAULT_ANCHOR_ALIGN = { horizontal: 'left', vertical: 'bottom' };
const DEFAULT_POPUP_ALIGN = { horizontal: 'left', vertical: 'top' };
const DEFAULT_COLLISION = { horizontal: 'fit', vertical: 'flip' };
const preventDefault = e => e.preventDefault();
const ɵ0 = preventDefault;
const ɵ1 = bodyFactory;
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
export class ContextMenuComponent extends MenuBase {
    constructor(popupService, service, ngZone, renderer) {
        super();
        this.popupService = popupService;
        this.service = service;
        this.ngZone = ngZone;
        this.renderer = renderer;
        /**
         * Specifies the event on which the ContextMenu will open ([see example]({% slug showon_contextmenu %})).
         * Accepts the name of a native DOM event. Defaults to `contextmenu` which opens the ContextMenu for the target element.
         */
        this.showOn = CONTEXT_MENU;
        /**
         * Indicates that the ContextMenu will be aligned to the target or to the `filter` element (if specified).
         */
        this.alignToAnchor = false;
        /**
         * Specifies if the Menu will be vertically rendered ([see example]({% slug orientation_contextmenu %})).
         * @default true
         */
        this.vertical = true;
        /**
         * Fires when the Menu is opened ([see example]({% slug target_contextmenu %}#toc-changing-items-for-specified-targets)).
         */
        this.popupOpen = new EventEmitter();
        /**
         * Fires when the Menu is closed.
         */
        this.popupClose = new EventEmitter();
        /**
         * Fires when a Menu item is selected.
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
        this.service.owner = this;
        this.popupKeyDownHandler = this.popupKeyDownHandler.bind(this);
    }
    /**
     * Hides the ContextMenu.
     */
    hide() {
        this.removePopup();
    }
    /**
     * Shows the ContextMenu for the specified target.
     * @param target - The offset or the target element for which the ContextMenu will open.
     */
    show(target) {
        if (!target) {
            return;
        }
        const showTarget = target;
        this.removePopup();
        if (defined(showTarget.left) && defined(showTarget.top)) {
            this.createPopup({ offset: showTarget });
        }
        else {
            this.currentTarget = showTarget.nativeElement || showTarget;
            this.createPopup({ anchor: this.currentTarget });
        }
    }
    ngOnChanges(changes) {
        if (changes.target || changes.showOn) {
            this.bindShowHandler();
        }
    }
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            const closeClickSubscription = this.renderer.listen('document', 'mousedown', (e) => {
                if (this.popupRef && !closest(e.target, node => node === this.popupRef.popupElement) && this.service.leaveMenu(e)) {
                    this.closePopup(e);
                }
            });
            const closeBlurSubscription = this.renderer.listen('window', 'blur', (e) => {
                if (this.popupRef) {
                    this.closePopup(e);
                }
            });
            this.closeSubscription = () => {
                closeClickSubscription();
                closeBlurSubscription();
            };
        });
    }
    ngOnDestroy() {
        if (this.closeSubscription) {
            this.closeSubscription();
            this.closeSubscription = null;
        }
        this.unbindShowHandler();
        this.removePopup();
    }
    /**
     * @hidden
     */
    emitMenuEvent(name, args) {
        args.target = this.currentTarget;
        args.sender = this;
        this[name].emit(args);
        if (name === 'select' && !args.hasContent) {
            this.closeAndFocus(args.originalEvent);
        }
    }
    bindShowHandler() {
        this.unbindShowHandler();
        this.ngZone.runOutsideAngular(() => {
            const element = this.targetElement();
            if (!element) {
                return;
            }
            const eventName = this.showOn || CONTEXT_MENU;
            this.showSubscription = this.renderer.listen(element, this.showOn || CONTEXT_MENU, (e) => {
                this.showContextMenu(e, element);
            });
            if (eventName === CONTEXT_MENU) {
                this.keydownSubscription = this.renderer.listen(element, 'keydown', (e) => {
                    if (e.shiftKey && e.keyCode === Keys.F10) {
                        this.showContextMenu(e, element);
                    }
                });
            }
        });
    }
    showContextMenu(e, element) {
        const filter = this.targetFilter();
        let currentTarget = element;
        if (filter) {
            currentTarget = findInContainer(e.target, filter, element);
            if (currentTarget && currentTarget !== e.target && isFocusable(e.target)) {
                return;
            }
            if (currentTarget && this.directiveTarget) {
                currentTarget = this.target.targetService.find(currentTarget);
            }
        }
        if (!currentTarget) {
            this.closePopup(e);
            return;
        }
        this.ngZone.run(() => {
            if (!this.closePopup(e)) {
                this.currentTarget = currentTarget;
                this.openPopup(e);
            }
        });
    }
    unbindShowHandler() {
        if (this.showSubscription) {
            this.showSubscription();
            this.showSubscription = null;
        }
        if (this.keydownSubscription) {
            this.keydownSubscription();
            this.keydownSubscription = null;
        }
    }
    targetElement() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.directiveTarget = false;
        let target = this.target;
        if (typeof target === 'string') {
            target = document.querySelector(target); // maybe querySelectorAll?
        }
        else if (target && target.nativeElement) {
            target = target.nativeElement;
        }
        else if (target instanceof ContextMenuTargetContainerDirective) {
            target = target.element;
            this.directiveTarget = true;
        }
        return target;
    }
    targetFilter() {
        if (this.directiveTarget) {
            return `.${TARGET_CLASS}`;
        }
        return this.filter;
    }
    closePopup(e) {
        if (!this.popupRef) {
            return;
        }
        return this.popupAction('popupClose', e, () => {
            this.removePopup();
        });
    }
    removePopup() {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
            this.currentTarget = null;
        }
        if (this.popupSubscriptions) {
            this.popupSubscriptions();
            this.popupSubscriptions = null;
        }
    }
    openPopup(e) {
        this.popupAction('popupOpen', e, () => {
            e.preventDefault();
            let anchor, offset;
            if (this.alignToAnchor || e.type === 'keydown') {
                anchor = this.currentTargetElement;
            }
            else {
                offset = { left: e.pageX, top: e.pageY };
            }
            this.createPopup({ anchor, offset });
        });
    }
    createPopup(options) {
        this.popupRef = this.popupService.open(Object.assign({
            animate: defined(this.popupAnimate) ? this.popupAnimate : true,
            appendTo: this.appendTo,
            collision: this.collision || DEFAULT_COLLISION,
            popupAlign: this.popupAlign || DEFAULT_POPUP_ALIGN,
            anchorAlign: this.anchorAlign || DEFAULT_ANCHOR_ALIGN,
            content: this.contentTemplate ? this.contentTemplate.templateRef : this.defaultContentTemplate
        }, options));
        const element = this.popupRef.popupElement;
        this.renderer.setAttribute(element, 'tabindex', '-1');
        this.renderer.setStyle(element, 'outline', '0'); //possibly move to styles
        if (this.ariaLabel) {
            this.renderer.setAttribute(element, 'aria-label', this.ariaLabel);
        }
        this.activeTarget = this.currentTargetElement === document.activeElement;
        this.ngZone.runOutsideAngular(() => {
            const unbindKeyDown = this.renderer.listen(element, 'keydown', this.popupKeyDownHandler);
            const unbindContextmenu = this.renderer.listen(element, 'contextmenu', preventDefault);
            this.popupSubscriptions = () => {
                unbindKeyDown();
                unbindContextmenu();
            };
        });
        element.focus();
    }
    closeAndFocus(e) {
        const currentTarget = this.currentTargetElement;
        if (!this.closePopup(e) && this.activeTarget) {
            currentTarget.focus();
        }
    }
    popupKeyDownHandler(e) {
        const element = this.popupRef.popupElement;
        if (e.keyCode === Keys.Escape && (hasClass(e.target, 'k-menu-item') || e.target === element)) {
            this.closeAndFocus(e);
        }
        else if (e.target === element) {
            this.service.keydown.emit(e);
        }
    }
    popupAction(name, originalEvent, callback) {
        const emitter = this[name];
        let prevented = false;
        if (hasObservers(emitter)) {
            this.ngZone.run(() => {
                const args = new ContextMenuPopupEvent({
                    originalEvent: originalEvent,
                    sender: this,
                    target: this.currentTarget
                });
                emitter.emit(args);
                if (!args.isDefaultPrevented()) {
                    callback();
                }
                prevented = args.isDefaultPrevented();
            });
        }
        else {
            callback();
        }
        return prevented;
    }
    get currentTargetElement() {
        return this.directiveTarget && this.currentTarget ? this.currentTarget.element : this.currentTarget;
    }
}
ContextMenuComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoContextMenu',
                providers: [
                    ContextMenuService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.contextmenu'
                    },
                    {
                        provide: ItemsService,
                        useClass: ContextMenuItemsService
                    },
                    {
                        provide: MenuBase,
                        useExisting: forwardRef(() => ContextMenuComponent)
                    },
                    PopupService,
                    {
                        provide: POPUP_CONTAINER,
                        useFactory: ɵ1
                    }
                ],
                selector: 'kendo-contextmenu',
                template: `
        <ng-template #default>
            <kendo-menu [items]="rootItems"
                [vertical]="vertical"
                [openOnClick]="openOnClick"
                [hoverDelay]="hoverDelay"
                [animate]="animate"
                [menuItemTemplate]="itemTemplate.first?.templateRef"
                [menuItemLinkTemplate]="itemLinkTemplate.first?.templateRef"
                ></kendo-menu>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ContextMenuComponent.ctorParameters = () => [
    { type: PopupService },
    { type: ContextMenuService },
    { type: NgZone },
    { type: Renderer2 }
];
ContextMenuComponent.propDecorators = {
    showOn: [{ type: Input }],
    target: [{ type: Input }],
    filter: [{ type: Input }],
    alignToAnchor: [{ type: Input }],
    vertical: [{ type: Input }],
    popupAnimate: [{ type: Input }],
    popupAlign: [{ type: Input }],
    anchorAlign: [{ type: Input }],
    collision: [{ type: Input }],
    appendTo: [{ type: Input }],
    ariaLabel: [{ type: Input }],
    popupOpen: [{ type: Output }],
    popupClose: [{ type: Output }],
    select: [{ type: Output }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    contentTemplate: [{ type: ContentChild, args: [ContextMenuTemplateDirective,] }],
    defaultContentTemplate: [{ type: ViewChild, args: ['default',] }]
};
export { ɵ0, ɵ1 };
