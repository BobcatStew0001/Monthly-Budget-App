namespace BudgetApp.Models;

public class Savings:Monthly
{
    public decimal MonthlySaving { get; set; }
    public decimal Retirement { get; set; }
    public decimal EmergencyFund { get; set; }
}