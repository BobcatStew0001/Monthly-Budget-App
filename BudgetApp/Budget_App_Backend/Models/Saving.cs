namespace BudgetApp.Budget_App_Backend.Models;

public class Savings: BudgetEntry
{
    public SavingCategory Category { get; set; }
    
    public Savings()
    {
        
    }

    public Savings(decimal amount, string frequency, SavingCategory category):base(amount, frequency)
    {
        Category = category;
    }

}