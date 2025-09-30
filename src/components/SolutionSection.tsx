"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function SolutionSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 200]); // moves more
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={ref} className="relative py-32 px-6">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/60 to-black" />

        {/* Floating orbs */}
        <motion.div
          style={{ y: orbY1 }}
          className="absolute -top-5 -left-20 w-56 h-56 bg-[color:var(--neo)]/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="absolute bottom-0 -right-20 w-60 h-60 bg-[color:var(--acc)]/20 rounded-full blur-3xl"
        />

        {/* Divider line for structure */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* === Media / Demo Preview === */}
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
                  <svg
                    className="w-10 h-10 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-white/60">Platform Demo</p>
              </div>
            </div>
          </motion.div>

          {/* === Content === */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            {/* Label */}
            <div className="inline-block px-3 py-1 rounded-full bg-[color:var(--neo)]/10 border border-[color:var(--neo)]/20 text-sm font-medium text-[color:var(--neo)] mb-6">
              The Solution
            </div>

            {/* Heading */}
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4 leading-tight">
              A unified platform for gamers
            </h2>

            {/* Subheading (optional) */}

            <p className="text-lg font-medium text-[color:var(--acc)] mb-4">
              All your gaming needs, in one place.
            </p>

            {/* Description */}
            <p className="text-xl text-white/60 leading-relaxed mb-10">
              Gamerie is a comprehensive platform that brings together game
              discovery, social networking, and community engagement. Our
              mission is to create a seamless experience for gamers to connect,
              share, and explore new gaming horizons.
            </p>

            {/* Features in a grid instead of single list */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {[
                {
                  icon: "🧬",
                  title: "Unified Profile",
                  desc: "One identity across all games",
                },
                {
                  icon: "⚔️",
                  title: "Squad Finder",
                  desc: "AI-powered team matching",
                },
                {
                  icon: "🏆",
                  title: "Tournaments",
                  desc: "Compete and earn rewards",
                },
                {
                  icon: "🧠",
                  title: "Pro Coaching",
                  desc: "Learn from the best",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="font-semibold text-white">{item.title}</div>
                  </div>
                  <p className="text-sm text-white/50">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <Button
              onClick={() =>
                document
                  .querySelector("#hero-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              variant="ghost"
              className="text-[color:var(--neo)] hover:bg-[color:var(--neo)]/10 h-11 px-6 rounded-lg cursor-pointer"
            >
              Get early access →
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
