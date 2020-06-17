import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { iterator } from '../../common/util';
var NumberIterator = /** @class */ (function () {
    function NumberIterator(count) {
        this.count = count;
    }
    NumberIterator.prototype[iterator] = function () {
        var i;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < this.count)) return [3 /*break*/, 4];
                    return [4 /*yield*/, i];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    return NumberIterator;
}());
/**
 * @hidden
 */
var RepeatPipe = /** @class */ (function () {
    function RepeatPipe() {
    }
    RepeatPipe.prototype.transform = function (value) {
        return new NumberIterator(value);
    };
    RepeatPipe.decorators = [
        { type: Pipe, args: [{
                    // tslint:disable-next-line:pipe-naming
                    name: 'repeat'
                },] },
    ];
    return RepeatPipe;
}());
export { RepeatPipe };
