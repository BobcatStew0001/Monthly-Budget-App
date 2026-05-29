export interface Expense {
    id: number;
    amount: number;
    frequency: string;
    categoryId: number;
    description: string;
    date: string;
    trend: string;
}