import { NgModule } from '@angular/core';
import { MonthViewItemComponent } from './month-view-item.component';
import { MonthViewComponent } from './month-view.component';
import { MonthViewRendererComponent } from './month-view-renderer.component';
import { MonthSlotDirective } from './month-slot.directive';
import { ViewsSharedModule } from '../common/views-shared.module';
/**
 * @hidden
 */
export class MonthViewModule {
}
MonthViewModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    ViewsSharedModule
                ],
                exports: [
                    MonthViewComponent
                ],
                declarations: [
                    MonthViewComponent,
                    MonthViewRendererComponent,
                    MonthViewItemComponent,
                    MonthSlotDirective
                ]
            },] },
];
