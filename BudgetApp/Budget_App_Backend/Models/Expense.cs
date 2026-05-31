namespace BudgetApp.Budget_App_Backend.Models;

public class Expense:BudgetEntry
{
    public ExpenseCategory Category { get; set; }
    public string Description { get; set; }
    public string Date { get; set; }
    public string  Trend { get; set; }
    
    public Expense()
    {
        
    }
    
    public Expense(decimal amount, string frequency, ExpenseCategory category,
        string description, string date, string trend) : base(amount, frequency)
    {
       Category = category;
       Description = description;
       Date = date;
       Trend = trend;
    }
}