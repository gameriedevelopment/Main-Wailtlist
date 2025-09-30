"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

  // Parallax
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Animated counter
  const [count, setCount] = useState(0);
  useEffect(() => {
    const target = 28700;
    const duration = 2000;
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

  // Email form
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
      className="relative min-h-screen overflow-x-clip bg-[#0a0a0a] text-white"
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
      {/* Subtle gradient mesh background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(198,163,255,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_50%,rgba(158,131,200,0.08),transparent)]" />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(198,163,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(198,163,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-32">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="mx-auto max-w-5xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-[color:var(--neo)]/10 border border-[color:var(--neo)]/20"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--neo)]" />
            <span className="text-sm font-medium text-[color:var(--neo)]">{count.toLocaleString()}+ gamers already joined</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.05]"
          >
            Your gaming universe,
            <br />
            <span className="bg-gradient-to-r from-[color:var(--neo)] via-[color:var(--acc)] to-[color:var(--neo)] bg-clip-text text-transparent">
              unified
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl sm:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            One platform for your entire gaming life. Play, compete, and connect with gamers worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form ref={formRef} onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto mb-4">
              <Input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white/5 border-white/10 text-base rounded-lg focus-visible:ring-1 focus-visible:ring-[color:var(--neo)] focus-visible:border-[color:var(--neo)]"
              />
              <Button
                type="submit"
                disabled={loading}
                className="h-12 px-8 bg-[color:var(--neo)] hover:bg-[color:var(--acc)] text-black font-medium rounded-lg transition-all"
              >
                {loading ? "Joining..." : "Join waitlist"}
              </Button>
            </form>
            {!!success && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-[color:var(--neo)]"
              >
                ✓ {success}
              </motion.p>
            )}
            {!success && (
              <p className="text-sm text-white/40">
                Only 500 early access spots remaining
              </p>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* STORY SECTION 1: THE PROBLEM */}
      <section className="relative py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-[color:var(--neo)]/10 border border-[color:var(--neo)]/20 text-sm font-medium text-[color:var(--neo)] mb-6">
                The Problem
              </div>
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Gaming is fragmented
              </h2>
              <p className="text-xl text-white/60 leading-relaxed mb-8">
                Too many apps. Too many logins. No single place to find teammates, track progress, or build your reputation.
              </p>
              <Button
                onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                variant="ghost"
                className="text-[color:var(--neo)] hover:bg-[color:var(--neo)]/10 h-11 px-6 rounded-lg"
              >
                Join the solution →
              </Button>
            </motion.div>

            <div className="space-y-4">
              {[
                { stat: "8+", label: "Apps per gamer", desc: "Discord, Steam, Twitch, and more" },
                { stat: "73%", label: "Feel disconnected", desc: "Struggle to find consistent squads" },
                { stat: "0", label: "Unified profiles", desc: "Your achievements stay scattered" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-5xl font-bold text-[color:var(--neo)]">{item.stat}</div>
                    <div>
                      <div className="text-lg font-semibold mb-1">{item.label}</div>
                      <p className="text-sm text-white/50">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STORY SECTION 2: THE SOLUTION */}
      <section className="relative py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[color:var(--neo)]/10 to-[color:var(--acc)]/5 border border-white/10 p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(198,163,255,0.1),transparent_60%)]" />
                <div className="relative text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[color:var(--neo)] to-[color:var(--acc)] flex items-center justify-center">
                    <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-sm text-white/60">Platform Demo</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-[color:var(--neo)]/10 border border-[color:var(--neo)]/20 text-sm font-medium text-[color:var(--neo)] mb-6">
                The Solution
              </div>
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Everything in one place
              </h2>
              <p className="text-xl text-white/60 leading-relaxed mb-8">
                Unified profile, squad finder, tournaments, and coaching. All the tools you need to level up your gaming.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: "🧬", title: "Unified Profile", desc: "One identity across all games" },
                  { icon: "⚔️", title: "Squad Finder", desc: "AI-powered team matching" },
                  { icon: "🏆", title: "Tournaments", desc: "Compete and earn rewards" },
                  { icon: "🧠", title: "Pro Coaching", desc: "Learn from the best" },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-semibold mb-0.5">{item.title}</div>
                      <p className="text-sm text-white/50">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                variant="ghost"
                className="text-[color:var(--neo)] hover:bg-[color:var(--neo)]/10 h-11 px-6 rounded-lg"
              >
                Get early access →
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STORY SECTION 3: WHY JOIN EARLY */}
      <section className="relative py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-[color:var(--neo)]/10 border border-[color:var(--neo)]/20 text-sm font-medium text-[color:var(--neo)] mb-6">
              Why Join Early
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
              Early access = exclusive perks
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              The first 500 members unlock lifetime benefits and shape the future of Gamérie.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "🎖️", title: "Founder Badge", desc: "Permanent badge showing you were here first" },
              { icon: "🎁", title: "Exclusive Rewards", desc: "Early tournament access and premium features" },
              { icon: "🗳️", title: "Shape the Platform", desc: "Vote on features and influence the roadmap" },
              { icon: "💎", title: "Reserved Username", desc: "Claim your perfect username now" },
              { icon: "🚀", title: "Priority Support", desc: "Direct line to our team for life" },
              { icon: "🔓", title: "Beta Access", desc: "First to try new features and tournaments" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-[color:var(--neo)]/30 transition-all"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-12 px-8 bg-[color:var(--neo)] hover:bg-[color:var(--acc)] text-black font-medium rounded-lg"
            >
              Claim your perks
            </Button>
            <p className="mt-4 text-sm text-white/40">Only 500 spots remaining</p>
          </motion.div>
        </div>
      </section>

      {/* COMMUNITY PROOF */}
      <section className="relative py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Join <span className="text-[color:var(--neo)]">{count.toLocaleString()}+ gamers</span> already waiting
            </h2>
            <p className="text-lg text-white/60">See what early supporters are saying</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { quote: "Finally, a platform that gets it. Can't wait to join my squad here.", author: "PurityMurity#4521" },
              { quote: "The unified profile feature alone is a game-changer. I'm in.", author: "NovaStrike#8890" },
              { quote: "Been waiting for something like this. Early access secured!", author: "HexMage#1010" },
            ].map((item, i) => (
              <motion.div
                key={item.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <p className="text-white/90 mb-4 leading-relaxed">"{item.quote}"</p>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--neo)]" />
                  <p className="text-sm text-white/60">{item.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
          >
            Your squad is waiting.<br />
            <span className="text-[color:var(--neo)]">Are you in?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60 mb-12"
          >
            Secure your spot now. Only 500 early access slots available.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto mb-6">
              <Input
                type="email"
                placeholder="you@game.gg"
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white/5 border-white/10 rounded-lg focus-visible:ring-1 focus-visible:ring-[color:var(--neo)]"
              />
              <Button
                type="submit"
                disabled={loading}
                className="h-12 px-10 bg-[color:var(--neo)] hover:bg-[color:var(--acc)] text-black font-medium rounded-lg"
              >
                {loading ? "Joining..." : "Join waitlist"}
              </Button>
            </form>
            {!!success && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-[color:var(--neo)] mb-6">
                ✓ {success}
              </motion.p>
            )}
            <a
              href="https://discord.com/invite/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <span>💬</span>
              <span className="text-sm">Join Discord Community</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/10 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--neo)]" />
              <span className="text-xl font-bold">Gamérie</span>
            </div>
            <div className="flex gap-8 text-sm">
              <a href="/terms" className="text-white/60 hover:text-white transition-colors">Terms</a>
              <a href="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
          <div className="text-center sm:text-left text-sm text-white/40">
            © {new Date().getFullYear()} Gamérie. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}