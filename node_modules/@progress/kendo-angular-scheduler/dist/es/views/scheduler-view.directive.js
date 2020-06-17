import * as tslib_1 from "tslib";
import { Directive, forwardRef, Input, TemplateRef } from '@angular/core';
import { SchedulerView } from '../types';
// tslint:disable:no-input-rename
/**
 * A directive selector for a custom Scheduler view
 */
var SchedulerViewDirective = /** @class */ (function (_super) {
    tslib_1.__extends(SchedulerViewDirective, _super);
    function SchedulerViewDirective(template) {
        var _this = _super.call(this) || this;
        _this.template = template;
        return _this;
    }
    Object.defineProperty(SchedulerViewDirective.prototype, "name", {
        /**
         * The invariant name for this view. For example, `day`.
         * If not set, the name will be the same as the title.
         */
        get: function () {
            return this._name || this.title;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    SchedulerViewDirective.decorators = [
        { type: Directive, args: [{
                    providers: [{
                            provide: SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return SchedulerViewDirective; })
                        }],
                    selector: '[kendoSchedulerView]'
                },] },
    ];
    /** @nocollapse */
    SchedulerViewDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    SchedulerViewDirective.propDecorators = {
        title: [{ type: Input, args: ['kendoSchedulerView',] }],
        name: [{ type: Input, args: ['kendoSchedulerViewName',] }]
    };
    return SchedulerViewDirective;
}(SchedulerView));
export { SchedulerViewDirective };
