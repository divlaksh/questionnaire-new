import { AttachmentComponent } from './attachment.component';
import { AttachmentTemplateDirective, ChatComponent, MessageTemplateDirective } from './chat.directives';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { CommonModule } from '@angular/common';
import { ResizeSensorModule } from '@progress/kendo-angular-common';
import { CustomMessagesComponent } from './l10n/custom-messages.component';
import { FocusedStateDirective } from '../common/focused-state.directive';
import { HeroCardComponent } from '../cards/hero-card.component';
import { LocalizedMessagesDirective } from './l10n/localized-messages.directive';
import { MessageAttachmentsComponent } from './message-attachments.component';
import { MessageComponent } from './message.component';
import { MessageListComponent } from './message-list.component';
import { NgModule } from '@angular/core';
import { ScrollAnchorDirective } from '../common/scroll-anchor.directive';
import { SuggestedActionsComponent } from './suggested-actions.component';
var PUBLIC_DIRECTIVES = [
    ChatComponent,
    CustomMessagesComponent,
    AttachmentTemplateDirective,
    MessageTemplateDirective,
    HeroCardComponent
];
var PRIVATE_DIRECTIVES = [
    AttachmentComponent,
    FocusedStateDirective,
    LocalizedMessagesDirective,
    MessageAttachmentsComponent,
    MessageComponent,
    MessageListComponent,
    MessageTemplateDirective,
    ScrollAnchorDirective,
    SuggestedActionsComponent
];
/**
 * The [NgModule]({{ site.data.urls.angular['ngmodules'] }}) for the Chat component.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { Component } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 *
 * import { ChatModule } from '@progress/kendo-angular-conversational-ui';
 * import { AppComponent }   from './app.component';
 *
 * _@NgModule({
 *   imports:      [ BrowserModule, ChatModule ],
 *   declarations: [ AppComponent ],
 *   bootstrap:    [ AppComponent ]
 * })
 *
 * export class AppModule { }
 * ```
 */
var ChatModule = /** @class */ (function () {
    function ChatModule() {
    }
    ChatModule.decorators = [
        { type: NgModule, args: [{
                    declarations: PUBLIC_DIRECTIVES.concat(PRIVATE_DIRECTIVES),
                    exports: [PUBLIC_DIRECTIVES],
                    imports: [
                        ButtonModule,
                        CommonModule,
                        ResizeSensorModule
                    ]
                },] },
    ];
    return ChatModule;
}());
export { ChatModule };
