import { SendMessageEvent } from '../api/post-message-event';
var noop = function () { };
var ɵ0 = noop;
var ɵ1 = function (action, sender) {
    sender.sendMessage.emit(new SendMessageEvent({
        author: sender.user,
        text: action.value,
        timestamp: new Date()
    }));
}, ɵ2 = function (action) {
    window.open('tel:' + action.value);
}, ɵ3 = function (action) {
    window.open(action.value);
};
var handlers = {
    'reply': ɵ1,
    'call': ɵ2,
    'openUrl': ɵ3
};
/**
 * @hidden
 */
export var makeHandler = function (action) { return handlers[action.type] || noop; };
export { ɵ0, ɵ1, ɵ2, ɵ3 };
