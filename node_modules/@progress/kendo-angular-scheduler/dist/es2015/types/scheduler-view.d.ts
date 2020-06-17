import { TemplateRef } from '@angular/core';
/**
 * An abstract class which contains meta information about a Scheduler view.
 */
export declare abstract class SchedulerView {
    /**
     * @hidden
     */
    abstract template: TemplateRef<any>;
    /**
     * The view title that will be displayed by the Scheduler.
     * For example, **Day View**.
     */
    abstract title: string;
    /**
     * The invariant name for this view.
     * For example, `day`.
     */
    abstract name: string;
}
