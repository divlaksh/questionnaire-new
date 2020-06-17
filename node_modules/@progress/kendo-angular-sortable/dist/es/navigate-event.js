import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * The `navigate` event is emitted when using the keyboard arrows.
 */
var NavigateEvent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigateEvent, _super);
    /**
     * @hidden
     */
    function NavigateEvent(options) {
        var _this = _super.call(this) || this;
        Object.assign(_this, options);
        return _this;
    }
    return NavigateEvent;
}(PreventableEvent));
export { NavigateEvent };
