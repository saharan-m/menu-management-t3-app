import React from 'react';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';
import type { Category } from '@prisma/client';

interface HeaderWithAddButtonProps {
  categories: Category[];
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  openNewDishForm: () => void;
}

export default function HeaderWithAddButton({
  categories,
  showForm,
  setShowForm,
  openNewDishForm,
}: HeaderWithAddButtonProps) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Dishes</h2>
      <Button
        onClick={() => {
          if (!categories.length) {
            alert('Please create a category first');
            return;
          }
          openNewDishForm();
          setShowForm(!showForm);
        }}
        className="gap-2"
      >
        <Plus size={18} />
        {showForm ? 'Cancel' : 'Add Dish'}
      </Button>
    </div>
  );
}
