import Dexie, { Table } from 'dexie'

export interface TimeEntry {
    id?: number;
    value: string;
    createdAt: number;
}

export class LocalDB extends Dexie {
    times!: Table<TimeEntry, number>;

    constructor() {
        super('SleepManagerDB');
        this.version(1).stores({
            times: '++id, value, createdAt'
        });
    }
}

export const db = new LocalDB();
