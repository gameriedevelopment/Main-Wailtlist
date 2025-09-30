"use client";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 py-12 overflow-hidden">
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--neo)]" />
            <span className="text-xl font-bold">Gamérie</span>
          </div>
          <div className="flex gap-8 text-sm">
            <a
              href={process.env.NEXT_PUBLIC_TERMS_OF_SERVICE}
              className="text-white/60 hover:text-white transition-colors"
              target="_blank"
            >
              Terms
            </a>
            <a
              href={process.env.NEXT_PUBLIC_PRIVACY_POLICY}
              className="text-white/60 hover:text-white transition-colors"
              target="_blank"
            >
              Privacy
            </a>
          </div>
        </div>
        <div className="text-center sm:text-left text-sm text-white/40">
          © {new Date().getFullYear()} Gamérie. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
