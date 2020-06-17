import { Component, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ResourceEditorBase } from './resource-editor-base';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
export const SINGLE_RESOURCE_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SingleResourceEditorComponent)
};
/**
 * @hidden
 */
export class SingleResourceEditorComponent extends ResourceEditorBase {
    focus() {
        this.resourceDropDown.focus();
    }
}
SingleResourceEditorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    SINGLE_RESOURCE_VALUE_ACCESSOR
                ],
                selector: 'kendo-single-resource-editor',
                template: `
        <kendo-dropdownlist
            #resourceDropDown
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
        </kendo-dropdownlist>
    `
            },] },
];
SingleResourceEditorComponent.propDecorators = {
    resourceDropDown: [{ type: ViewChild, args: ['resourceDropDown',] }]
};
