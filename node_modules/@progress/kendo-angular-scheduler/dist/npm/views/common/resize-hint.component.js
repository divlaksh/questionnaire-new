"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_date_math_1 = require("@progress/kendo-date-math");
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
            return kendo_date_math_1.toLocalDate(this.hint.start);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeHintComponent.prototype, "end", {
        get: function () {
            return kendo_date_math_1.toLocalDate(this.hint.end);
        },
        enumerable: true,
        configurable: true
    });
    ResizeHintComponent.decorators = [
        { type: core_1.Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoResizeHint]',
                    template: "\n        <div class=\"k-marquee-color\"></div>\n        <div class=\"k-marquee-text\">\n            <div class=\"k-label-top\" *ngIf=\"hint.first\">{{ start | kendoDate : format }}</div>\n            <div class=\"k-label-bottom\" *ngIf=\"hint.last\">{{ end | kendoDate : format }}</div>\n        </div>\n    "
                },] },
    ];
    ResizeHintComponent.propDecorators = {
        hint: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }],
        marqueeClasses: [{ type: core_1.HostBinding, args: ['class.k-marquee',] }, { type: core_1.HostBinding, args: ['class.k-scheduler-marquee',] }, { type: core_1.HostBinding, args: ['class.k-first',] }, { type: core_1.HostBinding, args: ['class.k-last',] }],
        left: [{ type: core_1.HostBinding, args: ['style.left.px',] }, { type: core_1.HostBinding, args: ['style.right.px',] }],
        top: [{ type: core_1.HostBinding, args: ['style.top.px',] }],
        width: [{ type: core_1.HostBinding, args: ['style.width.px',] }],
        height: [{ type: core_1.HostBinding, args: ['style.height.px',] }]
    };
    return ResizeHintComponent;
}());
exports.ResizeHintComponent = ResizeHintComponent;
