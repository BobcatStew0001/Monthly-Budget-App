import { Income } from "../types/income";

export async function getIncomes(): Promise<Income[]> {
    const response = await fetch("/api/income");
    const data = await response.json();
    return data;
}

export async function createIncome(income: Omit<Income, 'id'>): Promise<Income> {
    const response = await fetch("/api/income", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(income),
    });
    const data = await response.json();
    return data;
}