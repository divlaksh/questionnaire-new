import { TaskCollection, compose } from './tasks.collection';
import { MS_PER_DAY } from '@progress/kendo-date-math';
import { intersects, eventResources, toUTCDate, addUTCDays, getUTCDate } from '../utils';
import { getField } from '../../common/util';
/**
 * @hidden
 */
export function createResourceGroups(groupedResources) {
    let result = [];
    const firstResource = groupedResources[0];
    const firstResourceData = firstResource.data;
    for (let dataIdx = 0; dataIdx < firstResourceData.length; dataIdx++) {
        const item = firstResourceData[dataIdx];
        result.push({ resources: [getField(item, firstResource.textField)] });
    }
    for (let idx = 1; idx < groupedResources.length; idx++) {
        const resource = groupedResources[idx];
        const data = resource.data;
        const current = [];
        for (let resourceIdx = 0; resourceIdx < result.length; resourceIdx++) {
            const resourceItem = result[resourceIdx];
            for (let dataIdx = 0; dataIdx < data.length; dataIdx++) {
                const item = data[dataIdx];
                current.push({ resources: resourceItem.resources.concat(getField(item, resource.textField)) });
            }
        }
        result = current;
    }
    return result;
}
function createTask(item, resourceIdx, resources, color) {
    const event = item.event;
    return {
        event,
        start: item.start.toUTCDate(),
        end: item.end.toUTCDate(),
        title: event.title,
        isAllDay: event.isAllDay,
        color,
        resourceIdx,
        resources
    };
}
const durationInDays = ({ start, end, isAllDay = false }) => {
    const eventEnd = isAllDay ? getUTCDate(end) : end;
    const duration = Math.ceil((eventEnd - +getUTCDate(start)) / MS_PER_DAY);
    if (isAllDay) {
        return duration + 1;
    }
    return duration;
};
const ɵ0 = durationInDays;
const curry = fn => {
    const len = fn.length;
    return (...args) => len === args.length
        ? fn.apply(null, args)
        : curry(fn.bind(null, ...args));
};
const ɵ1 = curry;
const range = num => Array.from(new Array(num).keys());
const ɵ2 = range;
const cloneTask = (eventStart) => task => (Object.assign({}, task, { start: getUTCDate(eventStart), end: addUTCDays(eventStart, 1), startDate: getUTCDate(eventStart) }));
const ɵ3 = cloneTask;
const previousEventEnd = (start, events) => events.length
    ? events[events.length - 1].end
    : start;
const ɵ4 = previousEventEnd;
const markAsTailOrMid = isLast => task => {
    if (isLast) {
        task.tail = true;
    }
    else {
        task.mid = true;
    }
    return task;
};
const ɵ5 = markAsTailOrMid;
const addTaskPart = (task, start) => (tasks, _, day, days) => tasks.concat(compose(markAsTailOrMid(day === days.length - 1), cloneTask(previousEventEnd(start, tasks)))(task));
const ɵ6 = addTaskPart;
const splitMultiDayTask = (task, start) => range(durationInDays(task) - 1)
    .reduce(addTaskPart(task, start), []);
const ɵ7 = splitMultiDayTask;
/**
 * @hidden
 */
export const splitTasks = curry((periodStart, periodEnd, tasks) => {
    const result = [];
    for (let index = 0; index < tasks.length; index++) {
        let task = Object.assign({}, tasks[index]);
        task.startDate = getUTCDate(task.start);
        if (task.start >= periodStart && task.start <= periodEnd) {
            result.push(task);
        }
        if (durationInDays(task) > 1) {
            task.end = addUTCDays(task.startDate, 1);
            task.head = true;
            result.push(...splitMultiDayTask(Object.assign({}, tasks[index]), task.end)
                .filter(tsk => getUTCDate(tsk.end) <= periodEnd && tsk.start >= periodStart));
        }
    }
    return result;
});
function groupByResource(groupedResources, resourceGroups, dateRange) {
    const groups = resourceGroups.filter(group => group.tasks && group.tasks.length);
    if (!groups.length) {
        return [];
    }
    const values = groups[0].resources.map(resource => ({ value: resource, span: 0, groupIdx: 0 }));
    const periodStart = toUTCDate(dateRange.start);
    const periodEnd = toUTCDate(dateRange.end);
    for (let groupIdx = 0; groupIdx < groups.length; groupIdx++) {
        const group = groups[groupIdx];
        group.tasks = splitTasks(periodStart, periodEnd, group.tasks);
        const count = group.tasks.length;
        group.tasks = new TaskCollection(periodStart, periodEnd, group.tasks);
        let invalidate = false;
        for (let resourceIdx = 0; resourceIdx < groupedResources.length; resourceIdx++) {
            const resourceValue = values[resourceIdx];
            if (resourceValue.value !== group.resources[resourceIdx] || invalidate) {
                resourceValue.value = group.resources[resourceIdx];
                const spanGroup = groups[resourceValue.groupIdx];
                spanGroup.spans = spanGroup.spans || [];
                spanGroup.spans[resourceIdx] = resourceValue.span;
                resourceValue.span = count;
                resourceValue.groupIdx = groupIdx;
                invalidate = true;
            }
            else {
                resourceValue.span += count;
            }
        }
    }
    values.forEach((value, index) => {
        const group = groups[value.groupIdx];
        group.spans = group.spans || [];
        group.spans[index] = value.span;
    });
    return groups;
}
/**
 * @hidden
 */
export function groupEvents(items, { taskResources, resourceGroups, spans, allResources, dateRange }) {
    const groups = resourceGroups || [{}];
    const periodStart = toUTCDate(dateRange.start);
    const periodEnd = toUTCDate(dateRange.end);
    for (let idx = 0; idx < items.length; idx++) {
        const item = items[idx];
        const event = item.event;
        if (!intersects(item.start.toUTCDate(), item.end.toUTCDate(), periodStart, periodEnd)) {
            continue;
        }
        const resources = eventResources(event, { taskResources, hasGroups: resourceGroups && resourceGroups.length > 0, spans, allResources });
        if (resources.length && resources[0].leafIdx >= 0) {
            for (let resourceIdx = 0; resourceIdx < resources.length; resourceIdx++) {
                const current = resources[resourceIdx];
                const task = createTask(item, current.leafIdx, current.resources, current.color);
                const tasks = groups[current.leafIdx].tasks = groups[current.leafIdx].tasks || [];
                tasks.push(task);
            }
        }
    }
    if (resourceGroups) {
        return groupByResource(taskResources, groups, dateRange);
    }
    groups[0].tasks = new TaskCollection(periodStart, periodEnd, splitTasks(periodStart, periodEnd, groups[0].tasks || []));
    return groups;
}
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7 };
