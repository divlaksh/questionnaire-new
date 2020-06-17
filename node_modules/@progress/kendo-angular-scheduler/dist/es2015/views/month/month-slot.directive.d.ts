import { ElementRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { BaseSlotDirective } from '../view-items/base-slot.directive';
import { MonthSlotService } from './month-slot.service';
/**
 * @hidden
 */
export declare class MonthSlotDirective extends BaseSlotDirective {
    start: Date;
    isDaySlot: boolean;
    readonly end: Date;
    readonly linkHeight: number;
    private startDate;
    private _linkHeight;
    private showMoreElement;
    constructor(element: ElementRef, slotService: MonthSlotService, localization: LocalizationService);
    ngOnDestroy(): void;
    showMore(rect: any): void;
    hideMore(): void;
    invalidate(): void;
    private removeShowMore;
}
