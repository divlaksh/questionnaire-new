"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var context_menu_target_service_1 = require("./context-menu-target.service");
/**
 * @hidden
 */
exports.TARGET_CLASS = 'k-contextmenu-target';
/**
 * Specifies a [target]({% slug api_menu_contextmenutargetdirective %}) for the ContextMenu
 * ([see example]({% slug target_contextmenu %}#toc-directives)).
 */
var ContextMenuTargetDirective = /** @class */ (function () {
    function ContextMenuTargetDirective(elementRef, targetService) {
        this.targetService = targetService;
        /**
         * @hidden
         */
        this.hostClass = true;
        if (elementRef) {
            this.element = elementRef.nativeElement;
        }
        targetService.add(this);
    }
    ContextMenuTargetDirective.prototype.ngOnDestroy = function () {
        this.targetService.remove(this);
    };
    ContextMenuTargetDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoContextMenuTarget]',
                    exportAs: 'kendoContextMenuTarget'
                },] },
    ];
    /** @nocollapse */
    ContextMenuTargetDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: context_menu_target_service_1.ContextMenuTargetService }
    ]; };
    ContextMenuTargetDirective.propDecorators = {
        data: [{ type: core_1.Input, args: ['kendoContextMenuTarget',] }],
        hostClass: [{ type: core_1.HostBinding, args: ["class." + exports.TARGET_CLASS,] }]
    };
    return ContextMenuTargetDirective;
}());
exports.ContextMenuTargetDirective = ContextMenuTargetDirective;
