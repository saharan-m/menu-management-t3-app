'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAuthCookie } from '~/lib/cookies';
import { trpc } from '~/utils/trpc';
import LoginCard from '~/components/auth/LoginCard';

type Step = 'email' | 'otp' | 'details';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sendOTPMutation = trpc.auth.sendOTP.useMutation();
  const verifyOTPMutation = trpc.auth.verifyOTP.useMutation();
  const updateUserProfileMutation = trpc.auth.updateUserProfile.useMutation();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await sendOTPMutation.mutateAsync({ email });
      setSuccess('OTP sent to your email!');
      setStep('otp');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOTPMutation.mutateAsync({
        email,
        code: otp,
      });
        setAuthCookie(response.user.id);
      if (!response.user.name || !response.user.country) {
        setStep('details');
      } else {
        setSuccess('Login successful!');
        setTimeout(() => router.push('/dashboard'), 1000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyWithDetails = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    // Call updateUserProfile mutation which requires the user to be authenticated
    const response = await updateUserProfileMutation.mutateAsync({
      name,
      country,
    });

    // setAuthCookie(response.user.id);
    setSuccess('Login successful!');
    setTimeout(() => router.push('/dashboard'), 1000);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to complete login');
  } finally {
    setLoading(false);
  }
};

  const handleBackToEmail = () => {
    setStep('email');
    setOtp('');
    setError('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <LoginCard
        step={step}
        email={email}
        setEmail={setEmail}
        otp={otp}
        setOtp={setOtp}
        name={name}
        setName={setName}
        country={country}
        setCountry={setCountry}
        loading={loading}
        error={error}
        success={success}
        setError={setError}
        onSendOTP={handleSendOTP}
        onVerifyOTP={handleVerifyOTP}
        onVerifyDetails={handleVerifyWithDetails}
        onBackToEmail={handleBackToEmail}
      />
    </div>
  );
}
