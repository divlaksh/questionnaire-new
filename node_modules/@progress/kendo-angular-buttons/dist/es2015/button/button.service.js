import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
/**
 * @hidden
 */
export class KendoButtonService {
    constructor() {
        this.buttonLookChange = new BehaviorSubject('default');
        this.buttonClicked = new Subject();
        this.buttonClicked$ = this.buttonClicked.asObservable();
    }
    click(button) {
        this.buttonClicked.next(button);
    }
    setButtonLook(look) {
        this.buttonLookChange.next(look);
    }
}
KendoButtonService.decorators = [
    { type: Injectable },
];
