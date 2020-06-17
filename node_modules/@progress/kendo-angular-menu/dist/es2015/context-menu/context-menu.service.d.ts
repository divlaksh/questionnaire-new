import { EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export declare class ContextMenuService {
    keydown: EventEmitter<any>;
    owner: any;
    items: any;
    emit(name: string, args: any): void;
    hasObservers(name: string): boolean;
    leaveMenu(e: any): boolean;
}
