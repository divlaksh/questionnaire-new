import { Input, HostBinding } from '@angular/core';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
export class BaseSlotDirective {
    constructor(element, slotService, localization) {
        this.element = element;
        this.slotService = slotService;
        this.localization = localization;
        this._rect = null;
    }
    get slotIndex() {
        return this.key;
    }
    get rect() {
        if (this._rect) {
            return this._rect;
        }
        const el = this.nativeElement;
        this._rect = {
            left: !this.localization.rtl ? el.offsetLeft : this.slotService.containerSize - (el.offsetLeft + el.clientWidth),
            top: el.offsetTop,
            width: el.clientWidth,
            height: el.clientHeight
        };
        return this._rect;
    }
    get top() {
        return this.element ? this.nativeElement.offsetTop : 0;
    }
    get padding() {
        if (!this.element || !isDocumentAvailable()) {
            return 0;
        }
        return parseInt(window.getComputedStyle(this.nativeElement).paddingTop, 10) * 2;
    }
    get height() {
        return this.element ? this.nativeElement.offsetHeight : 0;
    }
    set height(value) {
        if (this.element) {
            this.nativeElement.style.height = `${value}px`;
        }
        if (this._rect) {
            this._rect.height = value;
        }
    }
    get width() {
        return this.element ? this.nativeElement.offsetWidth : 0;
    }
    get key() {
        return `${this.id.resourceIndex}:${this.id.rangeIndex}:${this.id.index}`;
    }
    get nativeElement() {
        return this.element.nativeElement;
    }
    ngOnInit() {
        this.slotService.registerSlot(this);
    }
    ngOnDestroy() {
        this.slotService.unregisterSlot(this);
    }
    invalidate() {
        this._rect = null;
    }
}
BaseSlotDirective.propDecorators = {
    id: [{ type: Input }],
    slotIndex: [{ type: HostBinding, args: ['attr.data-slot-index',] }]
};
