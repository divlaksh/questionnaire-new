import { TemplateRef } from '@angular/core';
/**
 * An interface for the Menu items.
 */
export interface MenuItem {
    /**
     * Specifies the item text ([see example]({% slug items_menu %}#toc-text)).
     */
    text?: string;
    /**
     * Specifies a URL which is rendered as a `href` attribute on the item link
     * ([see example]({% slug items_menu %}#toc-url)).
     */
    url?: string;
    /**
     * Specifies the name of the [font icon]({% slug icons %}#toc-list-of-font-icons) that will
     * be rendered for the item ([see example]({% slug items_menu %}#toc-icon)).
     */
    icon?: string;
    /**
     * Specifies if the item is disabled ([see example]({% slug items_menu %}#toc-disabled-state)).
     */
    disabled?: boolean;
    /**
     * The CSS classes that will be rendered on the item element ([see example]({% slug items_menu %}#toc-styles-and-classes)).
     * Supports the type of values that are supported by [`ngClass`]({{ site.data.urls.angular['ngclassapi'] }}).
     */
    cssClass?: any;
    /**
     * The CSS styles that will be rendered on the item element ([see example]({% slug items_menu %}#toc-styles-and-classes)).
     * Supports the type of values that are supported by [`ngStyle`]({{ site.data.urls.angular['ngstyleapi'] }}).
     */
    cssStyle?: any;
    /**
     * Specifies a template for the item.
     */
    template?: TemplateRef<any>;
    /**
     * Specifies a template for the item content.
     */
    contentTemplate?: TemplateRef<any>;
    /**
     * Specifies the children of the item ([see example]({% slug databinding_menu %})).
     */
    items?: any[];
    /**
     * Represents the additional data that is associated with the Menu item.
     */
    data?: any;
    /**
     * Specifies if this is a separator item.
     * If set to true only the `cssClass` and `cssStyle` fields are rendered.
     */
    separator?: boolean;
}
