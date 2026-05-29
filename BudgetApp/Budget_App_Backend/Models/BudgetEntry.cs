
namespace BudgetApp.Budget_App_Backend.Models;

public abstract class BudgetEntry
{
    public decimal Amount { get; set; }
    public string Frequency { get; set; }
    public int ID { get; set; }
    public int CategoryId { get; set;}

    public BudgetEntry()
    {
        
    }

    public BudgetEntry(decimal amount, string frequency)
    {
        Amount = amount;
        Frequency = frequency;
        
        
        
    }
}