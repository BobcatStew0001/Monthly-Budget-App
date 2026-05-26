
namespace BudgetApp.Models;

public abstract class BudgetEntry
{
    public decimal Amount { get; set; }
    public Frequency Frequency { get; set; }
    public int ID { get; set; }
    public int CategoryId { get; set;}
    

    public BudgetEntry(decimal amount, Frequency frequency)
    {
        Amount = amount;
        Frequency = frequency;
        
        
        
    }
}