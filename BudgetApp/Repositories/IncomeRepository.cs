using System.Data;
using BudgetApp.Models;
using BudgetApp.Repositories;
using Dapper;

public class IncomeRepository:IIncomeRepository
{
    private readonly IDbConnection _connection;
    public IncomeRepository(IDbConnection connection)
    {
        _connection = connection;
    }
    public Income CreateIncome(Income income)
    {
        return _connection.QueryFirstOrDefault("INSERT INTO incomes (amount, frequency, category_id) VALUES (@Amount, @Frequency, @CategoryId) RETURNING *", income);
    }

    public Income GetIncome(int id)
    {
     return _connection.QueryFirstOrDefault<Income>("SELECT * FROM incomes WHERE id=@Id",new {Id = id});
    }

    public IEnumerable<Income> GetAllIncome()
    {
        return _connection.Query<Income>("SELECT * FROM incomes");
    }

    public Income UpdateIncome(Income income)
    {
        return _connection.QueryFirstOrDefault<Income>("UPDATE incomes SET amount=@Amount, frequency=@Frequency, category_id = @CategoryId WHERE Id=@Id", income);  
    }

    public void DeleteIncome(int id)
    {
        _connection.Execute("DELETE FROM incomes WHERE id=@Id", new {Id = id});
    }
}