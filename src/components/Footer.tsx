"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 py-12 overflow-hidden">
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-8">
          <div className="inline-flex items-center gap-2">
            <img
              src="/gamerie-logo.png"
              alt="Gamerie"
              className={` object-contain size-3 sm:size-4 `}
            />
            <span
              className="text-lg font-bold tracking-wide -ml-2"
              style={{ textShadow: "0 0 14px rgba(198,163,255,0.45)" }}
            >
              Gamerie
            </span>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <p className="text-white/60">
              Are you an esports org? Join our Founding Partners
            </p>
            <div className="flex gap-8 text-sm">
              <a
                href={process.env.NEXT_PUBLIC_TERMS_OF_SERVICE}
                className="text-white/60 hover:text-white transition-colors"
                target="_blank"
              >
                Terms
              </a>
              <a
                href={process.env.NEXT_PUBLIC_PRIVACY_POLICY}
                className="text-white/60 hover:text-white transition-colors"
                target="_blank"
              >
                Privacy
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-center sm:text-left text-sm text-white/40">
              © {new Date().getFullYear()} Gamerie. All rights reserved.
            </div>
            <div className="flex items-center gap-1">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href={process.env.NEXT_PUBLIC_INSTAGRAM}>
                  <img
                    src="/instagram.png"
                    alt="instagram icon"
                    className="size-8 "
                  />
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href={process.env.NEXT_PUBLIC_FACEBOOK}>
                  <img
                    src="/facebook.png"
                    alt="facebook icon"
                    className="size-8 "
                  />
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href={process.env.NEXT_PUBLIC_YOUTUBE}>
                  <img
                    src="/youtube.png"
                    alt="youtube icon"
                    className="size-8"
                  />
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href={process.env.NEXT_PUBLIC_TIKTOK}>
                  <img src="/tiktok.png" alt="tiktok icon" className="size-8" />
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href={process.env.NEXT_PUBLIC_DISCORD}>
                  <img
                    src="/discord.png"
                    alt="discord icon"
                    className="size-6"
                  />
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href={process.env.NEXT_PUBLIC_TWITTER}>
                  <img src="/x.png" alt="X icon" className="size-6 grayscale" />
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href={process.env.NEXT_PUBLIC_LINKEDIN}>
                  <img
                    src="/linkedin.png"
                    alt="linkedin icon"
                    className="size-8"
                  />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
