import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { iterator } from '../../common/util';
var ResourceIterator = /** @class */ (function () {
    function ResourceIterator(resources, lastIndex) {
        if (lastIndex === void 0) { lastIndex = resources.length - 1; }
        this.resources = resources;
        this.lastIndex = lastIndex;
    }
    ResourceIterator.prototype[iterator] = function () {
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
        { type: Pipe, args: [{
                    // tslint:disable-next-line:pipe-naming
                    name: 'resourceIterator'
                },] },
    ];
    return ResourceIteratorPipe;
}());
export { ResourceIteratorPipe };
