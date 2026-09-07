export default function PageHead({
  title,
  hint,
  right,
}: {
  title: string;
  hint?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {hint && (
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-a-muted">
            {hint}
          </p>
        )}
      </div>
      {right}
    </div>
  );
}
