namespace BudgetApp.Models;

public class Expense:BudgetEntry
{
    public int CategoryId { get; set; }
    
    public Expense(decimal amount, Frequency frequency) : base(amount, frequency)
    {
    }
}