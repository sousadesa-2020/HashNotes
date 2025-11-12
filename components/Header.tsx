import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-gradient-to-b from-white/70 to-white/50 backdrop-blur shadow-sm dark:border-slate-800 dark:from-black/60 dark:to-black/40">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-4">
        <Link href="/" aria-label="Go to home" className="flex items-center gap-3">
          <Image className="rounded-xl ring-1 ring-cyan-500/20" src="/logo.svg" alt="HashNotes logo" width={40} height={40} priority />
          <span className="text-xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-600">
            HashNotes
          </span>
        </Link>
      </div>
    </header>
  );
}