"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var kendo_angular_dateinputs_1 = require("@progress/kendo-angular-dateinputs");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var navigation_component_1 = require("./navigation.component");
var toolbar_component_1 = require("./toolbar.component");
var toolbar_template_directive_1 = require("./toolbar-template.directive");
var view_selector_component_1 = require("./view-selector.component");
/**
 * @hidden
 */
exports.publicDirectives = [
    navigation_component_1.ToolbarNavigationComponent,
    toolbar_template_directive_1.ToolbarTemplateDirective,
    view_selector_component_1.ToolbarViewSelectorComponent
];
/**
 * @hidden
 */
var ToolbarModule = /** @class */ (function () {
    function ToolbarModule() {
    }
    ToolbarModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        kendo_angular_dateinputs_1.CalendarModule,
                        kendo_angular_popup_1.PopupModule
                    ],
                    exports: [
                        toolbar_component_1.ToolbarComponent
                    ].concat(exports.publicDirectives),
                    declarations: [
                        toolbar_component_1.ToolbarComponent
                    ].concat(exports.publicDirectives)
                },] },
    ];
    return ToolbarModule;
}());
exports.ToolbarModule = ToolbarModule;
