/* tslint:disable:no-null-keyword */
/* tslint:disable:no-bitwise */
const resolvedPromise = Promise.resolve(null);
/**
 * @hidden
 */
export const isPresent = (value) => value !== null && value !== undefined;
/**
 * @hidden
 */
export const tick = (f) => (resolvedPromise.then(f));
