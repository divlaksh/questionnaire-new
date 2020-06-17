"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The selected edit mode during the update or removal of events.
 * For non-recurring events, set to `Event`.
 *
 * The supported values are:
 * * `Event`&mdash;Edits the selected event.
 * * `Occurrence`&mdash;Edits the selected occurrence.
 * * `Series`&mdash;Edits all events in the series.
 */
var EditMode;
(function (EditMode) {
    EditMode[EditMode["Event"] = 0] = "Event";
    EditMode[EditMode["Occurrence"] = 1] = "Occurrence";
    EditMode[EditMode["Series"] = 2] = "Series";
})(EditMode = exports.EditMode || (exports.EditMode = {}));
