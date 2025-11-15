import Image from "next/image";

interface NonVegIconProps {
  className?: string;
  size?: number;
}

export function NonVegIcon({ className, size = 20 }: NonVegIconProps) {
  return (
    <Image
      src="/icons/non-veg-icon.svg"
      width={size}
      height={size}
      alt="Non-Vegetarian Icon"
      className={className}
    />
  );
}
