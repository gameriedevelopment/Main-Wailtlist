"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import EsportsStatsSection from "./EsportStats";

export default function FAQSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* === Background Layer === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          style={{ y: orbY1 }}
          className="absolute top-24 -left-32 w-96 h-96 bg-[color:var(--neo)]/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="absolute bottom-0 -right-32 w-[28rem] h-[28rem] bg-[color:var(--acc)]/10 rounded-full blur-3xl"
        />

        {/* Spotlight behind FAQ container */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[color:var(--neo)]/5 rounded-full blur-3xl" />

        {/* Divider line for smooth transition from CTA */}
        {/* <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" /> */}
      </div>

      {/* === Foreground === */}
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[color:var(--neo)] via-[color:var(--acc)] to-[color:var(--neo)] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          {/* <p className="text-lg text-white/60">
            See our FAQs and learn how you can make money as a Gamer.
          </p> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <FAQItem
            question="What is Gamerie?"
            answer="Gamerie is the social media platform built from the ground up for every gamer. This is your space to connect with friends, find teammates for any game, and join communities that share your passion. Create your profile, share your best clips and screenshots, and discover a world of content from players just like you. No matter what or how you play, your community is waiting."
          />
          <FAQItem
            question="Is it free?"
            answer="Yep! The main features of Gamerie are totally free to use. If you want to take your game to the next level, we'll have some optional premium tools you can check out later on."
          />
          <FAQItem
            question="Can I make money as a Gamer?"
            answer={
              <>
                Yes, in two main ways:
                <br />
                <br />
                <strong>For Creators:</strong> Earn directly from your community
                with features like tips and profile subscriptions. Our platform
                will launch with a direct "Support" feature for tips, and we're
                already developing a full Creator Program with profile
                subscriptions and other monetization options.
                <br />
                <br />
                <strong>For Competitors:</strong> Get discovered. Your verified
                profile showcases your skills to pro teams and scouts looking
                for new talent. Perform well, get noticed, and take your shot at
                a professional contract.
              </>
            }
          />
          <FAQItem
            question="When can I jump in?"
            answer="Soon, we promise! We're starting to invite our first Founders in Q4 2025 (that's just around the corner!). We're excited to have you, so keep an eye on your email for that invite!"
          />
          <FAQItem
            question="Is there a mobile app coming?"
            answer="You bet! We will have iOS and Android apps so you can manage your profile, chat with your team, and track your stats from anywhere. They'll be ready shortly after the main website launches."
          />
          <FAQItem
            question="Is this for solo players or teams?"
            answer="It's for everyone! Whether you're a solo player looking to improve your skills and find a community, or you've already got a squad ready to compete, Gamerie is the place for you. We're here to support your journey."
          />
          <FAQItem
            question="How is Gamerie different?"
            answer="We cut out the noise. Gamerie is a 100% gaming-focused social platform, which means a better feed, better profiles, and better tools to find teammates. It's the gaming community you've always wanted, without the distractions of other social networks."
          />
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-[color:var(--neo)]/30 transition-colors">
    <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:border-[color:var(--neo)]/40 hover:shadow-[0_0_25px_-5px_var(--neo)] hover:bg-white/[0.07]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
      >
        <h3 className="text-lg font-semibold pr-4">{question}</h3>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-[color:var(--neo)] transition-transform flex-shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5 pt-0 text-white/70 leading-relaxed">
          {answer}
        </div>
      </motion.div>
    </div>
  );
}
