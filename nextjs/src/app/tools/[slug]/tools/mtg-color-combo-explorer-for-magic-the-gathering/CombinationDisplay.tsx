import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ColorCombination {
  name: string;
  colors: string[];
  playstyle: string;
  type: string;
}

interface CombinationDisplayProps {
  combination: ColorCombination | null;
  selectedColors: string[];
  onColorClick: (colorName: string) => void;
}

export const CombinationDisplay = ({
  combination,
  selectedColors,
  onColorClick,
}: CombinationDisplayProps) => {
  if (!combination) {
    return (
      <Card className="h-[400px]">
        <CardContent className="flex h-full items-center justify-center">
          <div className="text-muted-foreground text-center">
            <p className="mb-2 text-lg font-medium">
              Click on the color points to see combinations
            </p>
            <div className="space-y-2 text-left text-xs">
              <p>• 1 color: Mono color strategies</p>
              <p>• 2 colors: Guild combinations</p>
              <p>• 3+ colors: Shard, Wedge, and more</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[400px]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-2 text-xl">
            {combination.name}
          </CardTitle>
          <Badge variant="secondary" className="ml-2 shrink-0 capitalize">
            {combination.type}
          </Badge>
        </div>
        {combination.playstyle && (
          <CardDescription className="line-clamp-3 font-medium">
            {combination.playstyle}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        {/* 颜色显示 */}
        <div className="space-y-2">
          <h4 className="text-muted-foreground text-sm font-medium">Colors</h4>
          <div className="flex gap-2">
            {combination.colors?.map((color, index) => (
              <div
                key={index}
                className="border-border h-10 w-10 shrink-0 rounded-full border-2 shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* 选中的颜色名称 */}
        <div className="space-y-2">
          <h4 className="text-muted-foreground text-sm font-medium">
            Selected Colors ({selectedColors.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedColors.map((colorName) => (
              <Badge
                key={colorName}
                variant="outline"
                className="hover:bg-accent cursor-pointer"
                onClick={() => onColorClick(colorName)}
              >
                {colorName}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
