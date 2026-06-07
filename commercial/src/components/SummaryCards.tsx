"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import {
  Layers,
  AlertTriangle,
  Eye,
  TrendingUp,
  Info,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

// Helper component for smooth number transitions using Framer Motion
interface AnimatedNumberProps {
  value: number;
  prefix?: string;
}

function AnimatedNumber({ value, prefix = "" }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString()}
    </span>
  );
}

export default function SummaryCards() {
  // Option 2 Design Cost states
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const designPhases = [
    { name: "Concept Design", percent: 20, cost: 76000 },
    { name: "Schematic Design", percent: 30, cost: 114000 },
    { name: "Detailed Design", percent: 50, cost: 190000 },
  ];

  // Option 1 Refurbishment Cost states
  const [showRiskDetail, setShowRiskDetail] = useState(false);

  // Site Supervision states
  const [includeOptional, setIncludeOptional] = useState(false);
  const coreSupervision = 1141200;
  const optionalSupervision = 39600;
  const totalSupervision = includeOptional
    ? coreSupervision + optionalSupervision
    : coreSupervision;

  // Direct Value Add Ratio states
  const [activeTab, setActiveTab] = useState<"comparison" | "definition">("comparison");

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Option 2 Design Cost */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative overflow-hidden bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-lg shadow-slate-100/50 dark:shadow-none flex flex-col justify-between group"
        >
          {/* Cyan top indicator highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-500 transition-all duration-300 group-hover:h-1.5" />

          <div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Option 2 Design Cost
                </span>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
                  AED 380,000
                </h3>
              </div>
              <div className="p-2.5 bg-cyan-50 dark:bg-cyan-950/40 rounded-xl text-cyan-600 dark:text-cyan-400">
                <Layers className="w-5 h-5" />
              </div>
            </div>

            {/* Micro progress bar represention */}
            <div className="mt-5">
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>Phase Progress Allocation</span>
                <span className="font-medium text-cyan-600 dark:text-cyan-400">3 Stages</span>
              </div>
              <div className="flex h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer">
                {designPhases.map((phase, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPhase(idx === selectedPhase ? null : idx)}
                    className={`h-full transition-all duration-300 ${
                      idx === 0
                        ? "bg-cyan-400 dark:bg-cyan-500"
                        : idx === 1
                        ? "bg-cyan-500 dark:bg-cyan-400"
                        : "bg-cyan-600 dark:bg-cyan-300"
                    } ${
                      selectedPhase !== null && selectedPhase !== idx
                        ? "opacity-30"
                        : "opacity-100"
                    }`}
                    style={{ width: `${phase.percent}%` }}
                    title={`${phase.name}: ${phase.percent}%`}
                  />
                ))}
              </div>
            </div>

            {/* Interactive breakdown display */}
            <div className="mt-4 min-h-[52px]">
              <AnimatePresence mode="wait">
                {selectedPhase === null ? (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-slate-500 space-y-1"
                  >
                    <p className="flex justify-between">
                      <span>Concept Phase:</span> <span className="font-semibold text-slate-700 dark:text-slate-300">20%</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Schematic Phase:</span> <span className="font-semibold text-slate-700 dark:text-slate-300">30%</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Detailed Design:</span> <span className="font-semibold text-slate-700 dark:text-slate-300">50%</span>
                    </p>
                    <p className="text-[10px] text-slate-400 italic text-right mt-1">
                      Click the bars to drill down costs
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="selected"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/50 rounded-lg p-2 text-xs"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {designPhases[selectedPhase].name}
                      </span>
                      <span className="bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                        {designPhases[selectedPhase].percent}%
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 flex justify-between">
                      <span>Allocated Cost:</span>
                      <span className="font-bold text-cyan-700 dark:text-cyan-300">
                        AED {designPhases[selectedPhase].cost.toLocaleString()}
                      </span>
                    </p>
                    <button
                      onClick={() => setSelectedPhase(null)}
                      className="text-[10px] text-cyan-600 dark:text-cyan-400 underline mt-1 block hover:text-cyan-700"
                    >
                      Clear selection
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Option 1 Refurbishment Cost */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative overflow-hidden bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-lg shadow-slate-100/50 dark:shadow-none flex flex-col justify-between group"
        >
          {/* Crimson top indicator highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500 transition-all duration-300 group-hover:h-1.5" />

          <div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Option 1 Refurbishment Cost
                </span>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
                  AED 680,000
                </h3>
              </div>
              <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl text-rose-600 dark:text-rose-400">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            {/* Risk Indicator Badge */}
            <div className="mt-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/40">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                High Sunk Cost Risk
              </span>
            </div>

            {/* Interactive explanation dropdown */}
            <div className="mt-4">
              <button
                onClick={() => setShowRiskDetail(!showRiskDetail)}
                className="w-full flex justify-between items-center text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                <span>Risk Assessment</span>
                {showRiskDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <AnimatePresence>
                {showRiskDetail && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 text-[11px] text-slate-500 bg-rose-50/35 dark:bg-rose-950/10 rounded-lg p-2.5 border border-rose-100/30 dark:border-rose-900/30 space-y-1.5">
                      <p>
                        <strong>Refurbishment Sunk Cost:</strong> 72% of expenditures cannot be salvaged or recovered if the building scope changes.
                      </p>
                      <p className="text-slate-400">
                        Major items: structural reinforcements, custom MEP adaptation, and legacy shell demolition.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Site Supervision Total */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative overflow-hidden bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-lg shadow-slate-100/50 dark:shadow-none flex flex-col justify-between group"
        >
          {/* Teal top indicator highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-teal-500 transition-all duration-300 group-hover:h-1.5" />

          <div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Site Supervision Total
                </span>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1 flex items-center">
                  <AnimatedNumber value={totalSupervision} prefix="AED " />
                </h3>
              </div>
              <div className="p-2.5 bg-teal-50 dark:bg-teal-950/40 rounded-xl text-teal-600 dark:text-teal-400">
                <Eye className="w-5 h-5" />
              </div>
            </div>

            {/* Core & Optional toggle */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Include Optional Services</span>
              <button
                onClick={() => setIncludeOptional(!includeOptional)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                  includeOptional ? "bg-teal-500" : "bg-slate-200 dark:bg-slate-700"
                }`}
              >
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="inline-block h-4 w-4 transform rounded-full bg-white shadow-md"
                  style={{
                    marginLeft: includeOptional ? "24px" : "4px",
                  }}
                />
              </button>
            </div>

            {/* Cost Breakdown display */}
            <div className="mt-4 space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Core Services:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  AED 1,141,200
                </span>
              </div>
              <div
                className={`flex justify-between items-center transition-colors duration-300 ${
                  includeOptional
                    ? "text-teal-600 dark:text-teal-400 font-medium"
                    : "text-slate-400 dark:text-slate-600"
                }`}
              >
                <span className="flex items-center gap-1">
                  Optional Services:
                  {includeOptional && <CheckCircle2 className="w-3.5 h-3.5" />}
                </span>
                <span className="font-semibold">AED 39,600</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Direct Value Add Ratio */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative overflow-hidden bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-lg shadow-slate-100/50 dark:shadow-none flex flex-col justify-between group"
        >
          {/* Emerald/Success top indicator highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 transition-all duration-300 group-hover:h-1.5" />

          <div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Direct Value Add Ratio
                </span>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
                  76% vs 48%
                </h3>
              </div>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            {/* Emerald Success Vector Badge */}
            <div className="mt-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/40">
                <Sparkles className="w-3.5 h-3.5" />
                +28% Option 2 Premium
              </span>
              <button
                onClick={() =>
                  setActiveTab(activeTab === "comparison" ? "definition" : "comparison")
                }
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                title="View metric details"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>

            {/* Comparison bars or description definitions */}
            <div className="mt-4 min-h-[52px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {activeTab === "comparison" ? (
                  <motion.div
                    key="comparison"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-2 text-xs"
                  >
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-500 mb-0.5">
                        <span>Option 2 (Design)</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">76%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: "76%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-500 mb-0.5">
                        <span>Option 1 (Refurbishment)</span>
                        <span className="font-semibold text-slate-600 dark:text-slate-400">48%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400 dark:bg-slate-600" style={{ width: "48%" }} />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="definition"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="bg-slate-50 dark:bg-slate-800/40 rounded-lg p-2 text-[10px] text-slate-500 leading-normal border border-slate-100 dark:border-slate-800"
                  >
                    <span className="font-bold text-slate-600 dark:text-slate-400 block mb-0.5">
                      Direct Value Add Ratio
                    </span>
                    Percentage of total capital expenditures directly producing core assets vs overheads, supervision, permits &amp; design overhead.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
