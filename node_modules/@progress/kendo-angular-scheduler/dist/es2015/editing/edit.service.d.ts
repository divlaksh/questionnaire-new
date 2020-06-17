import { EventEmitter, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { EditMode } from '../types';
/**
 * @hidden
 */
export declare type CommandAction = 'edit' | 'remove' | 'cancel' | 'save' | 'add';
/**
 * @hidden
 */
export declare type CommandEvent = {
    action: CommandAction;
    dataItem?: any;
    formGroup?: FormGroup;
    isNew?: boolean;
    mode?: EditMode;
};
/**
 * @hidden
 */
export declare type Entity = {
    dataItem: any;
    formGroup: any;
    mode?: EditMode;
};
/**
 * @hidden
 */
export declare class EditService {
    ngZone: NgZone;
    changes: EventEmitter<CommandEvent>;
    changed: Observable<any>;
    editedEvent: Entity;
    newEventGroup: any;
    private changedSource;
    constructor(ngZone: NgZone);
    endEdit(): void;
    removeEvent(dataItem: any): void;
    addEvent(formGroup: FormGroup): void;
    editEvent(dataItem: any, formGroup?: FormGroup, mode?: EditMode): void;
    close(): void;
    save(): void;
    isEditing(): boolean;
    readonly occurrenceEditMode: EditMode;
    readonly hasNewEvent: boolean;
    readonly newEvent: any;
    readonly context: Entity;
    private onChanged;
}
