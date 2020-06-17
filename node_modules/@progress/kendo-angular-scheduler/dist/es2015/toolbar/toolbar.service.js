import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * A service for communication with the toolbar controls
 * which is used by the toolbar components for publishing navigation actions
 * ([see example]({% slug toolbar_scheduler %}#toc-using-the-toolbar-service)).
 */
export class ToolbarService {
    /** @hidden */
    constructor() {
        this.actionSource = new Subject();
        this.action = this.actionSource.asObservable();
    }
    /**
     * Emits the specified navigation action.
     *
     * @param action - The navigation action that will be executed.
     */
    navigate(action) {
        this.actionSource.next(action);
    }
}
ToolbarService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ToolbarService.ctorParameters = () => [];
