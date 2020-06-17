import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { DateRange } from '../types';
import { NavigationAction } from '../types';
import { SchedulerView } from '../types';
import { ToolbarTemplateDirective } from './toolbar-template.directive';
import { ToolbarService } from './toolbar.service';
/**
 * @hidden
 */
export declare class ToolbarComponent {
    private service;
    hostClasses: boolean;
    selectedView: SchedulerView;
    views: SchedulerView[];
    dateRange: Observable<DateRange>;
    selectedDate: Observable<Date>;
    template: ToolbarTemplateDirective;
    navigate: EventEmitter<NavigationAction>;
    min: Date;
    max: Date;
    templateContext: any;
    private subs;
    constructor(service: ToolbarService);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
}
