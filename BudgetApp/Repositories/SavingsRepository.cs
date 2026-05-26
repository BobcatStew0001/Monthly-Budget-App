using System.Data;
using BudgetApp.Models;
using BudgetApp.Repositories;
using Dapper;

public class SavingsRepository : ISavingsRepository
{
    private readonly IDbConnection _connection;
    public SavingsRepository(IDbConnection connection)
    {
        _connection = connection;
    }
    
    public Savings CreateSavings(Savings savings)
    {
        return _connection.QueryFirstOrDefault("INSERT INTO savings (amount, frequency, category_id) VALUES (@Amount, @Frequency, @CategoryId) RETURNING *", savings);
    }

    public Savings GetSavings(int id)
    {
        return _connection.QueryFirstOrDefault<Savings>("SELECT * FROM savings WHERE id=@Id",new {Id = id});
    }

    public IEnumerable<Savings> GetAllSavings()
    {
        return _connection.Query<Savings>("SELECT * FROM savings");
    }

    public Savings UpdateSavings(Savings savings)
    {
        return _connection.QueryFirstOrDefault<Savings>("UPDATE savings SET amount=@Amount, frequency=@Frequency, category_id = @CategoryId WHERE Id=@Id", savings); 
    }

    public void DeleteSavings(int id)
    {
        _connection.Execute("DELETE FROM savings WHERE id=@Id", new {Id = id});
    }
}