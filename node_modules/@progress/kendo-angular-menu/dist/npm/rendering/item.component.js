"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var items_service_1 = require("../services/items.service");
var navigation_service_1 = require("../services/navigation.service");
var popup_settings_1 = require("./popup-settings");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var utils_1 = require("../utils");
var ɵ0 = utils_1.bodyFactory;
exports.ɵ0 = ɵ0;
/* tslint:disable:component-selector */
/**
 * @hidden
 */
var ItemComponent = /** @class */ (function () {
    function ItemComponent(itemsService, navigation, changeDetector, renderer, popupService, element) {
        this.itemsService = itemsService;
        this.navigation = navigation;
        this.changeDetector = changeDetector;
        this.renderer = renderer;
        this.popupService = popupService;
        this.element = element;
        this.animate = true;
        this.openOnClick = false;
        this.opened = false;
        this.navigating = false;
        this.destroyed = false;
    }
    Object.defineProperty(ItemComponent.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (index) {
            if (this._index && this._index !== index) {
                this.itemsService.remove(this);
                this._index = index;
                this.itemsService.add(this);
            }
            else {
                this._index = index;
            }
            this.childId = this.itemsService.childId(index);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "disabled", {
        get: function () {
            return this.item.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "hasPopup", {
        get: function () {
            return this.hasContent ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "expanded", {
        get: function () {
            return this.hasContent ? this.opened : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "label", {
        get: function () {
            return this.item.text ? this.item.text : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "activeId", {
        get: function () {
            return this.index === this.navigation.activeIndex ? '0' : '-1';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "popupSettings", {
        get: function () {
            var settings = this.rtl ? popup_settings_1.POPUP_SETTINGS_RTL : popup_settings_1.POPUP_SETTINGS;
            return this.horizontal ? settings.horizontal : settings.vertical;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "horizontal", {
        get: function () {
            return this.vertical || this.level > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "hasLink", {
        get: function () {
            return Boolean(this.item.url);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "linkTemplate", {
        get: function () {
            return this.item.linkTemplate || this.itemLinkTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "hasContent", {
        get: function () {
            var items = this.item.items;
            return items && items.length || this.item.contentTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "isContent", {
        get: function () {
            return Boolean(this.item.content);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "iconClass", {
        get: function () {
            return "k-i-" + this.item.icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "children", {
        get: function () {
            var item = this.item;
            if (item.contentTemplate) {
                if (!this.contentItems) {
                    this.contentItems = [{
                            content: item.contentTemplate,
                            owner: item,
                            ownerIndex: this.index
                        }];
                }
                return this.contentItems;
            }
            return item.items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemComponent.prototype, "template", {
        get: function () {
            return this.item.template || this.itemTemplate;
        },
        enumerable: true,
        configurable: true
    });
    ItemComponent.prototype.hasContentTemplates = function () {
        var item = this.item;
        return this.itemTemplate || item.contentTemplate || this.itemLinkTemplate ||
            (item.items && item.items.find(function (current) { return current.template || current.linkTemplate; }));
    };
    ItemComponent.prototype.ngOnInit = function () {
        this.itemsService.add(this);
    };
    ItemComponent.prototype.ngOnDestroy = function () {
        this.itemsService.remove(this);
        this.destroyed = true;
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    ItemComponent.prototype.focus = function () {
        this.element.nativeElement.focus();
    };
    ItemComponent.prototype.toggleActive = function (isActive) {
        if (isActive) {
            this.setAttribute('tabindex', '0');
        }
        else {
            this.setAttribute('tabindex', '-1');
        }
    };
    ItemComponent.prototype.open = function () {
        if (!this.destroyed && this.hasContent && !this.opened) {
            var popupSettings = this.popupSettings;
            var animate = this.animate ? Object.assign({}, this.animate, {
                direction: popupSettings.animate
            }) : false;
            this.opened = true;
            this.popupRef = this.popupService.open({
                popupAlign: popupSettings.popup,
                anchorAlign: popupSettings.anchor,
                collision: popupSettings.collision,
                anchor: this.element,
                positionMode: 'absolute',
                content: this.popupTemplate,
                popupClass: {
                    'k-rtl': this.rtl,
                    'k-menu-popup': true
                },
                animate: animate
            });
            this.setAttribute('aria-expanded', 'true');
            this.setAttribute('aria-owns', this.childId);
            this.changeDetector.detectChanges();
        }
    };
    ItemComponent.prototype.close = function () {
        if (!this.destroyed && this.opened) {
            this.opened = false;
            if (this.popupRef) {
                this.popupRef.close();
                this.popupRef = null;
            }
            this.changeDetector.detectChanges();
            this.setAttribute('aria-expanded', 'false');
            this.renderer.removeAttribute(this.element.nativeElement, 'aria-owns');
        }
    };
    ItemComponent.prototype.navigate = function () {
        var link;
        if (this.linkTemplate) {
            link = this.element.nativeElement.querySelector('a.k-menu-link');
        }
        else if (this.hasLink) {
            link = this.link.nativeElement;
        }
        if (link) {
            this.navigating = true;
            link.click();
            this.navigating = false;
        }
    };
    ItemComponent.prototype.setAttribute = function (name, value) {
        this.renderer.setAttribute(this.element.nativeElement, name, value);
    };
    ItemComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [kendo_angular_popup_1.PopupService, {
                            provide: kendo_angular_popup_1.POPUP_CONTAINER,
                            useFactory: ɵ0
                        }],
                    selector: '[kendoMenuItem]',
                    template: "\n    <span *ngIf=\"!hasLink && !item.content && !linkTemplate\" class=\"k-link k-menu-link\" #link\n        [class.k-state-active]=\"opened\" role=\"presentation\">\n        <ng-template [ngTemplateOutlet]=\"itemcontent\">\n        </ng-template>\n    </span>\n    <a *ngIf=\"item.url && !linkTemplate\" class=\"k-link k-menu-link\" #link [attr.href]=\"item.url\"\n        [class.k-state-active]=\"opened\" tabindex=\"-1\" role=\"presentation\">\n        <ng-template [ngTemplateOutlet]=\"itemcontent\">\n        </ng-template>\n    </a>\n    <ng-template *ngIf=\"linkTemplate && !item.content\" [ngTemplateOutlet]=\"linkTemplate\"\n        [ngTemplateOutletContext]=\"{ item: item, index: index }\">\n    </ng-template>\n\n    <div class=\"k-content\" *ngIf=\"item.content\" role=\"presentation\">\n        <ng-template [ngTemplateOutlet]=\"item.content\" [ngTemplateOutletContext]=\"{ item: item.owner, index: item.ownerIndex }\">\n        </ng-template>\n    </div>\n\n    <ng-template #popupTemplate>\n        <ul kendoMenuList\n            [attr.id]=\"childId\"\n            [animate]=\"animate\"\n            [rtl]=\"rtl\"\n            [vertical]=\"vertical\"\n            [openOnClick]=\"openOnClick\"\n            [items]=\"children\"\n            [level]=\"level + 1\"\n            [index]=\"index\"\n            [itemTemplate]=\"itemTemplate\"\n            [itemLinkTemplate]=\"itemLinkTemplate\"\n            role=\"menu\"\n            class=\"k-group k-menu-group k-reset\">\n        </ul>\n    </ng-template>\n\n    <ng-template #itemcontent>\n        <span *ngIf=\"item.icon\" class=\"k-icon\" [ngClass]=\"iconClass\" role=\"presentation\"></span>\n        <ng-container *ngIf=\"!template\">\n            {{ item.text }}\n        </ng-container>\n        <ng-template *ngIf=\"template\" [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{ item: item, index: index }\">\n        </ng-template>\n        <span class=\"k-icon k-menu-expand-arrow\" *ngIf=\"hasContent\"\n            role=\"presentation\"\n            [class.k-i-arrow-60-down]=\"!horizontal\"\n            [class.k-i-arrow-60-right]=\"horizontal && !rtl\"\n            [class.k-i-arrow-60-left]=\"horizontal && rtl\">\n        </span>\n    </ng-template>\n  "
                },] },
    ];
    /** @nocollapse */
    ItemComponent.ctorParameters = function () { return [
        { type: items_service_1.ItemsService },
        { type: navigation_service_1.NavigationService },
        { type: core_1.ChangeDetectorRef },
        { type: core_1.Renderer2 },
        { type: kendo_angular_popup_1.PopupService },
        { type: core_1.ElementRef }
    ]; };
    ItemComponent.propDecorators = {
        item: [{ type: core_1.Input }],
        level: [{ type: core_1.Input }],
        index: [{ type: core_1.Input }],
        siblingIndex: [{ type: core_1.Input }],
        animate: [{ type: core_1.Input }],
        vertical: [{ type: core_1.Input }],
        rtl: [{ type: core_1.Input }],
        openOnClick: [{ type: core_1.Input }],
        itemTemplate: [{ type: core_1.Input }],
        itemLinkTemplate: [{ type: core_1.Input }],
        link: [{ type: core_1.ViewChild, args: ['link',] }],
        popupTemplate: [{ type: core_1.ViewChild, args: ['popupTemplate',] }],
        disabled: [{ type: core_1.HostBinding, args: ['attr.aria-disabled',] }],
        hasPopup: [{ type: core_1.HostBinding, args: ['attr.aria-haspopup',] }],
        expanded: [{ type: core_1.HostBinding, args: ['attr.aria-expanded',] }],
        label: [{ type: core_1.HostBinding, args: ['attr.aria-label',] }],
        activeId: [{ type: core_1.HostBinding, args: ['attr.tabindex',] }]
    };
    return ItemComponent;
}());
exports.ItemComponent = ItemComponent;
