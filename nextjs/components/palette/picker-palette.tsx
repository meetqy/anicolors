"use client";
import { forwardRef, useImperativeHandle, useRef } from "react";
import Color from "color";
import { LuX } from "react-icons/lu";
import { Button } from "../ui/button";
import PickerColors, { PickerColorsProps, PickerColorsRefs } from "./picker-colors";

interface PickerPaletteProps extends PickerColorsProps {
  onDeleteColor: (id: number) => void;
}

export const PickerPalette = forwardRef<PickerColorsRefs, PickerPaletteProps>((props, ref) => {
  const pickerRef = useRef<PickerColorsRefs>(null);
  const { points, onDeleteColor } = props;

  useImperativeHandle(
    ref,
    () => ({
      extractMainColors: (...args) => pickerRef.current?.extractMainColors(...args) ?? [],
    }),
    [pickerRef.current]
  );

  return (
    <>
      <div className="bg-muted flex lg:aspect-[5/4] h-full w-full lg:min-w-96 items-center justify-center p-4 lg:w-2/3 lg:border-r">
        <PickerColors {...props} ref={pickerRef} />
      </div>

      <aside className="flex w-full flex-col p-4 lg:w-1/3">
        <div className="relative mb-6">
          <h2 className="text-lg font-semibold">Palette</h2>
          <p className="text-muted-foreground text-sm">Click and drag markers to adjust colors</p>
        </div>

        <div className="flex flex-row gap-2 lg:flex-col lg:gap-6">
          {points?.map((point) => (
            <div
              key={point.id}
              style={{
                background: point.color,
                color: Color(point.color).isLight() ? "black" : "white",
              }}
              className="relative flex flex-1 lg:flex-auto lg:aspect-auto aspect-square w-full items-center overflow-hidden rounded-lg lg:h-16 group"
            >
              <Button
                onClick={() => onDeleteColor(point.id)}
                className="absolute top-0 flex justify-center items-center left-0 h-full aspect-square rounded-r-none group-hover:opacity-100 opacity-0 bg-black/20 hover:bg-black/40 transition-colors"
                aria-label="Delete color"
              >
                <LuX className="size-6 text-red-600" />
              </Button>
              <span className="absolute lg:inline-block hidden right-4 bottom-2 font-mono text-sm opacity-90">{Color(point.color).hex()}</span>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
});
