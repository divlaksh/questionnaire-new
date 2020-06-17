import { Component, HostBinding, Input } from '@angular/core';
import { toLocalDate } from '@progress/kendo-date-math';
/**
 * @hidden
 */
export class ResizeHintComponent {
    constructor() {
        this.marqueeClasses = true;
    }
    get left() {
        return this.hint.rect.left;
    }
    get top() {
        return this.hint.rect.top;
    }
    get width() {
        return this.hint.rect.width;
    }
    get height() {
        return this.hint.rect.height;
    }
    get start() {
        return toLocalDate(this.hint.start);
    }
    get end() {
        return toLocalDate(this.hint.end);
    }
}
ResizeHintComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[kendoResizeHint]',
                template: `
        <div class="k-marquee-color"></div>
        <div class="k-marquee-text">
            <div class="k-label-top" *ngIf="hint.first">{{ start | kendoDate : format }}</div>
            <div class="k-label-bottom" *ngIf="hint.last">{{ end | kendoDate : format }}</div>
        </div>
    `
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
