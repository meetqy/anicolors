"use client";
import { forwardRef, useImperativeHandle, useRef } from "react";
import Color from "color";
import { LuX } from "react-icons/lu";
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
    [pickerRef]
  );

  return (
    <>
      <div className="bg-muted flex h-full w-full items-center justify-center p-4 lg:w-2/3 lg:border-r">
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
              <button
                onClick={() => onDeleteColor(point.id)}
                className="absolute cursor-pointer top-0 flex z-50 justify-center items-center right-0 h-full aspect-square rounded-l-none bg-black/70 group-hover:opacity-100 opacity-0 transition-all"
                aria-label="Delete color"
              >
                <LuX className="size-6 text-red-600" />
              </button>
              <div className="size-8 rounded-full absolute left-4 bg-background/50 text-foreground flex justify-center items-center text-xs">{point.id}</div>
              <span className="absolute lg:inline-block hidden right-4 bottom-2 font-mono text-sm opacity-90">{Color(point.color).hex()}</span>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
});

PickerPalette.displayName = "PickerPalette";
