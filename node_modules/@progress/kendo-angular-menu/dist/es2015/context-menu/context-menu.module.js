import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupModule } from '@progress/kendo-angular-popup';
import { MenuModule } from '../menu.module';
import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuTemplateDirective } from './context-menu-template.directive';
import { ContextMenuTargetDirective } from './context-menu-target.directive';
import { ContextMenuTargetContainerDirective } from './context-menu-target-container.directive';
const COMPONENT_DIRECTIVES = [
    ContextMenuComponent,
    ContextMenuTemplateDirective,
    ContextMenuTargetDirective,
    ContextMenuTargetContainerDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the ContextMenu component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the ContextMenu module
 * import { ContextMenuModule } from '@progress/kendo-angular-menu';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, BrowserAnimationsModule, ContextMenuModule], // import ContextMenuModule module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
export class ContextMenuModule {
}
ContextMenuModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES],
                exports: [COMPONENT_DIRECTIVES, MenuModule],
                imports: [PopupModule, CommonModule, MenuModule]
            },] },
];
