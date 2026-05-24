namespace BudgetApp.Models;

public class Savings: BudgetEntry
{
    public SavingCategory Category { get; set; }

    public Savings(decimal amount, Frequency frequency, SavingCategory category):base(amount, frequency)
    {
        Category = category;
    }

}