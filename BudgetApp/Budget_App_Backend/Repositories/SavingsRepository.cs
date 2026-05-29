using System.Data;
using BudgetApp.Budget_App_Backend.Models;
using BudgetApp.Repositories;
using Dapper;

public class SavingRepository : ISavingRepository
{
    private readonly IDbConnection _connection;
    public SavingRepository(IDbConnection connection)
    {
        _connection = connection;
    }
    
    public Saving CreateSavings(Saving savings)
    {
        return _connection.QueryFirstOrDefault("INSERT INTO savings (amount, frequency, category_id) VALUES (@Amount, @Frequency, @CategoryId) RETURNING *", savings);
    }

    public Saving GetSavings(int id)
    {
        return _connection.QueryFirstOrDefault<Saving>("SELECT * FROM savings WHERE id=@Id",new {Id = id});
    }

    public IEnumerable<Saving> GetAllSavings()
    {
        return _connection.Query<Saving>("SELECT * FROM savings");
    }

    public Saving UpdateSavings(Saving savings)
    {
        return _connection.QueryFirstOrDefault<Saving>("UPDATE savings SET amount=@Amount, frequency=@Frequency, category_id = @CategoryId WHERE Id=@Id", savings); 
    }

    public void DeleteSavings(int id)
    {
        _connection.Execute("DELETE FROM savings WHERE id=@Id", new {Id = id});
    }
}