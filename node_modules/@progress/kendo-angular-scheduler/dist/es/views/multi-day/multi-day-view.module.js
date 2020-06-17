import { NgModule } from '@angular/core';
import { DayViewComponent } from './day-view.component';
import { MultiDayViewComponent } from './multi-day-view.component';
import { WeekViewComponent } from './week-view.component';
import { WorkWeekViewComponent } from './work-week-view.component';
import { MultiDayViewRendererComponent } from './multi-day-view-renderer.component';
import { DayTimeModule } from '../day-time/day-time.module';
import { ViewsSharedModule } from '../common/views-shared.module';
var PUBLIC_DIRECTIVES = [
    DayViewComponent,
    MultiDayViewComponent,
    WeekViewComponent,
    WorkWeekViewComponent
];
/**
 * @hidden
 */
var MultiDayViewModule = /** @class */ (function () {
    function MultiDayViewModule() {
    }
    MultiDayViewModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        ViewsSharedModule,
                        DayTimeModule
                    ],
                    exports: [
                        PUBLIC_DIRECTIVES
                    ],
                    declarations: PUBLIC_DIRECTIVES.concat([
                        MultiDayViewRendererComponent
                    ])
                },] },
    ];
    return MultiDayViewModule;
}());
export { MultiDayViewModule };
