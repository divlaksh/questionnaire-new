import { ItemsService } from './items.service';
import { ActionsService } from './actions.service';
/**
 * @hidden
 */
export declare class HoverService {
    private actions;
    private items;
    delay: number;
    openOnOver: boolean;
    private _openOnOver;
    private hoveredIdx;
    private hovered;
    private scheduled;
    constructor(actions: ActionsService, items: ItemsService);
    ngOnDestroy(): void;
    over(item: any): void;
    leave(disableOpenOnOver?: boolean): void;
    closeCurrent(): void;
    private scheduleActions;
    private scheduleDisableOpenOnOver;
    private removeScheduled;
    private cancelActions;
}
