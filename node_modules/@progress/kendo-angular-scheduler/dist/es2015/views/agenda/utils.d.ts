import { ViewItem } from '../../types';
/**
 * @hidden
 */
export declare function createResourceGroups(groupedResources: any[]): any[];
/**
 * @hidden
 */
export declare const splitTasks: (...args: any[]) => any;
/**
 * @hidden
 */
export declare function groupEvents(items: ViewItem[], { taskResources, resourceGroups, spans, allResources, dateRange }: any): any[];
