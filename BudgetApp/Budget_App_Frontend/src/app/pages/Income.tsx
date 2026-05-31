import {useState, useEffect} from 'react';
import {getIncomes, createIncome} from '../../services/incomeService';
import {Income as IncomeType} from "../../types/income";
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plus, TrendingUp, Briefcase, DollarSign, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Income() {
  const [incomes, setIncomes] = useState<IncomeType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newIncome, setNewIncome] = useState({
    source: '',
    amount: 0,
    frequency: 'Monthly',
    categoryId: 1,
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    getIncomes().then(data => setIncomes(data));
  }, []);

  const handleSubmit = async () => {
    await createIncome(newIncome);
    const updated = await getIncomes();
    setIncomes(updated);
    setShowModal(false);
    setNewIncome({
      source: '',
      amount: 0,
      frequency: 'Monthly',
      categoryId: 1,
      date: new Date().toISOString().split('T')[0],
    });
  };

  const totalMonthlyIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  const recentIncome = [...incomes]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);

  const monthlyIncome: { month: string; salary: number; freelance: number; other: number }[] = [];

  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Income</h2>
            <p className="text-gray-600">Track your income sources and earnings</p>
          </div>
          <Button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Add Income
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-none shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-emerald-100 text-sm font-medium">Total Monthly Income</p>
              <p className="text-3xl font-bold">${totalMonthlyIncome.toLocaleString()}</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-none shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Briefcase className="w-6 h-6" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-cyan-100 text-sm font-medium">Active Income Streams</p>
              <p className="text-3xl font-bold">{incomes.length}</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-purple-100 text-sm font-medium">Total Transactions</p>
              <p className="text-3xl font-bold">{incomes.length}</p>
            </div>
          </Card>
        </div>

        {/* Income Chart */}
        <Card className="p-6 bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Income Trends</h3>
            <p className="text-sm text-gray-600">Monthly breakdown by source</p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyIncome}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}/>
              <Bar dataKey="salary" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} name="Salary" />
              <Bar dataKey="freelance" stackId="a" fill="#8b5cf6" radius={[0, 0, 0, 0]} name="Freelance" />
              <Bar dataKey="other" stackId="a" fill="#06b6d4" radius={[8, 8, 0, 0]} name="Other" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Income Streams */}
        <Card className="p-6 bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Income Streams</h3>
            <p className="text-sm text-gray-600">All income sources</p>
          </div>
          <div className="space-y-4">
            {incomes.map((income, index) => (
                <div key={index} className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl shadow-lg">
                  <p className="font-bold text-lg mb-2">{income.source ?? `Income #${income.id}`}</p>
                  <p className="text-3xl font-bold mb-3">${income.amount.toLocaleString()}</p>
                  <div className="flex items-center text-sm opacity-90">
                    <Calendar className="w-4 h-4 mr-1" />
                    {income.frequency}
                  </div>
                </div>
            ))}
          </div>
        </Card>

        {/* Recent Income Transactions */}
        <Card className="p-6 bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Recent Income</h3>
            <p className="text-sm text-gray-600">Latest earnings</p>
          </div>
          <div className="space-y-4">
            {recentIncome.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.source ?? `Income #${item.id}`}</p>
                      <p className="text-sm text-gray-500">
                        {item.categoryId} • {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-emerald-600">+${item.amount.toLocaleString()}</p>
                  </div>
                </div>
            ))}
          </div>
        </Card>

        {/* Add Income Modal */}
        {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Add Income</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                    <input
                        type="text"
                        placeholder="e.g. Company XYZ - Salary"
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        value={newIncome.source}
                        onChange={e => setNewIncome({...newIncome, source: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        value={newIncome.amount}
                        onChange={e => setNewIncome({...newIncome, amount: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                    <select
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        value={newIncome.frequency}
                        onChange={e => setNewIncome({...newIncome, frequency: e.target.value})}
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
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        value={newIncome.categoryId}
                        onChange={e => setNewIncome({...newIncome, categoryId: parseInt(e.target.value)})}
                    >
                      <option value={1}>Salary</option>
                      <option value={2}>Interest Income</option>
                      <option value={3}>Other Income</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                        type="date"
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        value={newIncome.date}
                        onChange={e => setNewIncome({...newIncome, date: e.target.value})}
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
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl py-2 hover:from-emerald-600 hover:to-emerald-700 transition-colors"
                  >
                    Save Income
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}