"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var POPUP_ALIGN = {
    vertical: 'top',
    horizontal: 'left'
};
var POPUP_ALIGN_RTL = {
    vertical: 'top',
    horizontal: 'right'
};
var VERTICAL_COLLISION = {
    vertical: 'flip',
    horizontal: 'fit'
};
var HORIZONTAL_COLLISION = {
    vertical: 'fit',
    horizontal: 'flip'
};
/**
 * @hidden
 */
exports.POPUP_SETTINGS_RTL = {
    vertical: {
        anchor: {
            vertical: 'bottom',
            horizontal: 'right'
        },
        popup: POPUP_ALIGN_RTL,
        collision: VERTICAL_COLLISION,
        animate: 'down'
    },
    horizontal: {
        anchor: {
            vertical: 'top',
            horizontal: 'left'
        },
        popup: POPUP_ALIGN_RTL,
        collision: HORIZONTAL_COLLISION,
        animate: 'left'
    }
};
/**
 * @hidden
 */
exports.POPUP_SETTINGS = {
    vertical: {
        anchor: {
            vertical: 'bottom',
            horizontal: 'left'
        },
        popup: POPUP_ALIGN,
        collision: VERTICAL_COLLISION,
        animate: 'down'
    },
    horizontal: {
        anchor: {
            vertical: 'top',
            horizontal: 'right'
        },
        popup: POPUP_ALIGN,
        collision: HORIZONTAL_COLLISION,
        animate: 'right'
    }
};
