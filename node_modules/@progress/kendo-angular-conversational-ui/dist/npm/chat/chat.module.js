"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attachment_component_1 = require("./attachment.component");
var chat_directives_1 = require("./chat.directives");
var kendo_angular_buttons_1 = require("@progress/kendo-angular-buttons");
var common_1 = require("@angular/common");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var custom_messages_component_1 = require("./l10n/custom-messages.component");
var focused_state_directive_1 = require("../common/focused-state.directive");
var hero_card_component_1 = require("../cards/hero-card.component");
var localized_messages_directive_1 = require("./l10n/localized-messages.directive");
var message_attachments_component_1 = require("./message-attachments.component");
var message_component_1 = require("./message.component");
var message_list_component_1 = require("./message-list.component");
var core_1 = require("@angular/core");
var scroll_anchor_directive_1 = require("../common/scroll-anchor.directive");
var suggested_actions_component_1 = require("./suggested-actions.component");
var PUBLIC_DIRECTIVES = [
    chat_directives_1.ChatComponent,
    custom_messages_component_1.CustomMessagesComponent,
    chat_directives_1.AttachmentTemplateDirective,
    chat_directives_1.MessageTemplateDirective,
    hero_card_component_1.HeroCardComponent
];
var PRIVATE_DIRECTIVES = [
    attachment_component_1.AttachmentComponent,
    focused_state_directive_1.FocusedStateDirective,
    localized_messages_directive_1.LocalizedMessagesDirective,
    message_attachments_component_1.MessageAttachmentsComponent,
    message_component_1.MessageComponent,
    message_list_component_1.MessageListComponent,
    chat_directives_1.MessageTemplateDirective,
    scroll_anchor_directive_1.ScrollAnchorDirective,
    suggested_actions_component_1.SuggestedActionsComponent
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
        { type: core_1.NgModule, args: [{
                    declarations: PUBLIC_DIRECTIVES.concat(PRIVATE_DIRECTIVES),
                    exports: [PUBLIC_DIRECTIVES],
                    imports: [
                        kendo_angular_buttons_1.ButtonModule,
                        common_1.CommonModule,
                        kendo_angular_common_1.ResizeSensorModule
                    ]
                },] },
    ];
    return ChatModule;
}());
exports.ChatModule = ChatModule;
