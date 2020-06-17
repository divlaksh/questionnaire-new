import { Directive, HostListener, HostBinding } from '@angular/core';
/**
 * @hidden
 */
export class FocusedStateDirective {
    constructor() {
        this.focused = false;
    }
    onFocus() {
        this.focused = true;
    }
    onBlur() {
        this.focused = false;
    }
}
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
