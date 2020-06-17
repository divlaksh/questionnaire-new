import { Directive, Input, HostBinding, Renderer2, ElementRef, ChangeDetectorRef } from "@angular/core";
import { RecurrenceService } from './recurrence.service';
/**
 * @hidden
 */
export class EndRuleRadioButtonDirective {
    constructor(el, renderer, reccurence, changeDetector) {
        this.el = el;
        this.renderer = renderer;
        this.reccurence = reccurence;
        this.changeDetector = changeDetector;
        this.type = 'radio';
        this.name = 'end';
        this.radioClass = true;
        this.destroyChange = this.renderer.listen(this.elem, 'change', this.onChange.bind(this));
    }
    ngOnInit() {
        this.endRule = this.endRuleId.split('-').pop();
        this.renderer.setAttribute(this.elem, 'id', this.endRuleId);
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
            this.reccurence.endRule = this.endRule;
            this.changeDetector.markForCheck();
        }
    }
    setCheckedState() {
        const isChecked = this.endRule === this.reccurence.endRule;
        this.renderer.setProperty(this.elem, 'checked', isChecked);
    }
    get elem() {
        return this.el.nativeElement;
    }
}
EndRuleRadioButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoRecurrenceEndRuleRadioButton]'
            },] },
];
/** @nocollapse */
EndRuleRadioButtonDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: RecurrenceService },
    { type: ChangeDetectorRef }
];
EndRuleRadioButtonDirective.propDecorators = {
    type: [{ type: HostBinding, args: ['attr.type',] }],
    name: [{ type: HostBinding, args: ['attr.name',] }],
    radioClass: [{ type: HostBinding, args: ['class.k-radio',] }],
    endRuleId: [{ type: Input, args: ["kendoRecurrenceEndRuleRadioButton",] }]
};
