import { toInvariantTime } from '../utils';
import { MIDNIGHT_INVARIANT, MS_PER_DAY, MS_PER_MINUTE } from '../constants';
/**
 * @hidden
 */
export function createTimeSlots(intlService, _a) {
    var showWorkHours = _a.showWorkHours, startTime = _a.startTime, endTime = _a.endTime, workDayStart = _a.workDayStart, workDayEnd = _a.workDayEnd, slotDivisions = _a.slotDivisions, slotDuration = _a.slotDuration;
    var startDate = intlService.parseDate(showWorkHours ? workDayStart : startTime);
    var start = toInvariantTime(startDate).getTime();
    var endDate = intlService.parseDate(showWorkHours ? workDayEnd : endTime);
    var end = toInvariantTime(endDate).getTime();
    if (end <= start) {
        end = toInvariantTime(MIDNIGHT_INVARIANT).getTime() + MS_PER_DAY;
    }
    var slots = [];
    var duration = Math.round((slotDuration / slotDivisions) * MS_PER_MINUTE);
    var slotTime = start;
    var index = 0;
    while (slotTime < end) {
        slots.push({
            start: new Date(slotTime),
            end: new Date(slotTime + duration),
            isMajor: index % slotDivisions === 0
        });
        index++;
        slotTime += duration;
    }
    return slots;
}
