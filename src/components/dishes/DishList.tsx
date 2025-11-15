import React from 'react';
import DishCard from './DishCard';
import { Card, CardContent } from '~/components/ui/card';
import type { Prisma } from '@prisma/client';

type DishWithCategoriesWithCategory = Prisma.DishGetPayload<{
  include: {
    dishCategories: {
      include: {
        category: true
      }
    }
  }
}>

interface DishListProps {
  dishes: DishWithCategoriesWithCategory[];
  onEdit: (dish: DishWithCategoriesWithCategory) => void;
  onDelete: (id: string) => void;
}

export default function DishList({ dishes, onEdit, onDelete }: DishListProps) {
  if (dishes.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-slate-500">
          No dishes yet. Create one to get started!
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {dishes.map((dish) => (
        <DishCard
          key={dish.id}
          dish={dish}
          onEdit={() => onEdit(dish)}
          onDelete={() => onDelete(dish.id)}
        />
      ))}
    </div>
  );
}
