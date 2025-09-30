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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              quote:
                "Finally, a platform that gets it. Can't wait to join my squad here.",
              author: "PurityMurity#4521",
            },
            {
              quote:
                "The unified profile feature alone is a game-changer. I'm in.",
              author: "NovaStrike#8890",
            },
            {
              quote:
                "Been waiting for something like this. Early access secured!",
              author: "HexMage#1010",
            },
          ].map((item, i) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              <p className="text-white/90 mb-4 leading-relaxed">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--neo)]" />
                <p className="text-sm text-white/60">{item.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

{
  /* <section className="relative py-32 px-6">
        <div className="mx-auto max-w-6xl">
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Finally, a platform that gets it. Can't wait to join my squad here.",
                author: "PurityMurity#4521",
              },
              {
                quote:
                  "The unified profile feature alone is a game-changer. I'm in.",
                author: "NovaStrike#8890",
              },
              {
                quote:
                  "Been waiting for something like this. Early access secured!",
                author: "HexMage#1010",
              },
            ].map((item, i) => (
              <motion.div
                key={item.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <p className="text-white/90 mb-4 leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--neo)]" />
                  <p className="text-sm text-white/60">{item.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */
}
