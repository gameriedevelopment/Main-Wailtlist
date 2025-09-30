"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function JoinEarly() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* === Background Layer === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Ambient gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#0a0a0f]/70 to-black/90" />

        {/* Floating orbs with scroll parallax */}
        <motion.div
          style={{ y: orbY1 }}
          className="absolute -top-20 left-1/4 w-64 h-64 bg-[color:var(--neo)]/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="absolute top-40 right-1/4 w-72 h-72 bg-[color:var(--acc)]/20 rounded-full blur-3xl"
        />

        {/* Animated grid lines */}
        {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" /> */}
      </div>

      {/* === Foreground Content === */}
      <div className="mx-auto max-w-6xl relative z-10">
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
            Early access, exclusive perks
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            The first 500 members unlock lifetime benefits and shape the future
            of Gamérie.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: "🎖️",
              title: "Founder Badge",
              desc: "Permanent badge showing you were here first",
            },
            {
              icon: "🎁",
              title: "Exclusive Rewards",
              desc: "Early tournament access and premium features",
            },
            {
              icon: "🗳️",
              title: "Shape the Platform",
              desc: "Vote on features and influence the roadmap",
            },
            {
              icon: "💎",
              title: "Reserved Username",
              desc: "Claim your perfect username now",
            },
            {
              icon: "🚀",
              title: "Priority Support",
              desc: "Direct line to our team for life",
            },
            {
              icon: "🔓",
              title: "Beta Access",
              desc: "First to try new features and tournaments",
            },
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
              <p className="text-sm text-white/50 leading-relaxed">
                {item.desc}
              </p>
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
            onClick={() =>
              document
                .querySelector("form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="h-12 px-8 bg-[color:var(--neo)] hover:bg-[color:var(--acc)] text-black font-medium rounded-lg"
          >
            Claim your perks
          </Button>
          <p className="mt-4 text-sm text-white/40">Only 500 spots remaining</p>
        </motion.div>
      </div>
    </section>
  );
}

{
  /* <section className="relative py-32 px-6">
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
              The first 500 members unlock lifetime benefits and shape the
              future of Gamérie.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "🎖️",
                title: "Founder Badge",
                desc: "Permanent badge showing you were here first",
              },
              {
                icon: "🎁",
                title: "Exclusive Rewards",
                desc: "Early tournament access and premium features",
              },
              {
                icon: "🗳️",
                title: "Shape the Platform",
                desc: "Vote on features and influence the roadmap",
              },
              {
                icon: "💎",
                title: "Reserved Username",
                desc: "Claim your perfect username now",
              },
              {
                icon: "🚀",
                title: "Priority Support",
                desc: "Direct line to our team for life",
              },
              {
                icon: "🔓",
                title: "Beta Access",
                desc: "First to try new features and tournaments",
              },
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
                <p className="text-sm text-white/50 leading-relaxed">
                  {item.desc}
                </p>
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
              onClick={() =>
                document
                  .querySelector("form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="h-12 px-8 bg-[color:var(--neo)] hover:bg-[color:var(--acc)] text-black font-medium rounded-lg"
            >
              Claim your perks
            </Button>
            <p className="mt-4 text-sm text-white/40">
              Only 500 spots remaining
            </p>
          </motion.div>
        </div>
      </section> */
}
