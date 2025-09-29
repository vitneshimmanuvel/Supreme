export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  employeeId: string;
  joinDate: string;
  active: boolean;
}

export interface MealRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  attended: boolean;
  timestamp: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  type: 'veg' | 'non-veg';
  description?: string;
}

export interface DailyMenu {
  id: string;
  day: string;
  date: string;
  breakfast: MenuItem[];
  lunch: MenuItem[];
  dinner: MenuItem[];
}

export interface SupplyDemandRecord {
  id: string;
  date: string;
  month: string;
  year: number;
  totalCost: number;
  supplyCost: number;
  demandCost: number;
  totalPeople: number;
  breakfastCount: number;
  lunchCount: number;
  dinnerCount: number;
  items: {
    name: string;
    quantity: number;
    cost: number;
    category: string;
  }[];
}

export interface DashboardStats {
  todayMeals: {
    breakfast: number;
    lunch: number;
    dinner: number;
    total: number;
  };
  monthlySpend: number;
  avgDailySpend: number;
  activeEmployees: number;
  topItems: {
    name: string;
    count: number;
  }[];
}