"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var month_view_item_component_1 = require("./month-view-item.component");
var month_view_component_1 = require("./month-view.component");
var month_view_renderer_component_1 = require("./month-view-renderer.component");
var month_slot_directive_1 = require("./month-slot.directive");
var views_shared_module_1 = require("../common/views-shared.module");
/**
 * @hidden
 */
var MonthViewModule = /** @class */ (function () {
    function MonthViewModule() {
    }
    MonthViewModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        views_shared_module_1.ViewsSharedModule
                    ],
                    exports: [
                        month_view_component_1.MonthViewComponent
                    ],
                    declarations: [
                        month_view_component_1.MonthViewComponent,
                        month_view_renderer_component_1.MonthViewRendererComponent,
                        month_view_item_component_1.MonthViewItemComponent,
                        month_slot_directive_1.MonthSlotDirective
                    ]
                },] },
    ];
    return MonthViewModule;
}());
exports.MonthViewModule = MonthViewModule;
