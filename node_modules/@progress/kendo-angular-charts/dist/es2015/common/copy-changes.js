/**
 * @hidden
 */
export function copyChanges(changes, options) {
    for (const propertyName in changes) {
        if (!changes.hasOwnProperty(propertyName)) {
            continue;
        }
        const value = changes[propertyName].currentValue;
        if (value === undefined) {
            delete options[propertyName];
        }
        else {
            options[propertyName] = value;
        }
    }
}
