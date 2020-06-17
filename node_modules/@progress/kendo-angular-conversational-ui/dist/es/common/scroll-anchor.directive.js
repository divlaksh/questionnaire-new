import { Directive, ElementRef, EventEmitter, HostBinding, Input, NgZone, Output, Renderer2 } from '@angular/core';
// Consider scroll to be at the bottom when within this number of pixels from the container height.
var maxDelta = 2;
/**
 * @hidden
 */
var ScrollAnchorDirective = /** @class */ (function () {
    function ScrollAnchorDirective(element, zone, renderer) {
        this.element = element;
        this.zone = zone;
        this.renderer = renderer;
        this.autoScroll = true;
        this.autoScrollChange = new EventEmitter();
        this.overflowAnchor = 'none';
        this.scrolling = false;
    }
    ScrollAnchorDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.unsubscribe = _this.renderer.listen(_this.element.nativeElement, 'scroll', function () { return _this.onScroll(); });
        });
    };
    ScrollAnchorDirective.prototype.ngAfterViewInit = function () {
        this.scrollToBottom();
    };
    ScrollAnchorDirective.prototype.ngOnDestroy = function () {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    };
    ScrollAnchorDirective.prototype.onScroll = function () {
        var _this = this;
        if (this.scrolling) {
            return;
        }
        var el = this.element.nativeElement;
        var bottom = el.scrollTop + el.offsetHeight;
        var height = el.scrollHeight;
        var atBottom = height - bottom < maxDelta;
        if (this.autoScroll !== atBottom) {
            this.zone.run(function () {
                _this.autoScroll = atBottom;
                _this.autoScrollChange.emit(_this.autoScroll);
            });
        }
    };
    ScrollAnchorDirective.prototype.scrollToBottom = function () {
        var _this = this;
        if (!this.autoScroll) {
            return;
        }
        var el = this.element.nativeElement;
        el.scrollTop = el.scrollHeight - el.clientHeight;
        this.scrolling = true;
        this.zone.runOutsideAngular(function () {
            return setTimeout(function () { return _this.scrolling = false; }, 1000);
        });
    };
    ScrollAnchorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoChatScrollAnchor]',
                    exportAs: 'scrollAnchor'
                },] },
    ];
    /** @nocollapse */
    ScrollAnchorDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    ScrollAnchorDirective.propDecorators = {
        autoScroll: [{ type: Input }],
        autoScrollChange: [{ type: Output }],
        overflowAnchor: [{ type: HostBinding, args: ['style.overflow-anchor',] }]
    };
    return ScrollAnchorDirective;
}());
export { ScrollAnchorDirective };
