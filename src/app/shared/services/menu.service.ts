import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class MenuService {

  public userType: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public isLoggedIn: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public userLevel: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(

  ) { }

  public setUserType(type): void {
    this.userType.next(type);
  }

  public setUserLevel(level): void {
    this.userLevel.next(level);
  }

  public setLoggedIn(loggedIn): void {
    this.isLoggedIn.next(loggedIn);
  }


}
