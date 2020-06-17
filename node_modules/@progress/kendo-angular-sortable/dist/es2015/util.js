import { isDocumentAvailable } from '@progress/kendo-angular-common';
const NODE_NAME_PREDICATES = {};
const NODE_ATTR_PREDICATES = {};
const focusableRegex = /^(?:a|input|select|option|textarea|button|object)$/i;
/**
 * @hidden
 */
export const matchesNodeName = (nodeName) => {
    if (!NODE_NAME_PREDICATES[nodeName]) {
        NODE_NAME_PREDICATES[nodeName] = (element) => String(element.nodeName).toLowerCase() === nodeName.toLowerCase();
    }
    return NODE_NAME_PREDICATES[nodeName];
};
/**
 * @hidden
 */
export const matchesNodeAttr = (nodeAttr) => {
    if (!NODE_ATTR_PREDICATES[nodeAttr]) {
        NODE_ATTR_PREDICATES[nodeAttr] = (element) => element.hasAttribute ? element.hasAttribute(nodeAttr) : false;
    }
    return NODE_ATTR_PREDICATES[nodeAttr];
};
/**
 * @hidden
 */
export const closest = (node, predicate) => {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};
/**
 * Returns an object specifiying whether there is a DraggableDirective under the cursor.
 * @hidden
 */
export const draggableFromPoint = (x, y) => {
    if (!isDocumentAvailable()) {
        return;
    }
    let el = document.elementFromPoint(x, y);
    if (!el) {
        return;
    }
    const isDraggable = el.hasAttribute("kendoDraggable");
    const isChild = closest(el, matchesNodeAttr("kendoDraggable")) !== null;
    const parentDraggable = closest(el, matchesNodeAttr("kendoDraggable"));
    const index = parentDraggable ? parseInt(parentDraggable.getAttribute("data-sortable-index"), 10) : -1;
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
export const draggableFromEvent = (event, sortable) => {
    let target;
    if (event.changedTouches) {
        const touch = event.changedTouches[0];
        target = draggableFromPoint(touch.clientX, touch.clientY);
    }
    else {
        target = draggableFromPoint(event.clientX, event.clientY);
    }
    // TODO: refactor sortable. Add draggable getter
    return sortable.draggables.toArray()[target ? target.index : -1];
};
/**
 * @hidden
 */
export const isFocusable = (element) => {
    if (element.tagName) {
        const tagName = element.tagName.toLowerCase();
        const tabIndex = element.getAttribute('tabIndex');
        const skipTab = tabIndex === '-1';
        let focusable = tabIndex !== null && !skipTab;
        if (focusableRegex.test(tagName)) {
            focusable = !element.disabled && !skipTab;
        }
        return focusable;
    }
    return false;
};
const toClassList = (classNames) => String(classNames).trim().split(' ');
const ɵ0 = toClassList;
/**
 * @hidden
 */
export const hasClasses = (element, classNames) => {
    const namesList = toClassList(classNames);
    return Boolean(toClassList(element.className).find((className) => namesList.indexOf(className) >= 0));
};
const isSortable = matchesNodeName('kendo-sortable');
/**
 * @hidden
 */
export const widgetTarget = (target) => {
    const element = closest(target, node => hasClasses(node, 'k-widget') || isSortable(node));
    return element && !isSortable(element);
};
const hasRelativeStackingContext = () => {
    if (!isDocumentAvailable()) {
        return false;
    }
    const top = 10;
    const parent = document.createElement("div");
    parent.style.transform = "matrix(10, 0, 0, 10, 0, 0)";
    parent.innerHTML = `<div style="position: fixed; top: ${top}px;">child</div>`;
    document.body.appendChild(parent);
    const isDifferent = parent.children[0].getBoundingClientRect().top !== top;
    document.body.removeChild(parent);
    return isDifferent;
};
const ɵ1 = hasRelativeStackingContext;
const HAS_RELATIVE_STACKING_CONTEXT = hasRelativeStackingContext();
/**
 * @hidden
 */
export const relativeContextElement = (element) => {
    if (!element || !HAS_RELATIVE_STACKING_CONTEXT) {
        return null;
    }
    let node = element.parentElement;
    while (node) {
        if (window.getComputedStyle(node).transform !== 'none') {
            return node;
        }
        node = node.parentElement;
    }
};
export { ɵ0, ɵ1 };
