using System.Data;
using BudgetApp.Budget_App_Backend.Models;
using Dapper;

namespace BudgetApp.Repositories;

public class ExpenseRepository:IExpenseRepository
{
    
    private readonly IDbConnection _connection;
    
    public ExpenseRepository(IDbConnection connection)
    {
        _connection = connection;
        
    }
    
    public Expense CreateExpense(Expense expense)
    {
return _connection.QueryFirstOrDefault<Expense>("INSERT INTO expenses (amount, frequency, category_id) VALUES (@Amount, @Frequency, @CategoryId) RETURNING *", expense);    }

    public Expense GetExpense(int id)
    {
return _connection.QueryFirstOrDefault<Expense>("SELECT * FROM expenses WHERE id=@Id",new {Id = id});    }

    public IEnumerable<Expense> GetAllExpenses()
    {
      return _connection.Query<Expense>("SELECT * FROM expenses");
    }

    public Expense UpdateExpense(Expense expense)
    {
return _connection.QueryFirstOrDefault<Expense>("UPDATE expenses SET amount=@Amount, frequency=@Frequency, category_id = @CategoryId WHERE Id=@Id", expense);    }

    public void DeleteExpense(int id)
    {
_connection.Execute("DELETE FROM expenses WHERE id=@Id", new {Id = id});    }
    
}