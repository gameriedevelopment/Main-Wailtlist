"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function ProblemSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 200]); // moves more
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      id="problem-section"
    >
      {/* === Background layers === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0f] to-black opacity-90" />

        {/* Orbs with parallax */}
        <motion.div
          style={{ y: orbY1 }}
          className="absolute top-20 -left-20 w-56 h-56 bg-[color:var(--neo)]/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="absolute bottom-20 -right-20 w-56 h-56 bg-[color:var(--acc)]/20 rounded-full blur-3xl"
        />

        {/* Divider line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* === Foreground (your untouched base layout) === */}
      <div className="mx-auto max-w-6xl relative z-10 ">
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
              Too many apps. Too many logins. No single place to find teammates,
              track progress, or build your reputation.
            </p>
            <Button
              onClick={() =>
                document
                  .querySelector("#hero-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              variant="ghost"
              className="text-[color:var(--neo)] hover:bg-[color:var(--neo)]/10 h-11 px-6 rounded-lg cursor-pointer"
            >
              Join the solution →
            </Button>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                stat: "8+",
                label: "Apps per gamer",
                desc: "Discord, Steam, Twitch, and more",
              },
              {
                stat: "73%",
                label: "Feel disconnected",
                desc: "Struggle to find consistent squads",
              },
              {
                stat: "0",
                label: "Unified profiles",
                desc: "Your achievements stay scattered",
              },
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
                  <div className="text-5xl font-bold text-[color:var(--neo)]">
                    {item.stat}
                  </div>
                  <div>
                    <div className="text-lg font-semibold mb-1">
                      {item.label}
                    </div>
                    <p className="text-sm text-white/50">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
