import * as tslib_1 from "tslib";
import { parseDate, formatDate } from '@progress/kendo-angular-intl';
import { toLocalDate } from '@progress/kendo-date-math';
import { BehaviorSubject } from 'rxjs';
import { setter } from '../common/setter';
import { getter } from '../common/getter';
import { defaultModelFields } from '../common/default-model-fields';
import { isRecurring, isException, isPresent, cloneTo, assignField } from '../common/util';
var DATE_FORMATS = [
    "yyyyMMddTHHmmssSSSXXX",
    "yyyyMMddTHHmmssXXX",
    "yyyyMMddTHHmmss",
    "yyyyMMddTHHmm",
    "yyyyMMddTHH",
    "yyyyMMdd"
];
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
var BaseEditService = /** @class */ (function () {
    /**
     * Initializes the base edit service.
     *
     * @param fields - A field map that will be used for reading and modifying model objects. Defaults to the [`SchedulerEvent`]({% slug api_scheduler_schedulerevent %}) fields.
     */
    function BaseEditService(fields) {
        /**
         * An array of the currently loaded events which is populated by the derived class.
         */
        this.data = [];
        /**
         * The source subject for the `events` observable.
         */
        this.source = new BehaviorSubject([]);
        this.createdItems = [];
        this.updatedItems = [];
        this.deletedItems = [];
        this.events = this.source.asObservable();
        this.fields = tslib_1.__assign({}, defaultModelFields, fields);
        this.getId = getter(this.fields.id);
        this.getRecurrenceId = getter(this.fields.recurrenceId);
        this.getRecurrenceRule = getter(this.fields.recurrenceRule);
        this.getRecurrenceExceptions = getter(this.fields.recurrenceExceptions);
        this.getStart = getter(this.fields.start);
        this.setId = setter(this.fields.id);
        this.setRecurrenceRule = setter(this.fields.recurrenceRule);
        this.setRecurrenceExceptions = setter(this.fields.recurrenceExceptions);
        this.setRecurrenceId = setter(this.fields.recurrenceId);
    }
    BaseEditService.prototype.create = function (event) {
        this.logCreate(event);
        this.saveChanges();
    };
    /*
     * Creates an exception to a recurring series.
     *
     * The `createException` method performs the following operations:
     * * Adds the start date of the event to the `recurrenceExceptions` of the master event (recurrence head).
     * * Creates a new event that stores the recurrence exception itself.
     */
    BaseEditService.prototype.createException = function (event, value) {
        var exception = this.buildException(value);
        this.logRemoveOccurrence(event);
        this.logCreate(exception);
        this.saveChanges();
    };
    BaseEditService.prototype.update = function (event, value) {
        this.assignValues(event, value);
        this.logUpdate(event);
        this.saveChanges();
    };
    BaseEditService.prototype.remove = function (event) {
        this.logRemove(event);
        this.saveChanges();
    };
    BaseEditService.prototype.removeSeries = function (event) {
        var id = this.getId(event);
        var recurrenceId = this.getRecurrenceId(event);
        var isHead = this.isRecurrenceHead(event);
        this.removeItemAndExceptions(isHead ? id : recurrenceId);
        this.saveChanges();
    };
    BaseEditService.prototype.removeOccurrence = function (event) {
        this.logRemoveOccurrence(event);
        this.saveChanges();
    };
    BaseEditService.prototype.findRecurrenceMaster = function (event) {
        var id = this.getId(event);
        var recurrenceId = this.getRecurrenceId(event);
        var headId = this.isRecurrenceHead(event) ? id : recurrenceId;
        var index = this.itemIndex(headId, this.data);
        return this.data[index];
    };
    BaseEditService.prototype.isRecurring = function (event) {
        return isRecurring(event, this.fields);
    };
    BaseEditService.prototype.isException = function (event) {
        return isException(event, this.fields);
    };
    /**
     * Returns a Boolean value which indicates if the event is new.
     * If the `ID` field is defined, the default implementation returns `true`.
     * Can be overridden to implement different conditions.
     *
     * @param event - The event that will be checked.
     */
    BaseEditService.prototype.isNew = function (event) {
        var id = this.getId(event);
        return !isPresent(id);
    };
    /**
     * Returns the next `ID` that will be used for new events.
     * The default implementation returns `undefined`.
     */
    BaseEditService.prototype.nextId = function () {
        return undefined;
    };
    /**
     * Copies values to the target model instance.
     * To copy the top-level fields, the base implementation uses
     * [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).
     * To copy nested fields, override `assignValues` and handle the model-specific cases.
     *
     * @param target - The target object that will receive the field values.
     * @param source - The source object from which the fields will be read.
     */
    BaseEditService.prototype.assignValues = function (target, source) {
        cloneTo(source, target);
    };
    /**
     * Clones an existing model object.
     * To copy the top-level model fields, the base creates an empty object and calls [`assignValues`](#toc-assignvalues).
     * To create models of the correct type, override `cloneEvent`.
     *
     * @param event - The model instance to copy.
     * @returns TEvent - The new model instance.
     */
    BaseEditService.prototype.cloneEvent = function (event) {
        var result = {};
        this.assignValues(result, event);
        return result;
    };
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
    BaseEditService.prototype.parseExceptions = function (value) {
        if (!isPresent(value) || value === '') {
            return [];
        }
        return value
            .split(';')
            .map(function (ex) { return parseDate(ex, DATE_FORMATS) || undefined; });
    };
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
    BaseEditService.prototype.serializeExceptions = function (exceptions) {
        if (!exceptions || exceptions.length === 0) {
            return '';
        }
        return exceptions.map(function (date) {
            return formatDate(toLocalDate(date), 'yyyyMMddTHHmmss') + 'Z';
        }).join(';');
    };
    BaseEditService.prototype.reset = function () {
        this.data = [];
        this.deletedItems = [];
        this.updatedItems = [];
        this.createdItems = [];
    };
    BaseEditService.prototype.itemIndex = function (id, items) {
        for (var idx = 0; idx < items.length; idx++) {
            if (this.getId(items[idx]) === id) {
                return idx;
            }
        }
        return -1;
    };
    BaseEditService.prototype.buildException = function (item) {
        var fields = this.fields;
        var head = this.findRecurrenceMaster(item);
        var copy = this.cloneEvent(item);
        assignField(copy, head, fields.id);
        this.setId(copy, this.nextId());
        this.setRecurrenceRule(copy, undefined);
        this.setRecurrenceId(copy, this.getId(head));
        return copy;
    };
    BaseEditService.prototype.isRecurrenceHead = function (item) {
        var id = this.getId(item);
        var recurrenceRule = this.getRecurrenceRule(item);
        return !!(id && recurrenceRule);
    };
    BaseEditService.prototype.logCreate = function (item) {
        this.data = this.data.concat([item]);
        this.source.next(this.data);
        this.createdItems.push(item);
    };
    BaseEditService.prototype.logUpdate = function (item) {
        var id = this.getId(item);
        if (!this.isNew(item)) {
            var index = this.itemIndex(id, this.updatedItems);
            if (index !== -1) {
                this.updatedItems.splice(index, 1, item);
            }
            else {
                this.updatedItems.push(item);
            }
        }
        else {
            var index = this.createdItems.indexOf(item);
            this.createdItems.splice(index, 1, item);
        }
    };
    BaseEditService.prototype.logRemove = function (item) {
        var id = this.getId(item);
        var index = this.itemIndex(id, this.data);
        this.data = this.data.filter(function (_, i) { return i !== index; });
        this.source.next(this.data);
        index = this.itemIndex(id, this.createdItems);
        if (index >= 0) {
            this.createdItems.splice(index, 1);
        }
        else {
            this.deletedItems.push(item);
        }
        index = this.itemIndex(id, this.updatedItems);
        if (index >= 0) {
            this.updatedItems.splice(index, 1);
        }
    };
    BaseEditService.prototype.logRemoveOccurrence = function (event) {
        var head = this.findRecurrenceMaster(event);
        var exceptionDate = this.getStart(event);
        var currentExceptions = this.getRecurrenceExceptions(head) || [];
        this.setRecurrenceExceptions(head, currentExceptions.concat([exceptionDate]));
        this.logUpdate(head);
    };
    BaseEditService.prototype.removeItemAndExceptions = function (itemId) {
        var _this = this;
        this.deletedItems = this.deletedItems.concat(this.data.filter(function (ev) {
            return _this.getRecurrenceId(ev) === itemId || _this.getId(ev) === itemId;
        }));
    };
    BaseEditService.prototype.hasChanges = function () {
        return this.deletedItems.length + this.updatedItems.length + this.createdItems.length > 0;
    };
    BaseEditService.prototype.saveChanges = function () {
        if (!this.hasChanges()) {
            return;
        }
        this.save(this.createdItems, this.updatedItems, this.deletedItems);
        this.reset();
    };
    return BaseEditService;
}());
export { BaseEditService };
