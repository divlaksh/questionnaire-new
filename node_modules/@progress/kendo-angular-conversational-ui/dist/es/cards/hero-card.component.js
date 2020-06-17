import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
/**
 * Represents a Hero Card component ([see example]({% slug dialogflow_chat %})).
 * Hero cards host a single large image and action buttons with text content.
 */
var HeroCardComponent = /** @class */ (function () {
    function HeroCardComponent() {
        this.cssClass = true;
        /**
         * Fires when the user clicks a button.
         */
        this.executeAction = new EventEmitter();
    }
    HeroCardComponent.prototype.onClick = function (action) {
        this.executeAction.next(action);
    };
    HeroCardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-chat-hero-card',
                    template: "\n    <img class=\"k-card-image\" [src]=\"imageUrl\" *ngIf=\"imageUrl\" />\n    <div class=\"k-card-body\">\n      <h5 class=\"k-card-title\" *ngIf=\"title\">\n        {{ title }}\n      </h5>\n      <h6 class=\"k-card-subtitle\" *ngIf=\"subtitle\">\n        {{ subtitle }}\n      </h6>\n    </div>\n    <div class=\"k-card-actions k-card-actions-vertical\">\n      <span class=\"k-card-action\"\n            *ngFor=\"let act of actions\"\n      >\n        <button\n          kendoButton look=\"flat\"\n          (click)=\"onClick(act)\">\n          {{ act.title }}\n        </button>\n      </span>\n    </div>\n  "
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
    return HeroCardComponent;
}());
export { HeroCardComponent };
