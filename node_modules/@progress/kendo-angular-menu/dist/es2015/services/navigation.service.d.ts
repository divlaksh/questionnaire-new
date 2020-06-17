import { NgZone } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ItemsService } from './items.service';
import { ActionsService } from './actions.service';
/**
 * @hidden
 */
export declare class NavigationService {
    private items;
    private actions;
    private localization;
    private ngZone;
    vertical: boolean;
    activeIndex: string;
    focusedIdx: string;
    readonly focusedItem: any;
    private readonly activeItem;
    private readonly handlers;
    constructor(items: ItemsService, actions: ActionsService, localization: LocalizationService, ngZone: NgZone);
    focus(item: any): void;
    setFocus(item: any): void;
    focusLeave(): void;
    updateActive(): void;
    keydown(e: any): void;
    focusIndex(index?: string): void;
    focusFirst(): void;
    focusLast(): void;
    search(current: any, key: string): void;
    down(current: any): void;
    up(current: any): void;
    left(current: any): void;
    right(current: any): void;
    home(current: any): void;
    end(current: any): void;
    enter(current: any, domEvent: any): void;
    esc(current: any): void;
    tab(current: any): void;
    private focusChild;
    private setActive;
}
