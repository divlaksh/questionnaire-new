import { GroupResult } from '@progress/kendo-data-query';
import { SchedulerEvent } from '../../types';
/**
 * @hidden
 */
export declare const compose: (...args: any[]) => (data: any) => any;
/**
 * @hidden
 */
export declare const processEvents: (start: any, end: any) => (data: any) => any;
/** @hidden */
export declare class EmptyIterator<T> {
    toString(): string;
}
/** @hidden */
export interface SchedulerTask extends SchedulerEvent {
    head?: boolean;
    tail?: boolean;
    mid?: boolean;
    startDate: Date;
}
/** @hidden */
export interface AgendaViewItem {
    type: "group" | "event";
    dataItem: GroupResult | SchedulerTask;
    rowSpan?: number;
}
/**
 * @hidden
 */
export declare class TaskCollection {
    protected start: Date;
    protected end: Date;
    protected events: SchedulerEvent[];
    protected createIterator: Function;
    static empty(): TaskCollection;
    constructor(start: Date, end: Date, events: SchedulerEvent[]);
    itemAt(index: number): any;
    toString(): string;
}
