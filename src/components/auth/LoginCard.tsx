import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import AlertMessage from './AlertMessage';
import EmailStep from './EmailStep';
import OTPStep from './OtpStep';
import DetailsStep from './DetailsStep';

type Step = 'email' | 'otp' | 'details';

interface LoginCardProps {
  step: Step;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  error: string;
  success: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  onSendOTP: (e: React.FormEvent) => Promise<void>;
  onVerifyOTP: (e: React.FormEvent) => Promise<void>;
  onVerifyDetails: (e: React.FormEvent) => Promise<void>;
  onBackToEmail: () => void;
}

export default function LoginCard({
  step,
  email,
  setEmail,
  otp,
  setOtp,
  name,
  setName,
  country,
  setCountry,
  loading,
  error,
  success,
  setError,
  onSendOTP,
  onVerifyOTP,
  onVerifyDetails,
  onBackToEmail,
}: LoginCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Digital Menu System</CardTitle>
        <CardDescription>Manage your restaurant menus</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <AlertMessage type="error" message={error} />}
        {success && <AlertMessage type="success" message={success} />}

        {step === 'email' && (
          <EmailStep
            email={email}
            setEmail={setEmail}
            onSubmit={onSendOTP}
            loading={loading}
          />
        )}

        {step === 'otp' && (
          <OTPStep
            otp={otp}
            setOtp={setOtp}
            onSubmit={onVerifyOTP}
            onBack={onBackToEmail}
            loading={loading}
          />
        )}

        {step === 'details' && (
          <DetailsStep
            name={name}
            setName={setName}
            country={country}
            setCountry={setCountry}
            onSubmit={onVerifyDetails}
            loading={loading}
          />
        )}
      </CardContent>
    </Card>
  );
}
