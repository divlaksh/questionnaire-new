import { FormGroup } from '@angular/forms';
import { SchedulerComponent } from '../scheduler.component';
import { EditingDirectiveBase } from './editing-directive-base';
import { CreateFormGroupArgs } from '../types/create-form-group-args.interface';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
import { DialogsService } from '../editing/dialogs.service';
/**
 * A directive which encapsulates the editing operations when the Scheduler
 * uses the [Reactive Angular Forms]({{ site.data.urls.angular['reactiveforms'] }}).
 */
export declare class ReactiveEditingDirective extends EditingDirectiveBase {
    protected scheduler: SchedulerComponent;
    protected localDataChangesService: LocalDataChangesService;
    protected dialogsService: DialogsService;
    /**
     * The function that creates the `FormGroup` for the edited model.
     */
    createFormGroup: (args: CreateFormGroupArgs) => FormGroup;
    constructor(scheduler: SchedulerComponent, localDataChangesService: LocalDataChangesService, dialogsService: DialogsService);
    ngOnInit(): void;
    protected editHandler(args: any): void;
    protected saveHandler(args: any): void;
    protected createModel(args: any): any;
    protected isFormValid({ formGroup, isNew }: any): boolean;
}
