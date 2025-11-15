import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import CategorySection from './MenuCategorySection';

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

interface Category {
  id: string;
  name: string;
  displayOrder: number;
  dishes: Dish[];
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string | null;
  setActiveCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  setActiveCategory,
}: CategoryTabsProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <Tabs value={activeCategory || ''} onValueChange={setActiveCategory}>
      <TabsList className="w-full mb-8 grid gap-2" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(100px, 1fr))` }}>
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="text-sm"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((category) => (
        <TabsContent
          key={category.id}
          value={category.id}
          className="space-y-4"
        >
          <CategorySection
            categoryName={category.name}
            dishes={category.dishes}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
