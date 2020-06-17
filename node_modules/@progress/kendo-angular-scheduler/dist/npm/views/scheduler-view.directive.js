"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var types_1 = require("../types");
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
        { type: core_1.Directive, args: [{
                    providers: [{
                            provide: types_1.SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: core_1.forwardRef(function () { return SchedulerViewDirective; })
                        }],
                    selector: '[kendoSchedulerView]'
                },] },
    ];
    /** @nocollapse */
    SchedulerViewDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef }
    ]; };
    SchedulerViewDirective.propDecorators = {
        title: [{ type: core_1.Input, args: ['kendoSchedulerView',] }],
        name: [{ type: core_1.Input, args: ['kendoSchedulerViewName',] }]
    };
    return SchedulerViewDirective;
}(types_1.SchedulerView));
exports.SchedulerViewDirective = SchedulerViewDirective;
