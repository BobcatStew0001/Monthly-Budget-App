import {Saving} from "../types/saving"; 

export async function getSavings(): Promise<Saving[]>
{
    const response = await fetch("http://localhost:5000/api/saving");
    const data = await response.json();
    return data;
    
}