"use client";

import CountUp from "react-countup";

export const Stats = ({ createNumber }: { createNumber: number }) => {
  return (
    <div className="mb-12 grid grid-cols-2 items-center gap-6 md:grid-cols-4">
      <div className="bg-card rounded-lg p-4 text-center">
        <div className="text-primary mb-1 text-5xl font-bold">
          <CountUp end={createNumber} />
          <span className="sr-only">{createNumber}</span>
        </div>
        <div className="text-muted-foreground text-sm">Palettes Created</div>
      </div>
      <div className="bg-card rounded-lg p-4 text-center">
        <div className="text-primary mb-1 text-2xl font-bold">
          <CountUp end={30363} />
        </div>
        <div className="text-muted-foreground text-sm">Colors</div>
      </div>
      <div className="bg-card rounded-lg p-4 text-center">
        <div className="text-primary mb-1 text-2xl font-bold">2-5</div>
        <div className="text-muted-foreground text-sm">Colors Each</div>
      </div>
      <div className="bg-card rounded-lg p-4 text-center">
        <div className="text-primary mb-1 text-2xl font-bold">12</div>
        <div className="text-muted-foreground text-sm">Layout Styles</div>
      </div>
    </div>
  );
};
