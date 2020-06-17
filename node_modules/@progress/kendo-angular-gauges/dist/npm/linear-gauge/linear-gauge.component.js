"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var services_1 = require("../services");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var base_components_1 = require("../base-components");
var kendo_charts_1 = require("@progress/kendo-charts");
/**
 * Represents the [Kendo UI LinearGauge component for Angular]({% slug overview_lineargauge_gauges %}).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *      <kendo-lineargauge [pointer]="{ value: value }">
 *      </kendo-lineargauge>
 *   `
 * })
 * class AppComponent {
 *   public value: number = 10;
 * }
 *
 * ```
 */
var LinearGaugeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LinearGaugeComponent, _super);
    function LinearGaugeComponent(configurationService, themeService, intlService, localizationService, element, renderer, ngZone) {
        return _super.call(this, configurationService, themeService, intlService, localizationService, element, renderer, ngZone) || this;
    }
    LinearGaugeComponent.prototype.createInstance = function (element, options, theme, context) {
        this.instance = new kendo_charts_1.LinearGauge(element, options, theme, context);
    };
    LinearGaugeComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    exportAs: 'kendoLinearGauge',
                    providers: [
                        services_1.ConfigurationService,
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.lineargauge'
                        }
                    ],
                    selector: 'kendo-lineargauge',
                    template: "\n    <div #surface class='k-chart-surface'></div>\n    <kendo-resize-sensor (resize)=\"onResize($event)\" [rateLimit]=\"resizeRateLimit\"></kendo-resize-sensor>\n  "
                },] },
    ];
    /** @nocollapse */
    LinearGaugeComponent.ctorParameters = function () { return [
        { type: services_1.ConfigurationService },
        { type: services_1.ThemeService },
        { type: kendo_angular_intl_1.IntlService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: core_1.NgZone }
    ]; };
    LinearGaugeComponent.propDecorators = {
        pointer: [{ type: core_1.Input }],
        scale: [{ type: core_1.Input }]
    };
    return LinearGaugeComponent;
}(base_components_1.GaugeComponent));
exports.LinearGaugeComponent = LinearGaugeComponent;
