"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Obsolete. Provide the TooltipSettings class instead.
 *
 * @hidden
 */
exports.TOOLTIP_SETTINGS = new core_1.InjectionToken('kendo-ui-tooltip-settings');
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
var TooltipSettings = /** @class */ (function () {
    function TooltipSettings() {
    }
    TooltipSettings.decorators = [
        { type: core_1.Injectable },
    ];
    return TooltipSettings;
}());
exports.TooltipSettings = TooltipSettings;
