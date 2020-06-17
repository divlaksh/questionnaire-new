"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var resource_editor_base_1 = require("./resource-editor-base");
var kendo_angular_dropdowns_1 = require("@progress/kendo-angular-dropdowns");
/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
exports.MULTIPLE_RESOURCE_VALUE_ACCESSOR = {
    multi: true,
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MultipleResourceEditorComponent; })
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
        { type: core_1.Component, args: [{
                    providers: [
                        exports.MULTIPLE_RESOURCE_VALUE_ACCESSOR
                    ],
                    selector: 'kendo-multiple-resource-editor',
                    template: "\n        <kendo-multiselect\n            #resourceMultiSelect\n            [data]='resource.data'\n            [textField]='resource.textField'\n            [valueField]='resource.valueField'\n            [valuePrimitive]='true'\n            [value]='resourceValue'\n            (valueChange)='onResourceValueChange($event)'\n        >\n            <ng-template kendoDropDownListItemTemplate let-dataItem>\n                <span *ngIf=\"resource.colorField\" class=\"k-scheduler-mark\"\n                [ngStyle]=\"getResourceStyle(dataItem)\"></span>\n                {{ getField(dataItem, resource.textField) }}\n            </ng-template>\n            <ng-template kendoMultiSelectTagTemplate let-dataItem>\n                <span *ngIf=\"resource.colorField\" class=\"k-scheduler-mark\"\n                [ngStyle]=\"getTagStyle(dataItem)\"></span>\n                {{ getField(dataItem, resource.textField) }}\n            </ng-template>\n        </kendo-multiselect>\n    "
                },] },
    ];
    MultipleResourceEditorComponent.propDecorators = {
        resourceMultiSelect: [{ type: core_1.ViewChild, args: ['resourceMultiSelect',] }]
    };
    return MultipleResourceEditorComponent;
}(resource_editor_base_1.ResourceEditorBase));
exports.MultipleResourceEditorComponent = MultipleResourceEditorComponent;
