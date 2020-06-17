import { Observable } from 'rxjs';
import { DateRange, SchedulerView } from '../types';
/**
 * Contains the context for the built-in toolbar components
 * ([see example]({% slug toolbar_scheduler %}#toc-setting-the-template-context)).
 *
 * @hidden
 */
export interface ToolbarContext {
    dateRange: Observable<DateRange>;
    selectedDate: Observable<Date>;
    views?: SchedulerView[];
    selectedView?: SchedulerView;
}
