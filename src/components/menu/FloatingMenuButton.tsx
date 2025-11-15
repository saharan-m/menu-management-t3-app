import React from "react";

interface FloatingMenuButtonProps {
  showButton: boolean;
  onClick: () => void;
}

export default function FloatingMenuButton({
  showButton,
  onClick,
}: FloatingMenuButtonProps) {
  if (!showButton) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-7 left-1/2 z-40 flex h-8 -translate-x-1/2 items-center justify-center gap-1 rounded-full bg-red-600 px-5 text-white shadow-lg transition-colors hover:bg-red-700"
      aria-label="Open menu"
      title="Menu"
    >
      <span className="text-sm leading-none mb-1">☰</span>
      <span className="text-sm font-semibold">Menu</span>
    </button>
  );
}
