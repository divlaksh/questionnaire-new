import { SafeUrl } from '@angular/platform-browser';
/**
 * Represents a participant in a Chat conversation ([see example]({% slug overview_convui %}#toc-basic-usage)).
 */
export interface User {
    /**
     * A unique ID for this user. Typically, the ID is a number. Can also be a string or an object.
     */
    id: any;
    /**
     * (Optional) The displayed name for the user.
     */
    name?: string;
    /**
     * (Optional) An avatar image for the user. By default, the URLs of the avatar images will be sanitized. To allow unsafe values,
     * for example, a blob URI, [mark the value as a `SafeUrl`](https://angular.io/guide/security#bypass-security-apis)
     *
     * ```ts-no-run
     * import { DomSanitizer } from '@angular/platform-browser';
     * ...
     * const avatarUrl = sanitizer.bypassSecurityTrustUrl('blob.https://example.com');
     * ```
     */
    avatarUrl?: string | SafeUrl;
}
