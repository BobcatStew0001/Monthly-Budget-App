namespace BudgetApp.Budget_App_Backend.Models;

public class Saving: BudgetEntry
{
    public SavingCategory Category { get; set; }
    public string  GoalName { get; set; }
    public decimal TargetAmount { get; set; }
    public decimal CurrentAmount { get; set; }
    public string Deadline { get; set; }
    public string Priority { get; set; }
    
    public Saving()
    {
        
    }

    public Saving(decimal amount, string frequency, SavingCategory category,
        string goalName, decimal targetAmount, decimal currentAmount,
        string deadline, string priority) : base(amount, frequency)
    {
        Category = category;
        GoalName = goalName;
        TargetAmount = targetAmount;
        CurrentAmount = currentAmount;
        Deadline = deadline;
        Priority = priority;
        
    }

}