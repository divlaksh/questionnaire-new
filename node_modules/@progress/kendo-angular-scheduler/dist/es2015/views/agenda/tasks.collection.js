import { groupBy, orderBy } from '@progress/kendo-data-query';
import { iterator } from '../../common/util';
const flip = fn => a => b => fn(b, a);
const ɵ0 = flip;
const sort = flip(orderBy);
const group = flip(groupBy);
/**
 * @hidden
 */
export const compose = (...args) => (data) => args.reduceRight((acc, curr) => curr(acc), data);
/**
 * @hidden
 */
export const processEvents = (start, end) => compose(group([{ field: "startDate" }]), sort([{ field: "start", dir: "asc" }, { field: "end", dir: "asc" }]));
function* flattenGroups(groups) {
    for (let index = 0; index < groups.length; index++) {
        const groupItem = groups[index];
        yield {
            type: "group",
            dataItem: groupItem,
            rowSpan: groupItem.items.length
        };
        for (let itemIndex = 1; itemIndex < groupItem.items.length; itemIndex++) {
            const item = groupItem.items[itemIndex];
            yield {
                type: "event",
                dataItem: item
            };
        }
    }
}
/** @hidden */
export class EmptyIterator {
    [iterator]() {
        return {
            next: () => ({ done: true, value: null })
        };
    }
    toString() {
        return "Empty Iterator";
    }
}
/**
 * @hidden
 */
export class TaskCollection {
    constructor(start, end, events) {
        this.start = start;
        this.end = end;
        this.events = events;
        this.createIterator = compose(flattenGroups, processEvents(this.start, this.end));
    }
    static empty() {
        return (new EmptyIterator());
    }
    [iterator]() {
        return this.createIterator(this.events);
    }
    itemAt(index) {
        const taskIterator = this.createIterator(this.events);
        let idx = 0;
        let item;
        do {
            item = taskIterator.next();
            if (item && idx === index) {
                const value = item.value;
                return value.type === 'group' ? value.dataItem.items[0] : value.dataItem;
            }
            idx++;
        } while (item);
    }
    toString() {
        return this.events.toString();
    }
}
export { ɵ0 };
