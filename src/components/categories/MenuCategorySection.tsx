import React from 'react';
import DishCard from '../menu/DishCard';

type DishType = 'VEG' | 'NON_VEG' | 'EGG';

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  spiceLevel: number | null;
  imageUrl: string | null;
  dishType: DishType;
}

interface Category {
  id: string;
  name: string;
  displayOrder: number;
  dishes: Dish[];
}

interface CategorySectionProps {
  category: Category;
}

export default function CategorySection({ category }: CategorySectionProps) {
  return (
    <div id={`category-${category.id}`} className="scroll-mt-20">
      <h2 className="text-3xl font-bold text-red-600 mb-6 pb-2 border-b-2 border-red-600">
        {category.name}
      </h2>
      <div className="grid gap-4">
        {category.dishes.map((dish) => (
          <DishCard
            key={dish.id}
            name={dish.name}
            description={dish.description}
            price={dish.price}
            spiceLevel={dish.spiceLevel}
            imageUrl={dish.imageUrl}
            dishType={dish.dishType}
          />
        ))}
      </div>
    </div>
  );
}
