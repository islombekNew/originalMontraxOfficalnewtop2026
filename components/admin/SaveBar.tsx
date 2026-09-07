"use client";

export default function SaveBar({
  dirty,
  saving,
  error,
  savedAt,
  onSave,
  onReset,
}: {
  dirty: boolean;
  saving: boolean;
  error: string;
  savedAt: string | null;
  onSave: () => void;
  onReset: () => void;
}) {
  return (
    <div className="sticky bottom-0 z-20 -mx-4 mt-8 border-t border-a-line bg-a-panel/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
      <div className="flex flex-wrap items-center gap-3">
        <button
          className="a-btn a-btn-primary"
          onClick={onSave}
          disabled={!dirty || saving}
        >
          {saving ? "Saqlanmoqda…" : "Saqlash"}
        </button>
        <button className="a-btn" onClick={onReset} disabled={!dirty || saving}>
          Bekor qilish
        </button>

        <span className="text-sm">
          {error ? (
            <span className="text-a-danger">{error}</span>
          ) : dirty ? (
            <span className="text-a-accent">Saqlanmagan o'zgarishlar bor</span>
          ) : savedAt ? (
            <span className="text-a-ok">Saqlandi — {savedAt}</span>
          ) : (
            <span className="text-a-muted">O'zgarish yo'q</span>
          )}
        </span>
      </div>
    </div>
  );
}
