"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
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

  // Floating particles animation
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white flex items-center justify-center px-6"
      style={
        {
          "--neo": COLORS.neon,
          "--acc": COLORS.accent,
          "--hlt": COLORS.highlight,
          "--mid": COLORS.mid,
          "--card": COLORS.card,
          "--dark": COLORS.dark,
        } as React.CSSProperties
      }
    >
      {/* Enhanced background with gradient mesh overlays */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(198,163,255,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_50%,rgba(158,131,200,0.08),transparent)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(198,163,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(198,163,255,0.02) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-[color:var(--neo)]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* FLOOR 1: Thank You Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            className="inline-flex items-center justify-center mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-[color:var(--neo)] blur-2xl"
              />
              <CheckCircle2
                className="w-24 h-24 text-[color:var(--neo)] relative"
                strokeWidth={1.5}
              />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
          >
            Thank You{" "}
            <span className="bg-gradient-to-r from-[color:var(--neo)] via-[color:var(--acc)] to-[color:var(--neo)] bg-clip-text text-transparent">
              Gamer!
            </span>
          </motion.h1>

          {/* Email Check Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Mail className="w-6 h-6 text-[color:var(--neo)]" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold mb-2">
                    Check Your Email
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Please be sure to check your email and clear our emails from
                    your spam filter. We'll be sending you updates and exclusive
                    early access info soon!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decorative sparkles */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 left-10 opacity-30"
          >
            <Sparkles className="w-8 h-8 text-[color:var(--neo)]" />
          </motion.div>
          <motion.div
            animate={{
              rotate: [360, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-40 right-20 opacity-30"
          >
            <Sparkles className="w-6 h-6 text-[color:var(--acc)]" />
          </motion.div>
        </motion.div>

        {/* FLOOR 2: Discord CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center"
        >
          <div className="p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] hover:border-[color:var(--neo)]/30 transition-all">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
                Get{" "}
                <span className="bg-gradient-to-r from-[color:var(--neo)] via-[color:var(--acc)] to-[color:var(--neo)] bg-clip-text text-transparent">
                  Early Access
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join our official Discord to connect with other gamers, give
                feedback, and maybe become one of our{" "}
                <span className="text-[color:var(--neo)] font-semibold">
                  MVP testers
                </span>
                .
              </p>

              {/* Discord Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  className="h-14 px-10 bg-[color:var(--neo)] hover:bg-[color:var(--acc)] text-black font-semibold rounded-xl text-lg transition-all shadow-lg shadow-[color:var(--neo)]/20"
                >
                  <a
                    href={process.env.NEXT_PUBLIC_DISCORD_INVITE_LINK!}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="w-6 h-6 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    Gamerie Discord
                  </a>
                </Button>
              </motion.div>

              {/* Additional benefits */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60"
              >
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--neo)]" />
                  <span>Exclusive updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--neo)]" />
                  <span>Community events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--neo)]" />
                  <span>MVP tester opportunities</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Back to home link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
          >
            ← Back to homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
