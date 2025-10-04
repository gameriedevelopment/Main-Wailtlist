"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function CommandCenterSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section
      ref={ref}
      id="command-center-section"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* === Background layers === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/60 to-black" />

        {/* Faint grid overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] mix-blend-overlay" />

        {/* Floating orbs with parallax */}
        <motion.div
          style={{ y: orbY1 }}
          className="absolute -top-10 -left-20 w-72 h-72 bg-[color:var(--neo)]/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="absolute bottom-0 -right-20 w-80 h-80 bg-[color:var(--acc)]/20 rounded-full blur-3xl"
        />

        {/* Divider line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* === Foreground === */}
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Your{" "}
            <span className="bg-gradient-to-r from-[color:var(--neo)] via-[color:var(--acc)] to-[color:var(--neo)] bg-clip-text text-transparent">
              Command Center
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Gamérie unifies every tool you need into one powerful, integrated
            platform.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {[
            {
              title: "AI-Powered Profile",
              desc: "Your dynamic resume with verified stats, achievements, and tournament history.",
            },
            {
              title: "Creator Monetization Hub",
              desc: "Launch subscriptions, offer coaching, and build a reliable income. You keep 80%.",
            },
            {
              title: "Career & Scouting Hub",
              desc: "Get direct access to esports orgs and sponsors looking for verified talent.",
            },
            {
              title: "Intelligent Matchmaking",
              desc: "Our AI finds you the perfect teammates based on skill, playstyle, and ambition.",
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, rotateX: -5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                y: -5,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm
                         hover:bg-white/[0.08] hover:border-[color:var(--neo)]/30
                         transition-all"
            >
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            onClick={() =>
              document
                .querySelector("#hero-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            variant="ghost"
            className="text-[color:var(--neo)] hover:bg-[color:var(--neo)]/10 h-11 px-6 rounded-lg"
          >
            Join waitlist →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
