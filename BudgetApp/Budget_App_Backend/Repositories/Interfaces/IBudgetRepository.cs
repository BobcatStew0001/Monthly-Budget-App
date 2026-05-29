namespace BudgetApp.Repositories;

public interface IBudgetRepository
{
    decimal TotalIncome();
    decimal TotalExpense(); 
    decimal TotalSavings();
    decimal Balance();
    
}