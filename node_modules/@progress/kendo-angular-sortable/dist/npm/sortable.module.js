"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var sortable_component_1 = require("./sortable.component");
var sortable_service_1 = require("./sortable.service");
var draggable_directive_1 = require("./draggable.directive");
var item_template_directive_1 = require("./item-template.directive");
var item_template_directive_2 = require("./item-template.directive");
var binding_directive_1 = require("./binding.directive");
var COMPONENT_DIRECTIVES = [
    sortable_component_1.SortableComponent,
    draggable_directive_1.DraggableDirective,
    item_template_directive_1.PlaceholderTemplateDirective,
    item_template_directive_2.ItemTemplateDirective,
    binding_directive_1.SortableBindingDirective
];
/**
 *
 * Represents the [`NgModule`]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Sortable component.
 *
 * @example
 *
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * // Import the Sortable module
 * import { SortableModule } from '@progress/kendo-angular-sortable';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, SortableModule],
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var SortableModule = /** @class */ (function () {
    function SortableModule() {
    }
    SortableModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_DIRECTIVES],
                    imports: [common_1.CommonModule],
                    providers: [sortable_service_1.SortableService]
                },] },
    ];
    return SortableModule;
}());
exports.SortableModule = SortableModule;
