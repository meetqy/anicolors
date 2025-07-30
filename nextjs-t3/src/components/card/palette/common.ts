import { ColorPoint } from "@/components/palette/picker-colors";

export interface CardPaletteProps {
  points: ColorPoint[];
  image: string;
  className?: string;
  style?: React.CSSProperties;
}
