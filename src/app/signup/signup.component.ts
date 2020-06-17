import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProvider } from '../shared/services/service-provider';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as models from '../shared/models';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()],
    providers: [ServiceProvider]
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    passwordMisMatch: boolean = false;
    registrationSuccess: boolean = false;
    errorMsg: string = '';
    failedToCreate: boolean = false;


    constructor(private serviceProvider: ServiceProvider, private router: Router) { }


    ngOnInit() {
        this.addFormControls();
    }

    addFormControls() {
        this.signupForm = new FormGroup({
            fullName: new FormControl('', Validators.required),
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', Validators.required),
            userType: new FormControl('', Validators.required),
        });
    }

    signupUser() {
        debugger
        this.passwordMisMatch = false;
        this.registrationSuccess = false;
        this.failedToCreate = false;
        const data: models.UserModel = {};
        data.fullName = this.signupForm.get('fullName').value;
        data.username = this.signupForm.get('username').value;
        data.password = this.signupForm.get('password').value;
        data.confirmPassword = this.signupForm.get('confirmPassword').value;
        if (data.password !== data.confirmPassword) {
            this.passwordMisMatch = true;
            return;
        }
        data.userType = this.signupForm.get('userType').value;
        this.serviceProvider.signup(data).subscribe(
            result => {
                this.registrationSuccess = true;
                //this.router.navigate(['/login']);
            },
            err => {
                debugger
                if (err.status === 409) {
                    this.errorMsg = 'Email already exist in system. Please try different email.';
                } else {
                    this.errorMsg = 'Failed to register. Please try again...';
                }
                this.failedToCreate = true;
            },
            () => {

            }
        );
    }
}
