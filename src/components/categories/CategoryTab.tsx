import React from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Tabs, TabsContent } from '~/components/ui/tabs';
import { Trash2, Edit2, Plus } from 'lucide-react';
import AddEditCategoryForm from './CategoryForm';

interface CategoryFormState {
  name: string;
}

interface CategoryTabProps {
  categories: any[];
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  categoryForm: CategoryFormState;
  setCategoryForm: React.Dispatch<React.SetStateAction<CategoryFormState>>;
  editingCategory: string | null;
  setEditingCategory: React.Dispatch<React.SetStateAction<string | null>>;
  handleAddCategory: (e: React.FormEvent) => Promise<void>;
  handleDeleteCategory: (categoryId: string) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
}

export default function CategoryTab({
  categories,
  showForm,
  setShowForm,
  categoryForm,
  setCategoryForm,
  editingCategory,
  setEditingCategory,
  handleAddCategory,
  handleDeleteCategory,
  isCreating,
  isUpdating,
}: CategoryTabProps) {
  const handleEditCategory = (category: any) => {
    setEditingCategory(category.id);
    setCategoryForm({ name: category.name });
    setShowForm(true);
  };

  return (
    <TabsContent value="categories" className="space-y-6 mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Menu Categories</h2>
        <Button
          onClick={() => {
            setEditingCategory(null);
            setCategoryForm({ name: '' });
            setShowForm(!showForm);
          }}
          className="gap-2"
        >
          <Plus size={18} />
          {showForm ? 'Cancel' : 'Add Category'}
        </Button>
      </div>

      {showForm && (
        <AddEditCategoryForm
          editingCategory={editingCategory}
          categoryForm={categoryForm}
          setCategoryForm={setCategoryForm}
          onSubmit={handleAddCategory}
          onCancel={() => setShowForm(false)}
          isPending={isCreating || isUpdating}
        />
      )}

      <div className="grid gap-4">
        {categories.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-slate-500">
              No categories yet. Create one to get started!
            </CardContent>
          </Card>
        ) : (
          categories.map((cat) => (
            <Card key={cat.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{cat.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditCategory(cat)}
                      className="gap-1"
                    >
                      <Edit2 size={16} />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="gap-1"
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </TabsContent>
  );
}
