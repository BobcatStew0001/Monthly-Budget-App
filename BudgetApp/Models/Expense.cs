namespace BudgetApp.Models;

public class Expense:BudgetEntry
{
    public ExpenseCategory Category { get; set; }
    
    public Expense(decimal amount, Frequency frequency, ExpenseCategory category) : base(amount, frequency)
    {
        Category = category;
    }
}