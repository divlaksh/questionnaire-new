import { Injectable, InjectionToken } from '@angular/core';
/**
 * Obsolete. Provide the TooltipSettings class instead.
 *
 * @hidden
 */
export const TOOLTIP_SETTINGS = new InjectionToken('kendo-ui-tooltip-settings');
/**
 * Provides a global configuration for the Kendo UI Tooltip. Once injected through
 * the `AppComponent` constructor, the configuration properties can be overridden.
 *
 * @example
 * ```ts-no-run
 * import { TooltipSettings } from '@progress/kendo-angular-tooltip';
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *      <div kendoTooltip>
 *          <button title="Saves the current document">Save</button>
 *      </div>`,
 *    providers: [{
 *        provide: TooltipSettings,
 *        useFactory: (): TooltipSettings => ({
 *          // Override default values of tooltips if wanted
 *          position: 'right'
 *        })
 *    }]
 * })
 * export class AppComponent { }
 * ```
 */
export class TooltipSettings {
}
TooltipSettings.decorators = [
    { type: Injectable },
];
