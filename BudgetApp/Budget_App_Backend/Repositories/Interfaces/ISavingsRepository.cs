using BudgetApp.Budget_App_Backend.Models;

namespace BudgetApp.Repositories;

public interface ISavingRepository
{
    Saving CreateSavings(Saving savings);
    Saving GetSavings(int id);
    IEnumerable<Saving> GetAllSavings();
    Saving UpdateSavings(Saving savings);
    void DeleteSavings(int id);
}