import Image from "next/image";

interface VegIconProps {
  className?: string;
  size?: number;
}

export function VegIcon({ className, size = 20 }: VegIconProps) {
  return (
    <Image
      src="/icons/veg-icon.svg"
      width={size}
      height={size}
      alt="Vegetarian Icon"
      className={className}
    />
  );
}
