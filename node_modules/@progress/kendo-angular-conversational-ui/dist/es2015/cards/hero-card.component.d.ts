import { EventEmitter } from '@angular/core';
import { Action } from '../api/action.interface';
/**
 * Represents a Hero Card component ([see example]({% slug dialogflow_chat %})).
 * Hero cards host a single large image and action buttons with text content.
 */
export declare class HeroCardComponent {
    /**
     * The URL of the hero card image.
     */
    imageUrl: string;
    /**
     * The title of the hero card.
     */
    title: string;
    /**
     * The subtitle of the hero card.
     */
    subtitle: string;
    /**
     * An array with the possible quick actions for this hero card.
     */
    actions: Action[];
    cssClass: boolean;
    /**
     * Fires when the user clicks a button.
     */
    executeAction: EventEmitter<Action>;
    onClick(action: any): void;
}
