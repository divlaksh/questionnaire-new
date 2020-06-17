import { NgModule } from '@angular/core';
import { TimelineMultiDayViewComponent } from './timeline-multi-day-view.component';
import { TimelineViewComponent } from './timeline-view.component';
import { TimelineWeekViewComponent } from './timeline-week-view.component';
import { TimelineMonthViewComponent } from './timeline-month-view.component';
import { DayTimeModule } from '../day-time/day-time.module';
import { ViewsSharedModule } from '../common/views-shared.module';
var PUBLIC_DIRECTIVES = [
    TimelineViewComponent,
    TimelineWeekViewComponent,
    TimelineMonthViewComponent
];
/**
 * @hidden
 */
var TimelineViewModule = /** @class */ (function () {
    function TimelineViewModule() {
    }
    TimelineViewModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        DayTimeModule,
                        ViewsSharedModule
                    ],
                    exports: [
                        PUBLIC_DIRECTIVES
                    ],
                    declarations: PUBLIC_DIRECTIVES.concat([
                        TimelineMultiDayViewComponent
                    ])
                },] },
    ];
    return TimelineViewModule;
}());
export { TimelineViewModule };
