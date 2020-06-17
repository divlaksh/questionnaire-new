import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { ComponentMessages } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
var Messages = /** @class */ (function (_super) {
    tslib_1.__extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Messages.propDecorators = {
        repeat: [{ type: Input }],
        dailyInterval: [{ type: Input }],
        dailyRepeatEvery: [{ type: Input }],
        weeklyInterval: [{ type: Input }],
        weeklyRepeatEvery: [{ type: Input }],
        weeklyRepeatOn: [{ type: Input }],
        monthlyDay: [{ type: Input }],
        monthlyInterval: [{ type: Input }],
        monthlyRepeatEvery: [{ type: Input }],
        monthlyRepeatOn: [{ type: Input }],
        yearlyOf: [{ type: Input }],
        yearlyRepeatEvery: [{ type: Input }],
        yearlyRepeatOn: [{ type: Input }],
        yearlyInterval: [{ type: Input }],
        frequenciesDaily: [{ type: Input }],
        frequenciesMonthly: [{ type: Input }],
        frequenciesNever: [{ type: Input }],
        frequenciesWeekly: [{ type: Input }],
        frequenciesYearly: [{ type: Input }],
        offsetPositionsFirst: [{ type: Input }],
        offsetPositionsSecond: [{ type: Input }],
        offsetPositionsThird: [{ type: Input }],
        offsetPositionsFourth: [{ type: Input }],
        offsetPositionsLast: [{ type: Input }],
        weekdaysDay: [{ type: Input }],
        weekdaysWeekday: [{ type: Input }],
        weekdaysWeekendday: [{ type: Input }],
        endAfter: [{ type: Input }],
        endOccurrence: [{ type: Input }],
        endLabel: [{ type: Input }],
        endNever: [{ type: Input }],
        endOn: [{ type: Input }]
    };
    return Messages;
}(ComponentMessages));
export { Messages };
