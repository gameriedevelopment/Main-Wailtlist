"use client";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 py-12 overflow-hidden">
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-8">
          <div className="inline-flex items-center gap-2">
            <img
              src="/gamerie-logo.png"
              alt="Gamerie"
              className={` object-contain size-3 sm:size-4 `}
            />
            <span
              className="text-lg font-bold tracking-wide -ml-2"
              style={{ textShadow: "0 0 14px rgba(198,163,255,0.45)" }}
            >
              Gamerie
            </span>
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
          © {new Date().getFullYear()} Gamerie. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
