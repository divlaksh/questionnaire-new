import { SchedulerEvent } from '../../types';
/** @hidden */
export interface SchedulerTask {
    start: Date;
    end: Date;
    startTime?: Date;
    endTime?: Date;
    isAllDay: boolean;
    head?: boolean;
    tail?: boolean;
    color?: string;
    event: SchedulerEvent;
    rangeIndex?: number;
    resources?: any[];
}
