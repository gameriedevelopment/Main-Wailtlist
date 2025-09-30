import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const images = [
  "/future-3.jpg",
  "/future-4.jpg",
  "/future-1.jpg",
  "/future-2.jpg",
];

export default function Hero({
  count,
  formRef,
  onSubmit,
  setEmail,
  email,
  loading,
  success,
  heroY,
  heroOpacity,
}: any) {
  const [index, setIndex] = useState(0);

  // auto-cycle every 6s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-32 overflow-hidden"
      id="hero-section"
    >
      {/* === Layer 1: Background slideshow === */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${images[index]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(4px) brightness(0.7)",
            }}
          />
        </AnimatePresence>
      </div>

      {/* === Layer 2: Gradient overlay (protects text contrast) === */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none" />

      {/* === Layer 3: Hero content === */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-20 mx-auto max-w-5xl text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-[color:var(--neo)]/10 border border-[color:var(--neo)]/20 "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--neo)]" />
          <span className="text-sm font-medium text-[color:var(--neo)]">
            {count.toLocaleString()}+ gamers already joined
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.05]"
        >
          Your gaming universe
          <br />
          <span className="bg-gradient-to-r from-[color:var(--neo)] via-[color:var(--acc)] to-[color:var(--neo)] bg-clip-text text-transparent">
            unified
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl sm:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
        >
          One platform for your entire gaming life. Play, compete, and connect
          with gamers worldwide.
        </motion.p>

        {/* Waitlist form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto mb-4"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-white/5 border-white/10 text-base rounded-lg focus-visible:ring-1 focus-visible:ring-[color:var(--neo)] focus-visible:border-[color:var(--neo)]"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-8 bg-[color:var(--neo)] hover:bg-[color:var(--acc)] text-black font-medium rounded-lg transition-all"
            >
              {loading ? "Joining..." : "Join waitlist"}
            </Button>
          </form>

          {!!success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-[color:var(--neo)]"
            >
              ✓ {success}
            </motion.p>
          )}
          {!success && (
            <p className="text-sm text-white/40">
              Only 500 early access spots remaining
            </p>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
