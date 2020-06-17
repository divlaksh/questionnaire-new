import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * Arguments for the `add` event of the editing directives.
 */
var AddEvent = /** @class */ (function (_super) {
    tslib_1.__extends(AddEvent, _super);
    /**
     * @hidden
     */
    function AddEvent(sender, args) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        Object.assign(_this, args);
        return _this;
    }
    return AddEvent;
}(PreventableEvent));
export { AddEvent };
