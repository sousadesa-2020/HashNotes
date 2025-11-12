"use client";

import { useEffect, useState } from "react";
import type { Note } from "@/types/note";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";

export default function NotePanel() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("hashnotes.notes") : null;
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [hydrated, setHydrated] = useState(false);
  const [appOnly, setAppOnly] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setHydrated(true), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(`/api/notes?limit=20&includeText=false&appOnly=${appOnly ? "true" : "false"}`, { signal: controller.signal });
        if (!res.ok) return;
        const json = await res.json();
        const remote = Array.isArray(json.items) ? json.items : [];
        setNotes((prev) => {
          const seen = new Set(prev.map((p) => p.cid));
          const merged = [
            ...prev,
            ...remote
              .filter((r: any) => r && typeof r.cid === "string" && !seen.has(r.cid))
              .map((r: any) => ({
                cid: r.cid,
                text: typeof r.text === "string" ? r.text : "",
                url: r.url,
                createdAt: r.createdAt,
              })),
          ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          localStorage.setItem("hashnotes.notes", JSON.stringify(merged));
          return merged;
        });
      } catch {}
    })();
    return () => controller.abort();
  }, [hydrated, appOnly]);

  const onCreated = (note: Note) => {
    setNotes((prev) => {
      const next = [note, ...prev];
      localStorage.setItem("hashnotes.notes", JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="mt-8 mb-2 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            checked={!appOnly}
            onChange={(e) => setAppOnly(!e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 dark:border-slate-600"
          />
          Show all gateway files
        </label>
      </div>
      <NoteForm onCreated={onCreated} />
      <NotesList notes={hydrated ? notes : []} />
    </div>
  );
}