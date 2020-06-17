import * as tslib_1 from "tslib";
import { LegendEvent } from './legend-event';
/**
 * Arguments for the `legendItemClick` event.
 */
var LegendItemClickEvent = /** @class */ (function (_super) {
    tslib_1.__extends(LegendItemClickEvent, _super);
    function LegendItemClickEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * If called, the series visibility is not toggled as a result of clicking the legend item.
     */
    LegendItemClickEvent.prototype.preventDefault = function () {
        _super.prototype.preventDefault.call(this);
    };
    return LegendItemClickEvent;
}(LegendEvent));
export { LegendItemClickEvent };
