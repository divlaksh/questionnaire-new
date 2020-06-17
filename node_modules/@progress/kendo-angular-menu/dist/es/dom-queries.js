import { NODE_INDEX } from './constants';
var DEFAULT_ID = 'kendo-matches-container';
var focusableRegex = /^(?:a|input|select|option|textarea|button|object)$/i;
var matches = function (element, selector) { return (element.matches || element.msMatchesSelector).call(element, selector); };
var ɵ0 = matches;
/**
 * @hidden
 */
export var closest = function (node, predicate) {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};
/**
 * @hidden
 */
export var closestInScope = function (node, predicate, scope) {
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
export var isFocusable = function (element) {
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
/**
 * @hidden
 */
export var hasClass = function (element, name) {
    return toClassList(element.className).indexOf(name) >= 0;
};
/**
 * @hidden
 */
export var matchesClasses = function (classes) {
    var list = toClassList(classes);
    return function (element) {
        var classList = toClassList(element.className);
        return Boolean(list.find(function (name) { return classList.indexOf(name) >= 0; }));
    };
};
/**
 * @hidden
 */
export var nodeIndex = function (node) { return node.getAttribute(NODE_INDEX); };
/**
 * @hidden
 */
export var closestItem = function (node, scope) { return closestInScope(node, nodeIndex, scope); };
/**
 * @hidden
 */
export var closestList = function (node) {
    var list = closest(node, matchesClasses('k-menu-popup k-menu k-menu-group'));
    if (list && hasClass(list, 'k-menu-popup')) {
        list = list.querySelector('.k-menu-group');
    }
    return list;
};
/**
 * @hidden
 */
export var inMenu = function (node, itemsService) {
    if (node === itemsService.lists[0].element.nativeElement) {
        return false;
    }
    var list = closestList(node);
    return list && itemsService.containsList(list);
};
/**
 * @hidden
 */
export var findInContainer = function (element, selector, container) {
    var id = container.getAttribute('id');
    if (!id) {
        container.setAttribute('id', DEFAULT_ID);
    }
    var contextSelector = "#" + (id || DEFAULT_ID) + " " + selector;
    var match = closestInScope(element, function (node) { return matches(node, contextSelector); }, container);
    if (!id) {
        container.removeAttribute('id');
    }
    return match;
};
export { ɵ0, ɵ1 };
