import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HelpComponent } from './help/help.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'prefix' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'estimator/:isNewForm', loadChildren: './estimator/estimator.module#EstimatorModule' },
            { path: 'search-form/:isSearch', loadChildren: './estimator/estimator.module#EstimatorModule' },
            { path: 'edit-estimator/:formId/:isView', loadChildren: './estimator/estimator.module#EstimatorModule' },
            { path: 'form-list/:isFormList', loadChildren: './form-list/form-list.module#FormListModule' },
            { path: 'pending-list/:isPendingList', loadChildren: './form-list/form-list.module#FormListModule' },
            { path: 'accepted-list/:isAcceptedList', loadChildren: './form-list/form-list.module#FormListModule' },
            { path: 'approved-list/:isApprovedList', loadChildren: './form-list/form-list.module#FormListModule' },
            { path: 'rejected-list/:isRejectedList', loadChildren: './form-list/form-list.module#FormListModule' },
            { path: 'my-list/:isMyList', loadChildren: './form-list/form-list.module#FormListModule' },
            { path: 'completed-list/:isCompletedList', loadChildren: './form-list/form-list.module#FormListModule' },
            { path: 'help', component: HelpComponent },
            { path: 'dashboard', component: DashboardComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
