import { Component, Input, ElementRef, Renderer2, ViewChild, ChangeDetectorRef, HostBinding, TemplateRef } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { NavigationService } from '../services/navigation.service';
import { POPUP_SETTINGS, POPUP_SETTINGS_RTL } from './popup-settings';
import { PopupService, POPUP_CONTAINER } from '@progress/kendo-angular-popup';
import { bodyFactory } from '../utils';
const ɵ0 = bodyFactory;
/* tslint:disable:component-selector */
/**
 * @hidden
 */
export class ItemComponent {
    constructor(itemsService, navigation, changeDetector, renderer, popupService, element) {
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
    set index(index) {
        if (this._index && this._index !== index) {
            this.itemsService.remove(this);
            this._index = index;
            this.itemsService.add(this);
        }
        else {
            this._index = index;
        }
        this.childId = this.itemsService.childId(index);
    }
    get index() {
        return this._index;
    }
    get disabled() {
        return this.item.disabled;
    }
    get hasPopup() {
        return this.hasContent ? true : null;
    }
    get expanded() {
        return this.hasContent ? this.opened : null;
    }
    get label() {
        return this.item.text ? this.item.text : null;
    }
    get activeId() {
        return this.index === this.navigation.activeIndex ? '0' : '-1';
    }
    get popupSettings() {
        const settings = this.rtl ? POPUP_SETTINGS_RTL : POPUP_SETTINGS;
        return this.horizontal ? settings.horizontal : settings.vertical;
    }
    get horizontal() {
        return this.vertical || this.level > 0;
    }
    get hasLink() {
        return Boolean(this.item.url);
    }
    get linkTemplate() {
        return this.item.linkTemplate || this.itemLinkTemplate;
    }
    get hasContent() {
        const items = this.item.items;
        return items && items.length || this.item.contentTemplate;
    }
    get isContent() {
        return Boolean(this.item.content);
    }
    get iconClass() {
        return `k-i-${this.item.icon}`;
    }
    get children() {
        const item = this.item;
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
    }
    get template() {
        return this.item.template || this.itemTemplate;
    }
    hasContentTemplates() {
        const item = this.item;
        return this.itemTemplate || item.contentTemplate || this.itemLinkTemplate ||
            (item.items && item.items.find(current => current.template || current.linkTemplate));
    }
    ngOnInit() {
        this.itemsService.add(this);
    }
    ngOnDestroy() {
        this.itemsService.remove(this);
        this.destroyed = true;
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    }
    focus() {
        this.element.nativeElement.focus();
    }
    toggleActive(isActive) {
        if (isActive) {
            this.setAttribute('tabindex', '0');
        }
        else {
            this.setAttribute('tabindex', '-1');
        }
    }
    open() {
        if (!this.destroyed && this.hasContent && !this.opened) {
            const popupSettings = this.popupSettings;
            const animate = this.animate ? Object.assign({}, this.animate, {
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
    }
    close() {
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
    }
    navigate() {
        let link;
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
    }
    setAttribute(name, value) {
        this.renderer.setAttribute(this.element.nativeElement, name, value);
    }
}
ItemComponent.decorators = [
    { type: Component, args: [{
                providers: [PopupService, {
                        provide: POPUP_CONTAINER,
                        useFactory: ɵ0
                    }],
                selector: '[kendoMenuItem]',
                template: `
    <span *ngIf="!hasLink && !item.content && !linkTemplate" class="k-link k-menu-link" #link
        [class.k-state-active]="opened" role="presentation">
        <ng-template [ngTemplateOutlet]="itemcontent">
        </ng-template>
    </span>
    <a *ngIf="item.url && !linkTemplate" class="k-link k-menu-link" #link [attr.href]="item.url"
        [class.k-state-active]="opened" tabindex="-1" role="presentation">
        <ng-template [ngTemplateOutlet]="itemcontent">
        </ng-template>
    </a>
    <ng-template *ngIf="linkTemplate && !item.content" [ngTemplateOutlet]="linkTemplate"
        [ngTemplateOutletContext]="{ item: item, index: index }">
    </ng-template>

    <div class="k-content" *ngIf="item.content" role="presentation">
        <ng-template [ngTemplateOutlet]="item.content" [ngTemplateOutletContext]="{ item: item.owner, index: item.ownerIndex }">
        </ng-template>
    </div>

    <ng-template #popupTemplate>
        <ul kendoMenuList
            [attr.id]="childId"
            [animate]="animate"
            [rtl]="rtl"
            [vertical]="vertical"
            [openOnClick]="openOnClick"
            [items]="children"
            [level]="level + 1"
            [index]="index"
            [itemTemplate]="itemTemplate"
            [itemLinkTemplate]="itemLinkTemplate"
            role="menu"
            class="k-group k-menu-group k-reset">
        </ul>
    </ng-template>

    <ng-template #itemcontent>
        <span *ngIf="item.icon" class="k-icon" [ngClass]="iconClass" role="presentation"></span>
        <ng-container *ngIf="!template">
            {{ item.text }}
        </ng-container>
        <ng-template *ngIf="template" [ngTemplateOutlet]="template" [ngTemplateOutletContext]="{ item: item, index: index }">
        </ng-template>
        <span class="k-icon k-menu-expand-arrow" *ngIf="hasContent"
            role="presentation"
            [class.k-i-arrow-60-down]="!horizontal"
            [class.k-i-arrow-60-right]="horizontal && !rtl"
            [class.k-i-arrow-60-left]="horizontal && rtl">
        </span>
    </ng-template>
  `
            },] },
];
/** @nocollapse */
ItemComponent.ctorParameters = () => [
    { type: ItemsService },
    { type: NavigationService },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: PopupService },
    { type: ElementRef }
];
ItemComponent.propDecorators = {
    item: [{ type: Input }],
    level: [{ type: Input }],
    index: [{ type: Input }],
    siblingIndex: [{ type: Input }],
    animate: [{ type: Input }],
    vertical: [{ type: Input }],
    rtl: [{ type: Input }],
    openOnClick: [{ type: Input }],
    itemTemplate: [{ type: Input }],
    itemLinkTemplate: [{ type: Input }],
    link: [{ type: ViewChild, args: ['link',] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
    disabled: [{ type: HostBinding, args: ['attr.aria-disabled',] }],
    hasPopup: [{ type: HostBinding, args: ['attr.aria-haspopup',] }],
    expanded: [{ type: HostBinding, args: ['attr.aria-expanded',] }],
    label: [{ type: HostBinding, args: ['attr.aria-label',] }],
    activeId: [{ type: HostBinding, args: ['attr.tabindex',] }]
};
export { ɵ0 };
