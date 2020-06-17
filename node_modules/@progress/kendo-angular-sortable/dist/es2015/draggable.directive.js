import { Directive, HostBinding, Input, Inject, forwardRef, ElementRef } from '@angular/core';
import { SortableComponent } from './sortable.component';
/**
 * @hidden
 */
export class DraggableDirective {
    constructor(
    /* tslint:disable:no-forward-ref */
    parent, el) {
        this.parent = parent;
        this.el = el;
    }
    get _focused() {
        return this.disabled ? false : (this.index === this.parent.activeIndex);
    }
    get _disabled() {
        return this.disabled;
    }
    get userSelect() {
        return "none";
    }
    get display() {
        return this.hidden ? "none" : this._display;
    }
    set display(display) {
        this._display = display;
    }
    ngOnInit() {
        const nativeElement = this.el.nativeElement;
        this.display = nativeElement.style.display;
    }
}
DraggableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDraggable]'
            },] },
];
/** @nocollapse */
DraggableDirective.ctorParameters = () => [
    { type: SortableComponent, decorators: [{ type: Inject, args: [forwardRef(() => SortableComponent),] }] },
    { type: ElementRef }
];
DraggableDirective.propDecorators = {
    index: [{ type: Input }],
    hidden: [{ type: Input }],
    disabled: [{ type: Input }],
    _focused: [{ type: HostBinding, args: ['class.k-state-focused',] }],
    _disabled: [{ type: HostBinding, args: ['attr.aria-disabled',] }],
    userSelect: [{ type: HostBinding, args: ['style.user-select',] }, { type: HostBinding, args: ['style.-ms-user-select',] }, { type: HostBinding, args: ['style.-moz-user-select',] }, { type: HostBinding, args: ['style.-webkit-user-select',] }],
    display: [{ type: HostBinding, args: ['style.display',] }]
};
