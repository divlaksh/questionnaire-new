import { Input, EventEmitter, Output } from '@angular/core';
import { isPresent, getField } from '../common/util';
/**
 * @hidden
 */
export class ResourceEditorBase {
    constructor() {
        this.valueChange = new EventEmitter();
        this.getField = getField;
        this.onTouchedCallback = (_) => { };
        this.onChangeCallback = (_) => { };
    }
    /**
     * @hidden
     */
    writeValue(newValue) {
        this.resourceValue = newValue;
    }
    getResourceStyle(dataItem) {
        return {
            'background-color': getField(dataItem, this.resource.colorField),
            'margin-right': isPresent(getField(dataItem, this.resource.valueField)) ? '8px' : '4px'
        };
    }
    onResourceValueChange(newValue) {
        this.resourceValue = newValue;
        this.emitChange(this.resourceValue);
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    emitChange(value) {
        this.onChangeCallback(value);
        this.valueChange.emit(value);
    }
}
ResourceEditorBase.propDecorators = {
    resource: [{ type: Input }],
    valueChange: [{ type: Output }]
};
