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

    public Saving CreateSaving(Saving saving)
    {
        return _connection.QueryFirstOrDefault<Saving>(
            "INSERT INTO savings (amount, frequency, category_id, goal_name, target_amount, current_amount, deadline, priority) " +
            "VALUES (@Amount, @Frequency, @CategoryId, @GoalName, @TargetAmount, @CurrentAmount, @Deadline, @Priority) RETURNING *", saving);
    }

    public Saving GetSaving(int id)
    {
        return _connection.QueryFirstOrDefault<Saving>("SELECT * FROM savings WHERE id=@Id", new { Id = id });
    }

    public IEnumerable<Saving> GetAllSavings()
    {
        return _connection.Query<Saving>("SELECT * FROM savings");
    }

    public Saving UpdateSaving(Saving saving)
    {
        return _connection.QueryFirstOrDefault<Saving>(
            "UPDATE savings SET amount=@Amount, frequency=@Frequency, category_id=@CategoryId, " +
            "goal_name=@GoalName, target_amount=@TargetAmount, current_amount=@CurrentAmount, " +
            "deadline=@Deadline, priority=@Priority WHERE id=@Id RETURNING *", saving);
    }

    public void DeleteSaving(int id)
    {
        _connection.Execute("DELETE FROM savings WHERE id=@Id", new { Id = id });
    }
}