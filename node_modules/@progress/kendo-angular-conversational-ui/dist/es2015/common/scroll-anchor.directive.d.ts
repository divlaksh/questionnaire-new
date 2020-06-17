import { AfterViewInit, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
/**
 * @hidden
 */
export declare class ScrollAnchorDirective implements AfterViewInit, OnInit, OnDestroy {
    private element;
    private zone;
    private renderer;
    autoScroll: boolean;
    autoScrollChange: EventEmitter<boolean>;
    overflowAnchor: string;
    private scrolling;
    private unsubscribe;
    constructor(element: ElementRef, zone: NgZone, renderer: Renderer2);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onScroll(): void;
    scrollToBottom(): void;
}
