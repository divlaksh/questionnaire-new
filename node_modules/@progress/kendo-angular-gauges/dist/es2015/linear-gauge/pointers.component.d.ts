import { QueryList } from '@angular/core';
import { CollectionComponent, CollectionItemComponent } from '../base-components';
import { CollectionChangesService, ConfigurationService } from '../services';
/**
 * A collection of one or more LinearGauge pointers
 * ([more information]({% slug multiplepointers_lineargauge %})).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-lineargauge>
 *             <kendo-lineargauge-pointers>
 *                 <kendo-lineargauge-pointer *ngFor="let pointer of pointers"
 *                     [value]="pointer.value" [color]="pointer.color" shape="barIndicator">
 *                 </kendo-lineargauge-pointer>
 *             </kendo-lineargauge-pointers>
 *         </kendo-lineargauge>
 *     `
 * })
 * export class AppComponent {
 *     public pointers: any[] = [{
 *         value: 10,
 *         color: '#ff4500'
 *     }, {
 *         value: 12,
 *         color: '#28b4c8'
 *     }, {
 *         value: 20,
 *         color: '#8b0000'
 *     }];
 * }
 *
 * ```
 */
export declare class LinearPointersComponent extends CollectionComponent {
    children: QueryList<CollectionItemComponent>;
    constructor(configurationService: ConfigurationService, collectionChangesService: CollectionChangesService);
}
