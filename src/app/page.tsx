"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import JoinEarly from "@/components/JoinEarly";
import CommunityProof from "@/components/CommunityProof";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  // Brand palette
  const COLORS = useMemo(
    () => ({
      neon: "#C6A3FF",
      accent: "#9E83C8",
      highlight: "#756391",
      mid: "#4C435A",
      card: "#38333F",
      dark: "#232323",
    }),
    []
  );

  // Parallax
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Animated counter
  const [count, setCount] = useState(0);
  useEffect(() => {
    const target = 28700;
    const duration = 2000;
    const steps = 60;
    const increment = Math.ceil(target / steps);
    let current = 0;
    const int = setInterval(() => {
      current = Math.min(target, current + increment);
      setCount(current);
      if (current >= target) clearInterval(int);
    }, duration / steps);
    return () => clearInterval(int);
  }, []);

  // Email form
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    formRef.current?.reset();
    setEmail("");
    setSuccess("You're on the list! Check your inbox soon.");
    setTimeout(() => setSuccess(""), 3500);
  };

  return (
    <div
      className="relative min-h-screen overflow-x-clip bg-[#0a0a0a] text-white"
      style={{
        // @ts-expect-error custom props
        "--neo": COLORS.neon,
        "--acc": COLORS.accent,
        "--hlt": COLORS.highlight,
        "--mid": COLORS.mid,
        "--card": COLORS.card,
        "--dark": COLORS.dark,
      }}
    >
      {/* Subtle gradient mesh background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(198,163,255,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_50%,rgba(158,131,200,0.08),transparent)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(198,163,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(198,163,255,0.02) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>
      <div className="absolute w-60 top-8 left-2 z-20">
        <div className="flex items-center justify-start sm:pl-10 pl-6 ">
          <img
            src="/gamerie-logo.png"
            alt="Gamerie"
            className={` object-contain size-5 sm:size-6`}
          />
          <h2 className="font-display text-lg sm:text-2xl font-bold text-white text-center sm:text-left">
            GAMERIE
          </h2>
        </div>
      </div>

      {/* HERO */}
      <Hero
        count={count}
        formRef={formRef}
        onSubmit={onSubmit}
        setEmail={setEmail}
        email={email}
        loading={loading}
        success={success}
        heroY={heroY}
        heroOpacity={heroOpacity}
      />

      {/*STORY SECTION 1: THE PROBLEM */}
      <ProblemSection />

      {/* STORY SECTION 2: THE SOLUTION */}
      <SolutionSection />

      {/* STORY SECTION 3: WHY JOIN EARLY */}
      <JoinEarly />

      {/* COMMUNITY PROOF */}
      <CommunityProof count={count} />

      {/* FINAL CTA */}
      <CallToAction
        onSubmit={onSubmit}
        setEmail={setEmail}
        loading={loading}
        success={success}
      />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
