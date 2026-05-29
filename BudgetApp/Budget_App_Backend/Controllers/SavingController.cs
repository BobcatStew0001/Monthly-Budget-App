using BudgetApp.Budget_App_Backend.Models;
using BudgetApp.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers;
[ApiController]
[Route("api/[controller]")]
public class SavingController:ControllerBase
{
    private readonly ISavingRepository _savingsRepository;
    public SavingController(ISavingRepository savingRepository)
    {
        _savingsRepository = savingRepository;
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
        Saving savings = _savingsRepository.GetSavings(id);
        return Ok(savings);
    }

    [HttpPost]
    public IActionResult Create(Saving saving)
    {
        Saving newSavings = _savingsRepository.CreateSavings(saving);
        return Ok(newSavings);
        
    }
    

    [HttpPut("{id}")]
    public IActionResult UpdateSavings(int id, Saving savings)
    {
        Saving updateSavings = _savingsRepository.UpdateSavings(savings);
        savings.ID = id;
        return Ok(updateSavings);
    }
    
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _savingsRepository.DeleteSavings(id);
        return NoContent();
    }
    
}