import { OnDestroy, OnInit } from '@angular/core';
import { SortableComponent } from './sortable.component';
import { SortableService } from './sortable.service';
/**
 * A Directive which handles the most common scenarios such reordering and moving items between Sortables, thus minimizng boilerplate code.
 * This is achieved by subscribing to the Sortable's events and handling them using the API methods it provides.
 */
export declare class SortableBindingDirective implements OnInit, OnDestroy {
    sortable: SortableComponent;
    private sortableService;
    private removeHiddenSubscription;
    private dragOverSubscription;
    private navigateSubscription;
    /**
     * Sets a data-bound array that is used as a data source for the Sortable.
     *
     * {% embed_file overview/app.component.ts %}
     * {% embed_file shared/app.module.ts %}
     * {% embed_file shared/main.ts hidden %}
     */
    data: any[];
    constructor(sortable: SortableComponent, sortableService: SortableService);
    private nextEnabledIndex;
    private addItem;
    private removeItem;
    private moveItem;
    /**
     * Removes the Draggable item from which the drag started.
     * @hidden
     */
    private removeOriginDraggable;
    private onDragOver;
    private onNavigate;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
