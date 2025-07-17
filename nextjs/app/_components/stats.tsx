"use client";

import CountUp from "react-countup";

export const Stats = ({ createNumber }: { createNumber: number }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 items-center">
      <div className="text-center p-4 rounded-lg bg-card">
        <div className="text-5xl font-bold text-primary mb-1">
          <CountUp end={createNumber} />
          <span className="sr-only">{createNumber}</span>
        </div>
        <div className="text-sm text-muted-foreground">Palettes Created</div>
      </div>
      <div className="text-center p-4 rounded-lg bg-card">
        <div className="text-2xl font-bold text-primary mb-1">
          <CountUp end={30363} />
        </div>
        <div className="text-sm text-muted-foreground">Colors</div>
      </div>
      <div className="text-center p-4 rounded-lg bg-card">
        <div className="text-2xl font-bold text-primary mb-1">2-5</div>
        <div className="text-sm text-muted-foreground">Colors Each</div>
      </div>
      <div className="text-center p-4 rounded-lg bg-card">
        <div className="text-2xl font-bold text-primary mb-1">12</div>
        <div className="text-sm text-muted-foreground">Layout Styles</div>
      </div>
    </div>
  );
};
