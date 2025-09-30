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
      className="relative min-h-screen overflow-x-clip text-white bg-[color:var(--dark)]"
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

      {/* IMMERSIVE HERO - Enhanced with layered backgrounds */}
      <section className="relative z-10 pt-28 pb-32 sm:pt-36 sm:pb-40 min-h-[95vh] flex items-center overflow-hidden">
        {/* Layered animated gradients */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0 opacity-40"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(198,163,255,0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(158,131,200,0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(198,163,255,0.15) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 w-full relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 rounded-full border-2 border-[color:var(--neo)]/50 bg-gradient-to-r from-[color:var(--neo)]/20 to-[color:var(--acc)]/10 px-5 py-2.5 mb-8 shadow-[0_0_30px_rgba(198,163,255,0.4)]"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-2.5 w-2.5 rounded-full bg-[color:var(--neo)] shadow-[0_0_12px_rgba(198,163,255,1)]"
                />
                <span className="text-sm font-bold tracking-wide">🔥 LIMITED EARLY ACCESS — {count.toLocaleString()}+ JOINED</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-balance text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight"
                style={{
                  textShadow:
                    "0 0 20px rgba(198,163,255,0.4), 0 0 60px rgba(198,163,255,0.2)",
                }}
              >
                Your Gaming<br />
                <span className="bg-gradient-to-r from-[color:var(--neo)] via-[color:var(--acc)] to-[color:var(--neo)] bg-clip-text text-transparent">
                  Universe, Unified
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-6 text-xl sm:text-2xl text-white/90 leading-relaxed max-w-xl"
              >
                Play, compete, and connect in one powerful platform. Early supporters unlock{" "}
                <span className="text-[color:var(--neo)] font-semibold">exclusive perks</span> and shape the future.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-10"
              >
                <form ref={formRef} onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(
                        "h-16 rounded-2xl bg-[color:var(--card)] border-2 border-white/20 text-lg font-medium",
                        "placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-[color:var(--neo)] focus-visible:border-[color:var(--neo)]",
                        "transition-all duration-300"
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-16 rounded-2xl px-12 font-black text-lg bg-gradient-to-r from-[color:var(--neo)] to-[color:var(--acc)] text-black hover:scale-105 hover:shadow-[0_0_40px_rgba(198,163,255,0.8)] transition-all duration-300 whitespace-nowrap"
                  >
                    {loading ? "JOINING..." : "CLAIM YOUR SPOT →"}
                  </Button>
                </form>
                {!!success && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-base text-[color:var(--neo)] font-semibold drop-shadow-lg"
                    style={{textShadow:"0 0 15px rgba(198,163,255,0.7)"}}
                  >
                    ✓ {success}
                  </motion.p>
                )}
                {!success && (
                  <p className="text-sm text-white/70 flex items-center gap-2">
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⚡
                    </motion.span>
                    Only <span className="font-bold text-[color:var(--neo)]">500 spots</span> left for early access
                  </p>
                )}
              </motion.div>
            </div>

            {/* Enhanced animated mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative h-[450px] sm:h-[550px] lg:h-[600px]"
            >
              {/* Spinning gradient ring */}
              <motion.div
                aria-hidden
                className="absolute inset-0 grid place-items-center"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              >
                <div
                  className="h-[130%] w-[130%] rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, rgba(198,163,255,0.7) 60deg, transparent 120deg, rgba(158,131,200,0.5) 240deg, transparent 300deg)",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 2px))",
                    filter: "blur(2px)",
                  }}
                />
              </motion.div>

              <motion.div
                style={{ y: y1 }}
                className="absolute -inset-8 rounded-full bg-gradient-to-br from-[color:var(--neo)]/30 via-[color:var(--acc)]/20 to-transparent blur-3xl"
              />
              <motion.div
                style={{ y: y2 }}
                className="absolute right-0 top-0 w-64 h-64 rounded-full bg-[color:var(--neo)]/30 blur-3xl"
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-3xl border-2 border-white/20 bg-gradient-to-br from-[color:var(--card)]/80 to-[color:var(--card)]/60 backdrop-blur-xl p-8 overflow-hidden shadow-[0_0_60px_rgba(198,163,255,0.3)]"
              >
                <div className="relative z-10 h-full grid place-items-center">
                  <img
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop"
                    alt="Futuristic gaming setup"
                    className="w-full h-full object-cover rounded-2xl opacity-95 shadow-2xl"
                  />
                </div>
                {/* Overlay shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STEP 1: THE PROBLEM - Left-aligned with visual */}
      <section className="relative z-10 py-24 sm:py-32 bg-gradient-to-b from-transparent via-[color:var(--card)]/10 to-transparent">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
            {/* Visual Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative order-2 lg:order-1"
            >
              <div className="grid grid-cols-1 gap-4">
                {[
                  { stat: "8+", label: "Apps per gamer", desc: "Discord, Steam, Twitch, and more" },
                  { stat: "73%", label: "Feel disconnected", desc: "Struggle to find consistent squads" },
                  { stat: "0", label: "Unified profiles", desc: "Your achievements stay scattered" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ x: 8, transition: { duration: 0.2 } }}
                    className="relative rounded-2xl border border-white/15 bg-gradient-to-br from-[color:var(--card)]/80 to-[color:var(--card)]/40 p-6 backdrop-blur-md group"
                    style={{
                      marginLeft: i * 20,
                    }}
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-5xl font-black text-[color:var(--neo)] group-hover:scale-110 transition-transform" style={{ textShadow: "0 0 25px rgba(198,163,255,0.6)" }}>
                        {item.stat}
                      </div>
                      <div className="flex-1">
                        <div className="text-lg font-bold mb-1">{item.label}</div>
                        <p className="text-sm text-white/60">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Content Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block text-xs font-black tracking-widest text-[color:var(--neo)] mb-6 uppercase"
              >
                Step 1 → The Problem
              </motion.span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 leading-tight" style={{ textShadow: "0 0 20px rgba(198,163,255,0.3)" }}>
                Gaming is<br />
                <span className="text-[color:var(--neo)]">Fragmented.</span><br />
                You Deserve Better.
              </h2>
              <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
                Too many apps. Too many logins. No single place to find teammates, track progress, or build your reputation.
              </p>
              <Button
                onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-14 rounded-2xl px-10 font-bold text-base bg-gradient-to-r from-[color:var(--neo)] to-[color:var(--acc)] text-black hover:scale-105 hover:shadow-[0_0_35px_rgba(198,163,255,0.7)] transition-all duration-300"
              >
                Join the Solution →
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STEP 2: THE SOLUTION - Right-aligned with staggered cards */}
      <section className="relative z-10 py-24 sm:py-32 bg-gradient-to-b from-transparent via-[color:var(--mid)]/5 to-transparent">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
            {/* Content Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-xs font-black tracking-widest text-[color:var(--neo)] mb-6 uppercase">
                Step 2 → The Solution
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 leading-tight" style={{ textShadow: "0 0 20px rgba(198,163,255,0.3)" }}>
                Gamérie:<br />
                <span className="bg-gradient-to-r from-[color:var(--neo)] to-[color:var(--acc)] bg-clip-text text-transparent">
                  Everything in One Place
                </span>
              </h2>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
                One platform for your entire gaming life. Profile, squads, tournaments, scheduling, and coaching — all unified.
              </p>

              {/* Demo mockup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="rounded-3xl border-2 border-white/15 bg-gradient-to-br from-[color:var(--card)]/70 to-black/40 backdrop-blur-xl p-6 mb-10"
              >
                <div className="h-64 rounded-2xl ring-1 ring-white/10 bg-black/30 flex items-center justify-center overflow-hidden">
                  <LottieBox path="https://assets9.lottiefiles.com/packages/lf20_kkflmtur.json" />
                </div>
              </motion.div>

              <Button
                onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-14 rounded-2xl px-10 font-bold text-base bg-gradient-to-r from-[color:var(--neo)] to-[color:var(--acc)] text-black hover:scale-105 hover:shadow-[0_0_35px_rgba(198,163,255,0.7)] transition-all duration-300"
              >
                I Want Early Access →
              </Button>
            </motion.div>

            {/* Staggered feature cards */}
            <div className="grid grid-cols-1 gap-6">
              {[
                { title: "Unified Profile", emoji: "🧬", desc: "One identity across all games and platforms" },
                { title: "Squad Finder", emoji: "⚔️", desc: "AI-powered matchmaking finds your perfect team" },
                { title: "Tournament Hub", emoji: "🏆", desc: "Compete, track stats, earn rewards" },
                { title: "Pro Coaching", emoji: "🧠", desc: "Learn from the best, book sessions easily" },
              ].map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, x: 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ x: -8, y: -4, transition: { duration: 0.2 } }}
                  className="group relative"
                  style={{
                    marginRight: i % 2 === 0 ? 0 : 40,
                  }}
                >
                  <Card className="relative overflow-hidden rounded-2xl border-2 border-white/15 bg-gradient-to-br from-[color:var(--card)]/80 to-[color:var(--card)]/50 backdrop-blur-md h-full transition-all duration-300 group-hover:border-[color:var(--neo)]/50 group-hover:shadow-[0_0_30px_rgba(198,163,255,0.3)]">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{b.emoji}</div>
                      <h3 className="font-black text-xl mb-3 group-hover:text-[color:var(--neo)] transition-colors">{b.title}</h3>
                      <p className="text-base text-white/70 leading-relaxed">{b.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STEP 3: WHY JOIN EARLY - Centered with dynamic grid */}
      <section className="relative z-10 py-24 sm:py-32 bg-gradient-to-b from-transparent via-[color:var(--card)]/10 to-transparent">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-black tracking-widest text-[color:var(--neo)] mb-6 uppercase">
              Step 3 → Why Join Early
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8" style={{ textShadow: "0 0 20px rgba(198,163,255,0.3)" }}>
              Early Access =<br />
              <span className="bg-gradient-to-r from-[color:var(--neo)] to-[color:var(--acc)] bg-clip-text text-transparent">
                Exclusive Perks
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              The first 500 members unlock lifetime benefits, rare badges, and a voice in shaping Gamérie's future.
            </p>
          </motion.div>

          {/* Dynamic staggered grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { title: "🎖️ Founder Badge", desc: "Permanent badge showing you were here first. Instant credibility.", highlight: true },
              { title: "🎁 Exclusive Rewards", desc: "Early tournament access, premium features unlocked free." },
              { title: "🗳️ Shape the Platform", desc: "Vote on features, join private beta channels, influence roadmap." },
              { title: "💎 Reserved Username", desc: "Claim your perfect username before it's gone forever." },
              { title: "🚀 Priority Support", desc: "Direct line to our team. VIP treatment for life.", highlight: true },
              { title: "🔓 Beta Access", desc: "Be the first to try new features and tournaments." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={cn(
                  "relative rounded-2xl border-2 backdrop-blur-md p-6 group transition-all duration-300",
                  item.highlight
                    ? "border-[color:var(--neo)]/40 bg-gradient-to-br from-[color:var(--neo)]/15 to-[color:var(--card)]/60 hover:border-[color:var(--neo)] hover:shadow-[0_0_40px_rgba(198,163,255,0.4)]"
                    : "border-white/15 bg-gradient-to-br from-[color:var(--card)]/70 to-[color:var(--card)]/40 hover:border-[color:var(--neo)]/50 hover:shadow-[0_0_30px_rgba(198,163,255,0.3)]"
                )}
                style={{
                  marginTop: i % 2 === 0 ? 0 : 20,
                }}
              >
                <h3 className="font-black text-xl mb-3 group-hover:text-[color:var(--neo)] transition-colors">{item.title}</h3>
                <p className="text-base text-white/75 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Button
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-16 rounded-2xl px-12 font-black text-lg bg-gradient-to-r from-[color:var(--neo)] to-[color:var(--acc)] text-black hover:scale-105 hover:shadow-[0_0_45px_rgba(198,163,255,0.8)] transition-all duration-300"
            >
              CLAIM MY PERKS NOW →
            </Button>
            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-6 text-base text-white/70"
            >
              ⏳ Only <span className="font-black text-[color:var(--neo)] text-lg">500 spots</span> remaining
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* COMMUNITY PROOF */}
      <section className="relative z-10 py-24 sm:py-32 bg-gradient-to-b from-transparent via-[color:var(--mid)]/5 to-transparent">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-6" style={{ textShadow: "0 0 20px rgba(198,163,255,0.3)" }}>
              Join{" "}
              <span className="bg-gradient-to-r from-[color:var(--neo)] to-[color:var(--acc)] bg-clip-text text-transparent">
                {count.toLocaleString()}+ Gamers
              </span>{" "}
              Already Waiting
            </h2>
            <p className="text-xl text-white/80">The hype is real. See what early supporters are saying.</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {[
              { quote: "Finally, a platform that gets it. Can't wait to join my squad here.", tag: "PurityMurity#4521" },
              { quote: "The unified profile feature alone is a game-changer. I'm in.", tag: "NovaStrike#8890" },
              { quote: "Been waiting for something like this. Early access secured! 🔥", tag: "HexMage#1010" },
            ].map((t, i) => (
              <motion.div
                key={t.tag}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="relative rounded-2xl border-2 border-white/15 bg-gradient-to-br from-[color:var(--card)]/80 to-[color:var(--card)]/50 p-6 backdrop-blur-md group hover:border-[color:var(--neo)]/40 hover:shadow-[0_0_30px_rgba(198,163,255,0.3)] transition-all duration-300"
                style={{
                  marginTop: i % 2 === 0 ? 0 : 20,
                }}
              >
                <p className="text-white/95 mb-4 text-lg leading-relaxed">"{t.quote}"</p>
                <div className="inline-flex items-center gap-2 rounded-full border-2 border-[color:var(--neo)]/30 bg-[color:var(--neo)]/10 px-4 py-2 text-sm font-semibold group-hover:border-[color:var(--neo)]/60 transition-colors">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-2 w-2 rounded-full bg-[color:var(--neo)] shadow-[0_0_10px_rgba(198,163,255,1)]"
                  />
                  <span className="text-white/95">{t.tag}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border-2 border-[color:var(--neo)]/40 bg-gradient-to-r from-[color:var(--neo)]/20 to-[color:var(--acc)]/10 p-10 text-center backdrop-blur-md shadow-[0_0_50px_rgba(198,163,255,0.3)]"
          >
            <p className="text-2xl font-black text-white/95 mb-3">
              🚨 Don't miss out — spots are filling fast
            </p>
            <p className="text-lg text-white/80">Join the waitlist now and be part of gaming history.</p>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 py-32 sm:py-40">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight"
            style={{ textShadow: "0 0 25px rgba(198,163,255,0.4)" }}
          >
            Your Squad is Waiting.<br />
            <span className="bg-gradient-to-r from-[color:var(--neo)] to-[color:var(--acc)] bg-clip-text text-transparent">
              Are You In?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl sm:text-2xl text-white/85 mb-12"
          >
            Secure your spot now. Only <span className="font-black text-[color:var(--neo)] text-2xl">500 early access slots</span> available.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-5 justify-center max-w-3xl mx-auto mb-8">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="you@game.gg"
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-16 rounded-2xl bg-[color:var(--card)] border-2 border-white/20 text-lg font-medium placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-[color:var(--neo)] focus-visible:border-[color:var(--neo)] transition-all"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="h-16 rounded-2xl px-14 font-black text-lg bg-gradient-to-r from-[color:var(--neo)] to-[color:var(--acc)] text-black hover:scale-105 hover:shadow-[0_0_50px_rgba(198,163,255,0.9)] transition-all duration-300 whitespace-nowrap"
              >
                {loading ? "SAVING..." : "JOIN THE WAITLIST"}
              </Button>
            </form>
            {!!success && (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-lg text-[color:var(--neo)] font-bold mb-6"
                style={{textShadow:"0 0 15px rgba(198,163,255,0.7)"}}
              >
                ✓ {success}
              </motion.p>
            )}
            <motion.a
              href="https://discord.com/invite/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center justify-center gap-3 h-16 rounded-2xl px-12 font-bold text-lg border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 hover:border-[color:var(--neo)]/50 hover:bg-white/15 backdrop-blur-md shadow-lg hover:shadow-[0_0_30px_rgba(198,163,255,0.4)] transition-all duration-300"
            >
              <span className="text-2xl">💬</span>
              <span>Join Discord Community</span>
            </motion.a>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 -bottom-32 h-96 bg-[radial-gradient(50%_50%_at_50%_0%,_rgba(198,163,255,0.3)_0%,_transparent_70%)]" />
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t-2 border-white/10 bg-gradient-to-b from-[color:var(--dark)]/80 to-[color:var(--dark)] backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-3 mb-3">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-2.5 w-2.5 rounded-full bg-[color:var(--neo)] shadow-[0_0_15px_rgba(198,163,255,1)]"
                />
                <span className="text-2xl font-black tracking-wide" style={{ textShadow: "0 0 16px rgba(198,163,255,0.5)" }}>Gamérie</span>
              </div>
              <p className="text-white/70 text-base">Play. Compete. Connect. Power up your play.</p>
            </div>
            <div className="flex items-center gap-8 text-base">
              <a href="/terms" className="text-white/80 hover:text-[color:var(--neo)] font-semibold transition-colors">Terms</a>
              <a href="/privacy" className="text-white/80 hover:text-[color:var(--neo)] font-semibold transition-colors">Privacy</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <span>© {new Date().getFullYear()} Gamérie. All rights reserved.</span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--neo)]/80 shadow-[0_0_8px_rgba(198,163,255,0.9)]" />
              <span className="text-white/70 font-medium">Made for gamers</span>
            </span>
          </div>
        </div>
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
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* Animated grid with parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 opacity-30"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(198,163,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(198,163,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            backgroundPosition: "center center",
          }}
        />
      </motion.div>

      {/* Large animated gradient orbs */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(198,163,255,0.4) 0%, transparent 70%)" }}
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 -right-32 h-[500px] w-[500px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(158,131,200,0.35) 0%, transparent 70%)" }}
      />
      <motion.div
        aria-hidden
        animate={{
          opacity: [0.2, 0.35, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(117,99,145,0.3) 0%, transparent 70%)" }}
      />

      {/* Floating particles with varied motion */}
      <div className="absolute inset-0">
        {new Array(30).fill(0).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              background: i % 3 === 0 ? "#C6A3FF" : i % 3 === 1 ? "#9E83C8" : "#756391",
              boxShadow: `0 0 ${8 + (i % 4) * 3}px ${i % 3 === 0 ? "rgba(198,163,255,0.9)" : "rgba(158,131,200,0.7)"}`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              top: `${(i * 139) % 100}%`,
              left: `${(i * 71) % 100}%`,
            }}
            animate={{
              y: [0, -(15 + (i % 10) * 2), 0],
              x: [0, (i % 2 === 0 ? 5 : -5), 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + (i % 6),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}