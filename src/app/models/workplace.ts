export interface Workplace {
    id: string | number
    name: string
    location: string
}

export interface WorkplaceState {
    workplaces: Workplace[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
}
