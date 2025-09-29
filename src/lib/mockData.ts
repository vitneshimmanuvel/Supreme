import { Employee, MealRecord, DailyMenu, SupplyDemandRecord, DashboardStats } from './types';

// Mock Employees Data
export const mockEmployees: Employee[] = [
  { id: '1', name: 'Rajesh Kumar', position: 'Senior Developer', department: 'IT', employeeId: 'EMP001', joinDate: '2022-01-15', active: true },
  { id: '2', name: 'Priya Sharma', position: 'Project Manager', department: 'IT', employeeId: 'EMP002', joinDate: '2021-06-10', active: true },
  { id: '3', name: 'Amit Singh', position: 'Designer', department: 'Design', employeeId: 'EMP003', joinDate: '2022-03-22', active: true },
  { id: '4', name: 'Sunita Devi', position: 'HR Manager', department: 'HR', employeeId: 'EMP004', joinDate: '2020-11-08', active: true },
  { id: '5', name: 'Vikram Rao', position: 'Sales Executive', department: 'Sales', employeeId: 'EMP005', joinDate: '2023-02-14', active: true },
  { id: '6', name: 'Anita Gupta', position: 'Accountant', department: 'Finance', employeeId: 'EMP006', joinDate: '2021-09-30', active: true },
  { id: '7', name: 'Ravi Patel', position: 'Operations Manager', department: 'Operations', employeeId: 'EMP007', joinDate: '2022-07-12', active: true },
  { id: '8', name: 'Meera Joshi', position: 'Marketing Specialist', department: 'Marketing', employeeId: 'EMP008', joinDate: '2023-01-05', active: true },
];

// Weekly Menu Data
export const weeklyMenu: DailyMenu[] = [
  {
    id: 'mon',
    day: 'Monday',
    date: '2024-01-01',
    breakfast: [
      { id: 'b1', name: 'Idli', category: 'main', type: 'veg', description: 'Steamed rice cakes' },
      { id: 'b2', name: 'Sambar', category: 'curry', type: 'veg', description: 'Lentil soup' },
      { id: 'b3', name: 'Coconut Chutney', category: 'side', type: 'veg' },
      { id: 'b4', name: 'Filter Coffee', category: 'beverage', type: 'veg' }
    ],
    lunch: [
      { id: 'l1', name: 'Steamed Rice', category: 'main', type: 'veg' },
      { id: 'l2', name: 'Dal Tadka', category: 'curry', type: 'veg' },
      { id: 'l3', name: 'Bhindi Masala', category: 'vegetable', type: 'veg' },
      { id: 'l4', name: 'Curd', category: 'side', type: 'veg' },
      { id: 'l5', name: 'Papad', category: 'side', type: 'veg' },
      { id: 'l6', name: 'Pickle', category: 'side', type: 'veg' }
    ],
    dinner: [
      { id: 'd1', name: 'Chapati', category: 'main', type: 'veg' },
      { id: 'd2', name: 'Paneer Butter Masala', category: 'curry', type: 'veg' },
      { id: 'd3', name: 'Jeera Rice', category: 'rice', type: 'veg' },
      { id: 'd4', name: 'Salad', category: 'side', type: 'veg' }
    ]
  },
  {
    id: 'tue',
    day: 'Tuesday',
    date: '2024-01-02',
    breakfast: [
      { id: 'b5', name: 'Poha with Peanuts', category: 'main', type: 'veg' },
      { id: 'b6', name: 'Upma', category: 'main', type: 'veg' },
      { id: 'b7', name: 'Tea', category: 'beverage', type: 'veg' }
    ],
    lunch: [
      { id: 'l7', name: 'Lemon Rice', category: 'rice', type: 'veg' },
      { id: 'l8', name: 'Aloo Fry', category: 'vegetable', type: 'veg' },
      { id: 'l9', name: 'Rasam', category: 'soup', type: 'veg' },
      { id: 'l10', name: 'Curd', category: 'side', type: 'veg' }
    ],
    dinner: [
      { id: 'd5', name: 'Chapati', category: 'main', type: 'veg' },
      { id: 'd6', name: 'Egg Curry', category: 'curry', type: 'non-veg' },
      { id: 'd7', name: 'Chana Masala', category: 'curry', type: 'veg', description: 'Veg option' },
      { id: 'd8', name: 'Plain Rice', category: 'rice', type: 'veg' }
    ]
  },
  // Continue with other days...
  {
    id: 'sun',
    day: 'Sunday',
    date: '2024-01-07',
    breakfast: [
      { id: 'b25', name: 'Masala Dosa', category: 'main', type: 'veg' },
      { id: 'b26', name: 'Chutney', category: 'side', type: 'veg' },
      { id: 'b27', name: 'Sambar', category: 'curry', type: 'veg' },
      { id: 'b28', name: 'Coffee', category: 'beverage', type: 'veg' }
    ],
    lunch: [
      { id: 'l25', name: 'Chicken Biryani', category: 'rice', type: 'non-veg' },
      { id: 'l26', name: 'Paneer Biryani', category: 'rice', type: 'veg', description: 'Veg option' },
      { id: 'l27', name: 'Raita', category: 'side', type: 'veg' },
      { id: 'l28', name: 'Kurma', category: 'curry', type: 'veg' },
      { id: 'l29', name: 'Payasam', category: 'dessert', type: 'veg', description: 'Sweet' }
    ],
    dinner: [
      { id: 'd25', name: 'Chapati', category: 'main', type: 'veg' },
      { id: 'd26', name: 'Dal Makhani', category: 'curry', type: 'veg' },
      { id: 'd27', name: 'Jeera Rice', category: 'rice', type: 'veg' },
      { id: 'd28', name: 'Gulab Jamun', category: 'dessert', type: 'veg' }
    ]
  }
];

