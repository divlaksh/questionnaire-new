import { Directive, Input, HostBinding, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { RecurrenceService } from './recurrence.service';
/**
 * @hidden
 */
export class RepeatOnRadioButtonDirective {
    constructor(el, renderer, reccurence, changeDetector) {
        this.el = el;
        this.renderer = renderer;
        this.reccurence = reccurence;
        this.changeDetector = changeDetector;
        this.type = 'radio';
        this.name = 'day';
        this.radioClass = true;
        this.destroyChange = this.renderer.listen(this.elem, 'change', this.onChange.bind(this));
    }
    ngOnInit() {
        this.renderer.setAttribute(this.elem, 'id', 'k-repeaton-' + this.repeatOnRule);
    }
    ngAfterContentChecked() {
        this.setCheckedState();
    }
    ngOnDestroy() {
        if (this.destroyChange) {
            this.destroyChange();
        }
    }
    onChange() {
        if (this.elem.checked) {
            this.reccurence.repeatOnRule = this.repeatOnRule;
            this.changeDetector.markForCheck();
        }
    }
    setCheckedState() {
        const isChecked = this.repeatOnRule === this.reccurence.repeatOnRule;
        this.renderer.setProperty(this.elem, 'checked', isChecked);
    }
    get elem() {
        return this.el.nativeElement;
    }
}
RepeatOnRadioButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoRecurrenceRepeatOnRadioButton]'
            },] },
];
/** @nocollapse */
RepeatOnRadioButtonDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: RecurrenceService },
    { type: ChangeDetectorRef }
];
RepeatOnRadioButtonDirective.propDecorators = {
    type: [{ type: HostBinding, args: ['attr.type',] }],
    name: [{ type: HostBinding, args: ['attr.name',] }],
    radioClass: [{ type: HostBinding, args: ['class.k-radio',] }],
    repeatOnRule: [{ type: Input, args: ["kendoRecurrenceRepeatOnRadioButton",] }]
};
