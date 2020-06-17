import { ElementRef, OnInit } from '@angular/core';
import { SortableComponent } from './sortable.component';
/**
 * @hidden
 */
export declare class DraggableDirective implements OnInit {
    parent: SortableComponent;
    el: ElementRef;
    index: number;
    hidden: boolean;
    disabled: boolean;
    readonly _focused: boolean;
    readonly _disabled: boolean;
    readonly userSelect: string;
    display: string;
    private _display;
    constructor(parent: SortableComponent, el: ElementRef);
    ngOnInit(): void;
}
