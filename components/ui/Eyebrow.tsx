export function Eyebrow({
  children,
  onDark = false,
  centered = false,
}: {
  children: string;
  onDark?: boolean;
  centered?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] ${
        onDark ? "text-teal-accent" : "text-headline-teal"
      } ${centered ? "justify-center" : ""}`}
    >
      <span
        className={`h-px w-5 ${onDark ? "bg-teal-accent" : "bg-headline-teal"}`}
        aria-hidden="true"
      />
      {children}
    </p>
  );
}
