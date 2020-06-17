import { SchedulerView } from '../types';
import { ToolbarService } from './toolbar.service';
import { ToolbarContext } from './toolbar-context';
/**
 * A toolbar component which contains the controls for switching the views
 * ([see example]({% slug toolbar_scheduler %}#toc-including-the-built-in-components)).
 *
 * To render the view-selection buttons, include the component in the
 * [toolbar template]({% slug api_scheduler_toolbartemplatedirective %}).
 *
 * {% meta height:700 %}
 * {% embed_file toolbar/template/app.component.ts preview %}
 * {% embed_file toolbar/template/my-navigation.component.ts %}
 * {% embed_file toolbar/template/app.module.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% embed_file shared/main.ts %}
 * {% endmeta %}
 */
export declare class ToolbarViewSelectorComponent {
    private service;
    /**
     * @hidden
     */
    hostClasses: boolean;
    /**
     * @hidden
     */
    expanded: boolean;
    /**
     * @hidden
     */
    readonly ctx: ToolbarContext;
    /**
     * @hidden
     */
    readonly itemDisplay: string;
    constructor(service: ToolbarService);
    /**
     * @hidden
     */
    onClick(view: SchedulerView): boolean;
    /**
     * @hidden
     */
    onCurrentViewClick(e: MouseEvent): boolean;
    /**
     * @hidden
     */
    isSelected(view: SchedulerView): boolean;
}
