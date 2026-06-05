"use client";

import React from "react";
import { motion } from "framer-motion";

interface DECLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export default function DECLogo({ className, ...props }: DECLogoProps) {
  // Shared animation configurations for the floating loop
  const floatTransition = {
    repeat: Infinity,
    duration: 3.5,
    ease: "easeInOut" as const,
    delay: 2.2, // Starts after the building animation is complete
  };

  // Base path variant for the structural wireframe outline and fill fade-in
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      fillOpacity: 0,
    },
    visible: (delay: number) => ({
      pathLength: 1,
      opacity: 1,
      fillOpacity: 0.2, // Target opacity for bottom block faces
      transition: {
        pathLength: { delay, type: "spring" as const, duration: 1.2, bounce: 0 },
        opacity: { delay, duration: 0.2 },
        fillOpacity: { delay: delay + 0.8, duration: 0.6, ease: "easeOut" as const },
      },
    }),
  };

  // Accent path variant for the floating TAQA Teal base (solid, high-contrast look)
  const tealPathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      fillOpacity: 0,
    },
    visible: (delay: number) => ({
      pathLength: 1,
      opacity: 1,
      fillOpacity: 0.65, // Higher fill opacity for the floating teal accent
      transition: {
        pathLength: { delay, type: "spring" as const, duration: 1.2, bounce: 0 },
        opacity: { delay, duration: 0.2 },
        fillOpacity: { delay: delay + 0.8, duration: 0.6, ease: "easeOut" as const },
      },
    }),
  };

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        {/* Glow Filter for High-Fidelity Accent */}
        <filter id="tealGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Bottom Block Face Gradients (Cyan Theme) */}
        <linearGradient id="cyanTopGrad" x1="50" y1="47" x2="50" y2="77" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="cyanLeftGrad" x1="15" y1="62" x2="50" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="cyanRightGrad" x1="85" y1="62" x2="50" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0e7490" />
          <stop offset="100%" stopColor="#155e75" />
        </linearGradient>

        {/* Top Floating Diamond Gradients (TAQA Teal Theme: #14B8A6) */}
        <linearGradient id="tealTopGrad" x1="50" y1="2" x2="50" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
        <linearGradient id="tealLeftGrad" x1="25" y1="12" x2="50" y2="25" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
        <linearGradient id="tealRightGrad" x1="75" y1="12" x2="50" y2="25" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0f766e" />
          <stop offset="100%" stopColor="#115e59" />
        </linearGradient>

        {/* Connection Line Gradient */}
        <linearGradient id="connectionGrad" x1="50" y1="62" x2="50" y2="17" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0891b2" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Background Architectural Blueprint Elements */}
      {/* Dashed Circular Radar Grid */}
      <motion.circle
        cx="50"
        cy="80"
        r="36"
        stroke="#0891b2"
        strokeWidth="0.5"
        strokeDasharray="3 3"
        strokeOpacity="0.18"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 1.2, ease: "easeOut" }}
      />
      {/* Subtle Axis Grid Lines */}
      <motion.line
        x1="10"
        y1="80"
        x2="90"
        y2="80"
        stroke="#0891b2"
        strokeWidth="0.5"
        strokeOpacity="0.1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      />
      <motion.line
        x1="50"
        y1="40"
        x2="50"
        y2="98"
        stroke="#0891b2"
        strokeWidth="0.5"
        strokeOpacity="0.1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      />

      {/* Outer Ground Shadow - dynamically pulses slightly with the float */}
      <motion.path
        d="M 50,96 L 78,82 L 50,68 L 22,82 Z"
        fill="#020617"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: [0.3, 0.45, 0.3], 
          scale: [0.95, 1, 0.95] 
        }}
        transition={{
          opacity: { delay: 1, duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          scale: { delay: 1, duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          default: { duration: 0.8, ease: "easeOut" }
        }}
        className="text-slate-950/40 dark:text-slate-950/70"
      />

      {/* ================= BOTTOM BLOCK (CYAN) ================= */}
      {/* Left Face */}
      <motion.path
        d="M 15,80 L 50,95 L 50,77 L 15,62 Z"
        stroke="#0891b2"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="url(#cyanLeftGrad)"
        variants={pathVariants}
        custom={0.2}
        initial="hidden"
        animate="visible"
      />

      {/* Right Face */}
      <motion.path
        d="M 50,95 L 85,80 L 85,62 L 50,77 Z"
        stroke="#0891b2"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="url(#cyanRightGrad)"
        variants={pathVariants}
        custom={0.4}
        initial="hidden"
        animate="visible"
      />

      {/* Top Face */}
      <motion.path
        d="M 50,77 L 85,62 L 50,47 L 15,62 Z"
        stroke="#22d3ee"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="url(#cyanTopGrad)"
        variants={pathVariants}
        custom={0.6}
        initial="hidden"
        animate="visible"
      />

      {/* Block Corner Technical Ticks (Enhances blueprint high-fidelity style) */}
      <motion.line
        x1="15"
        y1="80"
        x2="10"
        y2="82"
        stroke="#0891b2"
        strokeWidth="0.8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
      <motion.line
        x1="85"
        y1="80"
        x2="90"
        y2="82"
        stroke="#0891b2"
        strokeWidth="0.8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />

      {/* ================= CONNECTION & ACCENT (TAQA TEAL) ================= */}
      {/* Central Axis Connection Line - Stretches and contracts with floating */}
      <motion.line
        x1="50"
        y1="62" // Rises from the center of bottom block's top face
        x2="50"
        initial={{ y2: 25, pathLength: 0, opacity: 0 }}
        animate={{
          y2: [25, 17, 25], // Stretches/shrinks dynamically to match floating
          pathLength: 1,
          opacity: 1,
        }}
        transition={{
          y2: floatTransition,
          pathLength: { delay: 1.4, type: "spring" as const, duration: 1.2, bounce: 0 },
          opacity: { delay: 1.4, duration: 0.2 },
        }}
        stroke="url(#connectionGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Glowing Energy Dot running up/down the axis */}
      <motion.circle
        cx="50"
        initial={{ cy: 62, opacity: 0 }}
        animate={{
          cy: [62, 17, 62],
          opacity: [0, 0.9, 0.9, 0],
        }}
        r="2"
        fill="#14B8A6"
        filter="url(#tealGlow)"
        transition={floatTransition}
      />

      {/* ================= TOP FLOATING DIAMOND BASE (TAQA TEAL) ================= */}
      {/* Animated group translates entire top slab up and down */}
      <motion.g
        animate={{ y: [0, -8, 0] }}
        transition={floatTransition}
      >
        {/* Left Face of Floating Slab */}
        <motion.path
          d="M 25,12 L 50,22 L 50,25 L 25,15 Z"
          stroke="#0d9488"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="url(#tealLeftGrad)"
          variants={tealPathVariants}
          custom={1.6}
          initial="hidden"
          animate="visible"
        />

        {/* Right Face of Floating Slab */}
        <motion.path
          d="M 50,22 L 75,12 L 75,15 L 50,25 Z"
          stroke="#0d9488"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="url(#tealRightGrad)"
          variants={tealPathVariants}
          custom={1.8}
          initial="hidden"
          animate="visible"
        />

        {/* Top Face (Diamond Base) */}
        <motion.path
          d="M 50,22 L 75,12 L 50,2 L 25,12 Z"
          stroke="#14B8A6"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="url(#tealTopGrad)"
          filter="url(#tealGlow)"
          variants={tealPathVariants}
          custom={2.0}
          initial="hidden"
          animate="visible"
        />
      </motion.g>
    </svg>
  );
}
