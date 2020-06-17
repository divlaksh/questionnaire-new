import { ElementRef } from '@angular/core';
import { ContextMenuTargetService } from './context-menu-target.service';
/**
 * Specifies a container for the [targets]({% slug api_menu_contextmenutargetdirective %}) of the ContextMenu.
 */
export declare class ContextMenuTargetContainerDirective {
    targetService: ContextMenuTargetService;
    /**
     * @hidden
     */
    element: any;
    /**
     * @hidden
     */
    constructor(elementRef: ElementRef, targetService: ContextMenuTargetService);
}
