import { Component, Input, HostBinding, Renderer2, ElementRef } from '@angular/core';
/**
 * @hidden
 */
export class LoadingComponent {
    constructor(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.hostClasses = true;
    }
    get display() {
        return this.loading || this.force ? 'block' : 'none';
    }
    toggle(value) {
        this.force = value;
        this.renderer.setStyle(this.element.nativeElement, 'display', this.display);
    }
}
LoadingComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[kendoSchedulerLoading]',
                template: `
        <div class="k-loading-image"></div>
        <div class="k-loading-color"></div>
    `
            },] },
];
/** @nocollapse */
LoadingComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
LoadingComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-loading-mask',] }],
    loading: [{ type: Input }],
    display: [{ type: HostBinding, args: ['style.display',] }]
};
