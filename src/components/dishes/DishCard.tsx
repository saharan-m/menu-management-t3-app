import React from "react";
import { Card, CardTitle } from "~/components/ui/card";
import DishDescription from "./DishDescription";
import DishActions from "./DishActions";
import  { Prisma } from "@prisma/client";

type DishType = "VEG" | "NON_VEG" | "EGG";

type DishWithCategoriesWithCategory = Prisma.DishGetPayload<{
  include: { dishCategories: {
    include: { category: true}
  }
  };
}>;
type DishCategoryWithCategory = Prisma.DishCategoryGetPayload<{
  include: {category:true}
}>

interface DishCardProps {
  dish: DishWithCategoriesWithCategory;
  onEdit: () => void;
  onDelete: () => void;
}

const getDishTypeIcon = (type: DishType) => {
  switch (type) {
    case "VEG":
      return "🟢";
    case "NON_VEG":
      return "🔴";
    case "EGG":
      return "🟡";
    default:
      return "";
  }
};

export default function DishCard({ dish, onEdit, onDelete }: DishCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row">
        {dish.imageUrl && (
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="h-32 w-full object-cover pl-2 sm:w-32"
          />
        )}
        <div className="flex-1 p-4">
          <div className="mb-2 flex flex-col items-start justify-between sm:flex-row">
            <div className="flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <CardTitle className="text-lg">{dish.name}</CardTitle>
                <span>{getDishTypeIcon(dish.dishType)}</span>
              </div>
              <p className="mb-1 font-semibold text-slate-900">
                ₹ {dish.price}
              </p>
              <DishDescription description={dish.description} />
            </div>
            <DishActions onEdit={onEdit} onDelete={onDelete} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            {dish.dishCategories?.map((dc: DishCategoryWithCategory) => (
              <span
                key={dc.categoryId}
                className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800"
              >
                {dc.category.name}
              </span>
            ))}
            {dish.spiceLevel && dish.spiceLevel > 0 && (
              <span className="text-red-500">
                {"🌶️".repeat(dish.spiceLevel)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
