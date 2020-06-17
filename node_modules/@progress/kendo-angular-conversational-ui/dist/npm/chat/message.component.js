"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var chat_item_1 = require("./chat-item");
var message_template_directive_1 = require("./message-template.directive");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
// tslint:disable:no-forward-ref
/**
 * @hidden
 */
var MessageComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MessageComponent, _super);
    function MessageComponent(element, intl) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.intl = intl;
        _this.cssClass = true;
        return _this;
    }
    Object.defineProperty(MessageComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabbable ? '0' : '-1';
        },
        enumerable: true,
        configurable: true
    });
    MessageComponent.prototype.formatTimeStamp = function (date) {
        return this.intl.formatDate(date, { datetime: 'short' });
    };
    MessageComponent.prototype.focus = function () {
        this.element.nativeElement.focus();
    };
    MessageComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-chat-message',
                    providers: [{
                            provide: chat_item_1.ChatItem,
                            useExisting: core_1.forwardRef(function () { return MessageComponent; })
                        }],
                    template: "\n    <time\n      [attr.aria-hidden]=\"!selected\"\n      class=\"k-message-time\"\n      *ngIf=\"message.timestamp\"\n    >\n      {{ formatTimeStamp(message.timestamp) }}\n    </time>\n\n    <ng-container *ngIf=\"!message.typing; else typing\">\n      <div class=\"k-bubble\" *ngIf=\"template\">\n        <ng-container\n          *ngTemplateOutlet=\"template.templateRef; context: { $implicit: message };\"\n        >\n        </ng-container>\n      </div>\n\n      <div class=\"k-bubble\" *ngIf=\"!template && message.text\">\n        {{message.text}}\n      </div>\n    </ng-container>\n\n    <span\n      class=\"k-message-status\"\n      *ngIf=\"message.status\"\n    >\n      {{ message.status }}\n    </span>\n\n    <ng-template #typing>\n      <div class=\"k-bubble\">\n        <div class=\"k-typing-indicator\">\n          <span></span>\n          <span></span>\n          <span></span>\n        </div>\n      </div>\n    </ng-template>\n  "
                },] },
    ];
    /** @nocollapse */
    MessageComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: kendo_angular_intl_1.IntlService }
    ]; };
    MessageComponent.propDecorators = {
        message: [{ type: core_1.Input }],
        tabbable: [{ type: core_1.Input }],
        template: [{ type: core_1.Input }],
        cssClass: [{ type: core_1.HostBinding, args: ['class.k-message',] }],
        selected: [{ type: core_1.HostBinding, args: ['class.k-state-selected',] }, { type: core_1.HostBinding, args: ['class.k-state-focused',] }],
        tabIndex: [{ type: core_1.HostBinding, args: ['attr.tabIndex',] }]
    };
    return MessageComponent;
}(chat_item_1.ChatItem));
exports.MessageComponent = MessageComponent;
