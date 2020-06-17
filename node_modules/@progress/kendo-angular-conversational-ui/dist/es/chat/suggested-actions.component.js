import * as tslib_1 from "tslib";
import { Component, EventEmitter, forwardRef, HostBinding, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { ChatItem } from './chat-item';
// tslint:disable:no-forward-ref
/**
 * @hidden
 */
var SuggestedActionsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SuggestedActionsComponent, _super);
    function SuggestedActionsComponent() {
        var _a;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dispatch = new EventEmitter();
        _this.defaultClass = true;
        _this.selectedIndex = 0;
        _this.keyHandlers = (_a = {},
            _a[37 /* left */] = function (e) { return _this.navigateTo(e, -1); },
            _a[39 /* right */] = function (e) { return _this.navigateTo(e, 1); },
            _a[13 /* enter */] = function (_, action) { return _this.actionClick(action); },
            _a);
        return _this;
    }
    SuggestedActionsComponent.prototype.isSelected = function (index) {
        return this.selected && this.selectedIndex === index;
    };
    SuggestedActionsComponent.prototype.actionClick = function (action) {
        this.dispatch.next(action);
    };
    SuggestedActionsComponent.prototype.actionKeydown = function (e, action) {
        var handler = this.keyHandlers[e.keyCode];
        if (handler) {
            handler(e, action);
        }
    };
    SuggestedActionsComponent.prototype.focus = function () {
        this.select(this.selectedIndex);
    };
    SuggestedActionsComponent.prototype.select = function (index) {
        this.selectedIndex = index;
        var item = this.items.toArray()[index];
        if (item) {
            item.nativeElement.focus();
        }
    };
    SuggestedActionsComponent.prototype.navigateTo = function (e, offset) {
        var prevIndex = this.selectedIndex;
        var nextIndex = Math.max(0, Math.min(prevIndex + offset, this.items.length - 1));
        if (nextIndex !== prevIndex) {
            this.select(nextIndex);
            e.preventDefault();
        }
    };
    SuggestedActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-chat-suggested-actions',
                    providers: [{
                            provide: ChatItem,
                            useExisting: forwardRef(function () { return SuggestedActionsComponent; })
                        }],
                    template: "\n    <span #item\n      *ngFor=\"let action of actions; index as index; first as first; last as last\"\n      class=\"k-quick-reply\"\n      [class.k-state-selected]=\"isSelected(index)\"\n      [class.k-state-focused]=\"isSelected(index)\"\n      [class.k-first]=\"first\"\n      [class.k-last]=\"last\"\n      [attr.tabindex]=\"tabbable && selectedIndex === index ? '0' : '-1'\"\n      (click)=\"actionClick(action)\"\n      (keydown)=\"actionKeydown($event, action)\"\n    >\n      {{ action.title || action.value }}\n    </span>\n  "
                },] },
    ];
    SuggestedActionsComponent.propDecorators = {
        actions: [{ type: Input }],
        tabbable: [{ type: Input }],
        dispatch: [{ type: Output }],
        defaultClass: [{ type: HostBinding, args: ['class.k-quick-replies',] }],
        items: [{ type: ViewChildren, args: ['item',] }]
    };
    return SuggestedActionsComponent;
}(ChatItem));
export { SuggestedActionsComponent };
