import { Directive, forwardRef, Input, TemplateRef } from '@angular/core';
import { SchedulerView } from '../types';
// tslint:disable:no-input-rename
/**
 * A directive selector for a custom Scheduler view
 */
export class SchedulerViewDirective extends SchedulerView {
    constructor(template) {
        super();
        this.template = template;
    }
    /**
     * The invariant name for this view. For example, `day`.
     * If not set, the name will be the same as the title.
     */
    get name() {
        return this._name || this.title;
    }
    set name(value) {
        this._name = value;
    }
}
SchedulerViewDirective.decorators = [
    { type: Directive, args: [{
                providers: [{
                        provide: SchedulerView,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => SchedulerViewDirective)
                    }],
                selector: '[kendoSchedulerView]'
            },] },
];
/** @nocollapse */
SchedulerViewDirective.ctorParameters = () => [
    { type: TemplateRef }
];
SchedulerViewDirective.propDecorators = {
    title: [{ type: Input, args: ['kendoSchedulerView',] }],
    name: [{ type: Input, args: ['kendoSchedulerViewName',] }]
};
