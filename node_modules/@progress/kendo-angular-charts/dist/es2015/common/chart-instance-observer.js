import { InstanceObserver } from '@progress/kendo-charts';
/**
 * @hidden
 */
export class ChartInstanceObserver extends InstanceObserver {
    constructor(instance) {
        super(instance);
        this.handlerMap = {
            hideTooltip: 'onHideTooltip',
            legendItemClick: 'onLegendItemClick',
            render: 'onRender',
            showTooltip: 'onShowTooltip',
            init: 'onInit'
        };
    }
}
