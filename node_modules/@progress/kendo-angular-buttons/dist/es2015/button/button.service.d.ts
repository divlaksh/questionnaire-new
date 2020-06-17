import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ButtonDirective } from "./button.directive";
import { ButtonLook } from '../button-look';
/**
 * @hidden
 */
export declare class KendoButtonService {
    buttonLookChange: BehaviorSubject<ButtonLook>;
    buttonClicked: Subject<ButtonDirective>;
    buttonClicked$: Observable<ButtonDirective>;
    click(button: ButtonDirective): void;
    setButtonLook(look: ButtonLook): void;
}
