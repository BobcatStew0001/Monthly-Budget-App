import {Expense} from "../types/expense";

export async function getExpense(): Promise<Expense[]>
{
    const response = await fetch("http://localhost:5000/api/expense");
    const data = await response.json();
    return data;
}
