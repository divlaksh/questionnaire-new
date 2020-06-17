import * as tslib_1 from "tslib";
import { Component, ElementRef, forwardRef, HostBinding, Input } from '@angular/core';
import { ChatItem } from './chat-item';
import { MessageTemplateDirective } from './message-template.directive';
import { IntlService } from '@progress/kendo-angular-intl';
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
        { type: Component, args: [{
                    selector: 'kendo-chat-message',
                    providers: [{
                            provide: ChatItem,
                            useExisting: forwardRef(function () { return MessageComponent; })
                        }],
                    template: "\n    <time\n      [attr.aria-hidden]=\"!selected\"\n      class=\"k-message-time\"\n      *ngIf=\"message.timestamp\"\n    >\n      {{ formatTimeStamp(message.timestamp) }}\n    </time>\n\n    <ng-container *ngIf=\"!message.typing; else typing\">\n      <div class=\"k-bubble\" *ngIf=\"template\">\n        <ng-container\n          *ngTemplateOutlet=\"template.templateRef; context: { $implicit: message };\"\n        >\n        </ng-container>\n      </div>\n\n      <div class=\"k-bubble\" *ngIf=\"!template && message.text\">\n        {{message.text}}\n      </div>\n    </ng-container>\n\n    <span\n      class=\"k-message-status\"\n      *ngIf=\"message.status\"\n    >\n      {{ message.status }}\n    </span>\n\n    <ng-template #typing>\n      <div class=\"k-bubble\">\n        <div class=\"k-typing-indicator\">\n          <span></span>\n          <span></span>\n          <span></span>\n        </div>\n      </div>\n    </ng-template>\n  "
                },] },
    ];
    /** @nocollapse */
    MessageComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IntlService }
    ]; };
    MessageComponent.propDecorators = {
        message: [{ type: Input }],
        tabbable: [{ type: Input }],
        template: [{ type: Input }],
        cssClass: [{ type: HostBinding, args: ['class.k-message',] }],
        selected: [{ type: HostBinding, args: ['class.k-state-selected',] }, { type: HostBinding, args: ['class.k-state-focused',] }],
        tabIndex: [{ type: HostBinding, args: ['attr.tabIndex',] }]
    };
    return MessageComponent;
}(ChatItem));
export { MessageComponent };
