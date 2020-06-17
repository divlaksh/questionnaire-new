import { Directive, ElementRef, EventEmitter, HostBinding, Input, NgZone, Output, Renderer2 } from '@angular/core';
// Consider scroll to be at the bottom when within this number of pixels from the container height.
const maxDelta = 2;
/**
 * @hidden
 */
export class ScrollAnchorDirective {
    constructor(element, zone, renderer) {
        this.element = element;
        this.zone = zone;
        this.renderer = renderer;
        this.autoScroll = true;
        this.autoScrollChange = new EventEmitter();
        this.overflowAnchor = 'none';
        this.scrolling = false;
    }
    ngOnInit() {
        this.zone.runOutsideAngular(() => {
            this.unsubscribe = this.renderer.listen(this.element.nativeElement, 'scroll', () => this.onScroll());
        });
    }
    ngAfterViewInit() {
        this.scrollToBottom();
    }
    ngOnDestroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
    onScroll() {
        if (this.scrolling) {
            return;
        }
        const el = this.element.nativeElement;
        const bottom = el.scrollTop + el.offsetHeight;
        const height = el.scrollHeight;
        const atBottom = height - bottom < maxDelta;
        if (this.autoScroll !== atBottom) {
            this.zone.run(() => {
                this.autoScroll = atBottom;
                this.autoScrollChange.emit(this.autoScroll);
            });
        }
    }
    scrollToBottom() {
        if (!this.autoScroll) {
            return;
        }
        const el = this.element.nativeElement;
        el.scrollTop = el.scrollHeight - el.clientHeight;
        this.scrolling = true;
        this.zone.runOutsideAngular(() => setTimeout(() => this.scrolling = false, 1000));
    }
}
ScrollAnchorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoChatScrollAnchor]',
                exportAs: 'scrollAnchor'
            },] },
];
/** @nocollapse */
ScrollAnchorDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 }
];
ScrollAnchorDirective.propDecorators = {
    autoScroll: [{ type: Input }],
    autoScrollChange: [{ type: Output }],
    overflowAnchor: [{ type: HostBinding, args: ['style.overflow-anchor',] }]
};