// Today's meal records
export const todayMealRecords: MealRecord[] = [
  { id: '1', employeeId: '1', employeeName: 'Rajesh Kumar', date: '2024-01-08', mealType: 'breakfast', attended: true, timestamp: '2024-01-08T08:30:00Z' },
  { id: '2', employeeId: '2', employeeName: 'Priya Sharma', date: '2024-01-08', mealType: 'breakfast', attended: true, timestamp: '2024-01-08T08:45:00Z' },
  { id: '3', employeeId: '1', employeeName: 'Rajesh Kumar', date: '2024-01-08', mealType: 'lunch', attended: true, timestamp: '2024-01-08T12:30:00Z' },
  { id: '4', employeeId: '3', employeeName: 'Amit Singh', date: '2024-01-08', mealType: 'lunch', attended: true, timestamp: '2024-01-08T12:45:00Z' },
  { id: '5', employeeId: '4', employeeName: 'Sunita Devi', date: '2024-01-08', mealType: 'dinner', attended: true, timestamp: '2024-01-08T19:15:00Z' },
];

// Supply & Demand Data
export const supplyDemandData: SupplyDemandRecord[] = [
  {
    id: '1',
    date: '2024-01-08',
    month: 'January',
    year: 2024,
    totalCost: 45000,
    supplyCost: 30000,
    demandCost: 15000,
    totalPeople: 125,
    breakfastCount: 85,
    lunchCount: 120,
    dinnerCount: 90,
    items: [
      { name: 'Rice', quantity: 50, cost: 2500, category: 'grains' },
      { name: 'Dal', quantity: 20, cost: 3000, category: 'pulses' },
      { name: 'Vegetables', quantity: 100, cost: 8000, category: 'vegetables' },
      { name: 'Spices', quantity: 10, cost: 2000, category: 'spices' },
    ]
  },
  {
    id: '2',
    date: '2023-12-01',
    month: 'December',
    year: 2023,
    totalCost: 42000,
    supplyCost: 28000,
    demandCost: 14000,
    totalPeople: 118,
    breakfastCount: 78,
    lunchCount: 115,
    dinnerCount: 85,
    items: [
      { name: 'Rice', quantity: 48, cost: 2400, category: 'grains' },
      { name: 'Dal', quantity: 18, cost: 2700, category: 'pulses' },
      { name: 'Vegetables', quantity: 95, cost: 7600, category: 'vegetables' },
    ]
  },
  // Add more months...
];

// Dashboard Stats
export const dashboardStats: DashboardStats = {
  todayMeals: {
    breakfast: 85,
    lunch: 120,
    dinner: 90,
    total: 295
  },
  monthlySpend: 45000,
  avgDailySpend: 1500,
  activeEmployees: 8,
  topItems: [
    { name: 'Rice', count: 120 },
    { name: 'Dal', count: 115 },
    { name: 'Chapati', count: 90 },
    { name: 'Vegetables', count: 85 }
  ]
};