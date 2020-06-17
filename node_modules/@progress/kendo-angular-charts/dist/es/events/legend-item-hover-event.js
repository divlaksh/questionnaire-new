import * as tslib_1 from "tslib";
import { LegendEvent } from './legend-event';
/**
 * Arguments for the `legendItemHover` event.
 */
var LegendItemHoverEvent = /** @class */ (function (_super) {
    tslib_1.__extends(LegendItemHoverEvent, _super);
    function LegendItemHoverEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * If called, the series highlight is not shown as a result of hovering over the legend item.
     */
    LegendItemHoverEvent.prototype.preventDefault = function () {
        _super.prototype.preventDefault.call(this);
    };
    return LegendItemHoverEvent;
}(LegendEvent));
export { LegendItemHoverEvent };
