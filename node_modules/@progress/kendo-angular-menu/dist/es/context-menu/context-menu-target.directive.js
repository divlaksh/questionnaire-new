import { Directive, ElementRef, Input, HostBinding } from '@angular/core';
import { ContextMenuTargetService } from './context-menu-target.service';
/**
 * @hidden
 */
export var TARGET_CLASS = 'k-contextmenu-target';
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
        { type: Directive, args: [{
                    selector: '[kendoContextMenuTarget]',
                    exportAs: 'kendoContextMenuTarget'
                },] },
    ];
    /** @nocollapse */
    ContextMenuTargetDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ContextMenuTargetService }
    ]; };
    ContextMenuTargetDirective.propDecorators = {
        data: [{ type: Input, args: ['kendoContextMenuTarget',] }],
        hostClass: [{ type: HostBinding, args: ["class." + TARGET_CLASS,] }]
    };
    return ContextMenuTargetDirective;
}());
export { ContextMenuTargetDirective };
