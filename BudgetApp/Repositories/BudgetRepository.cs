using System.Data;
using Dapper;
namespace BudgetApp.Repositories;

public class BudgetRepository : IBudgetRepository
{
    private readonly IDbConnection _connection;

    public BudgetRepository(IDbConnection connection)
    {
        _connection = connection;
    }
    public decimal TotalIncome()
    {
        return _connection.ExecuteScalar<decimal>("SELECT SUM(amount) FROM incomes");
    }

    public decimal TotalExpense()
    {
        return _connection.ExecuteScalar<decimal>("SELECT SUM(amount) FROM expenses"); 
    }

    public decimal TotalSavings()
    {
        return _connection.ExecuteScalar<decimal>("SELECT SUM(amount) FROM savings"); 

    }

    public decimal Balance()
    {
        return TotalIncome() - TotalExpense() - TotalSavings();
    }
}