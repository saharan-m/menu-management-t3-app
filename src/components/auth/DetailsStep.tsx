import React from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

interface DetailsStepProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
}

export default function DetailsStep({
  name,
  setName,
  country,
  setCountry,
  onSubmit,
  loading,
}: DetailsStepProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          type="text"
          placeholder="India"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Completing...' : 'Complete Login'}
      </Button>
    </form>
  );
}
