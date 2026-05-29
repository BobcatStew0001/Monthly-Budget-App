import { useState, useEffect } from 'react';
import { getIncomes } from '../../services/incomeService';
import { getExpense } from '../../services/expenseService';
import { getSavings } from '../../services/savingService';
import { Income as IncomeType } from "../../types/income";
import { Expense as ExpenseType } from "../../types/expense";
import { Saving as SavingType } from "../../types/saving";
import { Card } from '../components/ui/card';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, PiggyBank, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const pieColors = ['#06b6d4', '#8b5cf6', '#f59e0b', '#f43f5e', '#10b981', '#6b7280'];

export function Overview() {
  const [incomes, setIncomes] = useState<IncomeType[]>([]);
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [savings, setSavings] = useState<SavingType[]>([]);

  useEffect(() => {
    getIncomes().then(data => setIncomes(data));
    getExpense().then(data => setExpenses(data));
    getSavings().then(data => setSavings(data));
  }, []);

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0
      ? ((balance / totalIncome) * 100).toFixed(1)
      : '0.0';

  const expenseBreakdown = expenses.map((expense, index) => ({
    name: expense.description ?? `Expense #${expense.id}`,
    value: expense.amount,
    color: pieColors[index % pieColors.length],
  }));

  const recentTransactions = [
    ...incomes.map(i => ({
      name: i.source ?? `Income #${i.id}`,
      amount: i.amount,
      type: 'income' as const,
      date: i.date,
      category: 'Income',
    })),
    ...expenses.map(e => ({
      name: e.description ?? `Expense #${e.id}`,
      amount: e.amount,
      type: 'expense' as const,
      date: e.date,
      category: String(e.categoryId),
    })),
  ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);

  const monthlyData: { month: string; income: number; expenses: number }[] = [];

  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Overview</h2>
          <p className="text-gray-600">Your financial snapshot</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-none shadow-xl hover:shadow-2xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Wallet className="w-6 h-6" />
              </div>
              <div className="flex items-center text-sm bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                {savingsRate}%
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-cyan-100 text-sm font-medium">Total Balance</p>
              <p className="text-3xl font-bold">${balance.toLocaleString()}</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-none shadow-xl hover:shadow-2xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="flex items-center text-sm bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                {incomes.length} streams
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-emerald-100 text-sm font-medium">Monthly Income</p>
              <p className="text-3xl font-bold">${totalIncome.toLocaleString()}</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-rose-500 to-rose-600 text-white border-none shadow-xl hover:shadow-2xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div className="flex items-center text-sm bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                <ArrowDownRight className="w-4 h-4 mr-1" />
                {expenses.length} items
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-rose-100 text-sm font-medium">Monthly Expenses</p>
              <p className="text-3xl font-bold">${totalExpenses.toLocaleString()}</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white border-none shadow-xl hover:shadow-2xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <PiggyBank className="w-6 h-6" />
              </div>
              <div className="flex items-center text-sm bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                {savings.length} goals
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-amber-100 text-sm font-medium">Savings Rate</p>
              <p className="text-3xl font-bold">{savingsRate}%</p>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6 bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Income vs Expenses</h3>
              <p className="text-sm text-gray-600">Monthly comparison</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}/>
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 6 }} activeDot={{ r: 8 }} name="Income"/>
                <Line type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={3} dot={{ fill: '#f43f5e', r: 6 }} activeDot={{ r: 8 }} name="Expenses"/>
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Expense Breakdown</h3>
              <p className="text-sm text-gray-600">Category distribution</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {expenseBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-800">${item.value}</span>
                  </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="p-6 bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Recent Transactions</h3>
            <p className="text-sm text-gray-600">Latest activity</p>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        transaction.type === 'income'
                            ? 'bg-gradient-to-br from-emerald-400 to-emerald-500'
                            : 'bg-gradient-to-br from-rose-400 to-rose-500'
                    }`}>
                      {transaction.type === 'income'
                          ? <TrendingUp className="w-6 h-6 text-white" />
                          : <TrendingDown className="w-6 h-6 text-white" />
                      }
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{transaction.name}</p>
                      <p className="text-sm text-gray-500">
                        {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className={`text-lg font-bold ${transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
            ))}
          </div>
        </Card>
      </div>
  );
}