import Dexie, { type Table } from 'dexie';

export interface Friend {
	id?: number;
	seconds: number;
	date: Date;
}

export class TimeTracker extends Dexie {
	trackedTime!: Table<Friend>;

	constructor() {
		super('time-tracker');
		this.version(1).stores({
			trackedTime: '++id, seconds, date' // Primary key and indexed props
		});
	}
}

export const db = new TimeTracker();
