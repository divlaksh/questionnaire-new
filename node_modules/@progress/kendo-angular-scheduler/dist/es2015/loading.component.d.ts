import { Renderer2, ElementRef } from '@angular/core';
/**
 * @hidden
 */
export declare class LoadingComponent {
    private element;
    private renderer;
    hostClasses: boolean;
    loading: boolean;
    readonly display: string;
    private force;
    constructor(element: ElementRef, renderer: Renderer2);
    toggle(value: boolean): void;
}
