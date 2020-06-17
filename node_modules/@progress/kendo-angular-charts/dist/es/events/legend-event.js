import * as tslib_1 from "tslib";
import { PreventableEvent } from './preventable-event';
/**
 * @hidden
 */
var LegendEvent = /** @class */ (function (_super) {
    tslib_1.__extends(LegendEvent, _super);
    /**
     * @hidden
     */
    function LegendEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.series = e.series;
        _this.seriesIndex = e.seriesIndex;
        _this.pointIndex = e.pointIndex;
        _this.text = e.text;
        return _this;
    }
    return LegendEvent;
}(PreventableEvent));
export { LegendEvent };
