import { QueryList } from '@angular/core';
import { CrosshairTooltipComponent } from './crosshair-tooltip.component';
import { PopupSettings } from './popup-settings.interface';
/**
 * @hidden
 */
export declare class CrosshairTooltipsContainerComponent {
    popupSettings: PopupSettings;
    crossahirTooltipComponents: QueryList<CrosshairTooltipComponent>;
    tooltipKeys: Array<any>;
    private tooltipsMap;
    show(e: any): void;
    hide(): void;
    readonly active: boolean;
    createCrosshairTooltips(options: any): void;
    protected removeTooltip(key: string): void;
    protected mapTooltips(options: any): any;
    protected axesCrosshairTooltipOptions(options: any, name: string): any;
}
