"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CommunityProof({ count }: { count: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Interactive background elements
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orbRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* === Background Layer === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

        {/* Floating orbs */}
        <motion.div
          style={{ y: orbY1, rotate: orbRotate }}
          className="absolute top-20 left-10 w-72 h-72 bg-[color:var(--neo)]/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: orbY2, rotate: orbRotate }}
          className="absolute bottom-10 right-10 w-72 h-72 bg-[color:var(--acc)]/10 rounded-full blur-3xl"
        />

        {/* Animated subtle grid lines */}
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] z-5 bg-[size:40px_40px]"
        />
      </div>

      {/* === Foreground (unchanged) === */}
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Join{" "}
            <span className="text-[color:var(--neo)]">
              {count.toLocaleString()}+ gamers
            </span>{" "}
            already waiting
          </h2>
          <p className="text-lg text-white/60">
            See what early supporters are saying
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {[
            {
              quote:
                "Scouting new talent has always been messy. Gamerie’s AI-driven profiles and salary estimations make it so much easier to identify rising players and evaluate their potential fairly.",
              author: "Christiana Thanou",
              country: "Athens, Greece",
            },
            {
              quote:
                "What excites me about Gamerie is not just the social features, but the career engine behind it. This platform can redefine how gamers connect with teams, sponsors, and opportunities.",
              author: "Ilias Avgeropoulos",
              country: "Kemi, Finland",
            },
            {
              quote:
                "Finally, a platform that treats gamers like professionals. With Gamerie I can showcase my stats, achievements, and even get noticed by real teams. It feels like LinkedIn, but made for us.",
              author: "Purity Murity",
              country: "Nairobi, Kenya",
            },
          ].map((item, i) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[color:var(--neo)]/40 transition-all min-h-[400px] flex flex-col justify-between shadow-lg"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[color:var(--neo)]/50 via-[color:var(--acc)]/30 to-transparent rounded-t-2xl" />

              {/* Quote mark accent */}
              <span className="absolute top-4 left-4 text-5xl opacity-10 text-[color:var(--neo)] pointer-events-none mr-8">
                “
              </span>

              {/* Quote text */}
              <p className="relative text-white/90 mb-6 leading-relaxed text-lg z-10">
                "{item.quote}"
              </p>

              {/* Author details */}
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--neo)]" />
                  <p className="text-sm text-white/60">{item.author}</p>
                </div>
                <p className="text-sm text-white/70">{item.country}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
