import * as tslib_1 from "tslib";
import { Component, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ResourceEditorBase } from './resource-editor-base';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
export var SINGLE_RESOURCE_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SingleResourceEditorComponent; })
};
/**
 * @hidden
 */
var SingleResourceEditorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SingleResourceEditorComponent, _super);
    function SingleResourceEditorComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SingleResourceEditorComponent.prototype.focus = function () {
        this.resourceDropDown.focus();
    };
    SingleResourceEditorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        SINGLE_RESOURCE_VALUE_ACCESSOR
                    ],
                    selector: 'kendo-single-resource-editor',
                    template: "\n        <kendo-dropdownlist\n            #resourceDropDown\n            [data]='resource.data'\n            [textField]='resource.textField'\n            [valueField]='resource.valueField'\n            [valuePrimitive]='true'\n            [value]='resourceValue'\n            (valueChange)='onResourceValueChange($event)'\n        >\n            <ng-template kendoDropDownListItemTemplate let-dataItem>\n                <span *ngIf=\"resource.colorField\" class=\"k-scheduler-mark\"\n                [ngStyle]=\"getResourceStyle(dataItem)\"></span>\n                {{ getField(dataItem, resource.textField) }}\n            </ng-template>\n        </kendo-dropdownlist>\n    "
                },] },
    ];
    SingleResourceEditorComponent.propDecorators = {
        resourceDropDown: [{ type: ViewChild, args: ['resourceDropDown',] }]
    };
    return SingleResourceEditorComponent;
}(ResourceEditorBase));
export { SingleResourceEditorComponent };
