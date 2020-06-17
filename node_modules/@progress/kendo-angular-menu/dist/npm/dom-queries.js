"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var DEFAULT_ID = 'kendo-matches-container';
var focusableRegex = /^(?:a|input|select|option|textarea|button|object)$/i;
var matches = function (element, selector) { return (element.matches || element.msMatchesSelector).call(element, selector); };
var ɵ0 = matches;
exports.ɵ0 = ɵ0;
/**
 * @hidden
 */
exports.closest = function (node, predicate) {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};
/**
 * @hidden
 */
exports.closestInScope = function (node, predicate, scope) {
    while (node && node !== scope && !predicate(node)) {
        node = node.parentNode;
    }
    if (node !== scope) {
        return node;
    }
};
/**
 * @hidden
 */
exports.isFocusable = function (element) {
    if (element.tagName) {
        var tagName = element.tagName.toLowerCase();
        var tabIndex = element.getAttribute('tabIndex');
        var skipTab = tabIndex === '-1';
        var focusable = tabIndex !== null && !skipTab;
        if (focusableRegex.test(tagName)) {
            focusable = !element.disabled && !skipTab;
        }
        return focusable;
    }
    return false;
};
var toClassList = function (classNames) { return String(classNames).trim().split(' '); };
var ɵ1 = toClassList;
exports.ɵ1 = ɵ1;
/**
 * @hidden
 */
exports.hasClass = function (element, name) {
    return toClassList(element.className).indexOf(name) >= 0;
};
/**
 * @hidden
 */
exports.matchesClasses = function (classes) {
    var list = toClassList(classes);
    return function (element) {
        var classList = toClassList(element.className);
        return Boolean(list.find(function (name) { return classList.indexOf(name) >= 0; }));
    };
};
/**
 * @hidden
 */
exports.nodeIndex = function (node) { return node.getAttribute(constants_1.NODE_INDEX); };
/**
 * @hidden
 */
exports.closestItem = function (node, scope) { return exports.closestInScope(node, exports.nodeIndex, scope); };
/**
 * @hidden
 */
exports.closestList = function (node) {
    var list = exports.closest(node, exports.matchesClasses('k-menu-popup k-menu k-menu-group'));
    if (list && exports.hasClass(list, 'k-menu-popup')) {
        list = list.querySelector('.k-menu-group');
    }
    return list;
};
/**
 * @hidden
 */
exports.inMenu = function (node, itemsService) {
    if (node === itemsService.lists[0].element.nativeElement) {
        return false;
    }
    var list = exports.closestList(node);
    return list && itemsService.containsList(list);
};
/**
 * @hidden
 */
exports.findInContainer = function (element, selector, container) {
    var id = container.getAttribute('id');
    if (!id) {
        container.setAttribute('id', DEFAULT_ID);
    }
    var contextSelector = "#" + (id || DEFAULT_ID) + " " + selector;
    var match = exports.closestInScope(element, function (node) { return matches(node, contextSelector); }, container);
    if (!id) {
        container.removeAttribute('id');
    }
    return match;
};
