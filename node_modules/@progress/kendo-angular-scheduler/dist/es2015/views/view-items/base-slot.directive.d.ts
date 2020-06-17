import { ElementRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { BaseSlotService } from './base-slot.service';
import { Rect, SlotDirective, SlotID } from './types';
/**
 * @hidden
 */
export declare class BaseSlotDirective implements SlotDirective {
    protected element: ElementRef;
    protected slotService: BaseSlotService;
    protected localization: LocalizationService;
    id: SlotID;
    readonly slotIndex: string;
    start: Date;
    end: Date;
    private _rect;
    constructor(element: ElementRef, slotService: BaseSlotService, localization: LocalizationService);
    readonly rect: Rect;
    readonly top: number;
    readonly padding: number;
    height: number;
    readonly width: number;
    readonly key: string;
    readonly nativeElement: any;
    ngOnInit(): void;
    ngOnDestroy(): void;
    invalidate(): void;
}
