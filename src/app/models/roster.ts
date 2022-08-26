import { Shift } from "./shift";

export interface RosterDay {
    id: number | string
    date: Date
    workplace_id?: any;
    shifts: Shift[]
}

export interface RosterState {
    rosters: RosterDay[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
}
