import { EditService } from './edit-service.interface';
import { SchedulerModelFields } from '../types';
import { BehaviorSubject, Observable } from 'rxjs';
/**
 * A base implementation of the [edit service]({% slug api_scheduler_editservice %}) which persists data to traditional CRUD services such as OData.
 *
 * To support custom models, the `BaseEditService` class requires a [field map]({% slug api_scheduler_schedulermodelfields %}) as a constructor parameter. Subclasses require you to
 * implement the `read` operation, which is not called directly by the base class, and the [`save`]({% slug api_scheduler_baseeditservice %}#toc-save) method which persists the created,
 * updated, and deleted entities.
 *
 * The [`events`](#toc-events) observable will publish the current data which is set upon subscription by using, for example, an [async pipe](https://angular.io/api/common/AsyncPipe)
 * ([more information]({% slug editing_directives_scheduler %}#toc-custom-service)).
 *
 * Implementations which utilize dedicated services, such as Google Calendar and Microsoft Exchange, will typically implement the
 * [`EditService`]({% slug api_scheduler_editservice %}) of the Scheduler directly.
 *
 * {% meta height:700 %}
 * {% embed_file editing/editing-directives/reactive-editing-service/app.component.ts preview %}
 * {% embed_file editing/editing-directives/reactive-editing-service/app.module.ts %}
 * {% embed_file editing/shared/edit.service.ts %}
 * {% embed_file editing/shared/my-event.interface.ts %}
 * {% embed_file shared/main.ts %}
 * {% endmeta %}
 */
export declare abstract class BaseEditService<TEvent> implements EditService<TEvent> {
    /**
     * The model field map that will be used during the reading and updating of data items.
     */
    readonly fields: SchedulerModelFields;
    /**
     * An observable stream with the current events.
     */
    readonly events: Observable<TEvent[]>;
    /**
     * An array of the currently loaded events which is populated by the derived class.
     */
    protected data: TEvent[];
    /**
     * The source subject for the `events` observable.
     */
    protected source: BehaviorSubject<TEvent[]>;
    private createdItems;
    private updatedItems;
    private deletedItems;
    private getId;
    private getRecurrenceId;
    private getRecurrenceRule;
    private getRecurrenceExceptions;
    private getStart;
    private setId;
    private setRecurrenceRule;
    private setRecurrenceExceptions;
    private setRecurrenceId;
    /**
     * Initializes the base edit service.
     *
     * @param fields - A field map that will be used for reading and modifying model objects. Defaults to the [`SchedulerEvent`]({% slug api_scheduler_schedulerevent %}) fields.
     */
    constructor(fields: SchedulerModelFields);
    /**
     * A method that persists all changes to a remote service.
     *
     * @param created - An array which contains all newly created events.
     * @param updated - An array which contains all updated events.
     * @param deleted - An array which contains all deleted events.
     */
    protected abstract save(created: TEvent[], updated: TEvent[], deleted: TEvent[]): void;
    create(event: TEvent): void;
    createException(event: TEvent, value: TEvent): void;
    update(event: TEvent, value: any): void;
    remove(event: TEvent): void;
    removeSeries(event: TEvent): void;
    removeOccurrence(event: TEvent): void;
    findRecurrenceMaster(event: TEvent): any;
    isRecurring(event: any): boolean;
    isException(event: any): boolean;
    /**
     * Returns a Boolean value which indicates if the event is new.
     * If the `ID` field is defined, the default implementation returns `true`.
     * Can be overridden to implement different conditions.
     *
     * @param event - The event that will be checked.
     */
    protected isNew(event: TEvent): boolean;
    /**
     * Returns the next `ID` that will be used for new events.
     * The default implementation returns `undefined`.
     */
    protected nextId(): any;
    /**
     * Copies values to the target model instance.
     * To copy the top-level fields, the base implementation uses
     * [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).
     * To copy nested fields, override `assignValues` and handle the model-specific cases.
     *
     * @param target - The target object that will receive the field values.
     * @param source - The source object from which the fields will be read.
     */
    protected assignValues(target: any, source: any): void;
    /**
     * Clones an existing model object.
     * To copy the top-level model fields, the base creates an empty object and calls [`assignValues`](#toc-assignvalues).
     * To create models of the correct type, override `cloneEvent`.
     *
     * @param event - The model instance to copy.
     * @returns TEvent - The new model instance.
     */
    protected cloneEvent(event: TEvent): TEvent;
    /**
     * A utility method which parses recurrence exception dates in an ISO format.
     *
     * @example
     * ```ts-no-run
     *   const exdates = '20180614T060000Z;20180615T060000Z';
     *   const result = super.parseExceptions(exdates);
     *
     *   // console.log(result);
     *   // Array [ Date 2018-06-14T03:00:00.000Z, Date 2018-06-15T03:00:00.000Z ]
     * ```
     *
     * @param value - A comma-separated list of ISO-formatted dates.
     * @returns Date[] - The recurrence exceptions as local dates.
     */
    protected parseExceptions(value: string): Date[];
    /**
     * A utility method which serializes recurrence exception dates in an ISO format.
     *
     * @example
     * ```ts-no-run
     *   const exdates = [ new Date(2018, 5, 14, 3, 0, 0), new Date(2018, 5, 15, 3, 0, 0) ];
     *   const result = super.serializeExceptions(exdates);
     *
     *   // console.log(result);
     *   // '20180614T060000Z;20180615T060000Z'
     * ```
     *
     * @param value - An array of `Date` instances.
     * @returns string - A comma-separated list of ISO-formatted dates.
     */
    protected serializeExceptions(exceptions: Date[]): string;
    private reset;
    private itemIndex;
    private buildException;
    private isRecurrenceHead;
    private logCreate;
    private logUpdate;
    private logRemove;
    private logRemoveOccurrence;
    private removeItemAndExceptions;
    private hasChanges;
    private saveChanges;
}
