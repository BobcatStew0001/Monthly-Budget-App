using BudgetApp.Budget_App_Backend.Models;

namespace BudgetApp.Repositories;

public interface IIncomeRepository
{
    Income CreateIncome(Income income);
    Income GetIncome(int id);
    IEnumerable<Income> GetAllIncome();
    Income UpdateIncome(Income income);
    void DeleteIncome(int id);
}