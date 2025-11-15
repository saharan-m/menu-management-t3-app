import React from 'react';
import { Card, CardContent } from '~/components/ui/card';
import DishCard from './DishCard';
type DishType = 'VEG' | 'NON_VEG' | 'EGG'
interface Dish {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  spiceLevel: number | null;
  dishType: DishType,
  price: number
}

interface CategorySectionProps {
  categoryName: string;
  dishes: Dish[];
}

export default function CategorySection({
  categoryName,
  dishes,
}: CategorySectionProps) {
  return (
    <div className="space-y-4">
      {dishes.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-slate-500">
            No dishes in this category yet
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-1">
          {dishes.map((dish) => (
            <DishCard
              key={dish.id}
              name={dish.name}
              description={dish.description}
              spiceLevel={dish.spiceLevel}
              imageUrl={dish.imageUrl}
              dishType={dish.dishType}
              price={dish.price}
            />
          ))}
        </div>
      )}
    </div>
  );
}
