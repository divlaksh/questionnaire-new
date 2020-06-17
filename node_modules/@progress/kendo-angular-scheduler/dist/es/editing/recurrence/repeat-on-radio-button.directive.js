import { Directive, Input, HostBinding, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { RecurrenceService } from './recurrence.service';
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
        { type: Directive, args: [{
                    selector: '[kendoRecurrenceRepeatOnRadioButton]'
                },] },
    ];
    /** @nocollapse */
    RepeatOnRadioButtonDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: RecurrenceService },
        { type: ChangeDetectorRef }
    ]; };
    RepeatOnRadioButtonDirective.propDecorators = {
        type: [{ type: HostBinding, args: ['attr.type',] }],
        name: [{ type: HostBinding, args: ['attr.name',] }],
        radioClass: [{ type: HostBinding, args: ['class.k-radio',] }],
        repeatOnRule: [{ type: Input, args: ["kendoRecurrenceRepeatOnRadioButton",] }]
    };
    return RepeatOnRadioButtonDirective;
}());
export { RepeatOnRadioButtonDirective };
