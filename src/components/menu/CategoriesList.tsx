import React from 'react';
import CategorySection from './MenuCategorySection';
import { DishType } from '@prisma/client';
interface Dish {
     price: number;
        dishType: DishType;
        name: string;
        id: string;
        description: string;
        imageUrl: string | null;
        spiceLevel: number | null;
}
interface Category {
  id: string;
  name: string;
  displayOrder: number;
  dishes: Dish[];
}

interface CategoriesListProps {
  categories: Category[];
}

export default function CategoriesList({ categories }: CategoriesListProps) {
  if (categories.length === 0) return null;

  return (
    <div className="space-y-1">
      {categories.map((category) => (
        <div key={category.id} id={`category-${category.id}`}>
          <div className="mb-2 px-3 py-1 text-grey-500 font-semibold text-center sticky top-15 bg-white z-20">
            {category.name}
          </div>
          {/* Render the dishes for this category */}
          <CategorySection categoryName={category.name} dishes={category.dishes} />
        </div>
      ))}
    </div>
  );
}
