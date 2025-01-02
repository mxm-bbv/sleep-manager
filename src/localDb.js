import Dexie from 'dexie';
export class LocalDB extends Dexie {
    times;
    constructor() {
        super('SleepManagerDB');
        this.version(1).stores({
            times: '++id, value, createdAt'
        });
    }
}
export const db = new LocalDB();
