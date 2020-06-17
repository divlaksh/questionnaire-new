import { Pipe } from '@angular/core';
import { iterator } from '../../common/util';
class ResourceIterator {
    constructor(resources, lastIndex = resources.length - 1) {
        this.resources = resources;
        this.lastIndex = lastIndex;
    }
    *[iterator]() {
        let resources = this.resources;
        const lastIndex = Math.max(0, this.lastIndex);
        if (!(resources && resources.length)) {
            resources = [{}];
        }
        const lastData = resources[lastIndex].data || [];
        const length = lastData.length;
        let count = 1;
        for (let idx = 0; idx <= lastIndex; idx++) {
            count *= (resources[idx].data || []).length || 1;
        }
        for (let idx = 0; idx < count; idx++) {
            yield lastData[idx % length];
        }
    }
}
/**
 * @hidden
 */
export class ResourceIteratorPipe {
    transform(resources = [], lastIndex) {
        return new ResourceIterator(resources, lastIndex);
    }
}
ResourceIteratorPipe.decorators = [
    { type: Pipe, args: [{
                // tslint:disable-next-line:pipe-naming
                name: 'resourceIterator'
            },] },
];
