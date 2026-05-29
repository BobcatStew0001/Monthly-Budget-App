using BudgetApp.Budget_App_Backend.Models;
using BudgetApp.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers;
[ApiController]
[Route("api/[controller]")]
public class IncomeController:ControllerBase
{
    private readonly IIncomeRepository _incomeRepository;
    public IncomeController(IIncomeRepository incomeRepository)
    {
        _incomeRepository = incomeRepository;
    }
    //All Income
    //Http Get 
    [HttpGet]
    public IActionResult GetAllIncome()
    { 
        var GetAllIncome = _incomeRepository.GetAllIncome();
        return Ok(GetAllIncome); 
    }

    [HttpGet("{id}")]
    public IActionResult GetIncome(int id)
    {
        Income income = _incomeRepository.GetIncome(id);
        return Ok(income);
    }
    
    //New Income
    [HttpPost]
    public IActionResult Create(Income income)
    {
        Income newIncome = _incomeRepository.CreateIncome(income);
        return Ok(newIncome);
        
    }
    //Update Income
    
    [HttpPut("{id}")]
    public IActionResult UpdateIncome(int id, Income income)
    {
    Income updatedIncome = _incomeRepository.UpdateIncome(income);
        return Ok(updatedIncome);
    }
    //Delete Income
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _incomeRepository.DeleteIncome(id);
        return NoContent();
    }



}