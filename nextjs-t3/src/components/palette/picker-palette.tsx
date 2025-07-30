"use client";
import { forwardRef, useImperativeHandle, useRef } from "react";
import Color from "color";
import { LuX } from "react-icons/lu";
import PickerColors, {
  type PickerColorsProps,
  type PickerColorsRefs,
} from "./picker-colors";

interface PickerPaletteProps extends PickerColorsProps {
  onDeleteColor: (id: number) => void;
}

export const PickerPalette = forwardRef<PickerColorsRefs, PickerPaletteProps>(
  (props, ref) => {
    const pickerRef = useRef<PickerColorsRefs>(null);
    const { points, onDeleteColor } = props;

    useImperativeHandle(
      ref,
      () => ({
        extractMainColors: (...args) =>
          pickerRef.current?.extractMainColors(...args) ?? [],
      }),
      [pickerRef],
    );

    return (
      <>
        <div className="bg-muted flex h-full w-full items-center justify-center p-4 lg:w-2/3 lg:border-r">
          <PickerColors {...props} ref={pickerRef} />
        </div>

        <aside className="flex w-full flex-col p-4 lg:w-1/3">
          <div className="relative mb-6">
            <h2 className="text-lg font-semibold">Palette</h2>
            <p className="text-muted-foreground text-sm">
              Click and drag markers to adjust colors
            </p>
          </div>

          <div className="flex flex-row gap-2 lg:flex-col lg:gap-6">
            {points?.map((point) => (
              <div
                key={point.id}
                style={{
                  background: point.color,
                  color: Color(point.color).isLight() ? "black" : "white",
                }}
                className="group relative flex aspect-square w-full flex-1 items-center overflow-hidden rounded-lg lg:aspect-auto lg:h-16 lg:flex-auto"
              >
                <button
                  onClick={() => onDeleteColor(point.id)}
                  className="absolute top-0 right-0 z-50 flex aspect-square h-full cursor-pointer items-center justify-center rounded-l-none bg-black/70 opacity-0 transition-all group-hover:opacity-100"
                  aria-label="Delete color"
                >
                  <LuX className="size-6 text-red-600" />
                </button>
                <div className="bg-background/50 text-foreground absolute left-4 flex size-8 items-center justify-center rounded-full text-xs">
                  {point.id}
                </div>
                <span className="absolute right-4 bottom-2 hidden font-mono text-sm opacity-90 lg:inline-block">
                  {Color(point.color).hex()}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </>
    );
  },
);

PickerPalette.displayName = "PickerPalette";
