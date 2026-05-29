namespace BudgetApp.Budget_App_Backend.Models;

public class Expense:BudgetEntry
{
    public Expense()
    {
        
    }
    
    public Expense(decimal amount, string frequency) : base(amount, frequency)
    {
        Amount = amount;
        Frequency = frequency;
    }
}