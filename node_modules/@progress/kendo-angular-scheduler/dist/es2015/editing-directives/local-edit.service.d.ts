import { LocalDataChangesService } from '../editing/local-data-changes.service';
import { SchedulerModelFields } from '../types/scheduler-model-fields.interface';
import { SchedulerComponent } from '../scheduler.component';
import { EditService } from './edit-service.interface';
/**
 * @hidden
 */
export declare class LocalEditService implements EditService<any> {
    private scheduler;
    private localDataChangesService;
    readonly fields: SchedulerModelFields;
    private readonly hasLocalData;
    private readonly data;
    constructor(scheduler: SchedulerComponent, localDataChangesService: LocalDataChangesService);
    create(item: any): void;
    createException(item: any, value: any): void;
    update(item: any, value: any): void;
    remove(item: any): void;
    removeSeries(item: any): void;
    removeOccurrence(item: any): void;
    findRecurrenceMaster(item: any): any;
    isRecurring(event: any): boolean;
    isException(event: any): boolean;
    private nextId;
    private buildException;
    private removeItemAndExceptions;
    private removeOccurrenceInternal;
    private dataChanged;
}
