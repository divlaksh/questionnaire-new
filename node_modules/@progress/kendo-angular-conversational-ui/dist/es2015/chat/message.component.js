import { Component, ElementRef, forwardRef, HostBinding, Input } from '@angular/core';
import { ChatItem } from './chat-item';
import { MessageTemplateDirective } from './message-template.directive';
import { IntlService } from '@progress/kendo-angular-intl';
// tslint:disable:no-forward-ref
/**
 * @hidden
 */
export class MessageComponent extends ChatItem {
    constructor(element, intl) {
        super();
        this.element = element;
        this.intl = intl;
        this.cssClass = true;
    }
    get tabIndex() {
        return this.tabbable ? '0' : '-1';
    }
    formatTimeStamp(date) {
        return this.intl.formatDate(date, { datetime: 'short' });
    }
    focus() {
        this.element.nativeElement.focus();
    }
}
MessageComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-chat-message',
                providers: [{
                        provide: ChatItem,
                        useExisting: forwardRef(() => MessageComponent)
                    }],
                template: `
    <time
      [attr.aria-hidden]="!selected"
      class="k-message-time"
      *ngIf="message.timestamp"
    >
      {{ formatTimeStamp(message.timestamp) }}
    </time>

    <ng-container *ngIf="!message.typing; else typing">
      <div class="k-bubble" *ngIf="template">
        <ng-container
          *ngTemplateOutlet="template.templateRef; context: { $implicit: message };"
        >
        </ng-container>
      </div>

      <div class="k-bubble" *ngIf="!template && message.text">
        {{message.text}}
      </div>
    </ng-container>

    <span
      class="k-message-status"
      *ngIf="message.status"
    >
      {{ message.status }}
    </span>

    <ng-template #typing>
      <div class="k-bubble">
        <div class="k-typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </ng-template>
  `
            },] },
];
/** @nocollapse */
MessageComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: IntlService }
];
MessageComponent.propDecorators = {
    message: [{ type: Input }],
    tabbable: [{ type: Input }],
    template: [{ type: Input }],
    cssClass: [{ type: HostBinding, args: ['class.k-message',] }],
    selected: [{ type: HostBinding, args: ['class.k-state-selected',] }, { type: HostBinding, args: ['class.k-state-focused',] }],
    tabIndex: [{ type: HostBinding, args: ['attr.tabIndex',] }]
};
