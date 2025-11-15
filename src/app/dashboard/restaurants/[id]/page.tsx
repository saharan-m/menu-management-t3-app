"use client";

import { useParams } from "next/navigation";
import { trpc } from "~/utils/trpc";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useState } from "react";
import CategoryTab from "~/components/categories/CategoryTab";
import DishTab from "~/components/dishes/DishTab";
import QRMenuShare from "~/components/restaurant/QRMenuShare";
import Modal from "~/components/restaurant/Modal";
type DishType = "VEG" | "NON_VEG" | "EGG";

interface DishFormState {
  name: string;
  description: string;
  imageUrl: string;
  spiceLevel: number;
  price: number;
  dishType: DishType;
  categoryIds: string[];
}

interface CategoryFormState {
  name: string;
}

export default function RestaurantDetailPage() {
  const params = useParams();
  const restaurantId = params.id as string;

  const {
    data: restaurant,
    isLoading,
    error,
    refetch,
  } = trpc.restaurant.getById.useQuery({
    id: restaurantId,
  });

  // Category states
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoryForm, setCategoryForm] = useState<CategoryFormState>({
    name: "",
  });
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  // Dish states
  const [showDishForm, setShowDishForm] = useState(false);
  const [dishForm, setDishForm] = useState<DishFormState>({
    name: "",
    description: "",
    imageUrl: "",
    spiceLevel: 0,
    price: 0,
    dishType: "VEG",
    categoryIds: [],
  });
  const [editingDish, setEditingDish] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Mutations
  const createCategoryMutation = trpc.category.create.useMutation({
    onSuccess: () => {
      setCategoryForm({ name: "" });
      setShowCategoryForm(false);
      void refetch();
    },
  });

  const updateCategoryMutation = trpc.category.update.useMutation({
    onSuccess: () => {
      setCategoryForm({ name: "" });
      setEditingCategory(null);
      void refetch();
    },
  });

  const deleteCategoryMutation = trpc.category.delete.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const createDishMutation = trpc.dish.create.useMutation({
    onSuccess: () => {
      setDishForm({
        name: "",
        description: "",
        imageUrl: "",
        spiceLevel: 0,
        price: 0,
        dishType: "VEG",
        categoryIds: [],
      });
      setImagePreview(null);
      setShowDishForm(false);
      void refetch();
    },
  });

  const updateDishMutation = trpc.dish.update.useMutation({
    onSuccess: () => {
      setDishForm({
        name: "",
        description: "",
        imageUrl: "",
        spiceLevel: 0,
        price: 0,
        dishType: "VEG",
        categoryIds: [],
      });
      setImagePreview(null);
      setEditingDish(null);
      void refetch();
      setShowDishForm(false);
    },
  });

  const deleteDishMutation = trpc.dish.delete.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  // Handlers
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      await updateCategoryMutation.mutateAsync({
        id: editingCategory,
        name: categoryForm.name,
        displayOrder: 1,
      });
    } else {
      await createCategoryMutation.mutateAsync({
        restaurantId,
        name: categoryForm.name,
      });
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await deleteCategoryMutation.mutateAsync({ id: categoryId });
    }
  };

  const handleAddDish = async (e: React.FormEvent) => {
    e.preventDefault();

    if (dishForm.categoryIds.length === 0) {
      alert("Please select at least one category");
      return;
    }

    if (dishForm.price <= 0) {
      alert("Please enter a valid price");
      return;
    }

    if (editingDish) {
      await updateDishMutation.mutateAsync({
        dishId: editingDish,
        name: dishForm.name,
        description: dishForm.description,
        imageUrl: dishForm.imageUrl,
        spiceLevel: dishForm.spiceLevel,
        price: dishForm.price,
        dishType: dishForm.dishType,
        categoryIds: dishForm.categoryIds,
      });
    } else {
      await createDishMutation.mutateAsync({
        restaurantId,
        name: dishForm.name,
        description: dishForm.description,
        imageUrl: dishForm.imageUrl,
        spiceLevel: dishForm.spiceLevel,
        price: dishForm.price,
        dishType: dishForm.dishType,
        categoryIds: dishForm.categoryIds,
      });
    }
  };

  const handleDeleteDish = async (dishId: string) => {
    if (confirm("Are you sure you want to delete this dish?")) {
      await deleteDishMutation.mutateAsync({ dishId });
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">Error: {error.message}</div>
    );
  if (!restaurant)
    return <div className="p-8 text-center">Restaurant not found</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-6">
        <div>
          <h1 className="mb-2 text-4xl font-bold">{restaurant.name}</h1>
          <p className="text-lg text-slate-600">{restaurant.location}</p>
        </div>
        <button
          onClick={() => setIsQRModalOpen(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none active:bg-blue-800"
        >
          Show QR Code
        </button>
      </div>
      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="categories">
            Categories ({restaurant.categories?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="dishes">
            Dishes ({restaurant.dishes?.length || 0})
          </TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <CategoryTab
          categories={restaurant.categories || []}
          showForm={showCategoryForm}
          setShowForm={setShowCategoryForm}
          categoryForm={categoryForm}
          setCategoryForm={setCategoryForm}
          editingCategory={editingCategory}
          setEditingCategory={setEditingCategory}
          handleAddCategory={handleAddCategory}
          handleDeleteCategory={handleDeleteCategory}
          isCreating={createCategoryMutation.isPending}
          isUpdating={updateCategoryMutation.isPending}
        />

        {/* Dishes Tab */}
        <DishTab
          dishes={restaurant.dishes || []}
          categories={restaurant.categories || []}
          showForm={showDishForm}
          setShowForm={setShowDishForm}
          dishForm={dishForm}
          setDishForm={setDishForm}
          editingDish={editingDish}
          setEditingDish={setEditingDish}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          handleAddDish={handleAddDish}
          handleDeleteDish={handleDeleteDish}
          isCreating={createDishMutation.isPending}
          isUpdating={updateDishMutation.isPending}
        />
      </Tabs>
      {/* QR Code Modal */}
      <Modal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)}>
        <QRMenuShare restaurantId={restaurantId} />
        <button
          className="mt-4 w-full rounded bg-red-500 py-2 text-white hover:bg-red-600"
          onClick={() => setIsQRModalOpen(false)}
        >
          Close
        </button>
      </Modal>
    </div>
  );
}
