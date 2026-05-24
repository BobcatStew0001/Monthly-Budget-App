namespace BudgetApp.Models;

public class Income: BudgetEntry
{
    public IncomeCategory Category { get; set; }

    public Income(decimal amount, Frequency frequency, IncomeCategory category) : base(
        amount, frequency)
    {
        Amount = amount;
        Frequency = frequency;
        Category = category;
    }
    
}