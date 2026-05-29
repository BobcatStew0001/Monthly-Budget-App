using BudgetApp.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers;
[ApiController]
[Route("api/[controller]")]

public class BudgetController : ControllerBase
{
    
    private readonly IBudgetRepository _budgetRepository;
   
    

    public BudgetController(IBudgetRepository budgetRepository)
    {
       
        _budgetRepository = budgetRepository;
    }
    [HttpGet]
    public IActionResult GetBudgetSummary()
    {
        var totalIncome = _budgetRepository.TotalIncome();
        var totalExpense = _budgetRepository.TotalExpense();
        var totalSavings = _budgetRepository.TotalSavings();
        var balance = _budgetRepository.Balance();
        return balance == null ? NotFound() : Ok(new {totalIncome, totalExpense, totalSavings, balance});
    }

   
}