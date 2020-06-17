import * as tslib_1 from "tslib";
import { groupBy, orderBy } from '@progress/kendo-data-query';
import { iterator } from '../../common/util';
var flip = function (fn) { return function (a) { return function (b) { return fn(b, a); }; }; };
var ɵ0 = flip;
var sort = flip(orderBy);
var group = flip(groupBy);
/**
 * @hidden
 */
export var compose = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (data) { return args.reduceRight(function (acc, curr) { return curr(acc); }, data); };
};
/**
 * @hidden
 */
export var processEvents = function (start, end) {
    return compose(group([{ field: "startDate" }]), sort([{ field: "start", dir: "asc" }, { field: "end", dir: "asc" }]));
};
function flattenGroups(groups) {
    var index, groupItem, itemIndex, item;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                index = 0;
                _a.label = 1;
            case 1:
                if (!(index < groups.length)) return [3 /*break*/, 7];
                groupItem = groups[index];
                return [4 /*yield*/, {
                        type: "group",
                        dataItem: groupItem,
                        rowSpan: groupItem.items.length
                    }];
            case 2:
                _a.sent();
                itemIndex = 1;
                _a.label = 3;
            case 3:
                if (!(itemIndex < groupItem.items.length)) return [3 /*break*/, 6];
                item = groupItem.items[itemIndex];
                return [4 /*yield*/, {
                        type: "event",
                        dataItem: item
                    }];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                itemIndex++;
                return [3 /*break*/, 3];
            case 6:
                index++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/];
        }
    });
}
/** @hidden */
var EmptyIterator = /** @class */ (function () {
    function EmptyIterator() {
    }
    EmptyIterator.prototype[iterator] = function () {
        return {
            next: function () { return ({ done: true, value: null }); }
        };
    };
    EmptyIterator.prototype.toString = function () {
        return "Empty Iterator";
    };
    return EmptyIterator;
}());
export { EmptyIterator };
/**
 * @hidden
 */
var TaskCollection = /** @class */ (function () {
    function TaskCollection(start, end, events) {
        this.start = start;
        this.end = end;
        this.events = events;
        this.createIterator = compose(flattenGroups, processEvents(this.start, this.end));
    }
    TaskCollection.empty = function () {
        return (new EmptyIterator());
    };
    TaskCollection.prototype[iterator] = function () {
        return this.createIterator(this.events);
    };
    TaskCollection.prototype.itemAt = function (index) {
        var taskIterator = this.createIterator(this.events);
        var idx = 0;
        var item;
        do {
            item = taskIterator.next();
            if (item && idx === index) {
                var value = item.value;
                return value.type === 'group' ? value.dataItem.items[0] : value.dataItem;
            }
            idx++;
        } while (item);
    };
    TaskCollection.prototype.toString = function () {
        return this.events.toString();
    };
    return TaskCollection;
}());
export { TaskCollection };
export { ɵ0 };
