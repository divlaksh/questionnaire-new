import { getField } from '../common/util';
/**
 * @hidden
 */
export const markAllAsTouched = (control) => {
    control.markAsTouched();
    if (control.hasOwnProperty('controls')) {
        let controls = control.controls;
        for (let inner in controls) {
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
    for (let idx = 0; idx < fields.length; idx++) {
        const field = fields[idx];
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
        for (let idx = 0; idx < value1.length; idx++) {
            if (value1[idx] !== value2[idx]) {
                return false;
            }
        }
        return true;
    }
    // tslint:disable-next-line:triple-equals
    return value1 == value2;
}
const DATE_ACCESSORS = ['getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'getSeconds', 'getMilliseconds'];
/**
 * @hidden
 */
export function seriesDate(head, occurrence, current, field) {
    const values = [];
    const headDate = getField(head, field);
    const occurrenceDate = getField(occurrence, field);
    const currentDate = getField(current, field);
    DATE_ACCESSORS.forEach(accessor => {
        values.push(occurrenceDate[accessor]() === currentDate[accessor]() ? headDate[accessor]() : currentDate[accessor]());
    });
    return new Date(...values);
}
