export interface User {
    id:string | number
    name: string
    status: string
    reliability_score: number
    placements: number
    gender: string
    phone_number: string
    city: string
    country: string
    state: string
}

export interface UserState {
    users: User[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
}
