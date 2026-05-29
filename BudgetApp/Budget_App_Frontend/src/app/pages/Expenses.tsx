import {useState, useEffect} from 'react';
import {getExpense} from '../../services/expenseService';
import {Expense as ExpenseType} from "../../types/expense";
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plus, TrendingDown, Home, ShoppingCart, Car, Zap, Coffee, MoreHorizontal } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
export function Expenses() {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  useEffect(() => {
    getExpense().then(data => setExpenses(data))
  }, []);
  const monthlyExpenses = [
    {month: 'Jan', housing: 1200, food: 600, transport: 400, utilities: 300, entertainment: 400, other: 300},
    {month: 'Feb', housing: 1200, food: 700, transport: 450, utilities: 320, entertainment: 480, other: 350},
    {month: 'Mar', housing: 1200, food: 550, transport: 380, utilities: 290, entertainment: 380, other: 300},
    {month: 'Apr', housing: 1200, food: 750, transport: 500, utilities: 340, entertainment: 560, other: 450},
    {month: 'May', housing: 1200, food: 680, transport: 420, utilities: 310, entertainment: 490, other: 500},
    {month: 'Jun', housing: 1200, food: 800, transport: 500, utilities: 300, entertainment: 400, other: 800},
  ];

  const expenseCategories = [
    {name: 'Housing', amount: 1200, percentage: 30, icon: Home, color: 'from-cyan-500 to-cyan-600', trend: '0%'},
    {
      name: 'Food',
      amount: 800,
      percentage: 20,
      icon: ShoppingCart,
      color: 'from-purple-500 to-purple-600',
      trend: '+5%'
    },
    {
      name: 'Transportation',
      amount: 500,
      percentage: 12.5,
      icon: Car,
      color: 'from-amber-500 to-amber-600',
      trend: '-2%'
    },
    {name: 'Utilities', amount: 300, percentage: 7.5, icon: Zap, color: 'from-emerald-500 to-emerald-600', trend: '0%'},
    {
      name: 'Entertainment',
      amount: 400,
      percentage: 10,
      icon: Coffee,
      color: 'from-rose-500 to-rose-600',
      trend: '+8%'
    },
    {
      name: 'Other',
      amount: 800,
      percentage: 20,
      icon: MoreHorizontal,
      color: 'from-gray-500 to-gray-600',
      trend: '+12%'
    },
  ];

  const recentExpenses = [
    {description: 'Rent Payment', amount: 1200, date: 'Jun 1, 2026', category: 'Housing'},
    {description: 'Grocery Store', amount: 180, date: 'Jun 3, 2026', category: 'Food'},
    {description: 'Gas Station', amount: 65, date: 'Jun 4, 2026', category: 'Transportation'},
    {description: 'Electric Bill', amount: 120, date: 'Jun 7, 2026', category: 'Utilities'},
    {description: 'Netflix Subscription', amount: 15, date: 'Jun 8, 2026', category: 'Entertainment'},
    {description: 'Restaurant', amount: 85, date: 'Jun 10, 2026', category: 'Food'},
  ];


  const totalMonthlyExpenses = expenseCategories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Expenses</h2>
            <p className="text-gray-600">Monitor and manage your spending</p>
          </div>
          <Button
              className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg">
            <Plus className="w-4 h-4 mr-2"/>
            Add Expense
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-rose-500 to-rose-600 text-white border-none shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <TrendingDown className="w-6 h-6"/>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-rose-100 text-sm font-medium">Total Monthly Expenses</p>
              <p className="text-3xl font-bold">${totalMonthlyExpenses.toLocaleString()}</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white border-none shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Home className="w-6 h-6"/>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-amber-100 text-sm font-medium">Largest Category</p>
              <p className="text-3xl font-bold">Housing</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <TrendingDown className="w-6 h-6"/>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-purple-100 text-sm font-medium">vs Last Month</p>
              <p className="text-3xl font-bold">+11%</p>
            </div>
          </Card>
        </div>

        {/* Expense Trend Chart */}
        <Card className="p-6 bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Expense Trends</h3>
            <p className="text-sm text-gray-600">Monthly spending by category</p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={monthlyExpenses}>
              <defs>
                <linearGradient id="housing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="food" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="transport" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
              <XAxis dataKey="month" stroke="#6b7280"/>
              <YAxis stroke="#6b7280"/>
              <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
              />
              <Area type="monotone" dataKey="housing" stackId="1" stroke="#06b6d4" fill="url(#housing)"
                    name="Housing"/>
              <Area type="monotone" dataKey="food" stackId="1" stroke="#8b5cf6" fill="url(#food)" name="Food"/>
              <Area type="monotone" dataKey="transport" stackId="1" stroke="#f59e0b" fill="url(#transport)"
                    name="Transport"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Expense Categories */}
        <Card className="p-6 bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Expense Categories</h3>
            <p className="text-sm text-gray-600">Breakdown by spending category</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expenseCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                  <div
                      key={index}
                      className={`p-6 bg-gradient-to-br ${category.color} text-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                          className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <Icon className="w-5 h-5"/>
                      </div>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                    {category.trend}
                  </span>
                    </div>
                    <h4 className="font-bold text-lg mb-2">{category.name}</h4>
                    <p className="text-3xl font-bold mb-1">${category.amount.toLocaleString()}</p>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-3 backdrop-blur-sm">
                      <div
                          className="bg-white h-2 rounded-full transition-all"
                          style={{width: `${category.percentage}%`}}
                      ></div>
                    </div>
                    <p className="text-sm mt-2 opacity-90">{category.percentage}% of total</p>
                  </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Expenses */}
        <Card className="p-6 bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Recent Expenses</h3>
            <p className="text-sm text-gray-600">Latest transactions</p>
          </div>
          <div className="space-y-4">
            {recentExpenses.map((expense, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                        className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-500 rounded-xl flex items-center justify-center">
                      <TrendingDown className="w-6 h-6 text-white"/>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{expense.description}</p>
                      <p className="text-sm text-gray-500">
                        {expense.category} • {expense.date}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-rose-600">-${expense.amount.toLocaleString()}</p>
                  </div>
                </div>
            ))}
          </div>
        </Card>
      </div>
  );
}
