import { NgModule } from '@angular/core';
import { ResizeSensorModule } from '@progress/kendo-angular-common';
import { ThemeService } from './services';
/**
 * @hidden
 */
export class SharedModule {
}
SharedModule.decorators = [
    { type: NgModule, args: [{
                exports: [ResizeSensorModule],
                providers: [
                    ThemeService
                ]
            },] },
];
