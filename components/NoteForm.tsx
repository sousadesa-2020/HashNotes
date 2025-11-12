"use client";

import { useState } from "react";
import type { Note } from "@/types/note";

type Props = {
  onCreated: (note: Note) => void;
};

export default function NoteForm({ onCreated }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const submit = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (trimmed.length > 2000) return;
    setLoading(true);
    setError("");
    const file = new File([trimmed], "note.txt", { type: "text/plain" });
    const fd = new FormData();
    fd.set("file", file);
    const res = await fetch("/api/notes", { method: "POST", body: fd });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(typeof data?.error === "string" ? data.error : "Upload failed");
      return;
    }
    const note: Note = {
      cid: data.cid,
      text: trimmed,
      url: data.url,
      createdAt: new Date().toISOString(),
    };
    onCreated(note);
    setText("");
  };

  return (
    <div className="mt-12 rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
      <label htmlFor="note" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Write a note
      </label>
      <textarea
        id="note"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your note…"
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white/80 p-3 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 dark:border-slate-700 dark:bg-black/60 dark:text-slate-100"
        rows={5}
      />
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-slate-500 dark:text-slate-400">{text.length}/2000</span>
        <button
          onClick={submit}
          disabled={loading}
          className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-5 text-white shadow-sm transition-colors hover:from-cyan-600 hover:to-violet-700 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
        >
          {loading ? "Uploading…" : "Upload to IPFS"}
        </button>
      </div>
      {error && <div className="mt-3 text-sm text-red-500">{error}</div>}
    </div>
  );
}