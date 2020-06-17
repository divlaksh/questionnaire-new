import { Component, HostBinding, Input } from '@angular/core';
import { toLocalDate } from '@progress/kendo-date-math';
/**
 * @hidden
 */
var ResizeHintComponent = /** @class */ (function () {
    function ResizeHintComponent() {
        this.marqueeClasses = true;
    }
    Object.defineProperty(ResizeHintComponent.prototype, "left", {
        get: function () {
            return this.hint.rect.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeHintComponent.prototype, "top", {
        get: function () {
            return this.hint.rect.top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeHintComponent.prototype, "width", {
        get: function () {
            return this.hint.rect.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeHintComponent.prototype, "height", {
        get: function () {
            return this.hint.rect.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeHintComponent.prototype, "start", {
        get: function () {
            return toLocalDate(this.hint.start);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeHintComponent.prototype, "end", {
        get: function () {
            return toLocalDate(this.hint.end);
        },
        enumerable: true,
        configurable: true
    });
    ResizeHintComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoResizeHint]',
                    template: "\n        <div class=\"k-marquee-color\"></div>\n        <div class=\"k-marquee-text\">\n            <div class=\"k-label-top\" *ngIf=\"hint.first\">{{ start | kendoDate : format }}</div>\n            <div class=\"k-label-bottom\" *ngIf=\"hint.last\">{{ end | kendoDate : format }}</div>\n        </div>\n    "
                },] },
    ];
    ResizeHintComponent.propDecorators = {
        hint: [{ type: Input }],
        format: [{ type: Input }],
        marqueeClasses: [{ type: HostBinding, args: ['class.k-marquee',] }, { type: HostBinding, args: ['class.k-scheduler-marquee',] }, { type: HostBinding, args: ['class.k-first',] }, { type: HostBinding, args: ['class.k-last',] }],
        left: [{ type: HostBinding, args: ['style.left.px',] }, { type: HostBinding, args: ['style.right.px',] }],
        top: [{ type: HostBinding, args: ['style.top.px',] }],
        width: [{ type: HostBinding, args: ['style.width.px',] }],
        height: [{ type: HostBinding, args: ['style.height.px',] }]
    };
    return ResizeHintComponent;
}());
export { ResizeHintComponent };
