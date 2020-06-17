var FIELD_REGEX = /\[(?:(\d+)|['"](.*?)['"])\]|((?:(?!\[.*?\]|\.).)+)/g;
var getterCache = {};
// tslint:disable-next-line:no-string-literal
getterCache['undefined'] = function (obj) { return obj; };
/**
 * @hidden
 */
export var getter = function (field) {
    if (getterCache[field]) {
        return getterCache[field];
    }
    var fields = [];
    field.replace(FIELD_REGEX, function (_match, index, indexAccessor, name) {
        fields.push(index !== undefined ? index : (indexAccessor || name));
    });
    getterCache[field] = function (obj) {
        var result = obj;
        for (var idx = 0; idx < fields.length && result; idx++) {
            result = result[fields[idx]];
        }
        return result;
    };
    return getterCache[field];
};
/**
 * @hidden
 */
export var last = function (arr) { return arr[arr.length - 1]; };
