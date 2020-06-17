import { Input, EventEmitter, Output } from '@angular/core';
import { isPresent, getField } from '../common/util';
/**
 * @hidden
 */
var ResourceEditorBase = /** @class */ (function () {
    function ResourceEditorBase() {
        this.valueChange = new EventEmitter();
        this.getField = getField;
        this.onTouchedCallback = function (_) { };
        this.onChangeCallback = function (_) { };
    }
    /**
     * @hidden
     */
    ResourceEditorBase.prototype.writeValue = function (newValue) {
        this.resourceValue = newValue;
    };
    ResourceEditorBase.prototype.getResourceStyle = function (dataItem) {
        return {
            'background-color': getField(dataItem, this.resource.colorField),
            'margin-right': isPresent(getField(dataItem, this.resource.valueField)) ? '8px' : '4px'
        };
    };
    ResourceEditorBase.prototype.onResourceValueChange = function (newValue) {
        this.resourceValue = newValue;
        this.emitChange(this.resourceValue);
    };
    /**
     * @hidden
     */
    ResourceEditorBase.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    ResourceEditorBase.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    ResourceEditorBase.prototype.emitChange = function (value) {
        this.onChangeCallback(value);
        this.valueChange.emit(value);
    };
    ResourceEditorBase.propDecorators = {
        resource: [{ type: Input }],
        valueChange: [{ type: Output }]
    };
    return ResourceEditorBase;
}());
export { ResourceEditorBase };
