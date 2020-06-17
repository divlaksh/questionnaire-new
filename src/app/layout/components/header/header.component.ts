import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from '../../../shared/services/menu.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    loggedInUser: string = '';

    constructor(private translate: TranslateService, public router: Router,
        private menuService: MenuService) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

        this.menuService.isLoggedIn.subscribe(
            value => {
                this.loggedInUser = localStorage.getItem('current_user_name');
            }
        );
    }

    ngOnInit() {
        this.loggedInUser = localStorage.getItem('current_user_name');
        this.pushRightClass = 'push-right';
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('current_user');
        localStorage.removeItem('current_user_name');
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_type');
        // localStorage.removeItem('user_level');
        localStorage.clear();
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
