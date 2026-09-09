import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="surface-hero">
      <div className="container-page py-4 sm:py-5 md:py-6">
        {eyebrow ? (
          <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
        ) : null}
        <h1 className="max-w-2xl text-lg sm:text-xl md:text-2xl font-bold leading-tight">{title}</h1>
        {description ? <p className="mt-1 max-w-xl text-xs opacity-90 leading-normal">{description}</p> : null}
        {children ? <div className="mt-3">{children}</div> : null}
      </div>
    </section>
  );
}

export function Section({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`container-page py-8 md:py-12 ${className}`}>
      {eyebrow ? (
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
      ) : null}
      {title ? <h2 className="text-xl font-bold md:text-2xl">{title}</h2> : null}
      {description ? <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
      <div className={title || description ? "mt-6" : ""}>{children}</div>
    </section>
  );
}
