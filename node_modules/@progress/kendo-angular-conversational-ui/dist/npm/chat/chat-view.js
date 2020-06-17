"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @hidden
 */
exports.isAuthor = function (user, msg) {
    return user && msg.author && user.id === msg.author.id;
};
var last = function (arr) { return arr[arr.length - 1]; };
var ɵ0 = last;
exports.ɵ0 = ɵ0;
var dateChanged = function (curr, prev) {
    return (curr && prev) && (prev.getDate() !== curr.getDate() ||
        prev.getMonth() !== curr.getMonth() ||
        prev.getFullYear() !== curr.getFullYear());
};
var ɵ1 = dateChanged;
exports.ɵ1 = ɵ1;
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
exports.ɵ2 = ɵ2;
var groupMessages = function (acc, msg, isLastMessage) {
    var lastItem = last(acc);
    var messages;
    if (core_1.isDevMode() && !msg.author) {
        throw new Error('Author must be set for message: ' + JSON.stringify(msg));
    }
    if (msg.typing && !isLastMessage) {
        return;
    }
    if (lastItem && lastItem.type === 'message-group') {
        messages = lastItem.messages;
    }
    if (messages && exports.isAuthor(msg.author, last(messages))) {
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
exports.ɵ3 = ɵ3;
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
exports.ɵ4 = ɵ4;
/**
 * @hidden
 */
exports.chatView = function (messages) {
    return messages.reduce(groupItems(messages.length), []);
};
