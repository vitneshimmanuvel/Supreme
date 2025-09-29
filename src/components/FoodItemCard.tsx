import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Beef } from "lucide-react";
import { MenuItem } from "@/lib/types";

interface FoodItemCardProps {
  item: MenuItem;
  mealType: 'breakfast' | 'lunch' | 'dinner';
}

const mealImages = {
  breakfast: () => import("@/assets/breakfast-items.jpg"),
  lunch: () => import("@/assets/lunch-items.jpg"),
  dinner: () => import("@/assets/dinner-items.jpg")
};

export default function FoodItemCard({ item, mealType }: FoodItemCardProps) {
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = await mealImages[mealType]();
        setImageSrc(imageModule.default);
      } catch (error) {
        console.log("Image loading failed", error);
      }
    };
    loadImage();
  }, [mealType]);

  return (
    <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
      <div className="relative overflow-hidden rounded-t-lg">
        {imageSrc && (
          <img 
            src={imageSrc} 
            alt={`${mealType} items`}
            className="w-full h-24 object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {item.type === 'veg' ? (
                <Leaf className="h-4 w-4 text-status-success" />
              ) : (
                <Beef className="h-4 w-4 text-status-error" />
              )}
            </div>
            <Badge variant="secondary" className="bg-white/90 text-black text-xs">
              {item.category}
            </Badge>
          </div>
        </div>
      </div>
      <CardContent className="p-3">
        <h4 className="font-medium text-sm text-corporate-text">{item.name}</h4>
        {item.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {item.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}