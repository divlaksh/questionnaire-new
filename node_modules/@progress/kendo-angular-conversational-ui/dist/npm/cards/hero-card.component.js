"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
        this.executeAction = new core_1.EventEmitter();
    }
    HeroCardComponent.prototype.onClick = function (action) {
        this.executeAction.next(action);
    };
    HeroCardComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-chat-hero-card',
                    template: "\n    <img class=\"k-card-image\" [src]=\"imageUrl\" *ngIf=\"imageUrl\" />\n    <div class=\"k-card-body\">\n      <h5 class=\"k-card-title\" *ngIf=\"title\">\n        {{ title }}\n      </h5>\n      <h6 class=\"k-card-subtitle\" *ngIf=\"subtitle\">\n        {{ subtitle }}\n      </h6>\n    </div>\n    <div class=\"k-card-actions k-card-actions-vertical\">\n      <span class=\"k-card-action\"\n            *ngFor=\"let act of actions\"\n      >\n        <button\n          kendoButton look=\"flat\"\n          (click)=\"onClick(act)\">\n          {{ act.title }}\n        </button>\n      </span>\n    </div>\n  "
                },] },
    ];
    HeroCardComponent.propDecorators = {
        imageUrl: [{ type: core_1.Input }],
        title: [{ type: core_1.Input }],
        subtitle: [{ type: core_1.Input }],
        actions: [{ type: core_1.Input }],
        cssClass: [{ type: core_1.HostBinding, args: ['class.k-card',] }],
        executeAction: [{ type: core_1.Output }]
    };
    return HeroCardComponent;
}());
exports.HeroCardComponent = HeroCardComponent;
