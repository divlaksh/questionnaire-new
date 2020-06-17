"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var constants_1 = require("../constants");
/**
 * @hidden
 */
function createTimeSlots(intlService, _a) {
    var showWorkHours = _a.showWorkHours, startTime = _a.startTime, endTime = _a.endTime, workDayStart = _a.workDayStart, workDayEnd = _a.workDayEnd, slotDivisions = _a.slotDivisions, slotDuration = _a.slotDuration;
    var startDate = intlService.parseDate(showWorkHours ? workDayStart : startTime);
    var start = utils_1.toInvariantTime(startDate).getTime();
    var endDate = intlService.parseDate(showWorkHours ? workDayEnd : endTime);
    var end = utils_1.toInvariantTime(endDate).getTime();
    if (end <= start) {
        end = utils_1.toInvariantTime(constants_1.MIDNIGHT_INVARIANT).getTime() + constants_1.MS_PER_DAY;
    }
    var slots = [];
    var duration = Math.round((slotDuration / slotDivisions) * constants_1.MS_PER_MINUTE);
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
exports.createTimeSlots = createTimeSlots;
