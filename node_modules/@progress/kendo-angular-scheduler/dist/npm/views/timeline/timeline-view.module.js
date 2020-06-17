"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var timeline_multi_day_view_component_1 = require("./timeline-multi-day-view.component");
var timeline_view_component_1 = require("./timeline-view.component");
var timeline_week_view_component_1 = require("./timeline-week-view.component");
var timeline_month_view_component_1 = require("./timeline-month-view.component");
var day_time_module_1 = require("../day-time/day-time.module");
var views_shared_module_1 = require("../common/views-shared.module");
var PUBLIC_DIRECTIVES = [
    timeline_view_component_1.TimelineViewComponent,
    timeline_week_view_component_1.TimelineWeekViewComponent,
    timeline_month_view_component_1.TimelineMonthViewComponent
];
/**
 * @hidden
 */
var TimelineViewModule = /** @class */ (function () {
    function TimelineViewModule() {
    }
    TimelineViewModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        day_time_module_1.DayTimeModule,
                        views_shared_module_1.ViewsSharedModule
                    ],
                    exports: [
                        PUBLIC_DIRECTIVES
                    ],
                    declarations: PUBLIC_DIRECTIVES.concat([
                        timeline_multi_day_view_component_1.TimelineMultiDayViewComponent
                    ])
                },] },
    ];
    return TimelineViewModule;
}());
exports.TimelineViewModule = TimelineViewModule;
