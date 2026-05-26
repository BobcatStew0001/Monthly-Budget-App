using BudgetApp.Models;
using BudgetApp.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers;
[ApiController]
[Route("api/[controller]")]
public class SavingController:ControllerBase
{
    private readonly ISavingsRepository _savingsRepository;
    public SavingController(ISavingsRepository savingsRepository)
    {
        _savingsRepository = savingsRepository;
    }
    
    [HttpGet]
    public IActionResult GetAllSavings()
    { 
        var getAllSavings = _savingsRepository.GetAllSavings();
        return Ok(getAllSavings); 
    }
    [HttpGet("{id}")]
    public IActionResult GetSavings(int id)
    {
        Savings savings = _savingsRepository.GetSavings(id);
        return Ok(savings);
    }

    [HttpPost]
    public IActionResult Create(Savings saving)
    {
        Savings newSavings = _savingsRepository.CreateSavings(saving);
        return Ok(newSavings);
        
    }
    

    [HttpPut("{id}")]
    public IActionResult UpdateSavings(int id, Savings savings)
    {
        Savings updateSavings = _savingsRepository.UpdateSavings(savings);
        return Ok(updateSavings);
    }
    
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _savingsRepository.DeleteSavings(id);
        return NoContent();
    }
    
}