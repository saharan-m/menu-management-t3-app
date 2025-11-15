import React from 'react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

interface CategoryFormState {
  name: string;
}

interface AddEditCategoryFormProps {
  editingCategory: string | null;
  categoryForm: CategoryFormState;
  setCategoryForm: React.Dispatch<React.SetStateAction<CategoryFormState>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
  isPending: boolean;
}

export default function AddEditCategoryForm({
  editingCategory,
  categoryForm,
  setCategoryForm,
  onSubmit,
  onCancel,
  isPending,
}: AddEditCategoryFormProps) {
  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle>{editingCategory ? 'Edit Category' : 'Create New Category'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="category">Category Name</Label>
            <Input
              id="category"
              placeholder="e.g., Starters, Main Course"
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Processing...' : editingCategory ? 'Update Category' : 'Create Category'}
          </Button>
          <Button type="button" variant="outline" className="w-full mt-2" onClick={onCancel}>
            Cancel
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
