import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  UtensilsCrossed, 
  TrendingUp, 
  IndianRupee,
  Coffee,
  Soup,
  Moon,
  Clock,
  Calendar
} from "lucide-react";
import { dashboardStats, todayMealRecords, weeklyMenu } from "@/lib/mockData";

const mealIcons = {
  breakfast: Coffee,
  lunch: Soup,
  dinner: Moon
};

const mealColors = {
  breakfast: "bg-meals-breakfast text-white",
  lunch: "bg-meals-lunch text-white", 
  dinner: "bg-meals-dinner text-white"
};

export default function Dashboard() {
  const todayMenu = weeklyMenu.find(menu => menu.day === new Date().toLocaleDateString('en-US', { weekday: 'long' }));
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Today's mess overview and statistics</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-soft bg-gradient-card animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Meals</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-corporate-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-blue">
              {dashboardStats.todayMeals.total}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft bg-gradient-card animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
            <IndianRupee className="h-4 w-4 text-corporate-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-green">
              ₹{dashboardStats.monthlySpend.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              ₹{dashboardStats.avgDailySpend}/day average
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft bg-gradient-card animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
            <Users className="h-4 w-4 text-corporate-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-purple">
              {dashboardStats.activeEmployees}
            </div>
            <p className="text-xs text-muted-foreground">
              All employees present
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft bg-gradient-card animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-corporate-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-orange">94%</div>
            <p className="text-xs text-muted-foreground">
              Meal service efficiency
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meal Attendance */}
        <Card className="border-0 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Today's Meal Attendance
            </CardTitle>
            <CardDescription>Track who ate what meals today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(dashboardStats.todayMeals).filter(([key]) => key !== 'total').map(([meal, count]) => {
              const MealIcon = mealIcons[meal as keyof typeof mealIcons];
              return (
                <div key={meal} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${mealColors[meal as keyof typeof mealColors]}`}>
                      <MealIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium capitalize">{meal}</p>
                      <p className="text-sm text-muted-foreground">{count} people</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="bg-secondary/50">
                      {Math.round((count / dashboardStats.activeEmployees) * 100)}%
                    </Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Today's Menu */}
        <Card className="border-0 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="h-5 w-5 text-primary" />
              Today's Menu
            </CardTitle>
            <CardDescription>
              {todayMenu?.day || 'Monday'} Special Menu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayMenu && Object.entries({
              breakfast: todayMenu.breakfast,
              lunch: todayMenu.lunch,
              dinner: todayMenu.dinner
            }).map(([mealType, items]) => {
              const MealIcon = mealIcons[mealType as keyof typeof mealIcons];
              return (
                <div key={mealType} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MealIcon className={`h-4 w-4 ${mealType === 'breakfast' ? 'text-meals-breakfast' : mealType === 'lunch' ? 'text-meals-lunch' : 'text-meals-dinner'}`} />
                    <span className="font-medium capitalize text-sm">{mealType}</span>
                  </div>
                  <div className="pl-6">
                    <p className="text-sm text-muted-foreground">
                      {items.slice(0, 3).map(item => item.name).join(', ')}
                      {items.length > 3 && ` +${items.length - 3} more`}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle>Recent Meal Activity</CardTitle>
          <CardDescription>Latest meal check-ins from employees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayMealRecords.slice(0, 5).map((record) => {
              const MealIcon = mealIcons[record.mealType];
              return (
                <div key={record.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${mealColors[record.mealType]}`}>
                      <MealIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{record.employeeName}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.mealType} • {new Date(record.timestamp).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <Badge variant={record.attended ? "default" : "secondary"}>
                    {record.attended ? 'Attended' : 'Missed'}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-medium bg-gradient-accent text-accent-foreground">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription className="text-accent-foreground/80">
            Frequently used actions for mess management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="secondary" className="h-auto py-4 flex-col gap-2">
              <Users className="h-5 w-5" />
              Add Employee
            </Button>
            <Button variant="secondary" className="h-auto py-4 flex-col gap-2">
              <UtensilsCrossed className="h-5 w-5" />
              Update Menu
            </Button>
            <Button variant="secondary" className="h-auto py-4 flex-col gap-2">
              <TrendingUp className="h-5 w-5" />
              View Analytics
            </Button>
            <Button variant="secondary" className="h-auto py-4 flex-col gap-2">
              <IndianRupee className="h-5 w-5" />
              Track Expenses
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}