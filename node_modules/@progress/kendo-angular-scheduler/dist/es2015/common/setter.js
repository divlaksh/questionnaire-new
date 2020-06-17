const FIELD_REGEX = /\[(?:(\d+)|['"](.*?)['"])\]|((?:(?!\[.*?\]|\.).)+)/g;
const setterCache = {};
setterCache['undefined'] = obj => obj;
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export function setter(field) {
    if (setterCache[field]) {
        return setterCache[field];
    }
    const fields = [];
    field.replace(FIELD_REGEX, function (_match, index, indexAccessor, fieldName) {
        fields.push(index !== undefined ? index : (indexAccessor || fieldName));
    });
    setterCache[field] = function (obj, value) {
        let root = obj;
        const depth = fields.length - 1;
        for (let idx = 0; idx < depth && root; idx++) {
            root = root[fields[idx]] = root[fields[idx]] || {};
        }
        root[fields[depth]] = value;
    };
    return setterCache[field];
}
