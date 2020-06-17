/* tslint:disable align */
/* tslint:disable:no-use-before-declare */
const compileTemplate = (templateRef, context, updateContext) => {
    let embeddedView = templateRef.createEmbeddedView(context);
    const result = (data) => {
        updateContext(context, data);
        embeddedView.detectChanges();
        return embeddedView.rootNodes.reduce((content, rootNode) => {
            return content + rootNode.textContent;
        }, '').trim();
    };
    result.destroy = () => {
        embeddedView.destroy();
        embeddedView = null;
    };
    return result;
};
const ɵ0 = compileTemplate;
const updateGroupHeaderContext = (context, data) => {
    context.$implicit = context.group = data;
    context.field = data.field;
    context.value = data.value;
    context.aggregates = data.aggregates;
};
const ɵ1 = updateGroupHeaderContext;
const updateGroupFooterContext = (context, data) => {
    context.group = data.group;
    context.$implicit = context.aggregates = data;
};
const ɵ2 = updateGroupFooterContext;
const updateFooterContext = (_context, _data) => { }; /* tslint:disable-line no-empty */
const ɵ3 = updateFooterContext;
/**
 * @hidden
 */
export const toExporterColumns = (sourceColumns) => {
    const exporterColumns = [];
    let columnIndex = 0;
    const addColumns = (columns, result, level) => {
        columns.forEach((column) => {
            if (column.level === level) {
                const exporterColumn = new ExporterColumn(column, columnIndex);
                result.push(exporterColumn);
                if (column.children && column.children.length > 1) {
                    const children = exporterColumn.columns = [];
                    addColumns(column.children, children, level + 1);
                }
                else {
                    columnIndex++;
                }
            }
        });
    };
    addColumns(sourceColumns, exporterColumns, 0);
    return exporterColumns;
};
/**
 * @hidden
 */
export const destroyColumns = (columns) => {
    if (columns) {
        columns.forEach(column => {
            column.destroy();
        });
    }
};
/**
 * @hidden
 */
export class ExporterColumn {
    constructor(column, columnIndex) {
        this.title = column.title;
        this.field = column.field;
        this.hidden = column.hidden;
        this.locked = column.locked;
        this.width = column.width;
        this.headerCellOptions = column.headerCellOptions;
        this.cellOptions = column.cellOptions;
        this.groupHeaderCellOptions = column.groupHeaderCellOptions;
        this.groupFooterCellOptions = column.groupFooterCellOptions;
        this.footerCellOptions = column.footerCellOptions;
        if (column.footerTemplate) {
            this.footerTemplate = compileTemplate(column.footerTemplate.templateRef, {
                $implicit: column,
                column: column,
                columnIndex: columnIndex
            }, updateFooterContext);
        }
        if (column.groupFooterTemplate) {
            this.groupFooterTemplate = compileTemplate(column.groupFooterTemplate.templateRef, {
                column: column,
                field: column.field
            }, updateGroupFooterContext);
        }
        if (column.groupHeaderTemplate) {
            this.groupHeaderTemplate = compileTemplate(column.groupHeaderTemplate.templateRef, {}, updateGroupHeaderContext);
        }
    }
    destroy() {
        if (this.footerTemplate) {
            this.footerTemplate.destroy();
        }
        if (this.groupFooterTemplate) {
            this.groupFooterTemplate.destroy();
        }
        if (this.groupHeaderTemplate) {
            this.groupHeaderTemplate.destroy();
        }
        destroyColumns(this.columns);
    }
}
export { ɵ0, ɵ1, ɵ2, ɵ3 };
