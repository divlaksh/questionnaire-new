"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var util_1 = require("../../common/util");
var ResourceIterator = /** @class */ (function () {
    function ResourceIterator(resources, lastIndex) {
        if (lastIndex === void 0) { lastIndex = resources.length - 1; }
        this.resources = resources;
        this.lastIndex = lastIndex;
    }
    ResourceIterator.prototype[util_1.iterator] = function () {
        var resources, lastIndex, lastData, length, count, idx, idx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resources = this.resources;
                    lastIndex = Math.max(0, this.lastIndex);
                    if (!(resources && resources.length)) {
                        resources = [{}];
                    }
                    lastData = resources[lastIndex].data || [];
                    length = lastData.length;
                    count = 1;
                    for (idx = 0; idx <= lastIndex; idx++) {
                        count *= (resources[idx].data || []).length || 1;
                    }
                    idx = 0;
                    _a.label = 1;
                case 1:
                    if (!(idx < count)) return [3 /*break*/, 4];
                    return [4 /*yield*/, lastData[idx % length]];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    idx++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    return ResourceIterator;
}());
/**
 * @hidden
 */
var ResourceIteratorPipe = /** @class */ (function () {
    function ResourceIteratorPipe() {
    }
    ResourceIteratorPipe.prototype.transform = function (resources, lastIndex) {
        if (resources === void 0) { resources = []; }
        return new ResourceIterator(resources, lastIndex);
    };
    ResourceIteratorPipe.decorators = [
        { type: core_1.Pipe, args: [{
                    // tslint:disable-next-line:pipe-naming
                    name: 'resourceIterator'
                },] },
    ];
    return ResourceIteratorPipe;
}());
exports.ResourceIteratorPipe = ResourceIteratorPipe;
