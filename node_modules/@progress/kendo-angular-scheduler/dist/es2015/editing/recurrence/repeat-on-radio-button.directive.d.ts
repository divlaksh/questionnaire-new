import { ElementRef, Renderer2, OnInit, OnDestroy, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { RecurrenceService, RepeatOnRule } from './recurrence.service';
/**
 * @hidden
 */
export declare class RepeatOnRadioButtonDirective implements OnInit, AfterContentChecked, OnDestroy {
    private el;
    private renderer;
    private reccurence;
    private changeDetector;
    type: string;
    name: string;
    radioClass: boolean;
    repeatOnRule: RepeatOnRule;
    private destroyChange;
    constructor(el: ElementRef, renderer: Renderer2, reccurence: RecurrenceService, changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    onChange(): void;
    private setCheckedState;
    readonly elem: any;
}
