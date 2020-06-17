import { ResourceEditorBase } from './resource-editor-base';
import { MultiSelectComponent } from '@progress/kendo-angular-dropdowns';
/**
 * @hidden
 */
export declare const MULTIPLE_RESOURCE_VALUE_ACCESSOR: any;
/**
 * @hidden
 */
export declare class MultipleResourceEditorComponent extends ResourceEditorBase {
    resourceMultiSelect: MultiSelectComponent;
    getTagStyle(dataItem: any): any;
    focus(): void;
}
