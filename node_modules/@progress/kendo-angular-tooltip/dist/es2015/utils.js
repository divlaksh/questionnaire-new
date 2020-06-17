/**
 * @hidden
 */
export function align(position, offset) {
    let anchorAlign = {};
    let popupAlign = {};
    let popupMargin = {};
    switch (position) {
        case 'top':
            anchorAlign = { horizontal: 'center', vertical: 'top' };
            popupAlign = { horizontal: 'center', vertical: 'bottom' };
            popupMargin = { horizontal: 0, vertical: offset };
            break;
        case 'bottom':
            anchorAlign = { horizontal: 'center', vertical: 'bottom' };
            popupAlign = { horizontal: 'center', vertical: 'top' };
            popupMargin = { horizontal: 0, vertical: offset };
            break;
        case 'right':
            anchorAlign = { horizontal: 'right', vertical: 'center' };
            popupAlign = { horizontal: 'left', vertical: 'center' };
            popupMargin = { horizontal: offset, vertical: 0 };
            break;
        case 'left':
            anchorAlign = { horizontal: 'left', vertical: 'center' };
            popupAlign = { horizontal: 'right', vertical: 'center' };
            popupMargin = { horizontal: offset, vertical: 0 };
            break;
        default: break;
    }
    return {
        anchorAlign,
        popupAlign,
        popupMargin
    };
}
/**
 * @hidden
 */
export function collision(inputcollision, position) {
    if (inputcollision) {
        return inputcollision;
    }
    if (position === 'top' || position === 'bottom') {
        return { horizontal: 'fit', vertical: 'flip' };
    }
    return { horizontal: 'flip', vertical: 'fit' };
}
function isDocumentNode(container) {
    return container.nodeType === 9;
}
/**
 * @hidden
 */
export function closest(element, selector) {
    if (element.closest) {
        return element.closest(selector);
    }
    const matches = Element.prototype.matches ?
        (el, sel) => el.matches(sel)
        : (el, sel) => el.msMatchesSelector(sel);
    let node = element;
    while (node && !isDocumentNode(node)) {
        if (matches(node, selector)) {
            return node;
        }
        node = node.parentNode;
    }
}
/**
 * @hidden
 */
export function contains(container, child) {
    if (!container) {
        return false;
    }
    if (isDocumentNode(container)) {
        return false;
    }
    if (container.contains) {
        return container.contains(child);
    }
    if (container.compareDocumentPosition) {
        // tslint:disable-next-line
        return !!(container.compareDocumentPosition(child) & Node.DOCUMENT_POSITION_CONTAINED_BY);
    }
}
/**
 * @hidden
 */
export const hasParent = (node, parent) => {
    while (node && node !== parent) {
        node = node.parentNode;
    }
    return node;
};
/**
 * @hidden
 */
export function getCenterOffset(item, dir, size) {
    const rect = item.getBoundingClientRect();
    return rect[dir] + (rect[size] / 2);
}
/**
 * @hidden
 */
export function containsItem(collection, item) {
    return collection.indexOf(item) !== -1;
}
