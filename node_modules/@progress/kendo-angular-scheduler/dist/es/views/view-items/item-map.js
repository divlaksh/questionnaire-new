/**
 * @hidden
 */
var ItemMap = /** @class */ (function () {
    function ItemMap() {
        this.count = 0;
        this.items = {};
    }
    Object.defineProperty(ItemMap.prototype, "first", {
        get: function () {
            if (this.count > 0) {
                return this.items[Object.keys(this.items)[0]];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemMap.prototype, "last", {
        get: function () {
            if (this.count > 0) {
                var keys = Object.keys(this.items);
                return this.items[keys[keys.length - 1]];
            }
        },
        enumerable: true,
        configurable: true
    });
    ItemMap.prototype.addItem = function (index, item) {
        if (!this.items[index]) {
            this.count++;
        }
        this.items[index] = item;
    };
    ItemMap.prototype.removeItem = function (index, item) {
        var current = this.items[index];
        if (current === item) {
            delete this.items[index];
            this.count--;
        }
    };
    ItemMap.prototype.toArray = function () {
        var _this = this;
        return Object.keys(this.items).map(function (index) { return _this.items[index]; });
    };
    return ItemMap;
}());
export { ItemMap };
