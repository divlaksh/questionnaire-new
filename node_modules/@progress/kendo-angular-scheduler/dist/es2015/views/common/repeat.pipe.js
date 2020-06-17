import { Pipe } from '@angular/core';
import { iterator } from '../../common/util';
class NumberIterator {
    constructor(count) {
        this.count = count;
    }
    *[iterator]() {
        for (let i = 0; i < this.count; i++) {
            yield i;
        }
    }
}
/**
 * @hidden
 */
export class RepeatPipe {
    transform(value) {
        return new NumberIterator(value);
    }
}
RepeatPipe.decorators = [
    { type: Pipe, args: [{
                // tslint:disable-next-line:pipe-naming
                name: 'repeat'
            },] },
];
