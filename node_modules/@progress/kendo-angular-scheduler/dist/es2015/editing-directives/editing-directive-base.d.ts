import { OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { SchedulerComponent } from '../scheduler.component';
import { Subscription } from 'rxjs';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
import { EditService } from './edit-service.interface';
import { DialogsService } from '../editing/dialogs.service';
import { EditMode } from '../types';
import { AddEvent, EditEvent } from '../events';
/**
 * @hidden
 */
export declare abstract class EditingDirectiveBase implements OnInit, OnDestroy {
    protected scheduler: SchedulerComponent;
    protected localDataChangesService: LocalDataChangesService;
    protected dialogsService: DialogsService;
    /**
     * Fires before the editing directive renders the **Add** dialog.
     */
    add: EventEmitter<AddEvent>;
    /**
     * Fires before the editing directive renders the **Edit** dialog.
     */
    edit: EventEmitter<EditEvent>;
    /**
     * The edit service that will handle the editing operations.
     */
    editService: EditService<any>;
    protected defaultTitle: string;
    protected subscriptions: Subscription;
    protected defaultEditService: EditService<any>;
    protected userEditService: EditService<any>;
    protected abstract createModel(args: any): any;
    constructor(scheduler: SchedulerComponent, localDataChangesService: LocalDataChangesService, dialogsService: DialogsService);
    /**
     * @hidden
     */
    ngOnInit(): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    protected createDefaultService(): EditService<any>;
    protected addHandler(args: any): void;
    protected removeHandler({ dataItem }: any): void;
    protected cancelHandler(): void;
    protected closeEditor(): void;
    protected handleUpdate(item: any, value: any, mode: EditMode): void;
    protected handleRemove(item: any, mode: EditMode): void;
    protected resizeEndHandler({ event, start, end }: any): void;
    protected dragEndHandler({ event: { dataItem }, start, end, resources, isAllDay }: any): void;
    protected isEnabled(action: string): boolean;
}
