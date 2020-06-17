import { Component, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ResourceEditorBase } from './resource-editor-base';
import { MultiSelectComponent } from '@progress/kendo-angular-dropdowns';
/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
export const MULTIPLE_RESOURCE_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultipleResourceEditorComponent)
};
/**
 * @hidden
 */
export class MultipleResourceEditorComponent extends ResourceEditorBase {
    getTagStyle(dataItem) {
        return {
            'background-color': dataItem[this.resource.colorField]
        };
    }
    focus() {
        this.resourceMultiSelect.focus();
    }
}
MultipleResourceEditorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    MULTIPLE_RESOURCE_VALUE_ACCESSOR
                ],
                selector: 'kendo-multiple-resource-editor',
                template: `
        <kendo-multiselect
            #resourceMultiSelect
            [data]='resource.data'
            [textField]='resource.textField'
            [valueField]='resource.valueField'
            [valuePrimitive]='true'
            [value]='resourceValue'
            (valueChange)='onResourceValueChange($event)'
        >
            <ng-template kendoDropDownListItemTemplate let-dataItem>
                <span *ngIf="resource.colorField" class="k-scheduler-mark"
                [ngStyle]="getResourceStyle(dataItem)"></span>
                {{ getField(dataItem, resource.textField) }}
            </ng-template>
            <ng-template kendoMultiSelectTagTemplate let-dataItem>
                <span *ngIf="resource.colorField" class="k-scheduler-mark"
                [ngStyle]="getTagStyle(dataItem)"></span>
                {{ getField(dataItem, resource.textField) }}
            </ng-template>
        </kendo-multiselect>
    `
            },] },
];
MultipleResourceEditorComponent.propDecorators = {
    resourceMultiSelect: [{ type: ViewChild, args: ['resourceMultiSelect',] }]
};
