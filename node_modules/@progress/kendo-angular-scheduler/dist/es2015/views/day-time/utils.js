import { toInvariantTime } from '../utils';
import { MIDNIGHT_INVARIANT, MS_PER_DAY, MS_PER_MINUTE } from '../constants';
/**
 * @hidden
 */
export function createTimeSlots(intlService, { showWorkHours, startTime, endTime, workDayStart, workDayEnd, slotDivisions, slotDuration }) {
    const startDate = intlService.parseDate(showWorkHours ? workDayStart : startTime);
    const start = toInvariantTime(startDate).getTime();
    const endDate = intlService.parseDate(showWorkHours ? workDayEnd : endTime);
    let end = toInvariantTime(endDate).getTime();
    if (end <= start) {
        end = toInvariantTime(MIDNIGHT_INVARIANT).getTime() + MS_PER_DAY;
    }
    const slots = [];
    const duration = Math.round((slotDuration / slotDivisions) * MS_PER_MINUTE);
    let slotTime = start;
    let index = 0;
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
