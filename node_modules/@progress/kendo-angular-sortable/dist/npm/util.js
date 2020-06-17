"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var NODE_NAME_PREDICATES = {};
var NODE_ATTR_PREDICATES = {};
var focusableRegex = /^(?:a|input|select|option|textarea|button|object)$/i;
/**
 * @hidden
 */
exports.matchesNodeName = function (nodeName) {
    if (!NODE_NAME_PREDICATES[nodeName]) {
        NODE_NAME_PREDICATES[nodeName] = function (element) {
            return String(element.nodeName).toLowerCase() === nodeName.toLowerCase();
        };
    }
    return NODE_NAME_PREDICATES[nodeName];
};
/**
 * @hidden
 */
exports.matchesNodeAttr = function (nodeAttr) {
    if (!NODE_ATTR_PREDICATES[nodeAttr]) {
        NODE_ATTR_PREDICATES[nodeAttr] = function (element) {
            return element.hasAttribute ? element.hasAttribute(nodeAttr) : false;
        };
    }
    return NODE_ATTR_PREDICATES[nodeAttr];
};
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
 * Returns an object specifiying whether there is a DraggableDirective under the cursor.
 * @hidden
 */
exports.draggableFromPoint = function (x, y) {
    if (!kendo_angular_common_1.isDocumentAvailable()) {
        return;
    }
    var el = document.elementFromPoint(x, y);
    if (!el) {
        return;
    }
    var isDraggable = el.hasAttribute("kendoDraggable");
    var isChild = exports.closest(el, exports.matchesNodeAttr("kendoDraggable")) !== null;
    var parentDraggable = exports.closest(el, exports.matchesNodeAttr("kendoDraggable"));
    var index = parentDraggable ? parseInt(parentDraggable.getAttribute("data-sortable-index"), 10) : -1;
    return {
        element: el,
        index: index,
        isDraggable: isDraggable,
        isDraggableChild: isChild,
        parentDraggable: parentDraggable,
        rect: el.getBoundingClientRect()
    };
};
/**
 * Returns the DraggableDirective under the cursor.
 * @hidden
 */
exports.draggableFromEvent = function (event, sortable) {
    var target;
    if (event.changedTouches) {
        var touch = event.changedTouches[0];
        target = exports.draggableFromPoint(touch.clientX, touch.clientY);
    }
    else {
        target = exports.draggableFromPoint(event.clientX, event.clientY);
    }
    // TODO: refactor sortable. Add draggable getter
    return sortable.draggables.toArray()[target ? target.index : -1];
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
var ɵ0 = toClassList;
exports.ɵ0 = ɵ0;
/**
 * @hidden
 */
exports.hasClasses = function (element, classNames) {
    var namesList = toClassList(classNames);
    return Boolean(toClassList(element.className).find(function (className) { return namesList.indexOf(className) >= 0; }));
};
var isSortable = exports.matchesNodeName('kendo-sortable');
/**
 * @hidden
 */
exports.widgetTarget = function (target) {
    var element = exports.closest(target, function (node) { return exports.hasClasses(node, 'k-widget') || isSortable(node); });
    return element && !isSortable(element);
};
var hasRelativeStackingContext = function () {
    if (!kendo_angular_common_1.isDocumentAvailable()) {
        return false;
    }
    var top = 10;
    var parent = document.createElement("div");
    parent.style.transform = "matrix(10, 0, 0, 10, 0, 0)";
    parent.innerHTML = "<div style=\"position: fixed; top: " + top + "px;\">child</div>";
    document.body.appendChild(parent);
    var isDifferent = parent.children[0].getBoundingClientRect().top !== top;
    document.body.removeChild(parent);
    return isDifferent;
};
var ɵ1 = hasRelativeStackingContext;
exports.ɵ1 = ɵ1;
var HAS_RELATIVE_STACKING_CONTEXT = hasRelativeStackingContext();
/**
 * @hidden
 */
exports.relativeContextElement = function (element) {
    if (!element || !HAS_RELATIVE_STACKING_CONTEXT) {
        return null;
    }
    var node = element.parentElement;
    while (node) {
        if (window.getComputedStyle(node).transform !== 'none') {
            return node;
        }
        node = node.parentElement;
    }
};
