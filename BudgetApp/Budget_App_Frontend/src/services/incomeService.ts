import {Income} from "../types/income";

export async function getIncomes(): Promise<Income[]> 
{
    const response = await fetch("http://localhost:5000/api/income");
    const data = await response.json();
    return data;
}
