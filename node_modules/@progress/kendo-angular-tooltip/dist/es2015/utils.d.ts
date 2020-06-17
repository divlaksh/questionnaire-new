import { Position } from './models/position.type';
import { Collision } from '@progress/kendo-angular-popup';
/**
 * @hidden
 */
export declare function align(position: Position, offset?: number): any;
/**
 * @hidden
 */
export declare function collision(inputcollision: Collision, position: Position): Collision;
/**
 * @hidden
 */
export declare function closest(element: any, selector: string): any;
/**
 * @hidden
 */
export declare function contains(container: Element, child: Element): boolean;
/**
 * @hidden
 */
export declare const hasParent: (node: any, parent: any) => any;
/**
 * @hidden
 */
export declare function getCenterOffset(item: Element, dir: string, size: string): number;
/**
 * @hidden
 */
export declare function containsItem(collection: any, item: any): boolean;
