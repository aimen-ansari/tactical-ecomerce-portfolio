"use client";
import { motion, useReducedMotion } from "motion/react";
export function HeroTitle() {
  const reduced = useReducedMotion();
  return (
    <motion.h1
      initial={false}
      animate={{ y: reduced ? 0 : [12, 0], opacity: reduced ? 1 : [0.85, 1] }}
      transition={{ duration: reduced ? 0 : 0.65 }}
      className="hero-title"
    >
      Private security.
      <br />
      Professional identity.
      <br />
      <span>Everyday essentials.</span>
    </motion.h1>
  );
}
export function Reveal({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={false}
      whileInView={{
        y: reduced ? 0 : [12, 0],
        opacity: reduced ? 1 : [0.85, 1],
      }}
      viewport={{ once: true }}
      transition={{ duration: reduced ? 0 : 0.5 }}
    >
      {children}
    </motion.div>
  );
}
