"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var post_message_event_1 = require("../api/post-message-event");
var noop = function () { };
var ɵ0 = noop;
exports.ɵ0 = ɵ0;
var ɵ1 = function (action, sender) {
    sender.sendMessage.emit(new post_message_event_1.SendMessageEvent({
        author: sender.user,
        text: action.value,
        timestamp: new Date()
    }));
}, ɵ2 = function (action) {
    window.open('tel:' + action.value);
}, ɵ3 = function (action) {
    window.open(action.value);
};
exports.ɵ1 = ɵ1;
exports.ɵ2 = ɵ2;
exports.ɵ3 = ɵ3;
var handlers = {
    'reply': ɵ1,
    'call': ɵ2,
    'openUrl': ɵ3
};
/**
 * @hidden
 */
exports.makeHandler = function (action) { return handlers[action.type] || noop; };
