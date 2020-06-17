import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { MenuService } from '../../../shared/services/menu.service';
import { AppConfig } from '../../../app.config';
import { environment } from '../../../../environments/environment.prod';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    userType: string = '';
    userLevel: string;
    displayMenu: boolean = false;
    approverType = AppConfig.APPROVER_TYPE;
    tsaType = AppConfig.TSA_TYPE;
    requestorType = AppConfig.REQUESTOR_TYPE;
    public helpUrl: string = environment.help_url;

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(private translate: TranslateService, public router: Router,
        private menuService: MenuService) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
        this.userType = localStorage.getItem('user_type');
        this.userLevel = localStorage.getItem('user_level');
    }

    ngOnInit() {
        debugger
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';

        this.menuService.userType.subscribe(
            value => {
                debugger
                this.userType = value;
            }
        );

        this.menuService.userLevel.subscribe(
            value => {
                debugger
                this.userLevel = value;
            }
        );

    }

    ngAfterViewInit() {
        debugger
        this.userType = localStorage.getItem('user_type');
        this.userLevel = localStorage.getItem('user_level');
    }


    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
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

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
