"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ITEM_FIELDS = ['textField', 'urlField', 'iconField', 'disabledField', 'cssClassField', 'cssStyleField', 'separatorField'];
/**
 * @hidden
 */
var BindingDirectiveBase = /** @class */ (function () {
    function BindingDirectiveBase(menu) {
        this.menu = menu;
    }
    BindingDirectiveBase.prototype.ngOnChanges = function () {
        this.rebind();
    };
    /**
     *  Rebinds the Menu items.
     */
    BindingDirectiveBase.prototype.rebind = function () {
        var fields = this.fields = [];
        for (var idx = 0; idx < ITEM_FIELDS.length; idx++) {
            var inputName = ITEM_FIELDS[idx];
            var inputValue = this[inputName];
            if (inputValue) {
                fields.push({ target: inputName.replace('Field', ''), source: inputValue });
            }
        }
        this.menu.items = this.data ? this.mapItems(this.data) : [];
    };
    return BindingDirectiveBase;
}());
exports.BindingDirectiveBase = BindingDirectiveBase;
