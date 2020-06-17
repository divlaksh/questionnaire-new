import { ChangeDetectorRef, TemplateRef } from '@angular/core';
/**
 * @hidden
 */
export declare class HintContainerComponent {
    changeDetector: ChangeDetectorRef;
    hintTemplate: TemplateRef<any>;
    constructor(changeDetector: ChangeDetectorRef);
    detectChanges(): void;
}
