"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var context_menu_target_service_1 = require("./context-menu-target.service");
/**
 * Specifies a container for the [targets]({% slug api_menu_contextmenutargetdirective %}) of the ContextMenu.
 */
var ContextMenuTargetContainerDirective = /** @class */ (function () {
    /**
     * @hidden
     */
    function ContextMenuTargetContainerDirective(elementRef, targetService) {
        this.targetService = targetService;
        if (elementRef) {
            this.element = elementRef.nativeElement;
        }
    }
    ContextMenuTargetContainerDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoContextMenuTargetContainer]',
                    exportAs: 'kendoContextMenuTargetContainer',
                    providers: [context_menu_target_service_1.ContextMenuTargetService]
                },] },
    ];
    /** @nocollapse */
    ContextMenuTargetContainerDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: context_menu_target_service_1.ContextMenuTargetService }
    ]; };
    return ContextMenuTargetContainerDirective;
}());
exports.ContextMenuTargetContainerDirective = ContextMenuTargetContainerDirective;
