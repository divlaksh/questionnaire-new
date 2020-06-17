"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var items_service_1 = require("./services/items.service");
var actions_service_1 = require("./services/actions.service");
var navigation_service_1 = require("./services/navigation.service");
var hover_service_1 = require("./services/hover.service");
var open_on_click_settings_1 = require("./open-on-click-settings");
var dom_queries_1 = require("./dom-queries");
var context_menu_service_1 = require("./context-menu/context-menu.service");
var menu_base_1 = require("./menu-base");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
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
var MenuComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MenuComponent, _super);
    function MenuComponent(itemsService, hover, actions, navigation, localization, ngZone, renderer, contextService) {
        var _this = _super.call(this) || this;
        _this.itemsService = itemsService;
        _this.hover = hover;
        _this.actions = actions;
        _this.navigation = navigation;
        _this.localization = localization;
        _this.ngZone = ngZone;
        _this.renderer = renderer;
        _this.contextService = contextService;
        /**
         * Fires when a Menu item is selected ([see example]({% slug routing_menu %})).
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
        _this.actions.owner = _this;
        if (contextService) {
            contextService.items = _this.itemsService;
            _this.contextKeyDownSubscription = contextService.keydown.subscribe(_this.contextKeyDown.bind(_this));
        }
        return _this;
    }
    Object.defineProperty(MenuComponent.prototype, "ariaOrientation", {
        /**
         * @hidden
         */
        get: function () {
            if (this.vertical) {
                return 'vertical';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuComponent.prototype, "contextMenuClass", {
        /**
         * @hidden
         */
        get: function () {
            return Boolean(this.contextService);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuComponent.prototype, "direction", {
        get: function () {
            return this.rtl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuComponent.prototype, "rtl", {
        get: function () {
            return this.localization.rtl;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens or closes the specified Menu items.
     *
     * @param open - A Boolean value which indicates if the items will be opened or closed.
     * @param indices - One or more values which represent the hierarchical indices of the items that will be opened or closed.
     */
    MenuComponent.prototype.toggle = function (open) {
        var indices = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            indices[_i - 1] = arguments[_i];
        }
        for (var idx = 0; idx < indices.length; idx++) {
            var item = this.itemsService.get(indices[idx]);
            if (item && !item.disabled) {
                if (open) {
                    item.open();
                }
                else {
                    item.close();
                }
            }
        }
    };
    /**
     * @hidden
     */
    MenuComponent.prototype.focus = function (index) {
        this.navigation.focusIndex(index);
    };
    MenuComponent.prototype.ngOnChanges = function (changes) {
        this.navigation.vertical = this.vertical;
        this.hover.delay = this.hoverDelay;
        if (changes.openOnClick) {
            var openOnClick = this.openOnClick = open_on_click_settings_1.normalize(this.openOnClick);
            this.hover.openOnOver = !openOnClick;
            if (openOnClick && openOnClick.toggle === 'click') {
                this.attachCloseClick();
            }
            else {
                this.unsubscribeClick();
            }
        }
    };
    MenuComponent.prototype.ngAfterViewChecked = function () {
        this.navigation.updateActive();
    };
    MenuComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeClick();
        if (this.contextService) {
            this.contextService.items = null;
            this.contextKeyDownSubscription.unsubscribe();
        }
    };
    MenuComponent.prototype.attachCloseClick = function () {
        var _this = this;
        if (!this.closeClickSubscription && kendo_angular_common_1.isDocumentAvailable()) {
            this.ngZone.runOutsideAngular(function () {
                _this.closeClickSubscription = _this.renderer.listen('document', 'click', function (e) {
                    if (!dom_queries_1.inMenu(e.target, _this.itemsService)) {
                        _this.hover.openOnOver = false;
                        _this.actions.closeAll();
                        _this.actions.execute();
                    }
                });
            });
        }
    };
    MenuComponent.prototype.unsubscribeClick = function () {
        if (this.closeClickSubscription) {
            this.closeClickSubscription();
        }
    };
    MenuComponent.prototype.contextKeyDown = function (e) {
        if (!this.itemsService.hasItems) {
            return;
        }
        var keyCode = e.keyCode;
        var rtl = this.localization.rtl;
        var first = keyCode === kendo_angular_common_1.Keys.ArrowDown || keyCode === kendo_angular_common_1.Keys.ArrowRight;
        var last = keyCode === kendo_angular_common_1.Keys.ArrowUp || keyCode === kendo_angular_common_1.Keys.ArrowLeft;
        var index;
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
    };
    MenuComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'kendoMenu',
                    providers: [
                        items_service_1.ItemsService,
                        actions_service_1.ActionsService,
                        navigation_service_1.NavigationService,
                        hover_service_1.HoverService,
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.menu'
                        },
                        {
                            provide: menu_base_1.MenuBase,
                            useExisting: core_1.forwardRef(function () { return MenuComponent; })
                        }
                    ],
                    selector: 'kendo-menu',
                    template: "\n        <ul role=\"menubar\"\n            [attr.aria-orientation]=\"ariaOrientation\"\n            kendoMenuList [items]=\"rootItems\" [level]=\"0\" class=\"k-widget k-reset k-header k-menu\"\n            [vertical]=\"vertical\" [rtl]=\"rtl\" [animate]=\"animate\" [openOnClick]=\"openOnClick\"\n            [itemTemplate]=\"itemTemplate.first?.templateRef || menuItemTemplate\"\n            [itemLinkTemplate]=\"itemLinkTemplate.first?.templateRef || menuItemLinkTemplate\"\n            [class.k-menu-horizontal]=\"!vertical\"\n            [class.k-menu-vertical]=\"vertical\"\n            [class.k-context-menu]=\"contextMenuClass\">\n        </ul>\n    "
                },] },
    ];
    /** @nocollapse */
    MenuComponent.ctorParameters = function () { return [
        { type: items_service_1.ItemsService },
        { type: hover_service_1.HoverService },
        { type: actions_service_1.ActionsService },
        { type: navigation_service_1.NavigationService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone },
        { type: core_1.Renderer2 },
        { type: context_menu_service_1.ContextMenuService, decorators: [{ type: core_1.Optional }] }
    ]; };
    MenuComponent.propDecorators = {
        menuItemTemplate: [{ type: core_1.Input }],
        menuItemLinkTemplate: [{ type: core_1.Input }],
        select: [{ type: core_1.Output }],
        open: [{ type: core_1.Output }],
        close: [{ type: core_1.Output }],
        direction: [{ type: core_1.HostBinding, args: ['class.k-rtl',] }]
    };
    return MenuComponent;
}(menu_base_1.MenuBase));
exports.MenuComponent = MenuComponent;
