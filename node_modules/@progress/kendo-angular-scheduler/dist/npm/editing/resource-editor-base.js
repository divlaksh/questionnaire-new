"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var util_1 = require("../common/util");
/**
 * @hidden
 */
var ResourceEditorBase = /** @class */ (function () {
    function ResourceEditorBase() {
        this.valueChange = new core_1.EventEmitter();
        this.getField = util_1.getField;
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
            'background-color': util_1.getField(dataItem, this.resource.colorField),
            'margin-right': util_1.isPresent(util_1.getField(dataItem, this.resource.valueField)) ? '8px' : '4px'
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
        resource: [{ type: core_1.Input }],
        valueChange: [{ type: core_1.Output }]
    };
    return ResourceEditorBase;
}());
exports.ResourceEditorBase = ResourceEditorBase;
