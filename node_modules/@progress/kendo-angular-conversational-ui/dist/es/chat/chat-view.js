import { isDevMode } from '@angular/core';
/**
 * @hidden
 */
export var isAuthor = function (user, msg) {
    return user && msg.author && user.id === msg.author.id;
};
var last = function (arr) { return arr[arr.length - 1]; };
var ɵ0 = last;
var dateChanged = function (curr, prev) {
    return (curr && prev) && (prev.getDate() !== curr.getDate() ||
        prev.getMonth() !== curr.getMonth() ||
        prev.getFullYear() !== curr.getFullYear());
};
var ɵ1 = dateChanged;
var addDateMarker = function (acc, msg) {
    var timestamp = msg.timestamp;
    var lastItem = last(acc);
    if (!timestamp) {
        return;
    }
    if (!lastItem || dateChanged(timestamp, lastItem.timestamp)) {
        var dateMarker = {
            type: 'date-marker',
            timestamp: timestamp,
            trackBy: timestamp.getTime()
        };
        acc.push(dateMarker);
    }
};
var ɵ2 = addDateMarker;
var groupMessages = function (acc, msg, isLastMessage) {
    var lastItem = last(acc);
    var messages;
    if (isDevMode() && !msg.author) {
        throw new Error('Author must be set for message: ' + JSON.stringify(msg));
    }
    if (msg.typing && !isLastMessage) {
        return;
    }
    if (lastItem && lastItem.type === 'message-group') {
        messages = lastItem.messages;
    }
    if (messages && isAuthor(msg.author, last(messages))) {
        messages.push(msg);
    }
    else {
        acc.push({
            type: 'message-group',
            messages: [msg],
            author: msg.author,
            timestamp: msg.timestamp,
            trackBy: msg
        });
    }
};
var ɵ3 = groupMessages;
var groupItems = function (total) { return function (acc, msg, index) {
    var isLastMessage = index === total - 1;
    addDateMarker(acc, msg);
    groupMessages(acc, msg, isLastMessage);
    if (msg.attachments && msg.attachments.length > 1) {
        acc.push({
            type: 'attachment-group',
            attachments: msg.attachments,
            attachmentLayout: msg.attachmentLayout,
            timestamp: msg.timestamp,
            trackBy: msg
        });
    }
    if (msg.suggestedActions && isLastMessage) {
        acc.push({
            type: 'action-group',
            actions: msg.suggestedActions,
            timestamp: msg.timestamp,
            trackBy: msg
        });
    }
    return acc;
}; };
var ɵ4 = groupItems;
/**
 * @hidden
 */
export var chatView = function (messages) {
    return messages.reduce(groupItems(messages.length), []);
};
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4 };
