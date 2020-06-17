import { Directive, ElementRef } from '@angular/core';
import { ContextMenuTargetService } from './context-menu-target.service';
/**
 * Specifies a container for the [targets]({% slug api_menu_contextmenutargetdirective %}) of the ContextMenu.
 */
export class ContextMenuTargetContainerDirective {
    /**
     * @hidden
     */
    constructor(elementRef, targetService) {
        this.targetService = targetService;
        if (elementRef) {
            this.element = elementRef.nativeElement;
        }
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
ContextMenuTargetContainerDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ContextMenuTargetService }
];
