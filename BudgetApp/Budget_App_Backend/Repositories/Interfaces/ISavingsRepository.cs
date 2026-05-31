using BudgetApp.Budget_App_Backend.Models;

namespace BudgetApp.Repositories;

public interface ISavingRepository
{
    Saving CreateSaving(Saving saving);
    Saving GetSaving(int id);
    IEnumerable<Saving> GetAllSavings();
    Saving UpdateSaving(Saving saving);
    void DeleteSaving(int id);
}