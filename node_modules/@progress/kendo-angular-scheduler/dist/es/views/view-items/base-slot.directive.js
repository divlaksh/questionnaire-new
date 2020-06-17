import { Input, HostBinding } from '@angular/core';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
var BaseSlotDirective = /** @class */ (function () {
    function BaseSlotDirective(element, slotService, localization) {
        this.element = element;
        this.slotService = slotService;
        this.localization = localization;
        this._rect = null;
    }
    Object.defineProperty(BaseSlotDirective.prototype, "slotIndex", {
        get: function () {
            return this.key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSlotDirective.prototype, "rect", {
        get: function () {
            if (this._rect) {
                return this._rect;
            }
            var el = this.nativeElement;
            this._rect = {
                left: !this.localization.rtl ? el.offsetLeft : this.slotService.containerSize - (el.offsetLeft + el.clientWidth),
                top: el.offsetTop,
                width: el.clientWidth,
                height: el.clientHeight
            };
            return this._rect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSlotDirective.prototype, "top", {
        get: function () {
            return this.element ? this.nativeElement.offsetTop : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSlotDirective.prototype, "padding", {
        get: function () {
            if (!this.element || !isDocumentAvailable()) {
                return 0;
            }
            return parseInt(window.getComputedStyle(this.nativeElement).paddingTop, 10) * 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSlotDirective.prototype, "height", {
        get: function () {
            return this.element ? this.nativeElement.offsetHeight : 0;
        },
        set: function (value) {
            if (this.element) {
                this.nativeElement.style.height = value + "px";
            }
            if (this._rect) {
                this._rect.height = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSlotDirective.prototype, "width", {
        get: function () {
            return this.element ? this.nativeElement.offsetWidth : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSlotDirective.prototype, "key", {
        get: function () {
            return this.id.resourceIndex + ":" + this.id.rangeIndex + ":" + this.id.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSlotDirective.prototype, "nativeElement", {
        get: function () {
            return this.element.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    BaseSlotDirective.prototype.ngOnInit = function () {
        this.slotService.registerSlot(this);
    };
    BaseSlotDirective.prototype.ngOnDestroy = function () {
        this.slotService.unregisterSlot(this);
    };
    BaseSlotDirective.prototype.invalidate = function () {
        this._rect = null;
    };
    BaseSlotDirective.propDecorators = {
        id: [{ type: Input }],
        slotIndex: [{ type: HostBinding, args: ['attr.data-slot-index',] }]
    };
    return BaseSlotDirective;
}());
export { BaseSlotDirective };
