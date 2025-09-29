import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Coffee,
  Soup,
  Moon,
  User,
  Mail,
  Calendar,
  Building
} from "lucide-react";
import { mockEmployees, todayMealRecords } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const mealIcons = {
  breakfast: Coffee,
  lunch: Soup,
  dinner: Moon
};

export default function PeopleList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    employeeId: '',
  });
  const { toast } = useToast();

  const departments = [...new Set(mockEmployees.map(emp => emp.department))];

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const getEmployeeMeals = (employeeId: string) => {
    return todayMealRecords.filter(record => record.employeeId === employeeId && record.attended);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.position || !newEmployee.department || !newEmployee.employeeId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: `${newEmployee.name} has been added to the system`,
    });
    
    setNewEmployee({ name: '', position: '', department: '', employeeId: '' });
    setIsAddingEmployee(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">People Lists</h1>
          <p className="text-muted-foreground">Manage employees and track meal attendance</p>
        </div>
        <Dialog open={isAddingEmployee} onOpenChange={setIsAddingEmployee}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="emp-name">Full Name</Label>
                <Input
                  id="emp-name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="emp-id">Employee ID</Label>
                <Input
                  id="emp-id"
                  value={newEmployee.employeeId}
                  onChange={(e) => setNewEmployee({ ...newEmployee, employeeId: e.target.value })}
                  placeholder="EMP001"
                />
              </div>
              <div>
                <Label htmlFor="emp-position">Position</Label>
                <Input
                  id="emp-position"
                  value={newEmployee.position}
                  onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                  placeholder="Job title"
                />
              </div>
              <div>
                <Label htmlFor="emp-department">Department</Label>
                <Select value={newEmployee.department} onValueChange={(value) => setNewEmployee({ ...newEmployee, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddEmployee} className="flex-1">
                  Add Employee
                </Button>
                <Button variant="outline" onClick={() => setIsAddingEmployee(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-corporate-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-blue">{mockEmployees.length}</div>
            <p className="text-xs text-muted-foreground">Active employees</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-corporate-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-green">
              {new Set(todayMealRecords.map(r => r.employeeId)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((new Set(todayMealRecords.map(r => r.employeeId)).size / mockEmployees.length) * 100)}% attendance rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building className="h-4 w-4 text-corporate-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-orange">{departments.length}</div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Meals/Person</CardTitle>
            <User className="h-4 w-4 text-corporate-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-corporate-purple">
              {Math.round(todayMealRecords.length / new Set(todayMealRecords.map(r => r.employeeId)).size * 10) / 10}
            </div>
            <p className="text-xs text-muted-foreground">Meals per person today</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-soft">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search employees by name, position, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employee List */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEmployees.map((employee) => {
              const todayMeals = getEmployeeMeals(employee.id);
              return (
                <div key={employee.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={defaultAvatar} alt={employee.name} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                        {getInitials(employee.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{employee.name}</h3>
                      <p className="text-sm text-muted-foreground">{employee.position}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {employee.employeeId}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {employee.department}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Today's Meals */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground mr-2">Today:</span>
                      {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                        const hasMeal = todayMeals.some(meal => meal.mealType === mealType);
                        const MealIcon = mealIcons[mealType as keyof typeof mealIcons];
                        return (
                          <div
                            key={mealType}
                            className={`p-2 rounded-lg transition-colors ${
                              hasMeal 
                                ? `bg-meals-${mealType} text-white` 
                                : 'bg-muted/50 text-muted-foreground'
                            }`}
                            title={`${mealType.charAt(0).toUpperCase() + mealType.slice(1)} ${hasMeal ? 'attended' : 'not attended'}`}
                          >
                            <MealIcon className="h-4 w-4" />
                          </div>
                        );
                      })}
                    </div>

                    {/* Actions */}
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground">No employees found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Department Breakdown */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle>Department Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((department) => {
              const deptEmployees = mockEmployees.filter(emp => emp.department === department);
              const deptMealsToday = todayMealRecords.filter(record => 
                deptEmployees.some(emp => emp.id === record.employeeId)
              );
              
              return (
                <div key={department} className="p-4 rounded-lg bg-muted/20 border border-border/50">
                  <h4 className="font-semibold mb-2">{department}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Employees</span>
                      <span className="font-medium">{deptEmployees.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Today's Meals</span>
                      <span className="font-medium">{deptMealsToday.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Attendance</span>
                      <span className="font-medium">
                        {Math.round((new Set(deptMealsToday.map(r => r.employeeId)).size / deptEmployees.length) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}