"use client";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getColorFromString } from "./utils";
import { withSave } from "@/components/card/with-save";
import Color from "color";

const ColorCard = withSave<{
  hex: string;
  text: string;
  textColor: string;
}>(({ hex, text, textColor }) => {
  return (
    <div
      className="flex aspect-[4/3] w-full items-center justify-center rounded-lg text-7xl font-bold"
      style={{
        backgroundColor: hex,
        color: textColor,
      }}
    >
      {text}
    </div>
  );
});

const Generator = () => {
  const [inputText, setInputText] = useState("AniColors");

  const colorData = useMemo(() => {
    if (!inputText.trim()) return null;

    const colors = getColorFromString(inputText.trim());
    const textColor = Color(colors.hex).isLight() ? "#000000" : "#FFFFFF";

    return { ...colors, textColor };
  }, [inputText]);

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <div className="space-y-8">
        {/* Input Section */}
        <div className="space-y-2">
          <Label htmlFor="name-input" className="text-lg font-semibold">
            Enter Your Name or Text
          </Label>
          <Input
            id="name-input"
            type="text"
            placeholder="Enter your name or any text..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="text-lg"
          />
        </div>

        {/* Color Preview */}
        {colorData && (
          <div className="space-y-6">
            <ColorCard
              hex={colorData.hex}
              text={inputText}
              textColor={colorData.textColor}
              className="flex w-full justify-center"
              id={`color-${inputText.replace(/\s+/g, "-").toLowerCase()}`}
            />

            {/* Color Values */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Color Values</Label>
              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        HEX
                      </div>
                      <div className="font-mono text-lg font-semibold uppercase">
                        {colorData.hex}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        RGB
                      </div>
                      <div className="font-mono text-sm">
                        {colorData.rgb.r}, {colorData.rgb.g}, {colorData.rgb.b}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        HSL
                      </div>
                      <div className="font-mono text-sm">
                        {colorData.hsl.h}°, {colorData.hsl.s}%,{" "}
                        {colorData.hsl.l}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generator;
