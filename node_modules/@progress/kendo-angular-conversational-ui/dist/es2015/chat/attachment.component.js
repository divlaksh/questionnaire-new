import { Component, Input } from '@angular/core';
import { AttachmentTemplateDirective } from './chat.directives';
/**
 * @hidden
 */
export class AttachmentComponent {
    set attachment(value) {
        this._attachment = value;
        this.context = {
            $implicit: this.attachment
        };
    }
    get attachment() {
        return this._attachment;
    }
    get image() {
        return this.contentType.indexOf('image/') === 0;
    }
    get unknown() {
        return !this.image;
    }
    get contentType() {
        return this.attachment.contentType || '';
    }
}
AttachmentComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-chat-attachment',
                template: `
    <ng-container *ngIf="template">
      <ng-container *ngTemplateOutlet="template.templateRef; context: context;">
      </ng-container>
    </ng-container>

    <div *ngIf="!template" class="k-card">
      <div class="k-card-body">
        <h5 class="k-card-title" *ngIf="attachment.title">
          {{ attachment.title }}
        </h5>
        <h6 class="k-card-subtitle" *ngIf="attachment.subtitle">
          {{ attachment.subtitle }}
        </h6>
        <img *ngIf="image" [attr.src]="attachment.content" />
        <ng-container *ngIf="unknown">
          {{ attachment.content }}
        </ng-container>
      </div>
    </div>
  `
            },] },
];
AttachmentComponent.propDecorators = {
    attachment: [{ type: Input }],
    template: [{ type: Input }]
};
