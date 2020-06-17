import * as tslib_1 from "tslib";
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
var ReactiveEditingDirective = /** @class */ (function (_super) {
    tslib_1.__extends(ReactiveEditingDirective, _super);
    function ReactiveEditingDirective(scheduler, localDataChangesService, dialogsService) {
        var _this = _super.call(this, scheduler, localDataChangesService, dialogsService) || this;
        _this.scheduler = scheduler;
        _this.localDataChangesService = localDataChangesService;
        _this.dialogsService = dialogsService;
        return _this;
    }
    ReactiveEditingDirective.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.subscriptions.add(this.scheduler.eventDblClick.subscribe(this.editHandler.bind(this)));
        this.subscriptions.add(this.scheduler.save.subscribe(this.saveHandler.bind(this)));
    };
    ReactiveEditingDirective.prototype.editHandler = function (args) {
        var _this = this;
        if (!this.isEnabled('edit')) {
            return;
        }
        var editArgs = new EditEvent(this.scheduler, { dataItem: args.event.dataItem, event: args.event });
        this.edit.emit(editArgs);
        if (editArgs.isDefaultPrevented()) {
            return;
        }
        var dataItem = args.event.dataItem;
        if (this.editService.isRecurring(dataItem)) {
            this.dialogsService.openRecurringConfirmationDialog(0 /* Edit */)
                .pipe(filter(function (mode) { return mode !== undefined; }))
                .subscribe(function (mode) {
                if (mode === 2 /* Series */) {
                    dataItem = _this.editService.findRecurrenceMaster(dataItem);
                }
                var group = _this.createModel({
                    action: 'edit',
                    isNew: false,
                    mode: mode,
                    dataItem: dataItem
                });
                _this.scheduler.editEvent(dataItem, { group: group, mode: mode });
            });
        }
        else {
            var group = this.createModel({
                action: 'edit',
                isNew: false,
                mode: 0 /* Event */,
                dataItem: dataItem
            });
            this.scheduler.editEvent(dataItem, { group: group });
        }
    };
    ReactiveEditingDirective.prototype.saveHandler = function (args) {
        if (this.isFormValid(args)) {
            var formValue = args.formGroup.value;
            if (args.isNew) {
                this.editService.create(formValue);
            }
            else {
                this.handleUpdate(args.dataItem, formValue, args.mode);
            }
        }
        this.closeEditor();
    };
    ReactiveEditingDirective.prototype.createModel = function (args) {
        // Alias `event` for backwards compatibility.
        args.event = args.dataItem;
        return this.createFormGroup(args);
    };
    ReactiveEditingDirective.prototype.isFormValid = function (_a) {
        var formGroup = _a.formGroup, isNew = _a.isNew;
        if (formGroup.valid) {
            return true;
        }
        if (!formGroup.dirty && !isNew) {
            return false;
        }
        markAllAsTouched(formGroup);
        return false;
    };
    ReactiveEditingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerReactiveEditing]'
                },] },
    ];
    /** @nocollapse */
    ReactiveEditingDirective.ctorParameters = function () { return [
        { type: SchedulerComponent },
        { type: LocalDataChangesService },
        { type: DialogsService }
    ]; };
    ReactiveEditingDirective.propDecorators = {
        createFormGroup: [{ type: Input, args: ['kendoSchedulerReactiveEditing',] }]
    };
    return ReactiveEditingDirective;
}(EditingDirectiveBase));
export { ReactiveEditingDirective };
