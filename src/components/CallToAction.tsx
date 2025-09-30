"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CallToAction({
  onSubmit,
  setEmail,
  loading,
  success,
}: {
  onSubmit: (e: React.FormEvent) => void;
  setEmail: (val: string) => void;
  loading: boolean;
  success?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax orbs
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* === Background Layer === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Radiating pulse rings */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-[color:var(--neo)]/30"
        />
        <motion.div
          animate={{ scale: [1.2, 1.3, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full border border-[color:var(--acc)]/20"
        />

        {/* Parallax gradient orbs */}
        {/* <motion.div
          style={{ y: orbY1 }}
          className="absolute -top-20 -left-20 w-72 h-72 bg-[color:var(--neo)]/10 rounded-full blur-3xl"
        /> */}
        <motion.div
          style={{ y: orbY2 }}
          className="absolute -bottom-20 -right-20 w-72 h-72 bg-[color:var(--acc)]/10 rounded-full blur-3xl"
        />

        {/* Soft spotlight behind form */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[color:var(--neo)]/5 rounded-full blur-3xl" />
      </div>

      {/* === Foreground (unchanged CTA content) === */}
      <div className="mx-auto max-w-4xl text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
        >
          Your squad is waiting.
          <br />
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
          <form
            onSubmit={onSubmit}
            className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto mb-6"
          >
            <Input
              type="email"
              placeholder="you@game.gg"
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-white/5 border-white/10 rounded-lg focus-visible:ring-1 focus-visible:ring-[color:var(--neo)]"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-10 bg-[color:var(--neo)] hover:bg-[color:var(--acc)] text-black font-medium rounded-lg cursor-pointer"
            >
              {loading ? "Joining..." : "Join waitlist"}
            </Button>
          </form>
          {!!success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-[color:var(--neo)] mb-6"
            >
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
  );
}
