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
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/60 to-black" /> */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0f] to-black opacity-90" />

        {/* Faint grid overlay */}
        {/* <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] mix-blend-overlay" /> */}

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
            Gamerie unifies every tool you need into one powerful, integrated
            platform.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
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
            {/* KAMK Section */}
            {/* <motion.div
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
            </motion.div> */}
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Join the community while you wait and apply if you want, to become
              an MVP tester.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-center"
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
                  Gamerie Discord Hub
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <div
            // className="grid sm:grid-cols-2 gap-6 mb-12"
            className="space-y-4"
          >
            {[
              {
                title: "News Feed Live Page",
                desc: "See and react instantly, to the latest achievements and posts, from the teams and players you follow.",
              },
              {
                title: "AI-Powered Profile",
                desc: "Your dynamic resume with verified stats, achievements, and tournament history.",
              },
              {
                title: "Intelligent Matchmaking",
                desc: "Our AI finds you the perfect teammates based on skill, playstyle, and ambition.",
              },
              {
                title: "Challenge Ecosystem",
                desc: "Compete in challenges with your team or as a single player. Results are level up your ranking.",
              },
              {
                title: "Career & Scouting Hub",
                desc: "Get direct access to esports orgs and sponsors looking for verified talent.",
              },
              {
                title: "Creator Monetization Hub",
                desc: "Launch subscriptions, offer coaching, and build a reliable income. You keep 80%.",
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
        </div>

        {/* CTA */}
        {/* <motion.div
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
        </motion.div> */}
      </div>
    </section>
  );
}
