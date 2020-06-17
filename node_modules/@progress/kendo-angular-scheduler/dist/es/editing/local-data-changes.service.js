import { Injectable, EventEmitter } from '@angular/core';
/**
 * @hidden
 */
var LocalDataChangesService = /** @class */ (function () {
    function LocalDataChangesService() {
        this.changes = new EventEmitter();
    }
    LocalDataChangesService.decorators = [
        { type: Injectable },
    ];
    return LocalDataChangesService;
}());
export { LocalDataChangesService };
