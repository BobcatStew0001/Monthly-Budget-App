import {useState, useEffect} from 'react';
import {getExpense, createExpense} from '../../services/expenseService';
import {Expense as ExpenseType} from "../../types/expense";
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plus, TrendingDown, Home, ShoppingCart, Car, Zap, Coffee, MoreHorizontal } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Expenses() {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: 0,
    frequency: 'Monthly',
    categoryId: 4,
    date: new Date().toISOString().split('T')[0],
    trend: '0%',
  });

  useEffect(() => {
    getExpense().then(data => setExpenses(data));
  }, []);

  const handleSubmit = async () => {
    await createExpense(newExpense);
    const updated = await getExpense();
    setExpenses(updated);
    setShowModal(false);
    setNewExpense({
      description: '',
      amount: 0,
      frequency: 'Monthly',
      categoryId: 4,
      date: new Date().toISOString().split('T')[0],
      trend: '0%',
    });
  };

  const categoryConfig: Record<string, { icon: any; color: string }> = {
    MortgageRent:    { icon: Home,          color: 'from-cyan-500 to-cyan-600' },
    Groceries:       { icon: ShoppingCart,  color: 'from-purple-500 to-purple-600' },
    Transportation:  { icon: Car,           color: 'from-amber-500 to-amber-600' },
    Electricity:     { icon: Zap,           color: 'from-emerald-500 to-emerald-600' },
    Entertainment:   { icon: Coffee,        color: 'from-rose-500 to-rose-600' },
    Other:           { icon: MoreHorizontal,color: 'from-gray-500 to-gray-600' },
  };

  const totalMonthlyExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const expenseCategories = expenses.map((expense, index) => {
    const categoryName = String(expense.categoryId);
    const config = categoryConfig[categoryName] ?? {
      icon: MoreHorizontal,
      color: 'from-gray-500 to-gray-600',
    };
    const percentage = totalMonthlyExpenses > 0
        ? parseFloat(((expense.amount / totalMonthlyExpenses) * 100).toFixed(1))
        : 0;
    return {
      name: expense.description ?? categoryName,
      amount: expense.amount,
      percentage,
      icon: config.icon,
      color: config.color,
      trend: expense.trend ?? '0%',
    };
  });

  const recentExpenses = [...expenses]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);

  const largestCategory = expenseCategories.length > 0
      ? expenseCategories.reduce((max, cat) => cat.amount > max.amount ? cat : max)
      : null;

  const monthlyExpenses: { month: string; housing: number; food: number; transport: number }[] = [];

  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Expenses</h2>
            <p className="text-gray-600">Monitor and manage your spending</p>
          </div>
          <Button
              onClick={() => setShowModal(true)}
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
              <p className="text-3xl font-bold">{largestCategory ? largestCategory.name : 'N/A'}</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <TrendingDown className="w-6 h-6"/>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-purple-100 text-sm font-medium">Total Transactions</p>
              <p className="text-3xl font-bold">{expenses.length}</p>
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
              <Tooltip contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}/>
              <Area type="monotone" dataKey="housing" stackId="1" stroke="#06b6d4" fill="url(#housing)" name="Housing"/>
              <Area type="monotone" dataKey="food" stackId="1" stroke="#8b5cf6" fill="url(#food)" name="Food"/>
              <Area type="monotone" dataKey="transport" stackId="1" stroke="#f59e0b" fill="url(#transport)" name="Transport"/>
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
                  <div key={index} className={`p-6 bg-gradient-to-br ${category.color} text-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <Icon className="w-5 h-5"/>
                      </div>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                        {category.trend}
                      </span>
                    </div>
                    <h4 className="font-bold text-lg mb-2">{category.name}</h4>
                    <p className="text-3xl font-bold mb-1">${category.amount.toLocaleString()}</p>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-3 backdrop-blur-sm">
                      <div className="bg-white h-2 rounded-full transition-all" style={{width: `${category.percentage}%`}}></div>
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
                <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-500 rounded-xl flex items-center justify-center">
                      <TrendingDown className="w-6 h-6 text-white"/>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{expense.description}</p>
                      <p className="text-sm text-gray-500">
                        {expense.categoryId} • {new Date(expense.date).toLocaleDateString()}
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

        {/* Add Expense Modal */}
        {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Add Expense</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                        type="text"
                        placeholder="e.g. Rent Payment"
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        value={newExpense.description}
                        onChange={e => setNewExpense({...newExpense, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        value={newExpense.amount}
                        onChange={e => setNewExpense({...newExpense, amount: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                    <select
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        value={newExpense.frequency}
                        onChange={e => setNewExpense({...newExpense, frequency: e.target.value})}
                    >
                      <option>Weekly</option>
                      <option>BiWeekly</option>
                      <option>Monthly</option>
                      <option>Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        value={newExpense.categoryId}
                        onChange={e => setNewExpense({...newExpense, categoryId: parseInt(e.target.value)})}
                    >
                      <option value={4}>Electricity</option>
                      <option value={5}>Water</option>
                      <option value={6}>Groceries</option>
                      <option value={7}>Transportation</option>
                      <option value={8}>Entertainment</option>
                      <option value={9}>Mortgage/Rent</option>
                      <option value={10}>Car Insurance</option>
                      <option value={11}>Home Insurance</option>
                      <option value={12}>Credit Card</option>
                      <option value={13}>Solid Waste</option>
                      <option value={14}>Home Association</option>
                      <option value={15}>Property Tax</option>
                      <option value={16}>Internet</option>
                      <option value={17}>Phone</option>
                      <option value={18}>Education</option>
                      <option value={19}>Other Expense</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                        type="date"
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                        value={newExpense.date}
                        onChange={e => setNewExpense({...newExpense, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button
                      onClick={() => setShowModal(false)}
                      className="flex-1 border border-gray-300 text-gray-700 rounded-xl py-2 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                      onClick={handleSubmit}
                      className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl py-2 hover:from-rose-600 hover:to-rose-700 transition-colors"
                  >
                    Save Expense
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}