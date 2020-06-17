"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sortable_component_1 = require("./sortable.component");
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
        { type: core_1.Directive, args: [{
                    selector: '[kendoDraggable]'
                },] },
    ];
    /** @nocollapse */
    DraggableDirective.ctorParameters = function () { return [
        { type: sortable_component_1.SortableComponent, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return sortable_component_1.SortableComponent; }),] }] },
        { type: core_1.ElementRef }
    ]; };
    DraggableDirective.propDecorators = {
        index: [{ type: core_1.Input }],
        hidden: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        _focused: [{ type: core_1.HostBinding, args: ['class.k-state-focused',] }],
        _disabled: [{ type: core_1.HostBinding, args: ['attr.aria-disabled',] }],
        userSelect: [{ type: core_1.HostBinding, args: ['style.user-select',] }, { type: core_1.HostBinding, args: ['style.-ms-user-select',] }, { type: core_1.HostBinding, args: ['style.-moz-user-select',] }, { type: core_1.HostBinding, args: ['style.-webkit-user-select',] }],
        display: [{ type: core_1.HostBinding, args: ['style.display',] }]
    };
    return DraggableDirective;
}());
exports.DraggableDirective = DraggableDirective;
