import { Component, ElementRef, forwardRef, HostBinding, Input, NgZone, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ChatItem } from './chat-item';
import { AttachmentTemplateDirective } from './chat.directives';
// tslint:disable:no-forward-ref
/**
 * @hidden
 */
export class MessageAttachmentsComponent extends ChatItem {
    constructor(zone) {
        super();
        this.zone = zone;
        this.scrollPosition = 0;
        this.selectedIndex = 0;
        this.carouselKeyHandlers = {
            [37 /* left */]: (e) => this.navigateTo(e, -1),
            [39 /* right */]: (e) => this.navigateTo(e, 1)
        };
        this.listKeyHandlers = {
            [38 /* up */]: (e) => this.navigateTo(e, -1),
            [40 /* down */]: (e) => this.navigateTo(e, 1)
        };
    }
    get carousel() {
        return this.layout !== 'list';
    }
    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            const scrollDebounceTime = 100;
            this.scrollSubscription = fromEvent(this.deck.nativeElement, 'scroll')
                .pipe(debounceTime(scrollDebounceTime))
                .subscribe(() => this.onScroll());
        });
    }
    ngOnDestroy() {
        this.scrollSubscription.unsubscribe();
    }
    isSelected(index) {
        return this.selectedIndex === index;
    }
    itemKeydown(e, attachment) {
        const keyHandlers = this.layout === 'list' ?
            this.listKeyHandlers : this.carouselKeyHandlers;
        const handler = keyHandlers[e.keyCode];
        if (handler) {
            handler(e, attachment);
        }
    }
    itemClick(index) {
        this.select(index);
    }
    focus() {
        this.select(this.selectedIndex);
    }
    scrollTo(dir) {
        const el = this.deck.nativeElement;
        const scrollStep = el.scrollWidth / this.items.length;
        const max = el.scrollWidth - el.offsetWidth;
        const pos = el.scrollLeft + scrollStep * dir;
        el.scrollLeft = Math.max(0, Math.min(max, pos));
    }
    select(index) {
        this.selectedIndex = index;
        const item = this.items.toArray()[index];
        if (item) {
            item.nativeElement.focus();
        }
    }
    navigateTo(e, offset) {
        const prevIndex = this.selectedIndex;
        const nextIndex = Math.max(0, Math.min(prevIndex + offset, this.items.length - 1));
        if (nextIndex !== prevIndex) {
            this.select(nextIndex);
            e.preventDefault();
        }
    }
    onScroll() {
        const el = this.deck.nativeElement;
        if (el.scrollWidth === 0) {
            return;
        }
        const pos = el.scrollLeft / (el.scrollWidth - el.offsetWidth);
        if (pos !== this.scrollPosition) {
            this.zone.run(() => {
                this.scrollPosition = pos;
            });
        }
    }
}
MessageAttachmentsComponent.decorators = [
    { type: Component, args: [{
                providers: [{
                        provide: ChatItem,
                        useExisting: forwardRef(() => MessageAttachmentsComponent)
                    }],
                selector: 'kendo-chat-message-attachments',
                template: `
    <button
      *ngIf="carousel && scrollPosition > 0"
      (click)="scrollTo(-1)"
      class="k-button k-button-icon"
      tabindex="-1">
        <span class="k-icon k-i-arrow-chevron-left"></span>
    </button>
    <div #deck [class.k-card-deck]="carousel">
      <kendo-chat-attachment #item
        *ngFor="let att of attachments; index as index; first as first; last as last"
        [attachment]="att"
        [template]="template"
        [class.k-state-selected]="isSelected(index)"
        [class.k-state-focused]="isSelected(index)"
        [class.k-card-wrap]="true"
        [class.k-first]="first"
        [class.k-last]="last"
        [attr.tabindex]="tabbable && isSelected(index) ? '0' : '-1'"
        (click)="itemClick(index)"
        (keydown)="itemKeydown($event, att)"
      >
      </kendo-chat-attachment>
    </div>
    <button
      *ngIf="carousel && scrollPosition < 1"
      (click)="scrollTo(1)"
      class="k-button k-button-icon"
      tabindex="-1">
        <span class="k-icon k-i-arrow-chevron-right"></span>
    </button>
  `
            },] },
];
/** @nocollapse */
MessageAttachmentsComponent.ctorParameters = () => [
    { type: NgZone }
];
MessageAttachmentsComponent.propDecorators = {
    attachments: [{ type: Input }],
    layout: [{ type: Input }],
    tabbable: [{ type: Input }],
    template: [{ type: Input }],
    carousel: [{ type: HostBinding, args: ['class.k-card-deck-scrollwrap',] }],
    deck: [{ type: ViewChild, args: ['deck', { read: ElementRef },] }],
    items: [{ type: ViewChildren, args: ['item', { read: ElementRef },] }]
};
