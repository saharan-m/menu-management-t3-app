import React from 'react';
import { Button } from '~/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';

interface DishActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function DishActions({ onEdit, onDelete }: DishActionsProps) {
  return (
    <div className="flex gap-2 mt-2 sm:mt-0">
      <Button size="sm" variant="outline" onClick={onEdit} className="gap-1">
        <Edit2 size={16} />
        Edit
      </Button>
      <Button size="sm" variant="destructive" onClick={onDelete} className="gap-1">
        <Trash2 size={16} />
        Delete
      </Button>
    </div>
  );
}
