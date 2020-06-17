import { Component, OnInit } from '@angular/core';
import { MenuService } from './shared/services/menu.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private menuService: MenuService) {
    }

    ngOnInit() {
    }
}
