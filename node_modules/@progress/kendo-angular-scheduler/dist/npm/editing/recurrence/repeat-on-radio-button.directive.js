"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var recurrence_service_1 = require("./recurrence.service");
/**
 * @hidden
 */
var RepeatOnRadioButtonDirective = /** @class */ (function () {
    function RepeatOnRadioButtonDirective(el, renderer, reccurence, changeDetector) {
        this.el = el;
        this.renderer = renderer;
        this.reccurence = reccurence;
        this.changeDetector = changeDetector;
        this.type = 'radio';
        this.name = 'day';
        this.radioClass = true;
        this.destroyChange = this.renderer.listen(this.elem, 'change', this.onChange.bind(this));
    }
    RepeatOnRadioButtonDirective.prototype.ngOnInit = function () {
        this.renderer.setAttribute(this.elem, 'id', 'k-repeaton-' + this.repeatOnRule);
    };
    RepeatOnRadioButtonDirective.prototype.ngAfterContentChecked = function () {
        this.setCheckedState();
    };
    RepeatOnRadioButtonDirective.prototype.ngOnDestroy = function () {
        if (this.destroyChange) {
            this.destroyChange();
        }
    };
    RepeatOnRadioButtonDirective.prototype.onChange = function () {
        if (this.elem.checked) {
            this.reccurence.repeatOnRule = this.repeatOnRule;
            this.changeDetector.markForCheck();
        }
    };
    RepeatOnRadioButtonDirective.prototype.setCheckedState = function () {
        var isChecked = this.repeatOnRule === this.reccurence.repeatOnRule;
        this.renderer.setProperty(this.elem, 'checked', isChecked);
    };
    Object.defineProperty(RepeatOnRadioButtonDirective.prototype, "elem", {
        get: function () {
            return this.el.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    RepeatOnRadioButtonDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoRecurrenceRepeatOnRadioButton]'
                },] },
    ];
    /** @nocollapse */
    RepeatOnRadioButtonDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: recurrence_service_1.RecurrenceService },
        { type: core_1.ChangeDetectorRef }
    ]; };
    RepeatOnRadioButtonDirective.propDecorators = {
        type: [{ type: core_1.HostBinding, args: ['attr.type',] }],
        name: [{ type: core_1.HostBinding, args: ['attr.name',] }],
        radioClass: [{ type: core_1.HostBinding, args: ['class.k-radio',] }],
        repeatOnRule: [{ type: core_1.Input, args: ["kendoRecurrenceRepeatOnRadioButton",] }]
    };
    return RepeatOnRadioButtonDirective;
}());
exports.RepeatOnRadioButtonDirective = RepeatOnRadioButtonDirective;
