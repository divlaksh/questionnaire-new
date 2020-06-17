"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var day_view_component_1 = require("./day-view.component");
var multi_day_view_component_1 = require("./multi-day-view.component");
var week_view_component_1 = require("./week-view.component");
var work_week_view_component_1 = require("./work-week-view.component");
var multi_day_view_renderer_component_1 = require("./multi-day-view-renderer.component");
var day_time_module_1 = require("../day-time/day-time.module");
var views_shared_module_1 = require("../common/views-shared.module");
var PUBLIC_DIRECTIVES = [
    day_view_component_1.DayViewComponent,
    multi_day_view_component_1.MultiDayViewComponent,
    week_view_component_1.WeekViewComponent,
    work_week_view_component_1.WorkWeekViewComponent
];
/**
 * @hidden
 */
var MultiDayViewModule = /** @class */ (function () {
    function MultiDayViewModule() {
    }
    MultiDayViewModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        views_shared_module_1.ViewsSharedModule,
                        day_time_module_1.DayTimeModule
                    ],
                    exports: [
                        PUBLIC_DIRECTIVES
                    ],
                    declarations: PUBLIC_DIRECTIVES.concat([
                        multi_day_view_renderer_component_1.MultiDayViewRendererComponent
                    ])
                },] },
    ];
    return MultiDayViewModule;
}());
exports.MultiDayViewModule = MultiDayViewModule;
