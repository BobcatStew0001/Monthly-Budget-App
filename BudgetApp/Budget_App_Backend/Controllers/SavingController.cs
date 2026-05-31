using BudgetApp.Budget_App_Backend.Models;
using BudgetApp.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SavingController : ControllerBase
{
    private readonly ISavingRepository _savingRepository;

    public SavingController(ISavingRepository savingRepository)
    {
        _savingRepository = savingRepository;
    }

    [HttpGet]
    public IActionResult GetAllSavings()
    {
        var savings = _savingRepository.GetAllSavings();
        return Ok(savings);
    }

    [HttpGet("{id}")]
    public IActionResult GetSaving(int id)
    {
        Saving saving = _savingRepository.GetSaving(id);
        return Ok(saving);
    }

    [HttpPost]
    public IActionResult CreateSaving(Saving saving)
    {
        Saving newSaving = _savingRepository.CreateSaving(saving);
        return Ok(newSaving);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateSaving(int id, Saving saving)
    {
        saving.ID = id;
        Saving updatedSaving = _savingRepository.UpdateSaving(saving);
        return Ok(updatedSaving);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteSaving(int id)
    {
        _savingRepository.DeleteSaving(id);
        return NoContent();
    }
}