import * as tslib_1 from "tslib";
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
var CONTEXT_MENU = 'contextmenu';
var DEFAULT_ANCHOR_ALIGN = { horizontal: 'left', vertical: 'bottom' };
var DEFAULT_POPUP_ALIGN = { horizontal: 'left', vertical: 'top' };
var DEFAULT_COLLISION = { horizontal: 'fit', vertical: 'flip' };
var preventDefault = function (e) { return e.preventDefault(); };
var ɵ0 = preventDefault;
var ɵ1 = bodyFactory;
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
var ContextMenuComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ContextMenuComponent, _super);
    function ContextMenuComponent(popupService, service, ngZone, renderer) {
        var _this = _super.call(this) || this;
        _this.popupService = popupService;
        _this.service = service;
        _this.ngZone = ngZone;
        _this.renderer = renderer;
        /**
         * Specifies the event on which the ContextMenu will open ([see example]({% slug showon_contextmenu %})).
         * Accepts the name of a native DOM event. Defaults to `contextmenu` which opens the ContextMenu for the target element.
         */
        _this.showOn = CONTEXT_MENU;
        /**
         * Indicates that the ContextMenu will be aligned to the target or to the `filter` element (if specified).
         */
        _this.alignToAnchor = false;
        /**
         * Specifies if the Menu will be vertically rendered ([see example]({% slug orientation_contextmenu %})).
         * @default true
         */
        _this.vertical = true;
        /**
         * Fires when the Menu is opened ([see example]({% slug target_contextmenu %}#toc-changing-items-for-specified-targets)).
         */
        _this.popupOpen = new EventEmitter();
        /**
         * Fires when the Menu is closed.
         */
        _this.popupClose = new EventEmitter();
        /**
         * Fires when a Menu item is selected.
         */
        _this.select = new EventEmitter();
        /**
         * Fires when a Menu item is opened.
         */
        _this.open = new EventEmitter();
        /**
         * Fires when a Menu item is closed.
         */
        _this.close = new EventEmitter();
        _this.service.owner = _this;
        _this.popupKeyDownHandler = _this.popupKeyDownHandler.bind(_this);
        return _this;
    }
    /**
     * Hides the ContextMenu.
     */
    ContextMenuComponent.prototype.hide = function () {
        this.removePopup();
    };
    /**
     * Shows the ContextMenu for the specified target.
     * @param target - The offset or the target element for which the ContextMenu will open.
     */
    ContextMenuComponent.prototype.show = function (target) {
        if (!target) {
            return;
        }
        var showTarget = target;
        this.removePopup();
        if (defined(showTarget.left) && defined(showTarget.top)) {
            this.createPopup({ offset: showTarget });
        }
        else {
            this.currentTarget = showTarget.nativeElement || showTarget;
            this.createPopup({ anchor: this.currentTarget });
        }
    };
    ContextMenuComponent.prototype.ngOnChanges = function (changes) {
        if (changes.target || changes.showOn) {
            this.bindShowHandler();
        }
    };
    ContextMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var closeClickSubscription = _this.renderer.listen('document', 'mousedown', function (e) {
                if (_this.popupRef && !closest(e.target, function (node) { return node === _this.popupRef.popupElement; }) && _this.service.leaveMenu(e)) {
                    _this.closePopup(e);
                }
            });
            var closeBlurSubscription = _this.renderer.listen('window', 'blur', function (e) {
                if (_this.popupRef) {
                    _this.closePopup(e);
                }
            });
            _this.closeSubscription = function () {
                closeClickSubscription();
                closeBlurSubscription();
            };
        });
    };
    ContextMenuComponent.prototype.ngOnDestroy = function () {
        if (this.closeSubscription) {
            this.closeSubscription();
            this.closeSubscription = null;
        }
        this.unbindShowHandler();
        this.removePopup();
    };
    /**
     * @hidden
     */
    ContextMenuComponent.prototype.emitMenuEvent = function (name, args) {
        args.target = this.currentTarget;
        args.sender = this;
        this[name].emit(args);
        if (name === 'select' && !args.hasContent) {
            this.closeAndFocus(args.originalEvent);
        }
    };
    ContextMenuComponent.prototype.bindShowHandler = function () {
        var _this = this;
        this.unbindShowHandler();
        this.ngZone.runOutsideAngular(function () {
            var element = _this.targetElement();
            if (!element) {
                return;
            }
            var eventName = _this.showOn || CONTEXT_MENU;
            _this.showSubscription = _this.renderer.listen(element, _this.showOn || CONTEXT_MENU, function (e) {
                _this.showContextMenu(e, element);
            });
            if (eventName === CONTEXT_MENU) {
                _this.keydownSubscription = _this.renderer.listen(element, 'keydown', function (e) {
                    if (e.shiftKey && e.keyCode === Keys.F10) {
                        _this.showContextMenu(e, element);
                    }
                });
            }
        });
    };
    ContextMenuComponent.prototype.showContextMenu = function (e, element) {
        var _this = this;
        var filter = this.targetFilter();
        var currentTarget = element;
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
        this.ngZone.run(function () {
            if (!_this.closePopup(e)) {
                _this.currentTarget = currentTarget;
                _this.openPopup(e);
            }
        });
    };
    ContextMenuComponent.prototype.unbindShowHandler = function () {
        if (this.showSubscription) {
            this.showSubscription();
            this.showSubscription = null;
        }
        if (this.keydownSubscription) {
            this.keydownSubscription();
            this.keydownSubscription = null;
        }
    };
    ContextMenuComponent.prototype.targetElement = function () {
        if (!isDocumentAvailable()) {
            return;
        }
        this.directiveTarget = false;
        var target = this.target;
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
    };
    ContextMenuComponent.prototype.targetFilter = function () {
        if (this.directiveTarget) {
            return "." + TARGET_CLASS;
        }
        return this.filter;
    };
    ContextMenuComponent.prototype.closePopup = function (e) {
        var _this = this;
        if (!this.popupRef) {
            return;
        }
        return this.popupAction('popupClose', e, function () {
            _this.removePopup();
        });
    };
    ContextMenuComponent.prototype.removePopup = function () {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
            this.currentTarget = null;
        }
        if (this.popupSubscriptions) {
            this.popupSubscriptions();
            this.popupSubscriptions = null;
        }
    };
    ContextMenuComponent.prototype.openPopup = function (e) {
        var _this = this;
        this.popupAction('popupOpen', e, function () {
            e.preventDefault();
            var anchor, offset;
            if (_this.alignToAnchor || e.type === 'keydown') {
                anchor = _this.currentTargetElement;
            }
            else {
                offset = { left: e.pageX, top: e.pageY };
            }
            _this.createPopup({ anchor: anchor, offset: offset });
        });
    };
    ContextMenuComponent.prototype.createPopup = function (options) {
        var _this = this;
        this.popupRef = this.popupService.open(Object.assign({
            animate: defined(this.popupAnimate) ? this.popupAnimate : true,
            appendTo: this.appendTo,
            collision: this.collision || DEFAULT_COLLISION,
            popupAlign: this.popupAlign || DEFAULT_POPUP_ALIGN,
            anchorAlign: this.anchorAlign || DEFAULT_ANCHOR_ALIGN,
            content: this.contentTemplate ? this.contentTemplate.templateRef : this.defaultContentTemplate
        }, options));
        var element = this.popupRef.popupElement;
        this.renderer.setAttribute(element, 'tabindex', '-1');
        this.renderer.setStyle(element, 'outline', '0'); //possibly move to styles
        if (this.ariaLabel) {
            this.renderer.setAttribute(element, 'aria-label', this.ariaLabel);
        }
        this.activeTarget = this.currentTargetElement === document.activeElement;
        this.ngZone.runOutsideAngular(function () {
            var unbindKeyDown = _this.renderer.listen(element, 'keydown', _this.popupKeyDownHandler);
            var unbindContextmenu = _this.renderer.listen(element, 'contextmenu', preventDefault);
            _this.popupSubscriptions = function () {
                unbindKeyDown();
                unbindContextmenu();
            };
        });
        element.focus();
    };
    ContextMenuComponent.prototype.closeAndFocus = function (e) {
        var currentTarget = this.currentTargetElement;
        if (!this.closePopup(e) && this.activeTarget) {
            currentTarget.focus();
        }
    };
    ContextMenuComponent.prototype.popupKeyDownHandler = function (e) {
        var element = this.popupRef.popupElement;
        if (e.keyCode === Keys.Escape && (hasClass(e.target, 'k-menu-item') || e.target === element)) {
            this.closeAndFocus(e);
        }
        else if (e.target === element) {
            this.service.keydown.emit(e);
        }
    };
    ContextMenuComponent.prototype.popupAction = function (name, originalEvent, callback) {
        var _this = this;
        var emitter = this[name];
        var prevented = false;
        if (hasObservers(emitter)) {
            this.ngZone.run(function () {
                var args = new ContextMenuPopupEvent({
                    originalEvent: originalEvent,
                    sender: _this,
                    target: _this.currentTarget
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
    };
    Object.defineProperty(ContextMenuComponent.prototype, "currentTargetElement", {
        get: function () {
            return this.directiveTarget && this.currentTarget ? this.currentTarget.element : this.currentTarget;
        },
        enumerable: true,
        configurable: true
    });
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
                            useExisting: forwardRef(function () { return ContextMenuComponent; })
                        },
                        PopupService,
                        {
                            provide: POPUP_CONTAINER,
                            useFactory: ɵ1
                        }
                    ],
                    selector: 'kendo-contextmenu',
                    template: "\n        <ng-template #default>\n            <kendo-menu [items]=\"rootItems\"\n                [vertical]=\"vertical\"\n                [openOnClick]=\"openOnClick\"\n                [hoverDelay]=\"hoverDelay\"\n                [animate]=\"animate\"\n                [menuItemTemplate]=\"itemTemplate.first?.templateRef\"\n                [menuItemLinkTemplate]=\"itemLinkTemplate.first?.templateRef\"\n                ></kendo-menu>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ContextMenuComponent.ctorParameters = function () { return [
        { type: PopupService },
        { type: ContextMenuService },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
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
    return ContextMenuComponent;
}(MenuBase));
export { ContextMenuComponent };
export { ɵ0, ɵ1 };
