import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import DishDescription from './DishDescription';
import DishActions from './DishActions';

type DishType = 'VEG' | 'NON_VEG' | 'EGG';

interface DishCardProps {
  dish: any;
  onEdit: () => void;
  onDelete: () => void;
}

const getDishTypeIcon = (type: DishType) => {
  switch (type) {
    case 'VEG':
      return '🟢';
    case 'NON_VEG':
      return '🔴';
    case 'EGG':
      return '🟡';
    default:
      return '';
  }
};

export default function DishCard({ dish, onEdit, onDelete }: DishCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex gap-4 flex-col sm:flex-row">
        {dish.imageUrl && (
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="w-full sm:w-32 h-32 object-cover pl-2"
          />
        )}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2 flex-col sm:flex-row">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <CardTitle className="text-lg">{dish.name}</CardTitle>
                <span>{getDishTypeIcon(dish.dishType)}</span>
              </div>
              <p className="text-slate-900 font-semibold mb-1">₹ {dish.price}</p>
              <DishDescription description={dish.description} />
            </div>
            <DishActions onEdit={onEdit} onDelete={onDelete} />
          </div>
          <div className="flex items-center justify-between text-sm flex-wrap gap-2">
            {dish.dishCategories?.map((dc: any) => (
              <span
                key={dc.categoryId}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
              >
                {dc.category.name}
              </span>
            ))}
            {dish.spiceLevel && dish.spiceLevel > 0 && (
              <span className="text-red-500">{'🌶️'.repeat(dish.spiceLevel)}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
