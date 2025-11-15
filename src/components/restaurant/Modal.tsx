import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative"
          onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside content
        >
          {children}
        </div>
      </div>
    </>
  );
}
