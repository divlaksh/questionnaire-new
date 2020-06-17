import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../app.config';

// import { DatepickerOptions } from 'ng2-datepicker';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedInUser: string = '';

  constructor() {
    this.loggedInUser = localStorage.getItem('current_user_name');

  }

  ngOnInit() {

  }

}
