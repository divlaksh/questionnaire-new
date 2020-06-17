/**
 * @hidden
 */
export declare class ItemsService {
    items: any;
    lists: any[];
    private idPrefix;
    readonly hasItems: boolean;
    childId(index: string): string;
    itemIndex(parentIndex: string, index: any): string;
    get(index: string): any;
    add(item: any): any;
    remove(item: any): any;
    addList(list: any): any;
    removeList(list: any): any;
    containsList(element: any): boolean;
    siblings(item: any): any[];
    otherSiblings(item: any): any[];
    children(item: any): any[];
    parent(item: any): any;
    root(item: any): any;
    indices(index: string): string[];
    filter(predicate: any): any[];
    previous(item: any): any;
    next(item: any): any;
    hasParent(item: any, parent: any): boolean;
    areSiblings(item1: any, item2: any): boolean;
    forEach(callback: any): void;
    private parentIndex;
}
