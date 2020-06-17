import { Mark } from 'prosemirror-model';
/**
 * @hidden
 */
export interface ActiveMarks {
    marks: Mark[];
    hasNodesWithoutMarks: boolean;
}
