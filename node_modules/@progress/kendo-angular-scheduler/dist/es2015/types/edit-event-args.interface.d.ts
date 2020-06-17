import { FormGroup } from '@angular/forms';
import { EditMode } from '../types';
/**
 * An object which contains the options for the [`SchedulerComponent.editEvent`]({% slug api_scheduler_schedulercomponent %}#toc-editevent).
 */
export interface EditEventArgs {
    /**
     * The [`FormGroup`](https://angular.io/docs/ts/latest/api/forms/index/FormGroup-class.html)
     * that describes the edit form.
     */
    group?: FormGroup;
    /**
     * The selected edit mode of the event.
     */
    mode?: EditMode;
}
