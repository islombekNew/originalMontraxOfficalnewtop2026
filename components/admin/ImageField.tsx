"use client";

import { useState } from "react";
import MediaPicker, { type PickResult } from "./MediaPicker";

export default function ImageField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (r: PickResult) => void;
  hint?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <label className="a-label">{label}</label>
      <div className="flex items-start gap-3">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-a-line bg-a-panel-2">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-a-muted">
              yo'q
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <input
            className="a-input font-mono text-xs"
            value={value}
            onChange={(e) => onChange({ url: e.target.value })}
            placeholder="/media/… yoki to'liq URL"
          />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className="a-btn a-btn-sm"
              onClick={() => setOpen(true)}
            >
              Kutubxonadan tanlash
            </button>
            {value && (
              <button
                type="button"
                className="a-btn a-btn-sm a-btn-danger"
                onClick={() => onChange({ url: "" })}
              >
                Tozalash
              </button>
            )}
          </div>
          {hint && <p className="mt-1.5 text-xs text-a-muted">{hint}</p>}
        </div>
      </div>

      <MediaPicker open={open} onClose={() => setOpen(false)} onPick={onChange} />
    </div>
  );
}
