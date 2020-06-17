import { isPresent, isRecurring, isException, readEvent, getField, setField, assignValues, clone } from '../common/util';
import { isDevMode } from '@angular/core';
import { guid } from '@progress/kendo-angular-common';
const isRecurrenceMaster = (ev) => !!(ev.id && ev.recurrenceRule);
const ɵ0 = isRecurrenceMaster;
/**
 * @hidden
 */
export class LocalEditService {
    constructor(scheduler, localDataChangesService) {
        this.scheduler = scheduler;
        this.localDataChangesService = localDataChangesService;
    }
    get fields() {
        return this.scheduler.modelFields;
    }
    get hasLocalData() {
        return isPresent(this.localDataChangesService.data);
    }
    get data() {
        if (this.hasLocalData) {
            return this.localDataChangesService.data;
        }
        return this.scheduler.events;
    }
    create(item) {
        const idField = this.fields.id;
        const id = getField(item, idField);
        if (!isPresent(id)) {
            setField(item, idField, this.nextId());
        }
        this.data.push(item);
        this.dataChanged();
    }
    createException(item, value) {
        const exception = this.buildException(value);
        this.removeOccurrenceInternal(item);
        this.create(exception);
    }
    update(item, value) {
        assignValues(item, value);
        this.dataChanged();
    }
    remove(item) {
        const idField = this.fields.id;
        const itemId = getField(item, idField);
        const data = this.data;
        for (let idx = 0; idx < data.length; idx++) {
            if (itemId === getField(data[idx], idField)) {
                data.splice(idx, 1);
                break;
            }
        }
        this.dataChanged();
    }
    removeSeries(item) {
        const event = readEvent(item, this.fields);
        const isHead = isRecurrenceMaster(event);
        this.removeItemAndExceptions(isHead ? event.id : event.recurrenceId);
        this.dataChanged();
    }
    removeOccurrence(item) {
        this.removeOccurrenceInternal(item);
        this.dataChanged();
    }
    findRecurrenceMaster(item) {
        const fields = this.scheduler.modelFields;
        const event = readEvent(item, fields);
        const headId = isRecurrenceMaster(event) ? event.id : event.recurrenceId;
        return this.data.find((dataItem) => getField(dataItem, fields.id) === headId);
    }
    isRecurring(event) {
        return isRecurring(event, this.scheduler.modelFields);
    }
    isException(event) {
        return isException(event, this.scheduler.modelFields);
    }
    nextId() {
        return guid();
    }
    buildException(item) {
        const fields = this.fields;
        const head = this.findRecurrenceMaster(item);
        if (!head) {
            if (isDevMode()) {
                throw new Error('Unable to find recurrence head for event. Please check that recurrenceId is set and refers to an existing event.');
            }
            return;
        }
        const exception = clone(item);
        setField(exception, fields.id, this.nextId());
        setField(exception, fields.recurrenceId, getField(head, fields.id));
        setField(exception, fields.recurrenceRule, null);
        return exception;
    }
    removeItemAndExceptions(itemId) {
        const data = this.data;
        const fields = this.scheduler.modelFields;
        for (let idx = data.length - 1; idx >= 0; idx--) {
            if (itemId === getField(data[idx], fields.recurrenceId) || itemId === getField(data[idx], fields.id)) {
                data.splice(idx, 1);
            }
        }
    }
    removeOccurrenceInternal(item) {
        const fields = this.fields;
        const head = this.findRecurrenceMaster(item);
        const exceptionDate = getField(item, fields.start);
        const currentExceptions = getField(head, fields.recurrenceExceptions) || [];
        setField(head, fields.recurrenceExceptions, [...currentExceptions, exceptionDate]);
    }
    dataChanged() {
        if (this.hasLocalData) {
            this.localDataChangesService.changes.emit();
        }
    }
}
export { ɵ0 };
