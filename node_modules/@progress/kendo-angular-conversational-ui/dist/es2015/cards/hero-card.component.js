import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
/**
 * Represents a Hero Card component ([see example]({% slug dialogflow_chat %})).
 * Hero cards host a single large image and action buttons with text content.
 */
export class HeroCardComponent {
    constructor() {
        this.cssClass = true;
        /**
         * Fires when the user clicks a button.
         */
        this.executeAction = new EventEmitter();
    }
    onClick(action) {
        this.executeAction.next(action);
    }
}
HeroCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-chat-hero-card',
                template: `
    <img class="k-card-image" [src]="imageUrl" *ngIf="imageUrl" />
    <div class="k-card-body">
      <h5 class="k-card-title" *ngIf="title">
        {{ title }}
      </h5>
      <h6 class="k-card-subtitle" *ngIf="subtitle">
        {{ subtitle }}
      </h6>
    </div>
    <div class="k-card-actions k-card-actions-vertical">
      <span class="k-card-action"
            *ngFor="let act of actions"
      >
        <button
          kendoButton look="flat"
          (click)="onClick(act)">
          {{ act.title }}
        </button>
      </span>
    </div>
  `
            },] },
];
HeroCardComponent.propDecorators = {
    imageUrl: [{ type: Input }],
    title: [{ type: Input }],
    subtitle: [{ type: Input }],
    actions: [{ type: Input }],
    cssClass: [{ type: HostBinding, args: ['class.k-card',] }],
    executeAction: [{ type: Output }]
};
