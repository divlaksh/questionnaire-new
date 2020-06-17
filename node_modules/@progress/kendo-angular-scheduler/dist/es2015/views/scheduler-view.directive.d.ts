import { TemplateRef } from '@angular/core';
import { SchedulerView } from '../types';
/**
 * A directive selector for a custom Scheduler view
 */
export declare class SchedulerViewDirective extends SchedulerView {
    template: TemplateRef<any>;
    /**
     * The user-friendly name of this view.
     */
    title: string;
    /**
     * The invariant name for this view. For example, `day`.
     * If not set, the name will be the same as the title.
     */
    name: string;
    private _name;
    constructor(template: TemplateRef<any>);
}
