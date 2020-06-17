import { ElementRef, EventEmitter, QueryList } from '@angular/core';
import { Action } from '../main';
import { ChatItem } from './chat-item';
/**
 * @hidden
 */
export declare class SuggestedActionsComponent extends ChatItem {
    actions: Action[];
    tabbable: boolean;
    dispatch: EventEmitter<Action>;
    defaultClass: boolean;
    selected: boolean;
    items: QueryList<ElementRef>;
    selectedIndex: number;
    private keyHandlers;
    isSelected(index: number): boolean;
    actionClick(action: Action): void;
    actionKeydown(e: any, action: Action): void;
    focus(): void;
    private select;
    private navigateTo;
}
