import React, { useState } from 'react';

interface DishDescriptionProps {
  description: string;
}

export default function DishDescription({ description }: DishDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const cutoff = 100; // characters

  if (description.length <= cutoff) {
    return <p className="text-slate-600 text-sm whitespace-pre-wrap">{description}</p>;
  }

  return (
    <p className="text-slate-600 text-sm whitespace-pre-wrap">
      {expanded ? description : description.slice(0, cutoff) + '...'}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="text-red-600 hover:text-red-700 ml-1 font-semibold text-xs"
      >
        {expanded ? 'read less' : 'read more'}
      </button>
    </p>
  );
}
