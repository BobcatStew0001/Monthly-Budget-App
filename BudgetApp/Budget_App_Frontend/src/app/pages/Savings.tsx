import {useState, useEffect} from 'react';
import {getSavings} from "../../services/savingService";
import {Saving as SavingType} from "../../types/saving";
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plus, PiggyBank, Target, TrendingUp, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

  export function Savings() {
    const [savings, setSavings] = useState<SavingType[]>([]);
    useEffect(() => {
      getSavings().then(data => setSavings(data))
    }, []);
    
    const colors = [
      'from-cyan-500 to-cyan-600',
      'from-amber-500 to-amber-600',
      'from-purple-500 to-purple-600',
      'from-emerald-500 to-emerald-600',
    ]
    const savingsGoals = savings.map((saving, index) => ({
      name: saving.goalName,
      target: saving.targetAmount,
      current: saving.currentAmount,
      deadline: saving.deadline,
      priority: saving.priority,
      color: colors[index % colors.length],
    }));
    const savingsProgress: {month: string; amount: number}[] = [];
      const savingsTips : string[] = [];
      const totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.current, 0);
      const totalGoals = savingsGoals.reduce((sum, goal) => sum + goal.target, 0);
      const overallProgress = totalGoals > 0 ? ((totalSavings / totalGoals) * 100).toFixed(1) : '0.0';
    
    return (
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Savings</h2>
              <p className="text-gray-600">Track your savings goals and progress</p>
            </div>
            <Button
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg">
              <Plus className="w-4 h-4 mr-2"/>
              Add Goal
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white border-none shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <PiggyBank className="w-6 h-6"/>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-amber-100 text-sm font-medium">Total Savings</p>
                <p className="text-3xl font-bold">${totalSavings.toLocaleString()}</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-none shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Target className="w-6 h-6"/>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-cyan-100 text-sm font-medium">Overall Progress</p>
                <p className="text-3xl font-bold">{overallProgress}%</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <DollarSign className="w-6 h-6"/>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-purple-100 text-sm font-medium">Monthly Savings</p>
                <p className="text-3xl font-bold">${savings.reduce((sum, s) => sum + s.amount, 0).toLocaleString()}</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-none shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <TrendingUp className="w-6 h-6"/>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-emerald-100 text-sm font-medium">Active Goals</p>
                <p className="text-3xl font-bold">{savingsGoals.length}</p>
              </div>
            </Card>
          </div>

          {/* Savings Growth Chart */}
          <Card className="p-6 bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Savings Growth</h3>
              <p className="text-sm text-gray-600">Your total savings over time</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={savingsProgress}>
                <defs>
                  <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
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
                <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    fill="url(#savingsGradient)"
                    dot={{fill: '#f59e0b', r: 6}}
                    activeDot={{r: 8}}
                    name="Total Savings"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Savings Goals */}
          <Card className="p-6 bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Savings Goals</h3>
              <p className="text-sm text-gray-600">Track progress towards your financial goals</p>
            </div>
            <div className="space-y-6">
              {savingsGoals.map((goal, index) => {
                const progress = (goal.current / goal.target) * 100;
                const remaining = goal.target - goal.current;
                return (
                    <div key={index} className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">{goal.name}</h4>
                          <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm text-gray-600">
                        ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
                      </span>
                            <span
                                className={`text-xs px-2 py-1 rounded-lg ${
                                    goal.priority === 'High'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-amber-100 text-amber-700'
                                }`}
                            >
                        {goal.priority} Priority
                      </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            {progress.toFixed(0)}%
                          </p>
                          <p className="text-sm text-gray-500">{goal.deadline}</p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div
                              className={`h-4 bg-gradient-to-r ${goal.color} rounded-full transition-all duration-500 shadow-lg`}
                              style={{width: `${Math.min(progress, 100)}%`}}
                          ></div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        ${remaining.toLocaleString()} remaining to reach your goal
                      </p>
                    </div>
                );
              })}
            </div>
          </Card>

          {/* Savings Tips */}
          <Card className="p-6 bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200 shadow-xl">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-1">💡 Savings Insights</h3>
              <p className="text-sm text-gray-600">Personalized tips to boost your savings</p>
            </div>
            <div className="space-y-3">
              {savingsTips.map((tip, index) => (
                  <div
                      key={index}
                      className="p-4 bg-white/70 rounded-xl border border-emerald-200 hover:bg-white transition-colors"
                  >
                    <p className="text-gray-700">{tip}</p>
                  </div>
              ))}
            </div>
          </Card>
        </div>
    );
  }

