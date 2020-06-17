import { Directive, ElementRef } from '@angular/core';
import { ContextMenuTargetService } from './context-menu-target.service';
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
        { type: Directive, args: [{
                    selector: '[kendoContextMenuTargetContainer]',
                    exportAs: 'kendoContextMenuTargetContainer',
                    providers: [ContextMenuTargetService]
                },] },
    ];
    /** @nocollapse */
    ContextMenuTargetContainerDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ContextMenuTargetService }
    ]; };
    return ContextMenuTargetContainerDirective;
}());
export { ContextMenuTargetContainerDirective };
