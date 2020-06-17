import { Directive, Input } from "@angular/core";
import { SchedulerComponent } from '../scheduler.component';
import { EditingDirectiveBase } from './editing-directive-base';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
import { markAllAsTouched } from './utils';
import { DialogsService } from '../editing/dialogs.service';
import { EditEvent } from '../events';
import { filter } from 'rxjs/operators';
/**
 * A directive which encapsulates the editing operations when the Scheduler
 * uses the [Reactive Angular Forms]({{ site.data.urls.angular['reactiveforms'] }}).
 */
export class ReactiveEditingDirective extends EditingDirectiveBase {
    constructor(scheduler, localDataChangesService, dialogsService) {
        super(scheduler, localDataChangesService, dialogsService);
        this.scheduler = scheduler;
        this.localDataChangesService = localDataChangesService;
        this.dialogsService = dialogsService;
    }
    ngOnInit() {
        super.ngOnInit();
        this.subscriptions.add(this.scheduler.eventDblClick.subscribe(this.editHandler.bind(this)));
        this.subscriptions.add(this.scheduler.save.subscribe(this.saveHandler.bind(this)));
    }
    editHandler(args) {
        if (!this.isEnabled('edit')) {
            return;
        }
        const editArgs = new EditEvent(this.scheduler, { dataItem: args.event.dataItem, event: args.event });
        this.edit.emit(editArgs);
        if (editArgs.isDefaultPrevented()) {
            return;
        }
        let dataItem = args.event.dataItem;
        if (this.editService.isRecurring(dataItem)) {
            this.dialogsService.openRecurringConfirmationDialog(0 /* Edit */)
                .pipe(filter(mode => mode !== undefined))
                .subscribe((mode) => {
                if (mode === 2 /* Series */) {
                    dataItem = this.editService.findRecurrenceMaster(dataItem);
                }
                const group = this.createModel({
                    action: 'edit',
                    isNew: false,
                    mode,
                    dataItem
                });
                this.scheduler.editEvent(dataItem, { group, mode });
            });
        }
        else {
            const group = this.createModel({
                action: 'edit',
                isNew: false,
                mode: 0 /* Event */,
                dataItem
            });
            this.scheduler.editEvent(dataItem, { group });
        }
    }
    saveHandler(args) {
        if (this.isFormValid(args)) {
            const formValue = args.formGroup.value;
            if (args.isNew) {
                this.editService.create(formValue);
            }
            else {
                this.handleUpdate(args.dataItem, formValue, args.mode);
            }
        }
        this.closeEditor();
    }
    createModel(args) {
        // Alias `event` for backwards compatibility.
        args.event = args.dataItem;
        return this.createFormGroup(args);
    }
    isFormValid({ formGroup, isNew }) {
        if (formGroup.valid) {
            return true;
        }
        if (!formGroup.dirty && !isNew) {
            return false;
        }
        markAllAsTouched(formGroup);
        return false;
    }
}
ReactiveEditingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerReactiveEditing]'
            },] },
];
/** @nocollapse */
ReactiveEditingDirective.ctorParameters = () => [
    { type: SchedulerComponent },
    { type: LocalDataChangesService },
    { type: DialogsService }
];
ReactiveEditingDirective.propDecorators = {
    createFormGroup: [{ type: Input, args: ['kendoSchedulerReactiveEditing',] }]
};
