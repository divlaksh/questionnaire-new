"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PARENT_REGEX = /_?\d+$/;
var SEPARATOR = '_';
var id = 0;
var itemIndexComparer = function (a, b) { return a.siblingIndex - b.siblingIndex; };
var ɵ0 = itemIndexComparer;
exports.ɵ0 = ɵ0;
var next = function (idx, items, dir) {
    var current = items[idx + dir];
    while (!current) {
        if (idx < 0) {
            idx = items.length - 1;
        }
        else if (idx >= items.length) {
            idx = 0;
        }
        else {
            idx += dir;
        }
        current = items[idx];
    }
    return current;
};
var ɵ1 = next;
exports.ɵ1 = ɵ1;
/**
 * @hidden
 */
var ItemsService = /** @class */ (function () {
    function ItemsService() {
        this.items = {};
        this.lists = [];
        this.idPrefix = "k-menu" + id++;
    }
    Object.defineProperty(ItemsService.prototype, "hasItems", {
        get: function () {
            return Object.keys(this.items).length > 0;
        },
        enumerable: true,
        configurable: true
    });
    ItemsService.prototype.childId = function (index) {
        return this.idPrefix + "-child" + index;
    };
    ItemsService.prototype.itemIndex = function (parentIndex, index) {
        return (parentIndex ? parentIndex + SEPARATOR : '') + index;
    };
    ItemsService.prototype.get = function (index) {
        return this.items[index];
    };
    ItemsService.prototype.add = function (item) {
        this.items[item.index] = item;
    };
    ItemsService.prototype.remove = function (item) {
        delete this.items[item.index];
    };
    ItemsService.prototype.addList = function (list) {
        this.lists.push(list);
    };
    ItemsService.prototype.removeList = function (list) {
        var index = this.lists.indexOf(list);
        if (index >= 0) {
            this.lists.splice(index, 1);
        }
    };
    ItemsService.prototype.containsList = function (element) {
        return Boolean(this.lists.find(function (list) { return list.element.nativeElement === element; }));
    };
    ItemsService.prototype.siblings = function (item) {
        var _this = this;
        var parentIndex = this.parentIndex(item.index);
        return this.filter(function (index) { return _this.parentIndex(index) === parentIndex; });
    };
    ItemsService.prototype.otherSiblings = function (item) {
        var _this = this;
        var parentIndex = this.parentIndex(item.index);
        return this.filter(function (index) { return _this.parentIndex(index) === parentIndex && index !== item.index; });
    };
    ItemsService.prototype.children = function (item) {
        var _this = this;
        return this.filter(function (index) { return _this.parentIndex(index) === item.index; });
    };
    ItemsService.prototype.parent = function (item) {
        return this.items[this.parentIndex(item.index)];
    };
    ItemsService.prototype.root = function (item) {
        return this.items[this.indices(item.index)[0]];
    };
    ItemsService.prototype.indices = function (index) {
        return index.split(SEPARATOR);
    };
    ItemsService.prototype.filter = function (predicate) {
        var result = [];
        var items = this.items;
        for (var index in items) {
            if (predicate(index, items[index])) {
                result.push(items[index]);
            }
        }
        return result.sort(itemIndexComparer);
    };
    ItemsService.prototype.previous = function (item) {
        var siblings = this.siblings(item);
        var itemIndex = siblings.indexOf(item);
        return next(itemIndex, siblings, -1);
    };
    ItemsService.prototype.next = function (item) {
        var siblings = this.siblings(item);
        var itemIndex = siblings.indexOf(item);
        return next(itemIndex, siblings, 1);
    };
    ItemsService.prototype.hasParent = function (item, parent) {
        return item.index.startsWith(parent.index);
    };
    ItemsService.prototype.areSiblings = function (item1, item2) {
        return item1 !== item2 && this.parent(item1) === this.parent(item2);
    };
    ItemsService.prototype.forEach = function (callback) {
        var items = this.items;
        for (var index in items) {
            if (items.hasOwnProperty(index)) {
                callback(items[index]);
            }
        }
    };
    ItemsService.prototype.parentIndex = function (index) {
        return index.replace(PARENT_REGEX, '');
    };
    ItemsService.decorators = [
        { type: core_1.Injectable },
    ];
    return ItemsService;
}());
exports.ItemsService = ItemsService;
