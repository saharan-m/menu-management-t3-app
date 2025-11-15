import React from 'react';
import CategorySection from './MenuCategorySection';

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

interface CategoriesDisplayProps {
  categories: Category[];
}

export default function CategoriesDisplay({ categories }: CategoriesDisplayProps) {
  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}
    </div>
  );
}
