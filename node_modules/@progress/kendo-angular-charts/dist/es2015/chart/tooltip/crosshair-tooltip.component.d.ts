import { TemplateRef } from '@angular/core';
import { BaseTooltip } from './base-tooltip';
import { PopupService } from '@progress/kendo-angular-popup';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PopupSettings } from './popup-settings.interface';
/**
 * @hidden
 */
export declare class CrosshairTooltipComponent extends BaseTooltip {
    templateRef: TemplateRef<any>;
    key: string;
    popupSettings: PopupSettings;
    value: any;
    animate: boolean;
    constructor(popupService: PopupService, localizationService: LocalizationService);
    show(e: any): void;
}
