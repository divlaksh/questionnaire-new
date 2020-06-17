import * as tslib_1 from "tslib";
import { TaskCollection, compose } from './tasks.collection';
import { MS_PER_DAY } from '@progress/kendo-date-math';
import { intersects, eventResources, toUTCDate, addUTCDays, getUTCDate } from '../utils';
import { getField } from '../../common/util';
/**
 * @hidden
 */
export function createResourceGroups(groupedResources) {
    var result = [];
    var firstResource = groupedResources[0];
    var firstResourceData = firstResource.data;
    for (var dataIdx = 0; dataIdx < firstResourceData.length; dataIdx++) {
        var item = firstResourceData[dataIdx];
        result.push({ resources: [getField(item, firstResource.textField)] });
    }
    for (var idx = 1; idx < groupedResources.length; idx++) {
        var resource = groupedResources[idx];
        var data = resource.data;
        var current = [];
        for (var resourceIdx = 0; resourceIdx < result.length; resourceIdx++) {
            var resourceItem = result[resourceIdx];
            for (var dataIdx = 0; dataIdx < data.length; dataIdx++) {
                var item = data[dataIdx];
                current.push({ resources: resourceItem.resources.concat(getField(item, resource.textField)) });
            }
        }
        result = current;
    }
    return result;
}
function createTask(item, resourceIdx, resources, color) {
    var event = item.event;
    return {
        event: event,
        start: item.start.toUTCDate(),
        end: item.end.toUTCDate(),
        title: event.title,
        isAllDay: event.isAllDay,
        color: color,
        resourceIdx: resourceIdx,
        resources: resources
    };
}
var durationInDays = function (_a) {
    var start = _a.start, end = _a.end, _b = _a.isAllDay, isAllDay = _b === void 0 ? false : _b;
    var eventEnd = isAllDay ? getUTCDate(end) : end;
    var duration = Math.ceil((eventEnd - +getUTCDate(start)) / MS_PER_DAY);
    if (isAllDay) {
        return duration + 1;
    }
    return duration;
};
var ɵ0 = durationInDays;
var curry = function (fn) {
    var len = fn.length;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return len === args.length
            ? fn.apply(null, args)
            : curry(fn.bind.apply(fn, [null].concat(args)));
    };
};
var ɵ1 = curry;
var range = function (num) { return Array.from(new Array(num).keys()); };
var ɵ2 = range;
var cloneTask = function (eventStart) { return function (task) { return (tslib_1.__assign({}, task, { start: getUTCDate(eventStart), end: addUTCDays(eventStart, 1), startDate: getUTCDate(eventStart) })); }; };
var ɵ3 = cloneTask;
var previousEventEnd = function (start, events) {
    return events.length
        ? events[events.length - 1].end
        : start;
};
var ɵ4 = previousEventEnd;
var markAsTailOrMid = function (isLast) { return function (task) {
    if (isLast) {
        task.tail = true;
    }
    else {
        task.mid = true;
    }
    return task;
}; };
var ɵ5 = markAsTailOrMid;
var addTaskPart = function (task, start) {
    return function (tasks, _, day, days) {
        return tasks.concat(compose(markAsTailOrMid(day === days.length - 1), cloneTask(previousEventEnd(start, tasks)))(task));
    };
};
var ɵ6 = addTaskPart;
var splitMultiDayTask = function (task, start) {
    return range(durationInDays(task) - 1)
        .reduce(addTaskPart(task, start), []);
};
var ɵ7 = splitMultiDayTask;
/**
 * @hidden
 */
export var splitTasks = curry(function (periodStart, periodEnd, tasks) {
    var result = [];
    for (var index = 0; index < tasks.length; index++) {
        var task = tslib_1.__assign({}, tasks[index]);
        task.startDate = getUTCDate(task.start);
        if (task.start >= periodStart && task.start <= periodEnd) {
            result.push(task);
        }
        if (durationInDays(task) > 1) {
            task.end = addUTCDays(task.startDate, 1);
            task.head = true;
            result.push.apply(result, splitMultiDayTask(tslib_1.__assign({}, tasks[index]), task.end)
                .filter(function (tsk) { return getUTCDate(tsk.end) <= periodEnd && tsk.start >= periodStart; }));
        }
    }
    return result;
});
function groupByResource(groupedResources, resourceGroups, dateRange) {
    var groups = resourceGroups.filter(function (group) { return group.tasks && group.tasks.length; });
    if (!groups.length) {
        return [];
    }
    var values = groups[0].resources.map(function (resource) { return ({ value: resource, span: 0, groupIdx: 0 }); });
    var periodStart = toUTCDate(dateRange.start);
    var periodEnd = toUTCDate(dateRange.end);
    for (var groupIdx = 0; groupIdx < groups.length; groupIdx++) {
        var group = groups[groupIdx];
        group.tasks = splitTasks(periodStart, periodEnd, group.tasks);
        var count = group.tasks.length;
        group.tasks = new TaskCollection(periodStart, periodEnd, group.tasks);
        var invalidate = false;
        for (var resourceIdx = 0; resourceIdx < groupedResources.length; resourceIdx++) {
            var resourceValue = values[resourceIdx];
            if (resourceValue.value !== group.resources[resourceIdx] || invalidate) {
                resourceValue.value = group.resources[resourceIdx];
                var spanGroup = groups[resourceValue.groupIdx];
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
    values.forEach(function (value, index) {
        var group = groups[value.groupIdx];
        group.spans = group.spans || [];
        group.spans[index] = value.span;
    });
    return groups;
}
/**
 * @hidden
 */
export function groupEvents(items, _a) {
    var taskResources = _a.taskResources, resourceGroups = _a.resourceGroups, spans = _a.spans, allResources = _a.allResources, dateRange = _a.dateRange;
    var groups = resourceGroups || [{}];
    var periodStart = toUTCDate(dateRange.start);
    var periodEnd = toUTCDate(dateRange.end);
    for (var idx = 0; idx < items.length; idx++) {
        var item = items[idx];
        var event_1 = item.event;
        if (!intersects(item.start.toUTCDate(), item.end.toUTCDate(), periodStart, periodEnd)) {
            continue;
        }
        var resources = eventResources(event_1, { taskResources: taskResources, hasGroups: resourceGroups && resourceGroups.length > 0, spans: spans, allResources: allResources });
        if (resources.length && resources[0].leafIdx >= 0) {
            for (var resourceIdx = 0; resourceIdx < resources.length; resourceIdx++) {
                var current = resources[resourceIdx];
                var task = createTask(item, current.leafIdx, current.resources, current.color);
                var tasks = groups[current.leafIdx].tasks = groups[current.leafIdx].tasks || [];
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
