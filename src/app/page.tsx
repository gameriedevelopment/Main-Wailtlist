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
        // @ts-expect-error custom props
        "--neo": COLORS.neon,
        "--acc": COLORS.accent,
        "--hlt": COLORS.highlight,
        "--mid": COLORS.mid,
        "--card": COLORS.card,
        "--dark": COLORS.dark,
      }}
    >
      <BackgroundDecor bgY={bgY} />

      {/* IMMERSIVE HERO */}
      <section className="relative z-10 pt-28 pb-32 sm:pt-36 sm:pb-40 min-h-[90vh] flex items-center">
        <div className="mx-auto max-w-6xl px-6 w-full">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--neo)]/40 bg-[color:var(--neo)]/10 px-4 py-2 mb-6 shadow-[0_0_20px_rgba(198,163,255,0.3)]"
              >
                <span className="h-2 w-2 rounded-full bg-[color:var(--neo)] shadow-[0_0_8px_rgba(198,163,255,0.9)] animate-pulse" />
                <span className="text-sm font-semibold">🔥 Limited Early Access — {count.toLocaleString()}+ Already Joined</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-balance text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
                style={{
                  textShadow:
                    "0 0 18px rgba(198,163,255,0.35), 0 0 40px rgba(198,163,255,0.25)",
                }}
              >
                Your Gaming Universe, Unified
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-5 text-lg sm:text-xl text-white/80"
              >
                Play, compete, and connect in one powerful platform. Early supporters unlock exclusive perks and shape the future.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-8"
              >
                <form ref={formRef} onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(
                        "h-14 rounded-xl bg-[color:var(--card)]/80 border border-white/10 text-base",
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
                    className="h-14 rounded-xl px-8 font-bold text-base bg-[color:var(--neo)] text-black hover:brightness-110 transition will-change-transform shadow-[0_0_30px_rgba(198,163,255,0.6)]"
                  >
                    {loading ? "Joining..." : "Claim Your Spot"}
                  </Button>
                </form>
                {!!success && (
                  <p className="mt-3 text-sm text-[color:var(--neo)]/90 drop-shadow" style={{textShadow:"0 0 12px rgba(198,163,255,0.55)"}}>
                    {success}
                  </p>
                )}
                {!success && <p className="mt-3 text-sm text-white/60">⚡ Only 500 spots left for early access</p>}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative h-[400px] sm:h-[500px]"
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* STEP 1: THE PROBLEM */}
      <section className="relative z-10 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-bold tracking-wide text-[color:var(--neo)] mb-4">STEP 1 → THE PROBLEM</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6" style={{ textShadow: "0 0 16px rgba(198,163,255,0.3)" }}>
              Gaming is Fragmented. <br />You Deserve Better.
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
              Too many apps. Too many logins. No single place to find teammates, track progress, or build your reputation.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3 mb-12">
            {[
              { stat: "8+", label: "Apps per gamer", desc: "Discord, Steam, Twitch, and more" },
              { stat: "73%", label: "Feel disconnected", desc: "Struggle to find consistent squads" },
              { stat: "0", label: "Unified profiles", desc: "Your achievements stay scattered" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative rounded-2xl border border-white/10 bg-[color:var(--card)]/60 p-8 backdrop-blur-md text-center"
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-[color:var(--neo)] mb-2" style={{ textShadow: "0 0 20px rgba(198,163,255,0.5)" }}>
                  {item.stat}
                </div>
                <div className="text-base font-semibold mb-1">{item.label}</div>
                <p className="text-sm text-white/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Button
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-12 rounded-xl px-8 font-semibold bg-[color:var(--neo)] text-black hover:brightness-110 transition shadow-[0_0_25px_rgba(198,163,255,0.55)]"
            >
              Join the Solution →
            </Button>
          </motion.div>
        </div>
      </section>

      {/* STEP 2: THE SOLUTION */}
      <section className="relative z-10 py-20 sm:py-28 bg-gradient-to-b from-transparent via-[color:var(--card)]/20 to-transparent">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-bold tracking-wide text-[color:var(--neo)] mb-4">STEP 2 → THE SOLUTION</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6" style={{ textShadow: "0 0 16px rgba(198,163,255,0.3)" }}>
              Gamérie: Everything in One Place
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
              One platform for your entire gaming life. Profile, squads, tournaments, scheduling, and coaching — all unified.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {[
              { title: "Unified Profile", emoji: "🧬", desc: "One identity across all games and platforms" },
              { title: "Squad Finder", emoji: "⚔️", desc: "AI-powered matchmaking finds your perfect team" },
              { title: "Tournament Hub", emoji: "🏆", desc: "Compete, track stats, earn rewards" },
              { title: "Pro Coaching", emoji: "🧠", desc: "Learn from the best, book sessions easily" },
            ].map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group"
              >
                <Card className="relative overflow-hidden rounded-2xl border-white/10 bg-[color:var(--card)]/70 backdrop-blur-md h-full">
                  <CardContent className="p-6 flex flex-col h-full min-h-[180px]">
                    <div className="text-3xl mb-3">{b.emoji}</div>
                    <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
                    <p className="text-sm text-white/70">{b.desc}</p>
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

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/10 bg-[color:var(--card)]/60 backdrop-blur-md p-8 mb-12"
          >
            <div className="h-64 sm:h-80 rounded-2xl ring-1 ring-white/10 bg-black/20 flex items-center justify-center overflow-hidden">
              <LottieBox path="https://assets9.lottiefiles.com/packages/lf20_kkflmtur.json" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Button
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-12 rounded-xl px-8 font-semibold bg-[color:var(--neo)] text-black hover:brightness-110 transition shadow-[0_0_25px_rgba(198,163,255,0.55)]"
            >
              I Want Early Access →
            </Button>
          </motion.div>
        </div>
      </section>

      {/* STEP 3: WHY JOIN EARLY */}
      <section className="relative z-10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-bold tracking-wide text-[color:var(--neo)] mb-4">STEP 3 → WHY JOIN EARLY</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6" style={{ textShadow: "0 0 16px rgba(198,163,255,0.3)" }}>
              Early Access = Exclusive Perks
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
              The first 500 members unlock lifetime benefits, rare badges, and a voice in shaping Gamérie's future.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {[
              { title: "🎖️ Founder Badge", desc: "Permanent badge showing you were here first. Instant credibility." },
              { title: "🎁 Exclusive Rewards", desc: "Early tournament access, premium features unlocked free." },
              { title: "🗳️ Shape the Platform", desc: "Vote on features, join private beta channels, influence roadmap." },
              { title: "💎 Reserved Username", desc: "Claim your perfect username before it's gone forever." },
              { title: "🚀 Priority Support", desc: "Direct line to our team. VIP treatment for life." },
              { title: "🔓 Beta Access", desc: "Be the first to try new features and tournaments." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-2xl border border-white/10 bg-[color:var(--card)]/60 p-6 backdrop-blur-md"
              >
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-white/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Button
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-12 rounded-xl px-8 font-semibold bg-[color:var(--neo)] text-black hover:brightness-110 transition shadow-[0_0_25px_rgba(198,163,255,0.55)]"
            >
              Claim My Perks Now →
            </Button>
            <p className="mt-4 text-sm text-white/50">⏳ Only <span className="font-bold text-[color:var(--neo)]">500 spots</span> remaining</p>
          </motion.div>
        </div>
      </section>

      {/* COMMUNITY PROOF */}
      <section className="relative z-10 py-20 sm:py-28 bg-gradient-to-b from-transparent via-[color:var(--card)]/20 to-transparent">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ textShadow: "0 0 16px rgba(198,163,255,0.3)" }}>
              Join {count.toLocaleString()}+ Gamers Already Waiting
            </h2>
            <p className="text-lg text-white/70">The hype is real. See what early supporters are saying.</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {[
              { quote: "Finally, a platform that gets it. Can't wait to join my squad here.", tag: "PurityMurity#4521" },
              { quote: "The unified profile feature alone is a game-changer. I'm in.", tag: "NovaStrike#8890" },
              { quote: "Been waiting for something like this. Early access secured! 🔥", tag: "HexMage#1010" },
            ].map((t, i) => (
              <motion.div
                key={t.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-2xl border border-white/10 bg-[color:var(--card)]/60 p-6 backdrop-blur-md"
              >
                <p className="text-white/90 mb-4">"{t.quote}"</p>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--neo)] shadow-[0_0_8px_rgba(198,163,255,0.9)]" />
                  <span className="font-medium text-white/90">{t.tag}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-[color:var(--neo)]/30 bg-[color:var(--neo)]/10 p-8 text-center backdrop-blur-md"
          >
            <p className="text-lg sm:text-xl font-semibold text-white/90 mb-2">
              🚨 Don't miss out — spots are filling fast
            </p>
            <p className="text-white/70">Join the waitlist now and be part of gaming history.</p>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6"
            style={{ textShadow: "0 0 20px rgba(198,163,255,0.4)" }}
          >
            Your Squad is Waiting. <br />Are You In?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-white/75 mb-10"
          >
            Secure your spot now. Only <span className="font-bold text-[color:var(--neo)]">500 early access slots</span> available.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto mb-6">
              <div className="relative flex-1 min-w-0">
                <Input
                  type="email"
                  placeholder="you@game.gg"
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 rounded-xl bg-[color:var(--card)]/80 border border-white/10 text-base placeholder:text-white/40 focus-visible:ring-[color:var(--neo)]"
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
                className="h-14 rounded-xl px-10 font-bold text-base bg-[color:var(--neo)] text-black hover:brightness-110 transition shadow-[0_0_30px_rgba(198,163,255,0.6)]"
              >
                {loading ? "Saving..." : "Join the Waitlist"}
              </Button>
            </form>
            {!!success && (
              <p className="text-sm text-[color:var(--neo)]/90 drop-shadow mb-4" style={{textShadow:"0 0 12px rgba(198,163,255,0.55)"}}>
                {success}
              </p>
            )}
            <a
              href="https://discord.com/invite/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 h-12 rounded-xl px-8 font-semibold border border-white/15 bg-white/5 hover:bg-white/10 transition"
            >
              <span>💬</span>
              Join Discord Community
            </a>
          </motion.div>
        </div>

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
        <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[color:var(--neo)]/50 to-transparent" />
      </footer>
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