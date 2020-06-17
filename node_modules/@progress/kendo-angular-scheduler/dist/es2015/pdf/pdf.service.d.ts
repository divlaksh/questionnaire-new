import { EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export declare class PDFService {
    createElement: EventEmitter<any>;
    exportClick: EventEmitter<any>;
    done: EventEmitter<any>;
    elementReady: EventEmitter<any>;
    save(): void;
}
