import * as tslib_1 from "tslib";
import { Component, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './messages';
// tslint:disable:no-forward-ref
/**
 * Custom component messages override default component messages
 * ([see example]({% slug globalization_chat %}#toc-custom-messages)).
 */
var CustomMessagesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CustomMessagesComponent, _super);
    function CustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(CustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    CustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return CustomMessagesComponent; })
                        }
                    ],
                    selector: 'kendo-chat-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    CustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return CustomMessagesComponent;
}(Messages));
export { CustomMessagesComponent };
