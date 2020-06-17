const FIELD_REGEX = /\[(?:(\d+)|['"](.*?)['"])\]|((?:(?!\[.*?\]|\.).)+)/g;
const getterCache = {};
getterCache['undefined'] = () => undefined;
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export function getter(field) {
    if (getterCache[field]) {
        return getterCache[field];
    }
    const fields = [];
    field.replace(FIELD_REGEX, function (_match, index, indexAccessor, fieldName) {
        fields.push(index !== undefined ? index : (indexAccessor || fieldName));
    });
    getterCache[field] = function (obj) {
        let result = obj;
        for (let idx = 0; idx < fields.length && result; idx++) {
            result = result[fields[idx]];
        }
        return result;
    };
    return getterCache[field];
}
