import { Injectable } from '@angular/core';
/**
 * @hidden
 */
var ContextMenuTargetService = /** @class */ (function () {
    function ContextMenuTargetService() {
        this.targets = [];
    }
    ContextMenuTargetService.prototype.add = function (target) {
        this.targets.push(target);
    };
    ContextMenuTargetService.prototype.remove = function (target) {
        var index = this.targets.indexOf(target);
        this.targets.splice(index, 1);
    };
    ContextMenuTargetService.prototype.find = function (targetElement) {
        return this.targets.find(function (target) { return target.element === targetElement; });
    };
    ContextMenuTargetService.decorators = [
        { type: Injectable },
    ];
    return ContextMenuTargetService;
}());
export { ContextMenuTargetService };
