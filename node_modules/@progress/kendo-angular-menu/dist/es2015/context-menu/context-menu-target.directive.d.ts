import { ElementRef, OnDestroy } from '@angular/core';
import { ContextMenuTargetService } from './context-menu-target.service';
/**
 * @hidden
 */
export declare const TARGET_CLASS = "k-contextmenu-target";
/**
 * Specifies a [target]({% slug api_menu_contextmenutargetdirective %}) for the ContextMenu
 * ([see example]({% slug target_contextmenu %}#toc-directives)).
 */
export declare class ContextMenuTargetDirective implements OnDestroy {
    targetService: ContextMenuTargetService;
    /**
     * The data which is associated with the target.
     */
    data: any;
    /**
     * The target DOM element.
     */
    element: any;
    /**
     * @hidden
     */
    hostClass: boolean;
    constructor(elementRef: ElementRef, targetService: ContextMenuTargetService);
    ngOnDestroy(): void;
}
