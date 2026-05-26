using BudgetApp.Models;

namespace BudgetApp.Repositories;

public interface ISavingsRepository
{
    Savings CreateSavings(Savings savings);
    Savings GetSavings(int id);
    IEnumerable<Savings> GetAllSavings();
    Savings UpdateSavings(Savings savings);
    void DeleteSavings(int id);
}