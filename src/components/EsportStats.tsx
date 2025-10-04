"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function EsportsStatsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* === Background layers === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated gradient wash */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,0,20,1)_0%,rgba(20,5,35,1)_40%,rgba(5,0,15,1)_100%)]
 bg-[length:200%_200%]"
        />
        {/* bg-[linear-gradient(135deg,rgba(10,10,20,1)_0%,rgba(15,20,35,1)_40%,rgba(5,10,25,1)_100%)] */}
        {/* bg-[linear-gradient(135deg,rgba(0,0,0,1)_0%,rgba(10,10,15,1)_40%,rgba(0,0,0,1)_100%)] */}
        {/* bg-[linear-gradient(135deg,rgba(8,0,20,1)_0%,rgba(20,5,35,1)_40%,rgba(5,0,15,1)_100%)] */}

        {/* Parallax orbs */}
        <motion.div
          style={{ y: orbY1 }}
          className="absolute top-20 left-0 w-72 h-72 bg-[color:var(--neo)]/15 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-[color:var(--acc)]/15 rounded-full blur-3xl"
        />

        {/* Faint grid overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] mix-blend-overlay" />

        {/* Central glow pulse */}
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[30rem] h-[30rem] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] rounded-full"
        />

        {/* Divider line from hero */}
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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            The eSports industry has{" "}
            <span className="bg-gradient-to-r from-[color:var(--neo)] via-[color:var(--acc)] to-[color:var(--neo)] bg-clip-text text-transparent">
              $2.2 Billion
            </span>{" "}
            on the table
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            It's not just for fun. It's the real deal for business
            opportunities.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "$60M", label: "Esports World Cup Prize Pool" },
            { value: "$34M", label: "The International (Dota 2) Prize Pool" },
            { value: "550M", label: "Esports Viewers Worldwide" },
            { value: "$3.1B", label: "Projected Market by 2025" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                y: -5,
                scale: 1.03,
                transition: { type: "spring", stiffness: 250, damping: 20 },
              }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 
                         hover:bg-white/[0.07] hover:border-[color:var(--neo)]/30 
                         transition-all text-center group backdrop-blur-sm"
            >
              <div className="text-5xl sm:text-6xl font-bold text-[color:var(--neo)] mb-4 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
