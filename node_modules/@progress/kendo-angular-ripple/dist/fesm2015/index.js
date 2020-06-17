import { Directive, ElementRef, HostBinding, Input, NgModule, Renderer2 } from '@angular/core';
import { register } from '@progress/kendo-ripple';
import { isDocumentAvailable } from '@progress/kendo-angular-common';

/**
 * Represents the Ripple container component.
 *
 * You can apply this directive to any container element.
 * The ripple effect will show on the following elements:
 * - Buttons
 * - Checkboxes
 * - Radio buttons
 *
 * @example
 * ```ts-no-run
 * <div kendoRippleContainer>
 *     <button kendoButton>Default Button</button>
 *
 *     <button kendoButton [primary]="true">Primary Button</button>
 * </div>
 * ```
 */
class RippleContainerDirective {
    constructor(renderer, element) {
        this.renderer = renderer;
        this.element = element;
        this.isDisabled = false;
        this.removeListeners = () => { };
    }
    /**
     * Provides an option to disable the ripple effect of the `kendoRippleContainer` element.
     * By default, `disabled` is set to `false`.
     */
    set disabled(disabled) {
        this.isDisabled = disabled;
        if (this.isDisabled) {
            this.removeListeners();
        }
        else {
            this.registerListeners();
        }
        this.renderer.setProperty(this.element.nativeElement, 'disabled', disabled);
    }
    get containerClass() {
        return true;
    }
    ngOnDestroy() {
        this.removeListeners();
    }
    ngAfterViewInit() {
        if (!this.isDisabled) {
            this.registerListeners();
        }
    }
    registerListeners() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.removeListeners();
        const callback = register(this.element.nativeElement, [
            { selector: ".k-button:not(li)" },
            { selector: ".k-list>.k-item", options: { global: true } },
            { selector: ".k-checkbox-label,.k-radio-label" },
            { selector: ".k-checkbox,.k-radio",
                options: {
                    events: ["focusin"],
                    container: el => {
                        if (/\b(k-checkbox|k-radio)\b/.test(el.className)) {
                            return el.nextElementSibling;
                        }
                    }
                }
            }
        ]);
        this.removeListeners = callback;
    }
}
RippleContainerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoRippleContainer]'
            },] },
];
/** @nocollapse */
RippleContainerDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
RippleContainerDirective.propDecorators = {
    disabled: [{ type: Input }],
    containerClass: [{ type: HostBinding, args: ['class.k-ripple-container',] }]
};

const COMPONENT_DIRECTIVES = [RippleContainerDirective];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Ripple directive.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Ripple module
 * import { RippleModule } from '@progress/kendo-angular-ripple';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, RippleModule], // import Ripple module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class RippleModule {
}
RippleModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES],
                exports: [COMPONENT_DIRECTIVES]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { RippleContainerDirective, RippleModule };
