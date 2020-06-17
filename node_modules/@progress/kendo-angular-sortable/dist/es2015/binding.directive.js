import { Directive, Input } from '@angular/core';
import { SortableComponent } from './sortable.component';
import { SortableService } from './sortable.service';
import { DataAddEvent, DataMoveEvent, DataRemoveEvent } from './data-events';
import { filter, take } from 'rxjs/operators';
/**
 * A Directive which handles the most common scenarios such reordering and moving items between Sortables, thus minimizng boilerplate code.
 * This is achieved by subscribing to the Sortable's events and handling them using the API methods it provides.
 */
export class SortableBindingDirective {
    constructor(sortable, sortableService) {
        this.sortable = sortable;
        this.sortableService = sortableService;
        this.sortableService = sortableService;
    }
    /**
     * Sets a data-bound array that is used as a data source for the Sortable.
     *
     * {% embed_file overview/app.component.ts %}
     * {% embed_file shared/app.module.ts %}
     * {% embed_file shared/main.ts hidden %}
     */
    set data(data) {
        this.sortable.data = data;
    }
    nextEnabledIndex(index, sortable) {
        for (let i = index; i <= sortable.data.length; i++) {
            if (sortable.itemEnabled(i)) {
                return i;
            }
        }
    }
    addItem(event, sortable) {
        const index = event.index;
        const dataItem = this.sortableService.getSource().data[event.oldIndex];
        const addEvent = new DataAddEvent({ index: index, dataItem: dataItem });
        sortable.dataAdd.emit(addEvent);
        if (!addEvent.isDefaultPrevented()) {
            sortable.addDataItem(dataItem, index);
        }
        return !addEvent.isDefaultPrevented();
    }
    removeItem(event, sortable) {
        const originDraggable = this.sortableService.originDraggable;
        const removeEvent = new DataRemoveEvent({ index: event.oldIndex, dataItem: sortable.data[event.oldIndex] });
        sortable.dataRemove.emit(removeEvent);
        if (!removeEvent.isDefaultPrevented()) {
            if (originDraggable && originDraggable.parent === sortable) {
                sortable.hideItem(event.oldIndex, true);
            }
            else {
                sortable.removeDataItem(event.oldIndex);
            }
        }
        return !removeEvent.isDefaultPrevented();
    }
    moveItem(event, sortable) {
        if (event.index === event.oldIndex) {
            return false;
        }
        const moveEvent = new DataMoveEvent({
            dataItem: sortable.data[event.oldIndex],
            index: event.index,
            oldIndex: event.oldIndex
        });
        sortable.dataMove.emit(moveEvent);
        if (!moveEvent.isDefaultPrevented()) {
            sortable.moveItem(event.oldIndex, event.index);
        }
        return !moveEvent.isDefaultPrevented();
    }
    /**
     * Removes the Draggable item from which the drag started.
     * @hidden
     */
    removeOriginDraggable() {
        if (this.removeHiddenSubscription) {
            this.removeHiddenSubscription.unsubscribe();
        }
        this.removeHiddenSubscription = this.sortableService.onReleaseSubject.pipe(take(1), filter(_ => this.sortableService.originDraggable !== null && this.sortableService.originDraggable.hidden)).subscribe((e) => {
            const originDraggable = this.sortableService.originDraggable;
            const newSource = this.sortableService.getSource();
            if (originDraggable.parent !== this.sortableService.target) {
                const isTargetDraggable = e.target ? (e.target.isDraggable || e.target.isDraggableChild) : false;
                if (isTargetDraggable || originDraggable.parent !== newSource) {
                    if (originDraggable.parent !== this.sortableService.target) {
                        originDraggable.parent.removeDataItem(originDraggable.index);
                    }
                }
                this.sortableService.originDraggable = null;
            }
        });
    }
    onDragOver(event) {
        const source = this.sortableService.getSource();
        const target = this.sortableService.target;
        if (event.isDefaultPrevented()) {
            return;
        }
        event.preventDefault();
        if (target === source) {
            this.moveItem(event, target);
        }
        else {
            if (!target.itemEnabled(event.index)) {
                event.index = this.nextEnabledIndex(event.index, target);
            }
            //Add to target and remove from source
            if (this.addItem(event, target) && this.removeItem(event, source)) {
                this.removeOriginDraggable();
                target.activeIndex = event.index;
                source.activeIndex = -1;
            }
        }
    }
    onNavigate(event) {
        if (event.ctrlKey) {
            let moveEvent = new DataMoveEvent({
                dataItem: this.sortable.data[event.oldIndex],
                index: event.index,
                oldIndex: event.oldIndex
            });
            this.sortable.dataMove.emit(moveEvent);
            if (!moveEvent.isDefaultPrevented()) {
                this.sortable.moveItem(event.oldIndex, event.index);
            }
        }
        else {
            this.sortable.activeIndex = event.index;
        }
    }
    ngOnInit() {
        this.dragOverSubscription = this.sortable.dragOver.subscribe(this.onDragOver.bind(this));
        this.navigateSubscription = this.sortable.navigate.subscribe(this.onNavigate.bind(this));
    }
    ngOnDestroy() {
        this.dragOverSubscription.unsubscribe();
        this.navigateSubscription.unsubscribe();
        if (this.removeHiddenSubscription) {
            this.removeHiddenSubscription.unsubscribe();
        }
    }
}
SortableBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSortableBinding]'
            },] },
];
/** @nocollapse */
SortableBindingDirective.ctorParameters = () => [
    { type: SortableComponent },
    { type: SortableService }
];
SortableBindingDirective.propDecorators = {
    data: [{ type: Input, args: ["kendoSortableBinding",] }]
};
