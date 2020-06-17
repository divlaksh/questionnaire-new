import { Component, Input, ElementRef, TemplateRef, Renderer2, NgZone } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { ActionsService } from '../services/actions.service';
import { NavigationService } from '../services/navigation.service';
import { HoverService } from '../services/hover.service';
import { NODE_INDEX } from '../constants';
import { closestItem, closest, hasClass, isFocusable, nodeIndex, inMenu } from '../dom-queries';
/* tslint:disable:component-selector */
/**
 * @hidden
 */
export class ListComponent {
    constructor(itemsService, hover, actions, navigation, renderer, ngZone, element) {
        this.itemsService = itemsService;
        this.hover = hover;
        this.actions = actions;
        this.navigation = navigation;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.element = element;
        this.animate = true;
    }
    hierarchyIndex(index) {
        return this.itemsService.itemIndex(this.index, index);
    }
    ngOnInit() {
        this.itemsService.addList(this);
        this.initDomEvents();
    }
    ngOnDestroy() {
        this.itemsService.removeList(this);
        if (this.domSubscriptions) {
            this.domSubscriptions();
        }
    }
    initDomEvents() {
        if (!this.element) {
            return;
        }
        this.ngZone.runOutsideAngular(() => {
            const element = this.element.nativeElement;
            const container = this.level > 0 ? closest(element, (node) => hasClass(node, 'k-menu-popup')) : element;
            const overSubscription = this.renderer.listen(element, 'mouseover', (e) => {
                if (e.target === element && this.level === 0) {
                    this.onLeave();
                }
                else {
                    const item = this.nodeItem(e.target) || this.itemsService.get(this.index);
                    if (item && !(this.openOnClick && this.openOnClick.toggle === 'click' && item.level === 0 && !item.hasContent)) {
                        this.hover.over(item);
                    }
                }
            });
            const leaveSubscription = this.renderer.listen(container, 'mouseleave', (e) => {
                if (this.leavesMenu(e)) {
                    this.onLeave();
                }
            });
            const keydownSubscription = this.renderer.listen(element, 'keydown', (e) => {
                if (hasClass(e.target, 'k-menu-item')) {
                    this.navigation.keydown(e);
                }
            });
            const blurSubscription = this.renderer.listen(element, 'focusout', (e) => {
                if (this.leavesMenu(e)) {
                    this.navigation.focusLeave();
                }
            });
            const clickSubscription = this.renderer.listen(element, 'click', this.clickHandler.bind(this));
            this.domSubscriptions = () => {
                overSubscription();
                leaveSubscription();
                keydownSubscription();
                blurSubscription();
                clickSubscription();
            };
        });
    }
    leavesMenu(e) {
        if (!e.relatedTarget) {
            return true;
        }
        return !inMenu(e.relatedTarget, this.itemsService);
    }
    onLeave() {
        const openOnClick = this.openOnClick;
        if (!openOnClick || openOnClick.toggle !== 'click') {
            this.hover.leave(openOnClick && openOnClick.toggle === 'leave');
        }
    }
    nodeItem(target) {
        const node = closestItem(target, this.element.nativeElement);
        if (node) {
            const index = nodeIndex(node);
            return this.itemsService.get(index);
        }
    }
    clickHandler(e) {
        if (isFocusable(e.target) && !hasClass(e.target, 'k-menu-item')) {
            return;
        }
        const item = this.nodeItem(e.target);
        if (!item || item.isContent || item.navigating) {
            return;
        }
        if (item.disabled) {
            e.preventDefault();
            return;
        }
        this.actions.select(item, e, () => {
            e.preventDefault();
        });
        this.navigation.focus(item);
        if (item.level > 0 && !item.hasContent) {
            this.actions.closeToRoot(item);
        }
        if (this.openOnClick) {
            const hover = this.hover;
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
    }
}
ListComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoMenuList]',
                template: `
        <ng-container *ngFor="let item of items; let idx = index">
            <li *ngIf="!item.separator" kendoMenuItem
                [item]="item" [level]="level" [vertical]="vertical" [animate]="animate" [rtl]="rtl"
                [itemTemplate]="itemTemplate" [itemLinkTemplate]="itemLinkTemplate" [openOnClick]="openOnClick"
                [index]="hierarchyIndex(idx)" [siblingIndex]="idx" [attr.${NODE_INDEX}]="hierarchyIndex(idx)"
                [ngClass]="item.cssClass" [ngStyle]="item.cssStyle"
                role="menuitem"
                class="k-item k-menu-item"
                [class.k-first]="idx === 0" [class.k-last]="idx === items.length - 1"
                [class.k-state-disabled]="item.disabled"></li>
            <li *ngIf="item.separator" class="k-separator k-item"
                role="separator" [ngClass]="item.cssClass" [ngStyle]="item.cssStyle">
                &nbsp;
            </li>
        </ng-container>
    `
            },] },
];
/** @nocollapse */
ListComponent.ctorParameters = () => [
    { type: ItemsService },
    { type: HoverService },
    { type: ActionsService },
    { type: NavigationService },
    { type: Renderer2 },
    { type: NgZone },
    { type: ElementRef }
];
ListComponent.propDecorators = {
    items: [{ type: Input }],
    level: [{ type: Input }],
    index: [{ type: Input }],
    animate: [{ type: Input }],
    vertical: [{ type: Input }],
    rtl: [{ type: Input }],
    openOnClick: [{ type: Input }],
    itemTemplate: [{ type: Input }],
    itemLinkTemplate: [{ type: Input }]
};
