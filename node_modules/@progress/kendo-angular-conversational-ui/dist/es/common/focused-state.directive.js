import { Directive, HostListener, HostBinding } from '@angular/core';
/**
 * @hidden
 */
var FocusedStateDirective = /** @class */ (function () {
    function FocusedStateDirective() {
        this.focused = false;
    }
    FocusedStateDirective.prototype.onFocus = function () {
        this.focused = true;
    };
    FocusedStateDirective.prototype.onBlur = function () {
        this.focused = false;
    };
    FocusedStateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoChatFocusedState]'
                },] },
    ];
    FocusedStateDirective.propDecorators = {
        focused: [{ type: HostBinding, args: ['class.k-state-focused',] }],
        onFocus: [{ type: HostListener, args: ['focusin',] }],
        onBlur: [{ type: HostListener, args: ['focusout',] }]
    };
    return FocusedStateDirective;
}());
export { FocusedStateDirective };
