"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var chat_directives_1 = require("./chat.directives");
/**
 * @hidden
 */
var AttachmentComponent = /** @class */ (function () {
    function AttachmentComponent() {
    }
    Object.defineProperty(AttachmentComponent.prototype, "attachment", {
        get: function () {
            return this._attachment;
        },
        set: function (value) {
            this._attachment = value;
            this.context = {
                $implicit: this.attachment
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttachmentComponent.prototype, "image", {
        get: function () {
            return this.contentType.indexOf('image/') === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttachmentComponent.prototype, "unknown", {
        get: function () {
            return !this.image;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttachmentComponent.prototype, "contentType", {
        get: function () {
            return this.attachment.contentType || '';
        },
        enumerable: true,
        configurable: true
    });
    AttachmentComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-chat-attachment',
                    template: "\n    <ng-container *ngIf=\"template\">\n      <ng-container *ngTemplateOutlet=\"template.templateRef; context: context;\">\n      </ng-container>\n    </ng-container>\n\n    <div *ngIf=\"!template\" class=\"k-card\">\n      <div class=\"k-card-body\">\n        <h5 class=\"k-card-title\" *ngIf=\"attachment.title\">\n          {{ attachment.title }}\n        </h5>\n        <h6 class=\"k-card-subtitle\" *ngIf=\"attachment.subtitle\">\n          {{ attachment.subtitle }}\n        </h6>\n        <img *ngIf=\"image\" [attr.src]=\"attachment.content\" />\n        <ng-container *ngIf=\"unknown\">\n          {{ attachment.content }}\n        </ng-container>\n      </div>\n    </div>\n  "
                },] },
    ];
    AttachmentComponent.propDecorators = {
        attachment: [{ type: core_1.Input }],
        template: [{ type: core_1.Input }]
    };
    return AttachmentComponent;
}());
exports.AttachmentComponent = AttachmentComponent;
