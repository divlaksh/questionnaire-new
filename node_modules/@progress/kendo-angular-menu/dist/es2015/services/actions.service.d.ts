import { NgZone } from '@angular/core';
import { ItemsService } from './items.service';
/**
 * @hidden
 */
export declare class ActionsService {
    private ngZone;
    private items;
    owner: any;
    actions: any[];
    constructor(ngZone: NgZone, items: ItemsService);
    open(item: any, finished?: any): void;
    close(item: any): void;
    closeItem(item: any): void;
    closeToRoot(item: any): void;
    closeOthers(item: any): void;
    closeAll(): void;
    select(item: any, domEvent: any, prevented?: any, finished?: any): void;
    emit(name: string, item: any, domEvent?: any): boolean;
    readonly hasPending: boolean;
    execute(toExecute?: any[]): void;
    clear(): any[];
    private executeActions;
    private requiresZone;
    private closeChildren;
    private closeItems;
}
