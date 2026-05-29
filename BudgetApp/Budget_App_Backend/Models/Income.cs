namespace BudgetApp.Budget_App_Backend.Models;

public class Income: BudgetEntry
{
    public IncomeCategory Category { get; set; }
    public string Source { get; set; }
    public DateTime Date { get; set; }
    
    public Income()
    {
        
    }

    public Income(decimal amount, string frequency, IncomeCategory category, string source, DateTime date) : base(
        amount, frequency)
    {
        
        Category = category;
        Source = source;
        Date = date;
    }
    
}