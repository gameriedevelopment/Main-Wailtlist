"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function UnifiedPlatformSection() {
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
      id="unified-platform-section"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* === Background Layers === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0f] to-black opacity-90" />

        {/* Parallax Orbs */}
        <motion.div
          style={{ y: orbY1 }}
          className="absolute top-20 -left-20 w-72 h-72 bg-[color:var(--neo)]/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="absolute bottom-20 -right-20 w-72 h-72 bg-[color:var(--acc)]/20 rounded-full blur-3xl"
        />

        {/* Divider line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* === Foreground === */}
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            A Unified Platform.
            <br />
            <span className="bg-gradient-to-r from-[color:var(--neo)] via-[color:var(--acc)] to-[color:var(--neo)] bg-clip-text text-transparent">
              For Every Role.
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Gamérie is the all-in-one Command Center for every player in the
            industry. Find your pillar.
          </p>
        </motion.div>

        {/* Role Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            {
              title: "The Pro Player",
              desc: "Your verified profile is your resume. Get scouted by top teams based on real performance data and land your dream contract.",
              image:
                "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
            },
            {
              title: "The Team Manager",
              desc: "Build your dynasty. Showcase your team's achievements, recruit verified talent with our scouting tools, and attract sponsors.",
              image:
                "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&auto=format&fit=crop&q=80",
            },
            {
              title: "The Superstar",
              desc: "Monetize your influence. Launch a subscription page, offer exclusive content, and build a reliable income stream. You keep 80%.",
              image:
                "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
            },
            {
              title: "The Community Gamer",
              desc: "Find your squad. Our AI matchmaking helps you connect with non-toxic players who share your passion, playstyle, and goals.",
              image:
                "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80",
            },
          ].map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden 
                         hover:bg-white/[0.07] hover:border-[color:var(--neo)]/30 
                         transition-all backdrop-blur-sm"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={role.image}
                  alt={role.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{role.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {role.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* KAMK Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto p-8 rounded-2xl bg-white/5 border border-white/10 
                     relative backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="text-6xl font-bold text-[color:var(--neo)]">
              KAMK
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">
                ACADEMICALLY BACKED & VERIFIED
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                In partnership with the esports business program at the{" "}
                <span className="text-[color:var(--neo)] font-medium">
                  Kajaani University of Applied Sciences, Finland
                </span>
                , pioneering the future of professional gaming.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            onClick={() =>
              document.querySelector("#hero-section")?.scrollIntoView({
                behavior: "smooth",
              })
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
