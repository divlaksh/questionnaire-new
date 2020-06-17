import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule } from '@progress/kendo-angular-dateinputs';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ToolbarNavigationComponent } from './navigation.component';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarTemplateDirective } from './toolbar-template.directive';
import { ToolbarViewSelectorComponent } from './view-selector.component';
/**
 * @hidden
 */
export var publicDirectives = [
    ToolbarNavigationComponent,
    ToolbarTemplateDirective,
    ToolbarViewSelectorComponent
];
/**
 * @hidden
 */
var ToolbarModule = /** @class */ (function () {
    function ToolbarModule() {
    }
    ToolbarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        CalendarModule,
                        PopupModule
                    ],
                    exports: [
                        ToolbarComponent
                    ].concat(publicDirectives),
                    declarations: [
                        ToolbarComponent
                    ].concat(publicDirectives)
                },] },
    ];
    return ToolbarModule;
}());
export { ToolbarModule };
