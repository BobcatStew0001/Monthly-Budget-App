using BudgetApp.Models;

namespace BudgetApp.Repositories;

public interface IExpenseRepository
{
    Expense CreateExpense(Expense expense);//Create
    Expense GetExpense(int id);//Read
    IEnumerable<Expense> GetAllExpenses();//Read
    Expense UpdateExpense(Expense expense);//Update
    void DeleteExpense(int id);//Delete
}