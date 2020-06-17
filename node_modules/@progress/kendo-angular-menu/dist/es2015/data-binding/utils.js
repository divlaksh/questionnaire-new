const FIELD_REGEX = /\[(?:(\d+)|['"](.*?)['"])\]|((?:(?!\[.*?\]|\.).)+)/g;
const getterCache = {};
// tslint:disable-next-line:no-string-literal
getterCache['undefined'] = (obj) => obj;
/**
 * @hidden
 */
export const getter = (field) => {
    if (getterCache[field]) {
        return getterCache[field];
    }
    const fields = [];
    field.replace(FIELD_REGEX, (_match, index, indexAccessor, name) => {
        fields.push(index !== undefined ? index : (indexAccessor || name));
    });
    getterCache[field] = (obj) => {
        let result = obj;
        for (let idx = 0; idx < fields.length && result; idx++) {
            result = result[fields[idx]];
        }
        return result;
    };
    return getterCache[field];
};
/**
 * @hidden
 */
export const last = (arr) => arr[arr.length - 1];
