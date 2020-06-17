import { SendMessageEvent } from '../api/post-message-event';
const noop = () => { };
const ɵ0 = noop;
const ɵ1 = (action, sender) => {
    sender.sendMessage.emit(new SendMessageEvent({
        author: sender.user,
        text: action.value,
        timestamp: new Date()
    }));
}, ɵ2 = (action) => {
    window.open('tel:' + action.value);
}, ɵ3 = (action) => {
    window.open(action.value);
};
const handlers = {
    'reply': ɵ1,
    'call': ɵ2,
    'openUrl': ɵ3
};
/**
 * @hidden
 */
export const makeHandler = (action) => handlers[action.type] || noop;
export { ɵ0, ɵ1, ɵ2, ɵ3 };
