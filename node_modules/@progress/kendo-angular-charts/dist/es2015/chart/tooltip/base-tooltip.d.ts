import { OnDestroy } from '@angular/core';
import { PopupService } from '@progress/kendo-angular-popup';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PopupSettings } from './popup-settings.interface';
/**
 * @hidden
 */
export declare abstract class BaseTooltip implements OnDestroy {
    protected popupService: PopupService;
    protected localizationService: LocalizationService;
    animate: boolean;
    style: any;
    templateRef: any;
    popupRef: any;
    popupSettings: PopupSettings;
    constructor(popupService: PopupService, localizationService: LocalizationService);
    readonly active: boolean;
    show(e: any): void;
    hide(): void;
    protected onInit(): void;
    ngOnDestroy(): void;
}
