"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var scheduler_component_1 = require("../scheduler.component");
var editing_directive_base_1 = require("./editing-directive-base");
var local_data_changes_service_1 = require("../editing/local-data-changes.service");
var utils_1 = require("./utils");
var dialogs_service_1 = require("../editing/dialogs.service");
var events_1 = require("../events");
var operators_1 = require("rxjs/operators");
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
        var editArgs = new events_1.EditEvent(this.scheduler, { dataItem: args.event.dataItem, event: args.event });
        this.edit.emit(editArgs);
        if (editArgs.isDefaultPrevented()) {
            return;
        }
        var dataItem = args.event.dataItem;
        if (this.editService.isRecurring(dataItem)) {
            this.dialogsService.openRecurringConfirmationDialog(0 /* Edit */)
                .pipe(operators_1.filter(function (mode) { return mode !== undefined; }))
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
        utils_1.markAllAsTouched(formGroup);
        return false;
    };
    ReactiveEditingDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoSchedulerReactiveEditing]'
                },] },
    ];
    /** @nocollapse */
    ReactiveEditingDirective.ctorParameters = function () { return [
        { type: scheduler_component_1.SchedulerComponent },
        { type: local_data_changes_service_1.LocalDataChangesService },
        { type: dialogs_service_1.DialogsService }
    ]; };
    ReactiveEditingDirective.propDecorators = {
        createFormGroup: [{ type: core_1.Input, args: ['kendoSchedulerReactiveEditing',] }]
    };
    return ReactiveEditingDirective;
}(editing_directive_base_1.EditingDirectiveBase));
exports.ReactiveEditingDirective = ReactiveEditingDirective;
