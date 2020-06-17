import * as tslib_1 from "tslib";
import { Component, ElementRef, forwardRef, HostBinding, Input, NgZone, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ChatItem } from './chat-item';
import { AttachmentTemplateDirective } from './chat.directives';
// tslint:disable:no-forward-ref
/**
 * @hidden
 */
var MessageAttachmentsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MessageAttachmentsComponent, _super);
    function MessageAttachmentsComponent(zone) {
        var _a, _b;
        var _this = _super.call(this) || this;
        _this.zone = zone;
        _this.scrollPosition = 0;
        _this.selectedIndex = 0;
        _this.carouselKeyHandlers = (_a = {},
            _a[37 /* left */] = function (e) { return _this.navigateTo(e, -1); },
            _a[39 /* right */] = function (e) { return _this.navigateTo(e, 1); },
            _a);
        _this.listKeyHandlers = (_b = {},
            _b[38 /* up */] = function (e) { return _this.navigateTo(e, -1); },
            _b[40 /* down */] = function (e) { return _this.navigateTo(e, 1); },
            _b);
        return _this;
    }
    Object.defineProperty(MessageAttachmentsComponent.prototype, "carousel", {
        get: function () {
            return this.layout !== 'list';
        },
        enumerable: true,
        configurable: true
    });
    MessageAttachmentsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            var scrollDebounceTime = 100;
            _this.scrollSubscription = fromEvent(_this.deck.nativeElement, 'scroll')
                .pipe(debounceTime(scrollDebounceTime))
                .subscribe(function () { return _this.onScroll(); });
        });
    };
    MessageAttachmentsComponent.prototype.ngOnDestroy = function () {
        this.scrollSubscription.unsubscribe();
    };
    MessageAttachmentsComponent.prototype.isSelected = function (index) {
        return this.selectedIndex === index;
    };
    MessageAttachmentsComponent.prototype.itemKeydown = function (e, attachment) {
        var keyHandlers = this.layout === 'list' ?
            this.listKeyHandlers : this.carouselKeyHandlers;
        var handler = keyHandlers[e.keyCode];
        if (handler) {
            handler(e, attachment);
        }
    };
    MessageAttachmentsComponent.prototype.itemClick = function (index) {
        this.select(index);
    };
    MessageAttachmentsComponent.prototype.focus = function () {
        this.select(this.selectedIndex);
    };
    MessageAttachmentsComponent.prototype.scrollTo = function (dir) {
        var el = this.deck.nativeElement;
        var scrollStep = el.scrollWidth / this.items.length;
        var max = el.scrollWidth - el.offsetWidth;
        var pos = el.scrollLeft + scrollStep * dir;
        el.scrollLeft = Math.max(0, Math.min(max, pos));
    };
    MessageAttachmentsComponent.prototype.select = function (index) {
        this.selectedIndex = index;
        var item = this.items.toArray()[index];
        if (item) {
            item.nativeElement.focus();
        }
    };
    MessageAttachmentsComponent.prototype.navigateTo = function (e, offset) {
        var prevIndex = this.selectedIndex;
        var nextIndex = Math.max(0, Math.min(prevIndex + offset, this.items.length - 1));
        if (nextIndex !== prevIndex) {
            this.select(nextIndex);
            e.preventDefault();
        }
    };
    MessageAttachmentsComponent.prototype.onScroll = function () {
        var _this = this;
        var el = this.deck.nativeElement;
        if (el.scrollWidth === 0) {
            return;
        }
        var pos = el.scrollLeft / (el.scrollWidth - el.offsetWidth);
        if (pos !== this.scrollPosition) {
            this.zone.run(function () {
                _this.scrollPosition = pos;
            });
        }
    };
    MessageAttachmentsComponent.decorators = [
        { type: Component, args: [{
                    providers: [{
                            provide: ChatItem,
                            useExisting: forwardRef(function () { return MessageAttachmentsComponent; })
                        }],
                    selector: 'kendo-chat-message-attachments',
                    template: "\n    <button\n      *ngIf=\"carousel && scrollPosition > 0\"\n      (click)=\"scrollTo(-1)\"\n      class=\"k-button k-button-icon\"\n      tabindex=\"-1\">\n        <span class=\"k-icon k-i-arrow-chevron-left\"></span>\n    </button>\n    <div #deck [class.k-card-deck]=\"carousel\">\n      <kendo-chat-attachment #item\n        *ngFor=\"let att of attachments; index as index; first as first; last as last\"\n        [attachment]=\"att\"\n        [template]=\"template\"\n        [class.k-state-selected]=\"isSelected(index)\"\n        [class.k-state-focused]=\"isSelected(index)\"\n        [class.k-card-wrap]=\"true\"\n        [class.k-first]=\"first\"\n        [class.k-last]=\"last\"\n        [attr.tabindex]=\"tabbable && isSelected(index) ? '0' : '-1'\"\n        (click)=\"itemClick(index)\"\n        (keydown)=\"itemKeydown($event, att)\"\n      >\n      </kendo-chat-attachment>\n    </div>\n    <button\n      *ngIf=\"carousel && scrollPosition < 1\"\n      (click)=\"scrollTo(1)\"\n      class=\"k-button k-button-icon\"\n      tabindex=\"-1\">\n        <span class=\"k-icon k-i-arrow-chevron-right\"></span>\n    </button>\n  "
                },] },
    ];
    /** @nocollapse */
    MessageAttachmentsComponent.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    MessageAttachmentsComponent.propDecorators = {
        attachments: [{ type: Input }],
        layout: [{ type: Input }],
        tabbable: [{ type: Input }],
        template: [{ type: Input }],
        carousel: [{ type: HostBinding, args: ['class.k-card-deck-scrollwrap',] }],
        deck: [{ type: ViewChild, args: ['deck', { read: ElementRef },] }],
        items: [{ type: ViewChildren, args: ['item', { read: ElementRef },] }]
    };
    return MessageAttachmentsComponent;
}(ChatItem));
export { MessageAttachmentsComponent };
