import { intersects, toUTCDate, roundAllDayEnd } from '../utils';
/**
 * @hidden
 */
export const createTasks = (periodStart, periodEnd, items) => {
    const tasks = [];
    const utcStart = toUTCDate(periodStart);
    const utcEnd = toUTCDate(periodEnd);
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        const event = item.event;
        const task = {
            index,
            start: item.start,
            end: item.end,
            event: event,
            isAllDay: false
        };
        const endTime = event.isAllDay ? roundAllDayEnd(item) : task.end;
        const startTime = event.isAllDay ? task.start.stripTime() : task.start;
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
