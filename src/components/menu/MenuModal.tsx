import React from 'react';

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

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onSelectCategory: (categoryId: string) => void
}

export default function MenuModal({
  isOpen,
  onClose,
  categories,
  onSelectCategory
}: MenuModalProps) {
  if (!isOpen) return null;

   const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId); // send to parent
    onClose(); // close modal
  };
  const check = () => {
    console.log("calling on close")
    onClose();
  }
return (
  <>
    {/* Backdrop */}
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      onClick={onClose}
    />

    {/* Modal */}
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 pointer-events-none">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        {/* Body */}
        <div className="p-4 space-y-2">
          {categories.map((category) => (
            <div key={category.id}>
              <button
                onClick={() => handleCategoryClick(category.id)}
                className="w-full text-center px-4 py-3 text-red-500 rounded-md font-semibold mb-2"
              >
                {category.name}
              </button>

              <div className="pl-4 space-y-2 mb-4">
                {category.dishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="text-sm text-slate-700 hover:text-slate-900 cursor-pointer"
                  >
                    {dish.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

}
