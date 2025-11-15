import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { VegIcon } from '../icons/VegIcon';
import { NonVegIcon } from '../icons/NonVegIcon';

type DishType = 'VEG' | 'NON_VEG' | 'EGG';

interface DishCardProps {
  name: string;
  description: string;
  price: number;
  spiceLevel: number | null;
  imageUrl: string | null;
  dishType: DishType;
}

const getDishTypeIcon = (type: DishType) => {
  switch (type) {
    case 'VEG':
      return <VegIcon />;
    case 'NON_VEG':
      return <NonVegIcon />;
    case 'EGG':
      return <NonVegIcon />;
    default:
      return null;
  }
};

export default function DishCard({
  name,
  description,
  price,
  spiceLevel,
  imageUrl,
  dishType,
}: DishCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100; // chars before read more
  const shouldShowReadMore = description.length > maxLength;

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md rounded-none py-4 px-2">
      <div className="flex gap-0 px-2">
        <div className="flex flex-1 flex-col gap-1 pr-4">
          <div className="text-sm">{getDishTypeIcon(dishType)}</div>
          <CardTitle className="text-sm font-semibold">{name}</CardTitle>
          <p className="py-1 text-base font-semibold text-slate-900">
            ₹ {price.toFixed(0)}
          </p>
          <CardContent className="px-0">
            <p className="text-xs leading-relaxed text-slate-600">
              {isExpanded ? (
                description
              ) : (
                <>
                  {description.slice(0, maxLength)}
                  {shouldShowReadMore && '... '}
                  {shouldShowReadMore && (
                    <Button
                      variant="link"
                      className="inline h-auto p-0 align-baseline text-xs font-semibold hover:text-red-700"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      read more
                    </Button>
                  )}
                </>
              )}
            </p>
            {isExpanded && shouldShowReadMore && (
              <Button
                variant="link"
                className="mt-2 h-auto p-0 text-xs font-semibold hover:text-red-700"
                onClick={() => setIsExpanded(false)}
              >
                read less
              </Button>
            )}
          </CardContent>
          {spiceLevel !== null && spiceLevel > 0  && (
            <div className="text-red-500 text-xs">
              {'🌶️'.repeat(spiceLevel)}
            </div>
          )}
        </div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="h-26 w-26 flex-shrink-0 rounded object-cover"
          />
        )}
      </div>
    </Card>
  );
}
