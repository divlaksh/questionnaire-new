import { Action } from '../api/action.interface';
import { ChatComponent } from './chat.component';
/**
 * @hidden
 */
export declare type ActionHandler = (action: Action, sender: ChatComponent) => void;
/**
 * @hidden
 */
export declare const makeHandler: (action: Action) => ActionHandler;
