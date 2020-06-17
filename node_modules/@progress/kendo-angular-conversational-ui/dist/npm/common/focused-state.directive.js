"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
        { type: core_1.Directive, args: [{
                    selector: '[kendoChatFocusedState]'
                },] },
    ];
    FocusedStateDirective.propDecorators = {
        focused: [{ type: core_1.HostBinding, args: ['class.k-state-focused',] }],
        onFocus: [{ type: core_1.HostListener, args: ['focusin',] }],
        onBlur: [{ type: core_1.HostListener, args: ['focusout',] }]
    };
    return FocusedStateDirective;
}());
exports.FocusedStateDirective = FocusedStateDirective;
