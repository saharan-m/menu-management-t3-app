"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { trpc } from "~/utils/trpc";
import MenuHeader from "~/components/menu/MenuHeader";
import FloatingMenuButton from "~/components/menu/FloatingMenuButton";
import MenuModal from "~/components/menu/MenuModal";
import CategoriesList from "~/components/menu/CategoriesList";

// type DishType = "VEG" | "NON_VEG" | "EGG";

// interface Dish {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   spiceLevel: number | null;
//   imageUrl: string | null;
//   dishType: DishType;
// }

// interface Category {
//   id: string;
//   name: string;
//   displayOrder: number;
//   dishes: Dish[];
// }

export default function PublicMenuPage() {
  const params = useParams();
  const restaurantId = params.restaurantId as string;

  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  // const [showQR, setShowQR] = useState(false);

  const {
    data: menu,
    isLoading,
    error,
  } = trpc.menu.getByRestaurantId.useQuery({ restaurantId });

  if (isLoading)
    return (
      <div className="p-8 text-center text-slate-600">Loading menu...</div>
    );
  if (error)
    return (
      <div className="p-8 text-center text-red-600">
        Error loading menu: {error.message}
      </div>
    );
  if (!menu)
    return <div className="p-8 text-center text-slate-600">Menu not found</div>;

  // Normalize dish fields with defaults if missing
  const normalizedCategories = menu.categories.map((cat) => ({
    ...cat,
    dishes: cat.dishes.map((dish) => ({
      ...dish,
      price: dish.price ?? 0,
      dishType: dish.dishType ?? "VEG",
    })),
  }));

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <MenuHeader
        restaurantName={menu.name}
        location={menu.location}
        restaurantId={restaurantId}
      />

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <CategoriesList categories={normalizedCategories} />
      </div>

      {/* Floating Menu Button */}
      {!isMenuModalOpen && (
        <FloatingMenuButton
          showButton={menu.categories.length > 1}
          onClick={() => setIsMenuModalOpen(true)}
        />
      )}
      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        categories={normalizedCategories}
        onSelectCategory={(id) => scrollToCategory(id)}
      />
    </div>
  );
}
