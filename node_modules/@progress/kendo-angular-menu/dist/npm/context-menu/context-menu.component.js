"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var menu_base_1 = require("../menu-base");
var context_menu_popup_event_1 = require("./context-menu-popup-event");
var context_menu_service_1 = require("./context-menu.service");
var context_menu_items_service_1 = require("./context-menu-items.service");
var context_menu_template_directive_1 = require("./context-menu-template.directive");
var dom_queries_1 = require("../dom-queries");
var utils_1 = require("../utils");
var items_service_1 = require("../services/items.service");
var context_menu_target_container_directive_1 = require("./context-menu-target-container.directive");
var context_menu_target_directive_1 = require("./context-menu-target.directive");
var utils_2 = require("../utils");
var CONTEXT_MENU = 'contextmenu';
var DEFAULT_ANCHOR_ALIGN = { horizontal: 'left', vertical: 'bottom' };
var DEFAULT_POPUP_ALIGN = { horizontal: 'left', vertical: 'top' };
var DEFAULT_COLLISION = { horizontal: 'fit', vertical: 'flip' };
var preventDefault = function (e) { return e.preventDefault(); };
var ɵ0 = preventDefault;
exports.ɵ0 = ɵ0;
var ɵ1 = utils_2.bodyFactory;
exports.ɵ1 = ɵ1;
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
        _this.popupOpen = new core_1.EventEmitter();
        /**
         * Fires when the Menu is closed.
         */
        _this.popupClose = new core_1.EventEmitter();
        /**
         * Fires when a Menu item is selected.
         */
        _this.select = new core_1.EventEmitter();
        /**
         * Fires when a Menu item is opened.
         */
        _this.open = new core_1.EventEmitter();
        /**
         * Fires when a Menu item is closed.
         */
        _this.close = new core_1.EventEmitter();
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
        if (utils_1.defined(showTarget.left) && utils_1.defined(showTarget.top)) {
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
                if (_this.popupRef && !dom_queries_1.closest(e.target, function (node) { return node === _this.popupRef.popupElement; }) && _this.service.leaveMenu(e)) {
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
                    if (e.shiftKey && e.keyCode === kendo_angular_common_1.Keys.F10) {
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
            currentTarget = dom_queries_1.findInContainer(e.target, filter, element);
            if (currentTarget && currentTarget !== e.target && dom_queries_1.isFocusable(e.target)) {
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
        if (!kendo_angular_common_1.isDocumentAvailable()) {
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
        else if (target instanceof context_menu_target_container_directive_1.ContextMenuTargetContainerDirective) {
            target = target.element;
            this.directiveTarget = true;
        }
        return target;
    };
    ContextMenuComponent.prototype.targetFilter = function () {
        if (this.directiveTarget) {
            return "." + context_menu_target_directive_1.TARGET_CLASS;
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
            animate: utils_1.defined(this.popupAnimate) ? this.popupAnimate : true,
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
        if (e.keyCode === kendo_angular_common_1.Keys.Escape && (dom_queries_1.hasClass(e.target, 'k-menu-item') || e.target === element)) {
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
        if (kendo_angular_common_1.hasObservers(emitter)) {
            this.ngZone.run(function () {
                var args = new context_menu_popup_event_1.ContextMenuPopupEvent({
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
        { type: core_1.Component, args: [{
                    exportAs: 'kendoContextMenu',
                    providers: [
                        context_menu_service_1.ContextMenuService,
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.contextmenu'
                        },
                        {
                            provide: items_service_1.ItemsService,
                            useClass: context_menu_items_service_1.ContextMenuItemsService
                        },
                        {
                            provide: menu_base_1.MenuBase,
                            useExisting: core_1.forwardRef(function () { return ContextMenuComponent; })
                        },
                        kendo_angular_popup_1.PopupService,
                        {
                            provide: kendo_angular_popup_1.POPUP_CONTAINER,
                            useFactory: ɵ1
                        }
                    ],
                    selector: 'kendo-contextmenu',
                    template: "\n        <ng-template #default>\n            <kendo-menu [items]=\"rootItems\"\n                [vertical]=\"vertical\"\n                [openOnClick]=\"openOnClick\"\n                [hoverDelay]=\"hoverDelay\"\n                [animate]=\"animate\"\n                [menuItemTemplate]=\"itemTemplate.first?.templateRef\"\n                [menuItemLinkTemplate]=\"itemLinkTemplate.first?.templateRef\"\n                ></kendo-menu>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ContextMenuComponent.ctorParameters = function () { return [
        { type: kendo_angular_popup_1.PopupService },
        { type: context_menu_service_1.ContextMenuService },
        { type: core_1.NgZone },
        { type: core_1.Renderer2 }
    ]; };
    ContextMenuComponent.propDecorators = {
        showOn: [{ type: core_1.Input }],
        target: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        alignToAnchor: [{ type: core_1.Input }],
        vertical: [{ type: core_1.Input }],
        popupAnimate: [{ type: core_1.Input }],
        popupAlign: [{ type: core_1.Input }],
        anchorAlign: [{ type: core_1.Input }],
        collision: [{ type: core_1.Input }],
        appendTo: [{ type: core_1.Input }],
        ariaLabel: [{ type: core_1.Input }],
        popupOpen: [{ type: core_1.Output }],
        popupClose: [{ type: core_1.Output }],
        select: [{ type: core_1.Output }],
        open: [{ type: core_1.Output }],
        close: [{ type: core_1.Output }],
        contentTemplate: [{ type: core_1.ContentChild, args: [context_menu_template_directive_1.ContextMenuTemplateDirective,] }],
        defaultContentTemplate: [{ type: core_1.ViewChild, args: ['default',] }]
    };
    return ContextMenuComponent;
}(menu_base_1.MenuBase));
exports.ContextMenuComponent = ContextMenuComponent;
