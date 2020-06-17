import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as models from '../shared/models';
import { ServiceProvider } from '../shared/services/service-provider';
import { LocalStorageService } from '../shared/LocalStorage.service';
import { MenuService } from '../shared/services/menu.service';
import { AppConfig } from '../app.config';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    failedLogin: boolean = false;

    constructor(private router: Router, private serviceProvider: ServiceProvider,
        private localStorageService: LocalStorageService, private menuService: MenuService) { }



    ngOnInit() {
        this.addFormControls();
        this.menuService.setUserType('-1');
        this.menuService.setUserLevel(null);
        this.menuService.setLoggedIn(false);
    }

    addFormControls() {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    login() {
        this.failedLogin = false;
        const data: models.UserModel = {};
        data.username = this.loginForm.get('username').value;
        data.password = this.loginForm.get('password').value;
        this.serviceProvider.login(data).subscribe(
            result => {
                localStorage.setItem('token', result['Authorization']);
                this.setSettingValueForUser(data.username);
            },
            err => {
                this.failedLogin = true;
            },
            () => {

            }
        );


    }

    setSettingValueForUser(username: string) {
        debugger
        this.serviceProvider.getSystemSettingByValue(username).subscribe(
            result => {
                if (!!result && !!result['name']) {
                    if (result['name'] === AppConfig.LEVEL2_APPROVER) {
                        localStorage.setItem('user_level', '2');
                        this.menuService.setUserLevel(2);
                    } else if (result['name'] === AppConfig.LEVEL2_APPROVER_GBS) {
                        localStorage.setItem('user_level', '2');
                        localStorage.setItem('is_gbs_approver', 'true');
                        this.menuService.setUserLevel(3);
                    } else if (result['name'] === AppConfig.LEVEL3_APPROVER) {
                        localStorage.setItem('user_level', '3');
                        this.menuService.setUserLevel(3);
                    }
                }

                this.setUserDetails(username);
            },
            err => {
                console.log('Error occured while getting system setting by value for the user name.', username);
            },
            () => {

            }
        );
    }

    setUserDetails(username: string) {
        this.serviceProvider.getUserById(username).subscribe(
            result => {
                const currentUser: models.UserModel = result;
                localStorage.setItem('current_user', currentUser.username);
                localStorage.setItem('current_user_name', currentUser.fullName);
                localStorage.setItem('user_type', currentUser.userType);
                this.menuService.setUserType(currentUser.userType);
                this.menuService.setLoggedIn(true);
                localStorage.setItem('isLoggedin', 'true');

                if (currentUser.userType === AppConfig.ADMIN_TYPE) {
                    this.router.navigate(['/home']);
                } else if (currentUser.userType === AppConfig.APPROVER_TYPE) {
                    this.router.navigate(['/pending-list', true]);
                } else {
                    this.router.navigate(['/form-list', true]);
                }
            },
            err => {

            },
            () => {

            }
        );
    }
}
