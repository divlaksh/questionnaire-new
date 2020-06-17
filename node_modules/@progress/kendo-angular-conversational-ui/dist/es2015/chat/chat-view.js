import { isDevMode } from '@angular/core';
/**
 * @hidden
 */
export const isAuthor = (user, msg) => user && msg.author && user.id === msg.author.id;
const last = (arr) => arr[arr.length - 1];
const ɵ0 = last;
const dateChanged = (curr, prev) => (curr && prev) && (prev.getDate() !== curr.getDate() ||
    prev.getMonth() !== curr.getMonth() ||
    prev.getFullYear() !== curr.getFullYear());
const ɵ1 = dateChanged;
const addDateMarker = (acc, msg) => {
    const timestamp = msg.timestamp;
    const lastItem = last(acc);
    if (!timestamp) {
        return;
    }
    if (!lastItem || dateChanged(timestamp, lastItem.timestamp)) {
        const dateMarker = {
            type: 'date-marker',
            timestamp: timestamp,
            trackBy: timestamp.getTime()
        };
        acc.push(dateMarker);
    }
};
const ɵ2 = addDateMarker;
const groupMessages = (acc, msg, isLastMessage) => {
    const lastItem = last(acc);
    let messages;
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
const ɵ3 = groupMessages;
const groupItems = (total) => (acc, msg, index) => {
    const isLastMessage = index === total - 1;
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
};
const ɵ4 = groupItems;
/**
 * @hidden
 */
export const chatView = (messages) => messages.reduce(groupItems(messages.length), []);
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4 };
