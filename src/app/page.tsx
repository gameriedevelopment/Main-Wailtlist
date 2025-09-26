"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import lottie, { AnimationItem } from "lottie-web";

export default function Home() {
  // Brand palette
  const COLORS = useMemo(
    () => ({
      neon: "#C6A3FF",
      accent: "#9E83C8",
      highlight: "#756391",
      mid: "#4C435A",
      card: "#38333F",
      dark: "#232323",
    }),
    []
  );

  // Parallax for hero blobs
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 60]);
  const y2 = useTransform(scrollY, [0, 600], [0, -50]);
  // New: subtle global background parallax
  const bgY = useTransform(scrollY, [0, 800], [0, -30]);

  // Animated counter (social proof)
  const [count, setCount] = useState(0);
  useEffect(() => {
    const target = 28700;
    const duration = 1600;
    const steps = 60;
    const increment = Math.ceil(target / steps);
    let current = 0;
    const int = setInterval(() => {
      current = Math.min(target, current + increment);
      setCount(current);
      if (current >= target) clearInterval(int);
    }, duration / steps);
    return () => clearInterval(int);
  }, []);

  // Email form handling (mock)
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    formRef.current?.reset();
    setEmail("");
    setSuccess("You're on the list! Check your inbox soon.");
    setTimeout(() => setSuccess(""), 3500);
  };

  return (
    <div
      className="relative min-h-screen overflow-x-clip text-white"
      style={{
        // provide CSS vars for easy theming
        // @ts-expect-error custom props
        "--neo": COLORS.neon,
        "--acc": COLORS.accent,
        "--hlt": COLORS.highlight,
        "--mid": COLORS.mid,
        "--card": COLORS.card,
        "--dark": COLORS.dark,
      }}
    >
      {/* Neon grid background + floating blobs + parallax */}
      <BackgroundDecor bgY={bgY} />

      {/* HERO */}
      <section className="relative z-10 pt-28 pb-24 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-balance text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
                style={{
                  textShadow:
                    "0 0 18px rgba(198,163,255,0.35), 0 0 40px rgba(198,163,255,0.25)",
                }}
              >
                Gamérie is Coming — Power Up Your Play
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-5 text-lg sm:text-xl text-white/80"
              >
                Play, compete, and connect with gamers worldwide. Early supporters get exclusive perks.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-7"
              >
                <form ref={formRef} onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(
                        "h-12 rounded-xl bg-[color:var(--card)]/80 border border-white/10 text-base",
                        "placeholder:text-white/40 focus-visible:ring-[color:var(--neo)]"
                      )}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 rounded-xl"
                      style={{
                        boxShadow:
                          "0 0 0 1px rgba(255,255,255,0.08), 0 0 18px var(--neo), inset 0 0 22px rgba(198,163,255,0.15)",
                      }}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 rounded-xl px-6 font-semibold bg-[color:var(--neo)] text-black hover:brightness-110 transition will-change-transform shadow-[0_0_25px_rgba(198,163,255,0.55)]"
                  >
                    {loading ? "Joining..." : "Join the Waitlist + Discord"}
                  </Button>
                  <a
                    href="https://discord.com/invite/"
                    target="_blank"
                    rel="noreferrer"
                    className="h-12 rounded-xl px-6 font-semibold flex items-center justify-center border border-white/15 bg-white/5 hover:bg-white/10 transition shadow-[0_0_18px_rgba(156,136,200,0.35)]"
                    style={{ boxShadow: "0 0 22px rgba(156,136,200,0.35)" }}
                  >
                    Join Discord
                  </a>
                </form>
                {!!success && (
                  <p className="mt-3 text-sm text-[color:var(--neo)]/90 drop-shadow" style={{textShadow:"0 0 12px rgba(198,163,255,0.55)"}}>
                    {success}
                  </p>
                )}
                {!success && <p className="mt-3 text-sm text-white/50">No spam. Just alpha.</p>}
              </motion.div>
            </div>

            <div className="relative h-[340px] sm:h-[420px]">
              {/* Spinning neon line background (reintroduced) */}
              <motion.div
                aria-hidden
                className="absolute inset-0 grid place-items-center"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
              >
                <div
                  className="h-[140%] w-[140%] rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, rgba(198,163,255,0.0) 0deg, rgba(198,163,255,0.6) 90deg, rgba(198,163,255,0.0) 180deg, rgba(198,163,255,0.6) 270deg, rgba(198,163,255,0.0) 360deg)",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 1px))",
                    opacity: 0.25,
                    filter: "blur(1px)",
                  }}
                />
              </motion.div>

              <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[color:var(--neo)]/25 via-[color:var(--acc)]/10 to-transparent blur-2xl"
              />
              <motion.div
                style={{ y: y2 }}
                className="absolute right-4 top-6 w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-[color:var(--neo)]/25 blur-2xl"
              />
              <div className="absolute inset-0 rounded-3xl border border-white/10 bg-[color:var(--card)]/60 backdrop-blur-md p-6 overflow-hidden">
                <div className="relative z-10 h-full grid place-items-center">
                  <img
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop"
                    alt="Futuristic gaming setup"
                    className="w-full h-full object-cover rounded-xl opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative z-10 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            Level Up With Gamérie
            <span className="block h-1 mt-2 w-24 bg-[color:var(--neo)]/80 blur-sm" />
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Your Players Profile", emoji: "🧬", desc: "Showcase your skills and your gaming journey, with a free custom profile." },
              { title: "Unleash the Beast Coach", emoji: "🧠", desc: "Share expertise, train players, manage teams, and build your coaching brand." },
              { title: "Your Gaming Time in Control", emoji: "🗓️", desc: "Plan tournaments, practices, team meetings, and events in one powerful calendar." },
              { title: "Play Together and Conquer", emoji: "⚔️", desc: "Connect with gamers worldwide to play, join your dream team, and win." },
            ].map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ rotateX: 4, rotateY: -4, scale: 1.02 }}
                style={{ transformStyle: "preserve-3d" }}
                className="group"
              >
                <Card
                  className="relative overflow-hidden rounded-2xl border-white/10 bg-[color:var(--card)]/70 backdrop-blur-md will-change-transform h-full"
                  onMouseMove={(e) => {
                    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
                  }}
                >
                  {/* Neon ripple */}
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300" style={{ background: "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(198,163,255,0.18), transparent 40%)" }} />
                  <CardContent className="p-6 flex flex-col h-full min-h-[200px]">
                    <div className="text-3xl mb-3">{b.emoji}</div>
                    <h3 className="font-semibold text-lg">{b.title}</h3>
                    <p className="mt-2 text-white/70">{b.desc}</p>
                    <div className="mt-auto" />
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
                      <div
                        className="absolute -inset-[1px] rounded-2xl"
                        style={{
                          boxShadow:
                            "0 0 0 1px rgba(255,255,255,0.08), 0 0 18px var(--neo), inset 0 0 22px rgba(198,163,255,0.15)",
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY GAMÉRIE WINS */}
      <section className="relative z-10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10">
            Why Gamérie Wins
            <span className="block h-1 mt-2 w-40 bg-[color:var(--neo)]/80 blur-sm" />
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "AI-Powered Matchmaking", path: "https://assets9.lottiefiles.com/packages/lf20_kkflmtur.json" },
              { title: "Anti-cheat & Fair Play", path: "https://assets4.lottiefiles.com/packages/lf20_tQ7ZQh.json" },
              { title: "Rewards & Trophies", path: "https://assets3.lottiefiles.com/packages/lf20_yr6zz3wv.json" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-[color:var(--card)]/60 p-6 backdrop-blur-md"
              >
                <div className="h-24 mb-4 rounded-xl ring-1 ring-white/10 bg-black/10 flex items-center justify-center overflow-hidden">
                  <LottieBox path={item.path} />
                </div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="mt-2 text-white/70">Short looping animation showcases the feature in action.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VOICES FROM THE ARENA (Testimonials) */}
      <section className="relative z-10 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Voices From the Arena</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { quote: "The tournaments feel next-level — hype and fair.", tag: "PurityMurity#4521" },
              { quote: "Matchmaking is insanely good. Found my squad fast.", tag: "NovaStrike#8890" },
              { quote: "Rewards actually feel rewarding. I'm in.", tag: "HexMage#1010" },
            ].map((t, i) => (
              <motion.div
                key={t.tag}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative rounded-2xl border border-white/10 bg-[color:var(--card)]/60 p-6 backdrop-blur-md"
              >
                <div className="relative">
                  <p className="text-white/90">"{t.quote}"</p>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm shadow-[0_0_18px_rgba(156,136,200,0.35)]">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--neo)] shadow-[0_0_8px_rgba(198,163,255,0.9)]" />
                  <span className="font-medium text-white/90">{t.tag}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2
            className="text-3xl sm:text-5xl font-extrabold"
            style={{ textShadow: "0 0 18px rgba(198,163,255,0.35)" }}
          >
            Your Journey Starts Here — Join the Waitlist
          </h2>
          <p className="mt-4 text-white/75 text-lg">Reserve your username and get notified for the first tournaments.</p>

          <div className="mt-8 mx-auto max-w-3xl">
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
              <div className="relative flex-1 min-w-0">
                <Input
                  type="email"
                  placeholder="you@game.gg"
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl bg-[color:var(--card)]/80 border border-white/10 text-base placeholder:text-white/40 focus-visible:ring-[color:var(--neo)]"
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(255,255,255,0.08), 0 0 18px var(--neo), inset 0 0 22px rgba(198,163,255,0.15)",
                  }}
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="h-12 rounded-xl px-6 font-semibold bg-[color:var(--neo)] text-black hover:brightness-110 transition shadow-[0_0_25px_rgba(198,163,255,0.55)]"
              >
                {loading ? "Saving..." : "Join the Waitlist"}
              </Button>
              <a
                href="https://discord.com/invite/"
                target="_blank"
                rel="noreferrer"
                className="h-12 rounded-xl px-6 font-semibold flex items-center justify-center border border-white/15 bg-white/5 hover:bg-white/10 transition shadow-[0_0_18px_rgba(156,136,195,0.35)]"
              >
                Join Discord
              </a>
            </form>
            {!!success && (
              <p className="mt-3 text-sm text-[color:var(--neo)]/90 drop-shadow" style={{textShadow:"0 0 12px rgba(198,163,255,0.55)"}}>
                {success}
              </p>
            )}
          </div>
        </div>

        {/* Ending wave */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-32 h-64 bg-[radial-gradient(60%_60%_at_50%_0%,_rgba(198,163,255,0.25)_0%,_transparent_70%)]" />
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-[color:var(--dark)]/70 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[color:var(--neo)] shadow-[0_0_12px_rgba(198,163,255,0.9)]" />
                <span className="text-lg font-bold tracking-wide" style={{ textShadow: "0 0 14px rgba(198,163,255,0.45)" }}>Gamérie</span>
              </div>
              <p className="mt-2 text-white/60 text-sm">Play. Compete. Connect. Power up your play.</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="/terms" className="text-white/70 hover:text-white transition">Terms</a>
              <a href="/privacy" className="text-white/70 hover:text-white transition">Privacy</a>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between text-xs text-white/50">
            <span>© {new Date().getFullYear()} Gamérie. All rights reserved.</span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--neo)]/80 shadow-[0_0_8px_rgba(198,163,255,0.8)]" />
              <span className="text-white/60">Made for gamers</span>
            </span>
          </div>
        </div>
        {/* Subtle neon glow underline */}
        <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[color:var(--neo)]/50 to-transparent" />
      </footer>

      {/* styled-jsx removed; all styles moved to Tailwind/inline to comply with Next.js 15 */}
    </div>
  );
}

