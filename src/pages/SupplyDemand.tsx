import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  IndianRupee, 
  Package, 
  ShoppingCart,
  Calendar,
  Users
} from "lucide-react";
import { supplyDemandData } from "@/lib/mockData";

export default function SupplyDemand() {
  const currentMonthData = supplyDemandData[0];
  const previousMonthData = supplyDemandData[1];
  
  const costDifference = currentMonthData.totalCost - previousMonthData.totalCost;
  const percentageChange = Math.round((costDifference / previousMonthData.totalCost) * 100);
  
  const monthlyData = [
    { month: 'Jan 2024', cost: 45000, people: 125, efficiency: 94 },
    { month: 'Dec 2023', cost: 42000, people: 118, efficiency: 91 },
    { month: 'Nov 2023', cost: 38000, people: 112, efficiency: 88 },
    { month: 'Oct 2023', cost: 41000, people: 120, efficiency: 92 },
    { month: 'Sep 2023', cost: 39000, people: 115, efficiency: 89 },
    { month: 'Aug 2023', cost: 44000, people: 122, efficiency: 93 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Supply & Demand</h1>
          <p className="text-muted-foreground">Track costs, supplies, and consumption patterns</p>
        </div>
        <Badge variant="outline" className="px-4 py-2">
          <Calendar className="h-4 w-4 mr-2" />
          {currentMonthData.month} {currentMonthData.year}
        </Badge>
      </div>

      {/* Current Month Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <IndianRupee className="h-4 w-4 text-corporate-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-green">
              ₹{currentMonthData.totalCost.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs">
              {costDifference > 0 ? (
                <TrendingUp className="h-3 w-3 text-status-error" />
              ) : (
                <TrendingDown className="h-3 w-3 text-status-success" />
              )}
              <span className={costDifference > 0 ? "text-status-error" : "text-status-success"}>
                {Math.abs(percentageChange)}% vs last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supply Cost</CardTitle>
            <Package className="h-4 w-4 text-corporate-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-blue">
              ₹{currentMonthData.supplyCost.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((currentMonthData.supplyCost / currentMonthData.totalCost) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demand Cost</CardTitle>
            <ShoppingCart className="h-4 w-4 text-corporate-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-orange">
              ₹{currentMonthData.demandCost.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((currentMonthData.demandCost / currentMonthData.totalCost) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">People Served</CardTitle>
            <Users className="h-4 w-4 text-corporate-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-purple">
              {currentMonthData.totalPeople}
            </div>
            <p className="text-xs text-muted-foreground">
              ₹{Math.round(currentMonthData.totalCost / currentMonthData.totalPeople)} per person
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Historical Data */}
        <Card className="border-0 shadow-medium">
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 rounded-full bg-gradient-primary"></div>
                  <div>
                    <p className="font-medium">{data.month}</p>
                    <p className="text-sm text-muted-foreground">{data.people} people</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">₹{data.cost.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{data.efficiency}% efficiency</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Meal Distribution */}
        <Card className="border-0 shadow-medium">
          <CardHeader>
            <CardTitle>Meal Distribution - {currentMonthData.month}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Breakfast</span>
                  <span className="text-sm text-muted-foreground">{currentMonthData.breakfastCount} people</span>
                </div>
                <Progress 
                  value={(currentMonthData.breakfastCount / currentMonthData.totalPeople) * 100} 
                  className="h-2"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Lunch</span>
                  <span className="text-sm text-muted-foreground">{currentMonthData.lunchCount} people</span>
                </div>
                <Progress 
                  value={(currentMonthData.lunchCount / currentMonthData.totalPeople) * 100} 
                  className="h-2"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Dinner</span>
                  <span className="text-sm text-muted-foreground">{currentMonthData.dinnerCount} people</span>
                </div>
                <Progress 
                  value={(currentMonthData.dinnerCount / currentMonthData.totalPeople) * 100} 
                  className="h-2"
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Key Insights</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Lunch has highest attendance (96%)</p>
                <p>• Breakfast attendance increased by 8%</p>
                <p>• Average cost per meal: ₹{Math.round(currentMonthData.totalCost / (currentMonthData.breakfastCount + currentMonthData.lunchCount + currentMonthData.dinnerCount))}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Supply Items Breakdown */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle>Supply Items Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentMonthData.items.map((item, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/20 border border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{item.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-medium">{item.quantity} kg</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cost</span>
                    <span className="font-medium text-corporate-green">₹{item.cost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-medium">₹{Math.round(item.cost / item.quantity)}/kg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}