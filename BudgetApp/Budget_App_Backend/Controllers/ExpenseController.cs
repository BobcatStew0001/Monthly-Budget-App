using BudgetApp.Budget_App_Backend.Models;
using BudgetApp.Repositories;
using Microsoft.AspNetCore.Mvc;


namespace BudgetApp.Controllers;
[ApiController]
[Route("api/[controller]")]

public class ExpenseController:ControllerBase
{
    private readonly IExpenseRepository _expenseRepository;
    
    public ExpenseController(IExpenseRepository expenseRepository)
    {
        _expenseRepository = expenseRepository;
    }
    //HttpGet
    [HttpGet]
    public IActionResult GetAllExpenses()
    { 
       var GetAllExpense = _expenseRepository.GetAllExpenses();
        return Ok(GetAllExpense); 
    }

    [HttpGet("{id}")]
    public IActionResult GetExpense(int id)
    {
        Expense expense = _expenseRepository.GetExpense(id);
        return Ok(expense);
    }
    
    //HttpPost & HttpPut
    [HttpPost]
    public IActionResult Create(Expense expense)
    {
        Expense newExpense = _expenseRepository.CreateExpense(expense);
        return Ok(newExpense);
        
    }
    
    [HttpPut("{id}")]
    public IActionResult UpdateExpense(int id, Expense expense)
    {
        Expense updatedExpense = _expenseRepository.UpdateExpense(expense);
        return Ok(updatedExpense);
    }
    //HttpDelete
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _expenseRepository.DeleteExpense(id);
        return NoContent();
    }
    
    
    
}