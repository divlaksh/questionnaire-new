import * as tslib_1 from "tslib";
import { PreventableEvent } from '../preventable-event';
/**
 * Arguments for the `popupOpen` and `popupClose` events of the ContextMenu.
 */
var ContextMenuPopupEvent = /** @class */ (function (_super) {
    tslib_1.__extends(ContextMenuPopupEvent, _super);
    function ContextMenuPopupEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContextMenuPopupEvent;
}(PreventableEvent));
export { ContextMenuPopupEvent };
