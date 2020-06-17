import { intersects, toUTCDate, roundAllDayEnd } from '../utils';
/**
 * @hidden
 */
export var createTasks = function (periodStart, periodEnd, items) {
    var tasks = [];
    var utcStart = toUTCDate(periodStart);
    var utcEnd = toUTCDate(periodEnd);
    for (var index = 0; index < items.length; index++) {
        var item = items[index];
        var event_1 = item.event;
        var task = {
            index: index,
            start: item.start,
            end: item.end,
            event: event_1,
            isAllDay: false
        };
        var endTime = event_1.isAllDay ? roundAllDayEnd(item) : task.end;
        var startTime = event_1.isAllDay ? task.start.stripTime() : task.start;
        task.startTime = startTime.toUTCDate();
        task.endTime = endTime.toUTCDate();
        if (intersects(task.startTime, task.endTime, utcStart, utcEnd)) {
            tasks.push(task);
            task.head = task.endTime > periodEnd;
            task.tail = task.startTime < periodStart;
        }
    }
    return tasks;
};
