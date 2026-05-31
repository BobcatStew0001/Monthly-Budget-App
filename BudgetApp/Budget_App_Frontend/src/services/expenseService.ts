import { Expense } from "../types/expense";

export async function getExpense(): Promise<Expense[]> {
    const response = await fetch("/api/expense");
    const data = await response.json();
    return data;
}

export async function createExpense(expense: Omit<Expense, 'id'>): Promise<Expense> {
    const response = await fetch("/api/expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
    });
    const data = await response.json();
    return data;
}