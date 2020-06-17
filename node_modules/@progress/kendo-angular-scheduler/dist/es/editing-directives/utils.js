import { getField } from '../common/util';
/**
 * @hidden
 */
export var markAllAsTouched = function (control) {
    control.markAsTouched();
    if (control.hasOwnProperty('controls')) {
        var controls = control.controls;
        for (var inner in controls) {
            if (controls.hasOwnProperty(inner)) {
                markAllAsTouched(controls[inner]);
            }
        }
    }
};
/**
 * @hidden
 */
export function diff(obj1, obj2, fields) {
    for (var idx = 0; idx < fields.length; idx++) {
        var field = fields[idx];
        if (!areEqual(getField(obj1, field), getField(obj2, field))) {
            return true;
        }
    }
    return false;
}
/**
 * @hidden
 */
export function areEqual(value1, value2) {
    if (value1 && value1.getTime && value2 && value2.getTime) {
        return value1.getTime() === value2.getTime();
    }
    else if (Array.isArray(value1)) {
        if (!Array.isArray(value2) || value1.length !== value2.length) {
            return false;
        }
        for (var idx = 0; idx < value1.length; idx++) {
            if (value1[idx] !== value2[idx]) {
                return false;
            }
        }
        return true;
    }
    // tslint:disable-next-line:triple-equals
    return value1 == value2;
}
var DATE_ACCESSORS = ['getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'getSeconds', 'getMilliseconds'];
/**
 * @hidden
 */
export function seriesDate(head, occurrence, current, field) {
    var _a;
    var values = [];
    var headDate = getField(head, field);
    var occurrenceDate = getField(occurrence, field);
    var currentDate = getField(current, field);
    DATE_ACCESSORS.forEach(function (accessor) {
        values.push(occurrenceDate[accessor]() === currentDate[accessor]() ? headDate[accessor]() : currentDate[accessor]());
    });
    return new ((_a = Date).bind.apply(_a, [void 0].concat(values)))();
}
