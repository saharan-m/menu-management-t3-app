import React from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

interface EmailStepProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
}

export default function EmailStep({
  email,
  setEmail,
  onSubmit,
  loading,
}: EmailStepProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Sending...' : 'Send OTP'}
      </Button>
    </form>
  );
}
