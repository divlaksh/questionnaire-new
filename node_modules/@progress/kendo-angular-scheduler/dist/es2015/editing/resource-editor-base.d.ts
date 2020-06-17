import { EventEmitter } from '@angular/core';
import { Resource } from '../types/resource.interface';
import { ControlValueAccessor } from '@angular/forms';
/**
 * @hidden
 */
export declare abstract class ResourceEditorBase implements ControlValueAccessor {
    resource: Resource;
    valueChange: EventEmitter<any>;
    resourceValue: any;
    getField: any;
    abstract focus(): void;
    /**
     * @hidden
     */
    writeValue(newValue: any): void;
    getResourceStyle(dataItem: any): any;
    onResourceValueChange(newValue: any): void;
    protected onTouchedCallback: Function;
    protected onChangeCallback: Function;
    /**
     * @hidden
     */
    registerOnChange(fn: any): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: any): void;
    protected emitChange(value: any): void;
}
