import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { MyDatePickerModule } from 'mydatepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillEditorModule } from 'ngx-quill-editor';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { PageHeaderModule } from './../../shared';
import { EstimatorComponent } from '../../layout/estimator/estimator.component';
import { EstimatorRoutingModule } from '../../layout/estimator/estimator-routing.module';



@NgModule({
    imports: [CommonModule, EstimatorRoutingModule, PageHeaderModule,
        ReactiveFormsModule, FormsModule, UiSwitchModule, MyDatePickerModule, NgbModule,
        QuillEditorModule, NgMultiSelectDropDownModule.forRoot()],
    declarations: [EstimatorComponent],
    providers: [DatePipe]
})
export class EstimatorModule { }
