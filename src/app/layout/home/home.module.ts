import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { MyDatePickerModule } from 'mydatepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PageHeaderModule } from './../../shared';
import { HomeRoutingModule } from '../../layout/home/home-routing.module';
import { HomeComponent } from 'src/app/layout/home/home.component';



@NgModule({
    imports: [CommonModule, HomeRoutingModule, PageHeaderModule,
        NgbModule],
    declarations: [HomeComponent],
    providers: [DatePipe]
})
export class HomeModule { }
