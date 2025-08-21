interface HeroProps {
  title?: string;
  description?: string;
  top?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Hero({
  title = "Pick a Color. Make it yours.",
  description = "Try our hand-picked themes. Copy and paste them into your project. New theme editor coming soon.",
  top,
  footer,
}: HeroProps) {
  return (
    <div className="container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
      {top}

      <h1 className="text-primary leading-tighter max-w-4xl text-4xl font-semibold tracking-tight text-balance capitalize lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
        {title}
      </h1>

      <p className="text-muted-foreground max-w-3xl text-base text-balance sm:text-lg">
        {description}
      </p>

      {footer}
    </div>
  );
}
