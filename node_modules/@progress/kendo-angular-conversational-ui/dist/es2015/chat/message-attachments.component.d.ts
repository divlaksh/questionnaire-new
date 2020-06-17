import { AfterViewInit, ElementRef, NgZone, OnDestroy, QueryList } from '@angular/core';
import { Attachment, AttachmentLayout } from '../api/attachment.interface';
import { ChatItem } from './chat-item';
import { AttachmentTemplateDirective } from './chat.directives';
/**
 * @hidden
 */
export declare class MessageAttachmentsComponent extends ChatItem implements AfterViewInit, OnDestroy {
    private zone;
    attachments: Attachment[];
    layout: AttachmentLayout;
    tabbable: boolean;
    template: AttachmentTemplateDirective;
    readonly carousel: boolean;
    deck: ElementRef;
    items: QueryList<ElementRef>;
    scrollPosition: number;
    private selectedIndex;
    private scrollSubscription;
    private carouselKeyHandlers;
    private listKeyHandlers;
    constructor(zone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    isSelected(index: number): boolean;
    itemKeydown(e: any, attachment: Attachment): void;
    itemClick(index: number): void;
    focus(): void;
    scrollTo(dir: number): void;
    private select;
    private navigateTo;
    private onScroll;
}
