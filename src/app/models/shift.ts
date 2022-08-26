import { User } from "./user";

export interface Shift {
    id?: number | string
    start_datetime: Date | string
    end_datetime: Date | string
    profession_id?: number | string
    workplace_id?: number | string
    user_id?: number | string | null
    user?: User
}

export interface ShiftState {
    shifts: Shift[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
}
