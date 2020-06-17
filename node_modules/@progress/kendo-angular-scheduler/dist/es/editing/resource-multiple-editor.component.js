import * as tslib_1 from "tslib";
import { Component, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ResourceEditorBase } from './resource-editor-base';
import { MultiSelectComponent } from '@progress/kendo-angular-dropdowns';
/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
export var MULTIPLE_RESOURCE_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MultipleResourceEditorComponent; })
};
/**
 * @hidden
 */
var MultipleResourceEditorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MultipleResourceEditorComponent, _super);
    function MultipleResourceEditorComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultipleResourceEditorComponent.prototype.getTagStyle = function (dataItem) {
        return {
            'background-color': dataItem[this.resource.colorField]
        };
    };
    MultipleResourceEditorComponent.prototype.focus = function () {
        this.resourceMultiSelect.focus();
    };
    MultipleResourceEditorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        MULTIPLE_RESOURCE_VALUE_ACCESSOR
                    ],
                    selector: 'kendo-multiple-resource-editor',
                    template: "\n        <kendo-multiselect\n            #resourceMultiSelect\n            [data]='resource.data'\n            [textField]='resource.textField'\n            [valueField]='resource.valueField'\n            [valuePrimitive]='true'\n            [value]='resourceValue'\n            (valueChange)='onResourceValueChange($event)'\n        >\n            <ng-template kendoDropDownListItemTemplate let-dataItem>\n                <span *ngIf=\"resource.colorField\" class=\"k-scheduler-mark\"\n                [ngStyle]=\"getResourceStyle(dataItem)\"></span>\n                {{ getField(dataItem, resource.textField) }}\n            </ng-template>\n            <ng-template kendoMultiSelectTagTemplate let-dataItem>\n                <span *ngIf=\"resource.colorField\" class=\"k-scheduler-mark\"\n                [ngStyle]=\"getTagStyle(dataItem)\"></span>\n                {{ getField(dataItem, resource.textField) }}\n            </ng-template>\n        </kendo-multiselect>\n    "
                },] },
    ];
    MultipleResourceEditorComponent.propDecorators = {
        resourceMultiSelect: [{ type: ViewChild, args: ['resourceMultiSelect',] }]
    };
    return MultipleResourceEditorComponent;
}(ResourceEditorBase));
export { MultipleResourceEditorComponent };
