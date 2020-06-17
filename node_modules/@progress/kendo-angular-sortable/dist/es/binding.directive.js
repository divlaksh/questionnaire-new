import { Directive, Input } from '@angular/core';
import { SortableComponent } from './sortable.component';
import { SortableService } from './sortable.service';
import { DataAddEvent, DataMoveEvent, DataRemoveEvent } from './data-events';
import { filter, take } from 'rxjs/operators';
/**
 * A Directive which handles the most common scenarios such reordering and moving items between Sortables, thus minimizng boilerplate code.
 * This is achieved by subscribing to the Sortable's events and handling them using the API methods it provides.
 */
var SortableBindingDirective = /** @class */ (function () {
    function SortableBindingDirective(sortable, sortableService) {
        this.sortable = sortable;
        this.sortableService = sortableService;
        this.sortableService = sortableService;
    }
    Object.defineProperty(SortableBindingDirective.prototype, "data", {
        /**
         * Sets a data-bound array that is used as a data source for the Sortable.
         *
         * {% embed_file overview/app.component.ts %}
         * {% embed_file shared/app.module.ts %}
         * {% embed_file shared/main.ts hidden %}
         */
        set: function (data) {
            this.sortable.data = data;
        },
        enumerable: true,
        configurable: true
    });
    SortableBindingDirective.prototype.nextEnabledIndex = function (index, sortable) {
        for (var i = index; i <= sortable.data.length; i++) {
            if (sortable.itemEnabled(i)) {
                return i;
            }
        }
    };
    SortableBindingDirective.prototype.addItem = function (event, sortable) {
        var index = event.index;
        var dataItem = this.sortableService.getSource().data[event.oldIndex];
        var addEvent = new DataAddEvent({ index: index, dataItem: dataItem });
        sortable.dataAdd.emit(addEvent);
        if (!addEvent.isDefaultPrevented()) {
            sortable.addDataItem(dataItem, index);
        }
        return !addEvent.isDefaultPrevented();
    };
    SortableBindingDirective.prototype.removeItem = function (event, sortable) {
        var originDraggable = this.sortableService.originDraggable;
        var removeEvent = new DataRemoveEvent({ index: event.oldIndex, dataItem: sortable.data[event.oldIndex] });
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
    };
    SortableBindingDirective.prototype.moveItem = function (event, sortable) {
        if (event.index === event.oldIndex) {
            return false;
        }
        var moveEvent = new DataMoveEvent({
            dataItem: sortable.data[event.oldIndex],
            index: event.index,
            oldIndex: event.oldIndex
        });
        sortable.dataMove.emit(moveEvent);
        if (!moveEvent.isDefaultPrevented()) {
            sortable.moveItem(event.oldIndex, event.index);
        }
        return !moveEvent.isDefaultPrevented();
    };
    /**
     * Removes the Draggable item from which the drag started.
     * @hidden
     */
    SortableBindingDirective.prototype.removeOriginDraggable = function () {
        var _this = this;
        if (this.removeHiddenSubscription) {
            this.removeHiddenSubscription.unsubscribe();
        }
        this.removeHiddenSubscription = this.sortableService.onReleaseSubject.pipe(take(1), filter(function (_) { return _this.sortableService.originDraggable !== null && _this.sortableService.originDraggable.hidden; })).subscribe(function (e) {
            var originDraggable = _this.sortableService.originDraggable;
            var newSource = _this.sortableService.getSource();
            if (originDraggable.parent !== _this.sortableService.target) {
                var isTargetDraggable = e.target ? (e.target.isDraggable || e.target.isDraggableChild) : false;
                if (isTargetDraggable || originDraggable.parent !== newSource) {
                    if (originDraggable.parent !== _this.sortableService.target) {
                        originDraggable.parent.removeDataItem(originDraggable.index);
                    }
                }
                _this.sortableService.originDraggable = null;
            }
        });
    };
    SortableBindingDirective.prototype.onDragOver = function (event) {
        var source = this.sortableService.getSource();
        var target = this.sortableService.target;
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
    };
    SortableBindingDirective.prototype.onNavigate = function (event) {
        if (event.ctrlKey) {
            var moveEvent = new DataMoveEvent({
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
    };
    SortableBindingDirective.prototype.ngOnInit = function () {
        this.dragOverSubscription = this.sortable.dragOver.subscribe(this.onDragOver.bind(this));
        this.navigateSubscription = this.sortable.navigate.subscribe(this.onNavigate.bind(this));
    };
    SortableBindingDirective.prototype.ngOnDestroy = function () {
        this.dragOverSubscription.unsubscribe();
        this.navigateSubscription.unsubscribe();
        if (this.removeHiddenSubscription) {
            this.removeHiddenSubscription.unsubscribe();
        }
    };
    SortableBindingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSortableBinding]'
                },] },
    ];
    /** @nocollapse */
    SortableBindingDirective.ctorParameters = function () { return [
        { type: SortableComponent },
        { type: SortableService }
    ]; };
    SortableBindingDirective.propDecorators = {
        data: [{ type: Input, args: ["kendoSortableBinding",] }]
    };
    return SortableBindingDirective;
}());
export { SortableBindingDirective };
