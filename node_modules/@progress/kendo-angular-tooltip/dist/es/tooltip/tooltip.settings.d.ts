import { InjectionToken } from '@angular/core';
import { Position } from '../models/position.type';
import { ShowOption } from '../models/show.option.type';
/**
 * Obsolete. Provide the TooltipSettings class instead.
 *
 * @hidden
 */
export declare const TOOLTIP_SETTINGS: InjectionToken<string>;
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
export declare class TooltipSettings {
    /**
     * Specifies if the Тooltip will display a callout arrow.
     *
     * The possible values are:
     * * `true` (default)
     * * `false`
     */
    callout?: boolean;
    /**
     * Specifies the position of the Tooltip that is
     * relative to the anchor element.
     *
     * The possible values are:
     * * `top` (default)
     * * `bottom`
     * * `left`
     * * `right`
     */
    position?: Position;
    /**
     * Specifies when the Тooltip will be rendered.
     *
     * The possible values are:
     * * `hover` (default)
     * * `click`
     * * `none`
     */
    showOn?: ShowOption;
}
