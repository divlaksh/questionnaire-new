import * as tslib_1 from "tslib";
import { Component, ContentChildren, QueryList } from '@angular/core';
import { LinearPointerComponent } from './pointer.component';
import { CollectionComponent } from '../base-components';
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
var LinearPointersComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LinearPointersComponent, _super);
    function LinearPointersComponent(configurationService, collectionChangesService) {
        return _super.call(this, 'pointer', configurationService, collectionChangesService) || this;
    }
    LinearPointersComponent.decorators = [
        { type: Component, args: [{
                    providers: [CollectionChangesService],
                    selector: 'kendo-lineargauge-pointers',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    LinearPointersComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionChangesService }
    ]; };
    LinearPointersComponent.propDecorators = {
        children: [{ type: ContentChildren, args: [LinearPointerComponent,] }]
    };
    return LinearPointersComponent;
}(CollectionComponent));
export { LinearPointersComponent };