// Lightweight Lottie player using lottie-web
function LottieBox({ path }: { path: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    let anim: AnimationItem | null = null;
    anim = lottie.loadAnimation({
      container: ref.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path,
      rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
    });
    return () => {
      anim?.destroy();
    };
  }, [path]);
  return <div ref={ref} className="h-24 w-full" />;
}

function BackgroundDecor({ bgY }: { bgY: any }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 opacity-40"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(transparent 23px, rgba(255,255,255,0.06) 24px), linear-gradient(90deg, transparent 23px, rgba(255,255,255,0.06) 24px)",
            backgroundSize: "24px 24px, 24px 24px",
            backgroundPosition: "center center",
          }}
        />
      </motion.div>

      {/* Parallax neon blobs */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute -top-24 -left-20 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(198,163,255,0.35), transparent)" }}
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-40 -right-16 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(158,131,200,0.28), transparent)" }}
      />

      {/* Floating particles with gentle parallax */}
      <motion.div className="absolute inset-0" style={{ y: useTransform(bgY, [0, -30], [0, -10]) }}>
        {new Array(24).fill(0).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full"
            style={{
              background: i % 3 === 0 ? "#C6A3FF" : "#9E83C8",
              boxShadow: "0 0 10px rgba(198,163,255,0.8)",
              top: `${(i * 137) % 100}%`,
              left: `${(i * 73) % 100}%`,
            }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
          />
        ))}
      </motion.div>
    </div>
  );
}