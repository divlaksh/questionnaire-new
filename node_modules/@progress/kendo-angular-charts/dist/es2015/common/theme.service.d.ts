import { NgZone } from '@angular/core';
import { ConfigurationService } from './configuration.service';
/**
 * @hidden
 */
export declare class ThemeService extends ConfigurationService {
    private loaded;
    private element;
    constructor(ngZone: NgZone);
    loadTheme(): void;
    private readTheme;
    private readDefaultTheme;
    private createElement;
    private destroyElement;
    private setStyle;
    private setColors;
    private setFonts;
    private setSeriesColors;
    private mapColor;
    private queryColor;
    private queryStyle;
}
