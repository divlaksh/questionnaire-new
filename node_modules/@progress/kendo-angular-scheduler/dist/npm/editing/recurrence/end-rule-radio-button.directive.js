"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var recurrence_service_1 = require("./recurrence.service");
/**
 * @hidden
 */
var EndRuleRadioButtonDirective = /** @class */ (function () {
    function EndRuleRadioButtonDirective(el, renderer, reccurence, changeDetector) {
        this.el = el;
        this.renderer = renderer;
        this.reccurence = reccurence;
        this.changeDetector = changeDetector;
        this.type = 'radio';
        this.name = 'end';
        this.radioClass = true;
        this.destroyChange = this.renderer.listen(this.elem, 'change', this.onChange.bind(this));
    }
    EndRuleRadioButtonDirective.prototype.ngOnInit = function () {
        this.endRule = this.endRuleId.split('-').pop();
        this.renderer.setAttribute(this.elem, 'id', this.endRuleId);
    };
    EndRuleRadioButtonDirective.prototype.ngAfterContentChecked = function () {
        this.setCheckedState();
    };
    EndRuleRadioButtonDirective.prototype.ngOnDestroy = function () {
        if (this.destroyChange) {
            this.destroyChange();
        }
    };
    EndRuleRadioButtonDirective.prototype.onChange = function () {
        if (this.elem.checked) {
            this.reccurence.endRule = this.endRule;
            this.changeDetector.markForCheck();
        }
    };
    EndRuleRadioButtonDirective.prototype.setCheckedState = function () {
        var isChecked = this.endRule === this.reccurence.endRule;
        this.renderer.setProperty(this.elem, 'checked', isChecked);
    };
    Object.defineProperty(EndRuleRadioButtonDirective.prototype, "elem", {
        get: function () {
            return this.el.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    EndRuleRadioButtonDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoRecurrenceEndRuleRadioButton]'
                },] },
    ];
    /** @nocollapse */
    EndRuleRadioButtonDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: recurrence_service_1.RecurrenceService },
        { type: core_1.ChangeDetectorRef }
    ]; };
    EndRuleRadioButtonDirective.propDecorators = {
        type: [{ type: core_1.HostBinding, args: ['attr.type',] }],
        name: [{ type: core_1.HostBinding, args: ['attr.name',] }],
        radioClass: [{ type: core_1.HostBinding, args: ['class.k-radio',] }],
        endRuleId: [{ type: core_1.Input, args: ["kendoRecurrenceEndRuleRadioButton",] }]
    };
    return EndRuleRadioButtonDirective;
}());
exports.EndRuleRadioButtonDirective = EndRuleRadioButtonDirective;
