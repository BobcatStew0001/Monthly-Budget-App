import { Saving } from "../types/saving";

export async function getSavings(): Promise<Saving[]> {
    const response = await fetch("/api/saving");
    const data = await response.json();
    return data;
}

export async function createSaving(saving: Omit<Saving, 'id'>): Promise<Saving> {
    const response = await fetch("/api/saving", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saving),
    });
    const data = await response.json();
    return data;
}