import React from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

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

interface AddEditDishFormProps {
  editingDish: string | null;
  dishForm: DishFormState;
  setDishForm: React.Dispatch<React.SetStateAction<DishFormState>>;
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
  isPending: boolean;
  categories: { id: string; name: string }[];
}

export default function AddEditDishForm({
  editingDish,
  dishForm,
  setDishForm,
  imagePreview,
  setImagePreview,
  onSubmit,
  onCancel,
  isPending,
  categories,
}: AddEditDishFormProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setDishForm({ ...dishForm, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle>{editingDish ? 'Edit Dish' : 'Create New Dish'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <Label htmlFor="image">Dish Image</Label>
            <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center">
              {imagePreview ? (
                <div className="space-y-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover mx-auto rounded"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setImagePreview(null);
                      setDishForm({ ...dishForm, imageUrl: '' });
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="text-slate-600">
                    <p>Click to upload or drag and drop</p>
                    <p className="text-sm">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Dish Name */}
          <div>
            <Label htmlFor="dishName">Dish Name *</Label>
            <Input
              id="dishName"
              placeholder="e.g., Margherita Pizza"
              value={dishForm.name}
              onChange={(e) => setDishForm({ ...dishForm, name: e.target.value })}
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              placeholder="e.g., Fresh tomatoes, mozzarella, basil"
              value={dishForm.description}
              onChange={(e) =>
                setDishForm({ ...dishForm, description: e.target.value })
              }
              required
            />
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Price (₹) *</Label>
            <Input
              id="price"
              type="number"
              min="1"
              step="0.01"
              placeholder="e.g., 299"
              value={dishForm.price}
              onChange={(e) =>
                setDishForm({
                  ...dishForm,
                  price: parseFloat(e.target.value) || 0,
                })
              }
              required
            />
          </div>

          {/* Dish Type */}
          <div>
            <Label htmlFor="dishType">Dish Type *</Label>
            <select
              id="dishType"
              value={dishForm.dishType}
              onChange={(e) =>
                setDishForm({
                  ...dishForm,
                  dishType: e.target.value as DishType,
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="VEG">🟢 Vegetarian</option>
              <option value="NON_VEG">🔴 Non-Vegetarian</option>
              <option value="EGG">🟡 Egg</option>
            </select>
          </div>

          {/* Spice Level */}
          <div>
            <Label htmlFor="spice">Spice Level (0-5)</Label>
            <Input
              id="spice"
              type="number"
              min={0}
              max={5}
              value={dishForm.spiceLevel}
              onChange={(e) =>
                setDishForm({
                  ...dishForm,
                  spiceLevel: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>

          {/* Category Selection */}
          <div>
            <Label>Categories *</Label>
            <div className="space-y-2 mt-2 p-4 bg-white rounded-lg border max-h-48 overflow-y-auto">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`cat-${cat.id}`}
                    checked={dishForm.categoryIds.includes(cat.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDishForm({
                          ...dishForm,
                          categoryIds: [...dishForm.categoryIds, cat.id],
                        });
                      } else {
                        setDishForm({
                          ...dishForm,
                          categoryIds: dishForm.categoryIds.filter(
                            (id) => id !== cat.id
                          ),
                        });
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`cat-${cat.id}`} className="cursor-pointer">
                    {cat.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending
              ? 'Processing...'
              : editingDish
              ? 'Update Dish'
              : 'Create Dish'}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full mt-2"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
