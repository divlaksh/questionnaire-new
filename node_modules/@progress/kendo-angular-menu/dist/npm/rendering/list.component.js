"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var items_service_1 = require("../services/items.service");
var actions_service_1 = require("../services/actions.service");
var navigation_service_1 = require("../services/navigation.service");
var hover_service_1 = require("../services/hover.service");
var constants_1 = require("../constants");
var dom_queries_1 = require("../dom-queries");
/* tslint:disable:component-selector */
/**
 * @hidden
 */
var ListComponent = /** @class */ (function () {
    function ListComponent(itemsService, hover, actions, navigation, renderer, ngZone, element) {
        this.itemsService = itemsService;
        this.hover = hover;
        this.actions = actions;
        this.navigation = navigation;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.element = element;
        this.animate = true;
    }
    ListComponent.prototype.hierarchyIndex = function (index) {
        return this.itemsService.itemIndex(this.index, index);
    };
    ListComponent.prototype.ngOnInit = function () {
        this.itemsService.addList(this);
        this.initDomEvents();
    };
    ListComponent.prototype.ngOnDestroy = function () {
        this.itemsService.removeList(this);
        if (this.domSubscriptions) {
            this.domSubscriptions();
        }
    };
    ListComponent.prototype.initDomEvents = function () {
        var _this = this;
        if (!this.element) {
            return;
        }
        this.ngZone.runOutsideAngular(function () {
            var element = _this.element.nativeElement;
            var container = _this.level > 0 ? dom_queries_1.closest(element, function (node) { return dom_queries_1.hasClass(node, 'k-menu-popup'); }) : element;
            var overSubscription = _this.renderer.listen(element, 'mouseover', function (e) {
                if (e.target === element && _this.level === 0) {
                    _this.onLeave();
                }
                else {
                    var item = _this.nodeItem(e.target) || _this.itemsService.get(_this.index);
                    if (item && !(_this.openOnClick && _this.openOnClick.toggle === 'click' && item.level === 0 && !item.hasContent)) {
                        _this.hover.over(item);
                    }
                }
            });
            var leaveSubscription = _this.renderer.listen(container, 'mouseleave', function (e) {
                if (_this.leavesMenu(e)) {
                    _this.onLeave();
                }
            });
            var keydownSubscription = _this.renderer.listen(element, 'keydown', function (e) {
                if (dom_queries_1.hasClass(e.target, 'k-menu-item')) {
                    _this.navigation.keydown(e);
                }
            });
            var blurSubscription = _this.renderer.listen(element, 'focusout', function (e) {
                if (_this.leavesMenu(e)) {
                    _this.navigation.focusLeave();
                }
            });
            var clickSubscription = _this.renderer.listen(element, 'click', _this.clickHandler.bind(_this));
            _this.domSubscriptions = function () {
                overSubscription();
                leaveSubscription();
                keydownSubscription();
                blurSubscription();
                clickSubscription();
            };
        });
    };
    ListComponent.prototype.leavesMenu = function (e) {
        if (!e.relatedTarget) {
            return true;
        }
        return !dom_queries_1.inMenu(e.relatedTarget, this.itemsService);
    };
    ListComponent.prototype.onLeave = function () {
        var openOnClick = this.openOnClick;
        if (!openOnClick || openOnClick.toggle !== 'click') {
            this.hover.leave(openOnClick && openOnClick.toggle === 'leave');
        }
    };
    ListComponent.prototype.nodeItem = function (target) {
        var node = dom_queries_1.closestItem(target, this.element.nativeElement);
        if (node) {
            var index = dom_queries_1.nodeIndex(node);
            return this.itemsService.get(index);
        }
    };
    ListComponent.prototype.clickHandler = function (e) {
        if (dom_queries_1.isFocusable(e.target) && !dom_queries_1.hasClass(e.target, 'k-menu-item')) {
            return;
        }
        var item = this.nodeItem(e.target);
        if (!item || item.isContent || item.navigating) {
            return;
        }
        if (item.disabled) {
            e.preventDefault();
            return;
        }
        this.actions.select(item, e, function () {
            e.preventDefault();
        });
        this.navigation.focus(item);
        if (item.level > 0 && !item.hasContent) {
            this.actions.closeToRoot(item);
        }
        if (this.openOnClick) {
            var hover = this.hover;
            if (item.opened) {
                if (item.level === 0) {
                    hover.openOnOver = false;
                    this.actions.close(item);
                }
            }
            else if (item.hasContent) {
                hover.openOnOver = true;
                this.actions.closeOthers(item);
                this.actions.open(item);
            }
            else {
                hover.openOnOver = false;
                if (item.level === 0 && this.openOnClick.toggle === 'click') {
                    this.hover.closeCurrent();
                }
            }
        }
        this.actions.execute();
    };
    ListComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: '[kendoMenuList]',
                    template: "\n        <ng-container *ngFor=\"let item of items; let idx = index\">\n            <li *ngIf=\"!item.separator\" kendoMenuItem\n                [item]=\"item\" [level]=\"level\" [vertical]=\"vertical\" [animate]=\"animate\" [rtl]=\"rtl\"\n                [itemTemplate]=\"itemTemplate\" [itemLinkTemplate]=\"itemLinkTemplate\" [openOnClick]=\"openOnClick\"\n                [index]=\"hierarchyIndex(idx)\" [siblingIndex]=\"idx\" [attr." + constants_1.NODE_INDEX + "]=\"hierarchyIndex(idx)\"\n                [ngClass]=\"item.cssClass\" [ngStyle]=\"item.cssStyle\"\n                role=\"menuitem\"\n                class=\"k-item k-menu-item\"\n                [class.k-first]=\"idx === 0\" [class.k-last]=\"idx === items.length - 1\"\n                [class.k-state-disabled]=\"item.disabled\"></li>\n            <li *ngIf=\"item.separator\" class=\"k-separator k-item\"\n                role=\"separator\" [ngClass]=\"item.cssClass\" [ngStyle]=\"item.cssStyle\">\n                &nbsp;\n            </li>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    ListComponent.ctorParameters = function () { return [
        { type: items_service_1.ItemsService },
        { type: hover_service_1.HoverService },
        { type: actions_service_1.ActionsService },
        { type: navigation_service_1.NavigationService },
        { type: core_1.Renderer2 },
        { type: core_1.NgZone },
        { type: core_1.ElementRef }
    ]; };
    ListComponent.propDecorators = {
        items: [{ type: core_1.Input }],
        level: [{ type: core_1.Input }],
        index: [{ type: core_1.Input }],
        animate: [{ type: core_1.Input }],
        vertical: [{ type: core_1.Input }],
        rtl: [{ type: core_1.Input }],
        openOnClick: [{ type: core_1.Input }],
        itemTemplate: [{ type: core_1.Input }],
        itemLinkTemplate: [{ type: core_1.Input }]
    };
    return ListComponent;
}());
exports.ListComponent = ListComponent;
