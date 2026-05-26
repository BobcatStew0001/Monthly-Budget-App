namespace BudgetApp.Models;

public class Income: BudgetEntry
{
    public IncomeCategory Category { get; set; }
    
    public Income()
    {
        
    }

    public Income(decimal amount, string frequency, IncomeCategory category) : base(
        amount, frequency)
    {
        Amount = amount;
        Frequency = frequency;
        Category = category;
    }
    
}