import React from 'react';

interface AlertMessageProps {
  type: 'error' | 'success';
  message: string;
}

export default function AlertMessage({ type, message }: AlertMessageProps) {
  const isError = type === 'error';
  
  return (
    <div
      className={`mb-4 rounded-md border p-3 text-sm ${
        isError
          ? 'border-red-200 bg-red-50 text-red-700'
          : 'border-green-200 bg-green-50 text-green-700'
      }`}
    >
      {message}
    </div>
  );
}
