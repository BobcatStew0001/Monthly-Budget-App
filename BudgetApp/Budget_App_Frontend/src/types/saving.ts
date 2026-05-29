export interface Saving {
    id: number;
    amount: number;
    frequency: string;
    categoryId: number;
    goalName: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    priority: string;
}