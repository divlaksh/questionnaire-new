import { Message } from './message.interface';
/**
 * Arguments for the `SendMessage` event.
 *
 */
export declare class SendMessageEvent {
    /**
     * The message which contains the metadata and the user input.
     *
     * > The Chat does not automatically append the message to its data.
     * > For more information, refer to the article on [data binding]({% slug databinding_chat %}).
     */
    message: Message;
    /**
     * @hidden
     */
    constructor(message: Message);
}
