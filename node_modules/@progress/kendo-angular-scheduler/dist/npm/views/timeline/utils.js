"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
/**
 * @hidden
 */
exports.createTasks = function (periodStart, periodEnd, items) {
    var tasks = [];
    var utcStart = utils_1.toUTCDate(periodStart);
    var utcEnd = utils_1.toUTCDate(periodEnd);
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
        var endTime = event_1.isAllDay ? utils_1.roundAllDayEnd(item) : task.end;
        var startTime = event_1.isAllDay ? task.start.stripTime() : task.start;
        task.startTime = startTime.toUTCDate();
        task.endTime = endTime.toUTCDate();
        if (utils_1.intersects(task.startTime, task.endTime, utcStart, utcEnd)) {
            tasks.push(task);
            task.head = task.endTime > periodEnd;
            task.tail = task.startTime < periodStart;
        }
    }
    return tasks;
};
