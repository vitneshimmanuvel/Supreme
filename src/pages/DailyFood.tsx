import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Coffee, 
  Soup, 
  Moon, 
  Edit3, 
  Plus, 
  Save, 
  Calendar,
  UtensilsCrossed,
  Leaf,
  Beef
} from "lucide-react";
import { weeklyMenu } from "@/lib/mockData";
import { MenuItem } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import FoodItemCard from "@/components/FoodItemCard";
import breakfastItems from "@/assets/breakfast-items.jpg";
import lunchItems from "@/assets/lunch-items.jpg";
import dinnerItems from "@/assets/dinner-items.jpg";

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

const mealImages = {
  breakfast: breakfastItems,
  lunch: lunchItems,
  dinner: dinnerItems
};

export default function DailyFood() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [editingMeal, setEditingMeal] = useState<{ day: string; mealType: string; items: MenuItem[] } | null>(null);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    category: '',
    type: 'veg',
    description: ''
  });
  const { toast } = useToast();

  const currentMenu = weeklyMenu.find(menu => menu.day === selectedDay) || weeklyMenu[0];

  const handleEditMeal = (mealType: string) => {
    const mealItems = currentMenu[mealType as keyof typeof currentMenu] as MenuItem[];
    setEditingMeal({
      day: selectedDay,
      mealType,
      items: [...mealItems]
    });
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category) {
      toast({
        title: "Error",
        description: "Please fill in item name and category",
        variant: "destructive"
      });
      return;
    }

    if (editingMeal) {
      setEditingMeal({
        ...editingMeal,
        items: [...editingMeal.items, {
          id: Date.now().toString(),
          name: newItem.name,
          category: newItem.category,
          type: newItem.type || 'veg',
          description: newItem.description
        } as MenuItem]
      });
      setNewItem({ name: '', category: '', type: 'veg', description: '' });
    }
  };

  const handleSaveMenu = () => {
    toast({
      title: "Success",
      description: `${editingMeal?.mealType} menu updated for ${editingMeal?.day}`,
    });
    setEditingMeal(null);
  };

  const removeItem = (itemId: string) => {
    if (editingMeal) {
      setEditingMeal({
        ...editingMeal,
        items: editingMeal.items.filter(item => item.id !== itemId)
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-corporate-text">Daily Food Items</h1>
          <p className="text-muted-foreground">Manage weekly menu and daily food items for all 7 days</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UtensilsCrossed className="h-5 w-5" />
                Add New Food Item
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="meal-type">Meal Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="day">Day</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {weeklyMenu.map((menu) => (
                      <SelectItem key={menu.day} value={menu.day}>
                        {menu.day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="item-name">Item Name</Label>
                <Input placeholder="e.g., Masala Dosa" />
              </div>
              <div>
                <Label htmlFor="item-category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Course</SelectItem>
                    <SelectItem value="curry">Curry</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="side">Side Dish</SelectItem>
                    <SelectItem value="beverage">Beverage</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="item-type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="veg">Vegetarian</SelectItem>
                    <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-gradient-primary">
                <Save className="h-4 w-4 mr-2" />
                Add Item to Menu
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Day Selector */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Weekly Menu Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {weeklyMenu.map((menu) => (
              <Button
                key={menu.day}
                variant={selectedDay === menu.day ? "default" : "outline"}
                onClick={() => setSelectedDay(menu.day)}
                className="transition-all duration-200"
              >
                {menu.day}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Day Menu */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries({
          breakfast: currentMenu.breakfast,
          lunch: currentMenu.lunch,
          dinner: currentMenu.dinner
        }).map(([mealType, items]) => {
          const MealIcon = mealIcons[mealType as keyof typeof mealIcons];
          return (
            <Card key={mealType} className="border-0 shadow-medium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${mealColors[mealType as keyof typeof mealColors]}`}>
                      <MealIcon className="h-4 w-4" />
                    </div>
                    <span className="capitalize">{mealType}</span>
                  </CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditMeal(mealType)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <MealIcon className="h-5 w-5" />
                          Edit {mealType} - {selectedDay}
                        </DialogTitle>
                      </DialogHeader>
                      
                      {editingMeal && (
                        <div className="space-y-6">
                          {/* Current Items */}
                          <div>
                            <h4 className="font-medium mb-3">Current Items</h4>
                            <div className="space-y-2">
                              {editingMeal.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                                  <div className="flex items-center gap-3">
                                    {item.type === 'veg' ? (
                                      <Leaf className="h-4 w-4 text-status-success" />
                                    ) : (
                                      <Beef className="h-4 w-4 text-status-error" />
                                    )}
                                    <div>
                                      <p className="font-medium">{item.name}</p>
                                      <p className="text-sm text-muted-foreground">{item.category}</p>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeItem(item.id)}
                                    className="text-status-error hover:text-status-error"
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Add New Item */}
                          <div className="border-t pt-6">
                            <h4 className="font-medium mb-3">Add New Item</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="item-name">Item Name</Label>
                                <Input
                                  id="item-name"
                                  value={newItem.name}
                                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                  placeholder="e.g., Masala Dosa"
                                />
                              </div>
                              <div>
                                <Label htmlFor="item-category">Category</Label>
                                <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="main">Main Course</SelectItem>
                                    <SelectItem value="curry">Curry</SelectItem>
                                    <SelectItem value="rice">Rice</SelectItem>
                                    <SelectItem value="side">Side Dish</SelectItem>
                                    <SelectItem value="beverage">Beverage</SelectItem>
                                    <SelectItem value="dessert">Dessert</SelectItem>
                                    <SelectItem value="vegetable">Vegetable</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="item-type">Type</Label>
                                <Select value={newItem.type} onValueChange={(value) => setNewItem({ ...newItem, type: value as 'veg' | 'non-veg' })}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="veg">Vegetarian</SelectItem>
                                    <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="item-description">Description</Label>
                                <Input
                                  id="item-description"
                                  value={newItem.description}
                                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                  placeholder="Optional description"
                                />
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button onClick={handleAddItem} variant="outline">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Item
                              </Button>
                              <Button onClick={handleSaveMenu} className="bg-gradient-primary">
                                <Save className="h-4 w-4 mr-2" />
                                Save Menu
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <img 
                    src={mealImages[mealType as keyof typeof mealImages]} 
                    alt={`${mealType} items`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-white font-semibold text-lg capitalize">{mealType}</h3>
                    <p className="text-white/80 text-sm">{items.length} items available</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {items.map((item) => (
                    <FoodItemCard 
                      key={item.id} 
                      item={item} 
                      mealType={mealType as 'breakfast' | 'lunch' | 'dinner'} 
                    />
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    {items.length} items • {items.filter(i => i.type === 'veg').length} veg • {items.filter(i => i.type === 'non-veg').length} non-veg
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <Card className="border-0 shadow-medium bg-gradient-card">
        <CardHeader>
          <CardTitle>Menu Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-corporate-blue">
                {currentMenu.breakfast.length + currentMenu.lunch.length + currentMenu.dinner.length}
              </div>
              <p className="text-sm text-muted-foreground">Total Items Today</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-status-success">
                {[...currentMenu.breakfast, ...currentMenu.lunch, ...currentMenu.dinner].filter(i => i.type === 'veg').length}
              </div>
              <p className="text-sm text-muted-foreground">Vegetarian Options</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-status-error">
                {[...currentMenu.breakfast, ...currentMenu.lunch, ...currentMenu.dinner].filter(i => i.type === 'non-veg').length}
              </div>
              <p className="text-sm text-muted-foreground">Non-Veg Options</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-corporate-purple">
                {new Set([...currentMenu.breakfast, ...currentMenu.lunch, ...currentMenu.dinner].map(i => i.category)).size}
              </div>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}