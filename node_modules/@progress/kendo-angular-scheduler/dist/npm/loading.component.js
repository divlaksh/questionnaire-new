"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
        { type: core_1.Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerLoading]',
                    template: "\n        <div class=\"k-loading-image\"></div>\n        <div class=\"k-loading-color\"></div>\n    "
                },] },
    ];
    /** @nocollapse */
    LoadingComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 }
    ]; };
    LoadingComponent.propDecorators = {
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-loading-mask',] }],
        loading: [{ type: core_1.Input }],
        display: [{ type: core_1.HostBinding, args: ['style.display',] }]
    };
    return LoadingComponent;
}());
exports.LoadingComponent = LoadingComponent;
