import { drawing } from '@progress/kendo-drawing';
import { ConfigurationService } from '../../common/configuration.service';
import { SettingsComponent } from '../../common/settings.component';
import { Border, HighlightLine, HighlightVisualArgs, HighlightToggleArgs, MarkersHighlight } from '../../common/property-types';
import { SeriesHighlight } from '../../common/property-types';
/**
 * @hidden
 */
export declare abstract class SeriesHighlightComponentGenerated extends SettingsComponent implements SeriesHighlight {
    configurationService: ConfigurationService;
    border: Border;
    color: string;
    line: HighlightLine;
    markers: MarkersHighlight;
    opacity: number;
    toggle: (e: HighlightToggleArgs) => void;
    visible: boolean;
    visual: (e: HighlightVisualArgs) => drawing.Element;
    constructor(configurationService: ConfigurationService);
}
