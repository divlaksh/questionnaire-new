import { Directive, HostBinding, Input, Inject, forwardRef, ElementRef } from '@angular/core';
import { SortableComponent } from './sortable.component';
/**
 * @hidden
 */
var DraggableDirective = /** @class */ (function () {
    function DraggableDirective(
    /* tslint:disable:no-forward-ref */
    parent, el) {
        this.parent = parent;
        this.el = el;
    }
    Object.defineProperty(DraggableDirective.prototype, "_focused", {
        get: function () {
            return this.disabled ? false : (this.index === this.parent.activeIndex);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableDirective.prototype, "_disabled", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableDirective.prototype, "userSelect", {
        get: function () {
            return "none";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableDirective.prototype, "display", {
        get: function () {
            return this.hidden ? "none" : this._display;
        },
        set: function (display) {
            this._display = display;
        },
        enumerable: true,
        configurable: true
    });
    DraggableDirective.prototype.ngOnInit = function () {
        var nativeElement = this.el.nativeElement;
        this.display = nativeElement.style.display;
    };
    DraggableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDraggable]'
                },] },
    ];
    /** @nocollapse */
    DraggableDirective.ctorParameters = function () { return [
        { type: SortableComponent, decorators: [{ type: Inject, args: [forwardRef(function () { return SortableComponent; }),] }] },
        { type: ElementRef }
    ]; };
    DraggableDirective.propDecorators = {
        index: [{ type: Input }],
        hidden: [{ type: Input }],
        disabled: [{ type: Input }],
        _focused: [{ type: HostBinding, args: ['class.k-state-focused',] }],
        _disabled: [{ type: HostBinding, args: ['attr.aria-disabled',] }],
        userSelect: [{ type: HostBinding, args: ['style.user-select',] }, { type: HostBinding, args: ['style.-ms-user-select',] }, { type: HostBinding, args: ['style.-moz-user-select',] }, { type: HostBinding, args: ['style.-webkit-user-select',] }],
        display: [{ type: HostBinding, args: ['style.display',] }]
    };
    return DraggableDirective;
}());
export { DraggableDirective };
