/**
 * @hidden
 */
export class ItemMap {
    constructor() {
        this.count = 0;
        this.items = {};
    }
    get first() {
        if (this.count > 0) {
            return this.items[Object.keys(this.items)[0]];
        }
    }
    get last() {
        if (this.count > 0) {
            const keys = Object.keys(this.items);
            return this.items[keys[keys.length - 1]];
        }
    }
    addItem(index, item) {
        if (!this.items[index]) {
            this.count++;
        }
        this.items[index] = item;
    }
    removeItem(index, item) {
        const current = this.items[index];
        if (current === item) {
            delete this.items[index];
            this.count--;
        }
    }
    toArray() {
        return Object.keys(this.items).map(index => this.items[index]);
    }
}
