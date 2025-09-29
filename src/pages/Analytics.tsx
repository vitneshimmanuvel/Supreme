import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Tooltip,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  IndianRupee, 
  Coffee, 
  Soup, 
  Moon,
  Download,
  Calendar,
  BarChart3
} from "lucide-react";
import { useState } from "react";

const monthlyData = [
  { month: 'Aug', breakfast: 78, lunch: 115, dinner: 85, cost: 44000, people: 122 },
  { month: 'Sep', breakfast: 82, lunch: 118, dinner: 88, cost: 39000, people: 115 },
  { month: 'Oct', breakfast: 80, lunch: 120, dinner: 92, cost: 41000, people: 120 },
  { month: 'Nov', breakfast: 75, lunch: 112, dinner: 80, cost: 38000, people: 112 },
  { month: 'Dec', breakfast: 78, lunch: 115, dinner: 85, cost: 42000, people: 118 },
  { month: 'Jan', breakfast: 85, lunch: 120, dinner: 90, cost: 45000, people: 125 },
];

const weeklyData = [
  { day: 'Mon', breakfast: 12, lunch: 18, dinner: 15 },
  { day: 'Tue', breakfast: 14, lunch: 19, dinner: 13 },
  { day: 'Wed', breakfast: 13, lunch: 17, dinner: 14 },
  { day: 'Thu', breakfast: 15, lunch: 20, dinner: 16 },
  { day: 'Fri', breakfast: 16, lunch: 22, dinner: 18 },
  { day: 'Sat', breakfast: 10, lunch: 15, dinner: 12 },
  { day: 'Sun', breakfast: 8, lunch: 12, dinner: 10 },
];

const mealDistributionData = [
  { name: 'Breakfast', value: 85, color: '#F59E0B' },
  { name: 'Lunch', value: 120, color: '#10B981' },
  { name: 'Dinner', value: 90, color: '#8B5CF6' },
];

const costAnalysisData = [
  { category: 'Grains', cost: 15000, percentage: 33 },
  { category: 'Vegetables', cost: 12000, percentage: 27 },
  { category: 'Dairy', cost: 8000, percentage: 18 },
  { category: 'Spices', cost: 6000, percentage: 13 },
  { category: 'Others', cost: 4000, percentage: 9 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('6months');
  const [viewType, setViewType] = useState('overview');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights and data visualization</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1week">Last Week</SelectItem>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Daily Meals</CardTitle>
            <Users className="h-4 w-4 text-corporate-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-blue">295</div>
            <p className="text-xs text-muted-foreground">+8.2% from last period</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Efficiency</CardTitle>
            <IndianRupee className="h-4 w-4 text-corporate-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-green">₹152</div>
            <p className="text-xs text-muted-foreground">Per person per day</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-corporate-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-orange">96%</div>
            <p className="text-xs text-muted-foreground">Lunch time peak</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <BarChart3 className="h-4 w-4 text-corporate-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-purple">4.6/5</div>
            <p className="text-xs text-muted-foreground">Employee rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card className="border-0 shadow-medium">
          <CardHeader>
            <CardTitle>Monthly Meal Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="breakfast" fill="#F59E0B" name="Breakfast" radius={[2, 2, 0, 0]} />
                <Bar dataKey="lunch" fill="#10B981" name="Lunch" radius={[2, 2, 0, 0]} />
                <Bar dataKey="dinner" fill="#8B5CF6" name="Dinner" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Meal Distribution */}
        <Card className="border-0 shadow-medium">
          <CardHeader>
            <CardTitle>Current Meal Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mealDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mealDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Pattern */}
        <Card className="border-0 shadow-medium">
          <CardHeader>
            <CardTitle>Weekly Attendance Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="breakfast" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                  name="Breakfast"
                />
                <Line 
                  type="monotone" 
                  dataKey="lunch" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  name="Lunch"
                />
                <Line 
                  type="monotone" 
                  dataKey="dinner" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  name="Dinner"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Analysis */}
        <Card className="border-0 shadow-medium">
          <CardHeader>
            <CardTitle>Cost Breakdown Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {costAnalysisData.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.category}</span>
                    <div className="text-right">
                      <span className="font-bold">₹{item.cost.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground ml-2">({item.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-medium bg-status-success/5 border-status-success/20">
          <CardHeader>
            <CardTitle className="text-status-success flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">• Lunch attendance increased by 12% this month</p>
            <p className="text-sm">• Friday has the highest attendance (22% above average)</p>
            <p className="text-sm">• Cost per meal reduced by ₹8 due to better sourcing</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-medium bg-status-warning/5 border-status-warning/20">
          <CardHeader>
            <CardTitle className="text-status-warning flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">• Consider reducing dinner portions on weekends</p>
            <p className="text-sm">• Breakfast items can be diversified for better attendance</p>
            <p className="text-sm">• Bulk purchasing for grains can reduce costs by 15%</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-medium bg-status-info/5 border-status-info/20">
          <CardHeader>
            <CardTitle className="text-status-info flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Forecasts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">• Expected 8% increase in February attendance</p>
            <p className="text-sm">• Monthly costs projected to be ₹47,000 next month</p>
            <p className="text-sm">• Peak lunch attendance expected to reach 130 people</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}