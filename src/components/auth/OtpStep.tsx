import React from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

interface OTPStepProps {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onBack: () => void;
  loading: boolean;
}

export default function OTPStep({
  otp,
  setOtp,
  onSubmit,
  onBack,
  loading,
}: OTPStepProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="otp">Verification Code</Label>
        <Input
          id="otp"
          type="text"
          placeholder="000000"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          required
        />
        <p className="mt-1 text-xs text-slate-500">
          Check your email for the 6-digit code
        </p>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Verifying...' : 'Verify Code'}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={onBack}
      >
        Back
      </Button>
    </form>
  );
}
