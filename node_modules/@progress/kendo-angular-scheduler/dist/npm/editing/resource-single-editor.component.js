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
exports.SINGLE_RESOURCE_VALUE_ACCESSOR = {
    multi: true,
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return SingleResourceEditorComponent; })
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
        { type: core_1.Component, args: [{
                    providers: [
                        exports.SINGLE_RESOURCE_VALUE_ACCESSOR
                    ],
                    selector: 'kendo-single-resource-editor',
                    template: "\n        <kendo-dropdownlist\n            #resourceDropDown\n            [data]='resource.data'\n            [textField]='resource.textField'\n            [valueField]='resource.valueField'\n            [valuePrimitive]='true'\n            [value]='resourceValue'\n            (valueChange)='onResourceValueChange($event)'\n        >\n            <ng-template kendoDropDownListItemTemplate let-dataItem>\n                <span *ngIf=\"resource.colorField\" class=\"k-scheduler-mark\"\n                [ngStyle]=\"getResourceStyle(dataItem)\"></span>\n                {{ getField(dataItem, resource.textField) }}\n            </ng-template>\n        </kendo-dropdownlist>\n    "
                },] },
    ];
    SingleResourceEditorComponent.propDecorators = {
        resourceDropDown: [{ type: core_1.ViewChild, args: ['resourceDropDown',] }]
    };
    return SingleResourceEditorComponent;
}(resource_editor_base_1.ResourceEditorBase));
exports.SingleResourceEditorComponent = SingleResourceEditorComponent;
