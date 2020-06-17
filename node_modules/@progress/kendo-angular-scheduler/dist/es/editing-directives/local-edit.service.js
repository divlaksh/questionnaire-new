import { isPresent, isRecurring, isException, readEvent, getField, setField, assignValues, clone } from '../common/util';
import { isDevMode } from '@angular/core';
import { guid } from '@progress/kendo-angular-common';
var isRecurrenceMaster = function (ev) { return !!(ev.id && ev.recurrenceRule); };
var ɵ0 = isRecurrenceMaster;
/**
 * @hidden
 */
var LocalEditService = /** @class */ (function () {
    function LocalEditService(scheduler, localDataChangesService) {
        this.scheduler = scheduler;
        this.localDataChangesService = localDataChangesService;
    }
    Object.defineProperty(LocalEditService.prototype, "fields", {
        get: function () {
            return this.scheduler.modelFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocalEditService.prototype, "hasLocalData", {
        get: function () {
            return isPresent(this.localDataChangesService.data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocalEditService.prototype, "data", {
        get: function () {
            if (this.hasLocalData) {
                return this.localDataChangesService.data;
            }
            return this.scheduler.events;
        },
        enumerable: true,
        configurable: true
    });
    LocalEditService.prototype.create = function (item) {
        var idField = this.fields.id;
        var id = getField(item, idField);
        if (!isPresent(id)) {
            setField(item, idField, this.nextId());
        }
        this.data.push(item);
        this.dataChanged();
    };
    LocalEditService.prototype.createException = function (item, value) {
        var exception = this.buildException(value);
        this.removeOccurrenceInternal(item);
        this.create(exception);
    };
    LocalEditService.prototype.update = function (item, value) {
        assignValues(item, value);
        this.dataChanged();
    };
    LocalEditService.prototype.remove = function (item) {
        var idField = this.fields.id;
        var itemId = getField(item, idField);
        var data = this.data;
        for (var idx = 0; idx < data.length; idx++) {
            if (itemId === getField(data[idx], idField)) {
                data.splice(idx, 1);
                break;
            }
        }
        this.dataChanged();
    };
    LocalEditService.prototype.removeSeries = function (item) {
        var event = readEvent(item, this.fields);
        var isHead = isRecurrenceMaster(event);
        this.removeItemAndExceptions(isHead ? event.id : event.recurrenceId);
        this.dataChanged();
    };
    LocalEditService.prototype.removeOccurrence = function (item) {
        this.removeOccurrenceInternal(item);
        this.dataChanged();
    };
    LocalEditService.prototype.findRecurrenceMaster = function (item) {
        var fields = this.scheduler.modelFields;
        var event = readEvent(item, fields);
        var headId = isRecurrenceMaster(event) ? event.id : event.recurrenceId;
        return this.data.find(function (dataItem) { return getField(dataItem, fields.id) === headId; });
    };
    LocalEditService.prototype.isRecurring = function (event) {
        return isRecurring(event, this.scheduler.modelFields);
    };
    LocalEditService.prototype.isException = function (event) {
        return isException(event, this.scheduler.modelFields);
    };
    LocalEditService.prototype.nextId = function () {
        return guid();
    };
    LocalEditService.prototype.buildException = function (item) {
        var fields = this.fields;
        var head = this.findRecurrenceMaster(item);
        if (!head) {
            if (isDevMode()) {
                throw new Error('Unable to find recurrence head for event. Please check that recurrenceId is set and refers to an existing event.');
            }
            return;
        }
        var exception = clone(item);
        setField(exception, fields.id, this.nextId());
        setField(exception, fields.recurrenceId, getField(head, fields.id));
        setField(exception, fields.recurrenceRule, null);
        return exception;
    };
    LocalEditService.prototype.removeItemAndExceptions = function (itemId) {
        var data = this.data;
        var fields = this.scheduler.modelFields;
        for (var idx = data.length - 1; idx >= 0; idx--) {
            if (itemId === getField(data[idx], fields.recurrenceId) || itemId === getField(data[idx], fields.id)) {
                data.splice(idx, 1);
            }
        }
    };
    LocalEditService.prototype.removeOccurrenceInternal = function (item) {
        var fields = this.fields;
        var head = this.findRecurrenceMaster(item);
        var exceptionDate = getField(item, fields.start);
        var currentExceptions = getField(head, fields.recurrenceExceptions) || [];
        setField(head, fields.recurrenceExceptions, currentExceptions.concat([exceptionDate]));
    };
    LocalEditService.prototype.dataChanged = function () {
        if (this.hasLocalData) {
            this.localDataChangesService.changes.emit();
        }
    };
    return LocalEditService;
}());
export { LocalEditService };
export { ɵ0 };
