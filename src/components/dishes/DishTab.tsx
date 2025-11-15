import React, { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { TabsContent } from '~/components/ui/tabs';
import { Plus } from 'lucide-react';
import AddEditDishForm from './DishForm';
import  DishList  from './DishList';
import  HeaderWithAddButton  from './HeaderWithAddButton';

type DishType = 'VEG' | 'NON_VEG' | 'EGG';

interface DishFormState {
  name: string;
  description: string;
  imageUrl: string;
  spiceLevel: number;
  price: number;
  dishType: DishType;
  categoryIds: string[];
}

interface DishTabProps {
  dishes: any[];
  categories: any[];
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  dishForm: DishFormState;
  setDishForm: React.Dispatch<React.SetStateAction<DishFormState>>;
  editingDish: string | null;
  setEditingDish: React.Dispatch<React.SetStateAction<string | null>>;
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  handleAddDish: (e: React.FormEvent) => Promise<void>;
  handleDeleteDish: (dishId: string) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
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

export default function DishTab({
  dishes,
  categories,
  showForm,
  setShowForm,
  dishForm,
  setDishForm,
  editingDish,
  setEditingDish,
  imagePreview,
  setImagePreview,
  handleAddDish,
  handleDeleteDish,
  isCreating,
  isUpdating,
}: DishTabProps) {
  
  const openNewDishForm = () => {
    setEditingDish(null);
    setDishForm({
      name: '',
      description: '',
      imageUrl: '',
      spiceLevel: 0,
      price: 0,
      dishType: 'VEG',
      categoryIds: [],
    });
    setImagePreview(null);
  };

  const handleEditDish = (dish: any) => {
    setEditingDish(dish.id);
    setDishForm({
      name: dish.name,
      description: dish.description,
      imageUrl: dish.imageUrl || '',
      spiceLevel: dish.spiceLevel || 0,
      price: dish.price || 0,
      dishType: dish.dishType || 'VEG',
      categoryIds: dish.dishCategories?.map((dc: any) => dc.categoryId) || [],
    });
    setImagePreview(dish.imageUrl);
    setShowForm(true);
  };

  return (
    <TabsContent value="dishes" className="space-y-6 mt-6 px-2 sm:px-0">
      <HeaderWithAddButton
        categories={categories}
        showForm={showForm}
        setShowForm={setShowForm}
        openNewDishForm={openNewDishForm}
      />

      {!categories.length && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <p className="text-yellow-800">
              Please create a category first before adding dishes.
            </p>
          </CardContent>
        </Card>
      )}

      {showForm && (
        <AddEditDishForm
          editingDish={editingDish}
          dishForm={dishForm}
          setDishForm={setDishForm}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          onSubmit={handleAddDish}
          onCancel={() => setShowForm(false)}
          isPending={isCreating || isUpdating}
          categories={categories}
        />
      )}

      <DishList
        dishes={dishes}
        onEdit={handleEditDish}
        onDelete={handleDeleteDish}
      />
    </TabsContent>
  );
}
