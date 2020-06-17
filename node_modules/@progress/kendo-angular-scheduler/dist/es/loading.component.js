import { Component, Input, HostBinding, Renderer2, ElementRef } from '@angular/core';
/**
 * @hidden
 */
var LoadingComponent = /** @class */ (function () {
    function LoadingComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.hostClasses = true;
    }
    Object.defineProperty(LoadingComponent.prototype, "display", {
        get: function () {
            return this.loading || this.force ? 'block' : 'none';
        },
        enumerable: true,
        configurable: true
    });
    LoadingComponent.prototype.toggle = function (value) {
        this.force = value;
        this.renderer.setStyle(this.element.nativeElement, 'display', this.display);
    };
    LoadingComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerLoading]',
                    template: "\n        <div class=\"k-loading-image\"></div>\n        <div class=\"k-loading-color\"></div>\n    "
                },] },
    ];
    /** @nocollapse */
    LoadingComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    LoadingComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-loading-mask',] }],
        loading: [{ type: Input }],
        display: [{ type: HostBinding, args: ['style.display',] }]
    };
    return LoadingComponent;
}());
export { LoadingComponent };
