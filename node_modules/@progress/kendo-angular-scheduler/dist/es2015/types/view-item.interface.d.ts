import { ZonedDate } from "@progress/kendo-date-math";
import { SchedulerEvent } from "../types";
export interface ViewItem {
    start: ZonedDate;
    end: ZonedDate;
    event: SchedulerEvent;
}
