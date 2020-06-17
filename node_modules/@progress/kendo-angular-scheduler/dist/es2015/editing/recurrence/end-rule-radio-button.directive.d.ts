import { AfterContentChecked, OnInit, OnDestroy, Renderer2, ElementRef, ChangeDetectorRef } from "@angular/core";
import { RecurrenceService } from './recurrence.service';
/**
 * @hidden
 */
export declare class EndRuleRadioButtonDirective implements OnInit, AfterContentChecked, OnDestroy {
    private el;
    private renderer;
    private reccurence;
    private changeDetector;
    type: string;
    name: string;
    radioClass: boolean;
    endRuleId: string;
    private destroyChange;
    private endRule;
    constructor(el: ElementRef, renderer: Renderer2, reccurence: RecurrenceService, changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    onChange(): void;
    private setCheckedState;
    readonly elem: any;
}
