"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The selected CRUD operation when the user edits or removes recurring events.
 *
 * The supported values are:
 * * `Edit`
 * * `Remove`
 */
var CrudOperation;
(function (CrudOperation) {
    CrudOperation[CrudOperation["Edit"] = 0] = "Edit";
    CrudOperation[CrudOperation["Remove"] = 1] = "Remove";
})(CrudOperation = exports.CrudOperation || (exports.CrudOperation = {}));
