import { Observable } from 'rxjs';
import { NavigationAction } from '../types';
import { ToolbarContext } from './toolbar-context';
/**
 * A service for communication with the toolbar controls
 * which is used by the toolbar components for publishing navigation actions
 * ([see example]({% slug toolbar_scheduler %}#toc-using-the-toolbar-service)).
 */
export declare class ToolbarService {
    /**
     * A stream of navigation actions that is intended for consumption by the toolbar.
     *
     * @hidden
     */
    readonly action: Observable<NavigationAction>;
    /**
     * The context for the built-in navigation components.
     *
     * @hidden
     */
    context: ToolbarContext;
    private actionSource;
    /** @hidden */
    constructor();
    /**
     * Emits the specified navigation action.
     *
     * @param action - The navigation action that will be executed.
     */
    navigate(action: NavigationAction): void;
}
