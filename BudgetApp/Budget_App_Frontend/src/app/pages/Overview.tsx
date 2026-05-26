import { Card } from '../components/ui/card';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, PiggyBank, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Mock data for charts
const monthlyData = [
  { month: 'Jan', income: 4500, expenses: 3200 },
  { month: 'Feb', income: 4800, expenses: 3500 },
  { month: 'Mar', income: 4600, expenses: 3100 },
  { month: 'Apr', income: 5200, expenses: 3800 },
  { month: 'May', income: 5000, expenses: 3600 },
  { month: 'Jun', income: 5400, expenses: 4000 },
];

const expenseBreakdown = [
  { name: 'Housing', value: 1200, color: '#06b6d4' },
  { name: 'Food', value: 800, color: '#8b5cf6' },
  { name: 'Transportation', value: 500, color: '#f59e0b' },
  { name: 'Entertainment', value: 400, color: '#f43f5e' },
  { name: 'Utilities', value: 300, color: '#10b981' },
  { name: 'Other', value: 800, color: '#6b7280' },
];

export function Overview() {
  const currentMonth = monthlyData[monthlyData.length - 1];
  const balance = currentMonth.income - currentMonth.expenses;
  const savingsRate = ((balance / currentMonth.income) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Overview</h2>
        <p className="text-gray-600">Your financial snapshot for June 2026</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Balance */}
        <Card className="p-6 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-none shadow-xl hover:shadow-2xl transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Wallet className="w-6 h-6" />
            </div>
            <div className="flex items-center text-sm bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +12%
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-cyan-100 text-sm font-medium">Total Balance</p>
            <p className="text-3xl font-bold">${balance.toLocaleString()}</p>
          </div>
        </Card>

        {/* Income */}
        <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-none shadow-xl hover:shadow-2xl transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="flex items-center text-sm bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +8%
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-emerald-100 text-sm font-medium">Monthly Income</p>
            <p className="text-3xl font-bold">${currentMonth.income.toLocaleString()}</p>
          </div>
        </Card>

        {/* Expenses */}
        <Card className="p-6 bg-gradient-to-br from-rose-500 to-rose-600 text-white border-none shadow-xl hover:shadow-2xl transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div className="flex items-center text-sm bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
              <ArrowDownRight className="w-4 h-4 mr-1" />
              -5%
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-rose-100 text-sm font-medium">Monthly Expenses</p>
            <p className="text-3xl font-bold">${currentMonth.expenses.toLocaleString()}</p>
          </div>
        </Card>

        {/* Savings Rate */}
        <Card className="p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white border-none shadow-xl hover:shadow-2xl transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <PiggyBank className="w-6 h-6" />
            </div>
            <div className="flex items-center text-sm bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +3%
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
        {/* Line Chart - Income vs Expenses */}
        <Card className="lg:col-span-2 p-6 bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Income vs Expenses</h3>
            <p className="text-sm text-gray-600">Monthly comparison for 2026</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 6 }}
                activeDot={{ r: 8 }}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#f43f5e"
                strokeWidth={3}
                dot={{ fill: '#f43f5e', r: 6 }}
                activeDot={{ r: 8 }}
                name="Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie Chart - Expense Breakdown */}
        <Card className="p-6 bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Expense Breakdown</h3>
            <p className="text-sm text-gray-600">Category distribution</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
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
          {[
            { name: 'Salary', amount: 5400, type: 'income', date: 'Jun 1, 2026', category: 'Income' },
            { name: 'Rent Payment', amount: -1200, type: 'expense', date: 'Jun 1, 2026', category: 'Housing' },
            { name: 'Grocery Shopping', amount: -180, type: 'expense', date: 'Jun 3, 2026', category: 'Food' },
            { name: 'Freelance Project', amount: 800, type: 'income', date: 'Jun 5, 2026', category: 'Income' },
            { name: 'Electric Bill', amount: -120, type: 'expense', date: 'Jun 7, 2026', category: 'Utilities' },
          ].map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    transaction.type === 'income'
                      ? 'bg-gradient-to-br from-emerald-400 to-emerald-500'
                      : 'bg-gradient-to-br from-rose-400 to-rose-500'
                  }`}
                >
                  {transaction.type === 'income' ? (
                    <TrendingUp className="w-6 h-6 text-white" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{transaction.name}</p>
                  <p className="text-sm text-gray-500">
                    {transaction.category} • {transaction.date}
                  </p>
                </div>
              </div>
              <div>
                <p
                  className={`text-lg font-bold ${
                    transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
