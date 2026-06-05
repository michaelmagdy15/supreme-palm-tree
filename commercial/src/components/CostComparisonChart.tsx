'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingDown, 
  Leaf, 
  Info, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  ShieldAlert, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  DollarSign
} from 'lucide-react';

export default function CostComparisonChart() {
  const [includeSustainability, setIncludeSustainability] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  // Financial Figures (AED)
  const supervisionCost = 1837000;
  const sustainabilityCost = 252000;
  const p1ForensicDesign = 680000;
  const p2CleanDesign = 290000;

  // Calculations
  const p1Total = p1ForensicDesign + supervisionCost + (includeSustainability ? sustainabilityCost : 0);
  const p2Total = p2CleanDesign + supervisionCost + (includeSustainability ? sustainabilityCost : 0);
  const savings = p1Total - p2Total; // AED 390,000

  // Format helper
  const formatAED = (value: number) => {
    return `AED ${value.toLocaleString()}`;
  };

  // Max value for visual scaling
  const maxPossibleCost = p1ForensicDesign + supervisionCost + sustainabilityCost;

  return (
    <div className="w-full bg-[#0B132B] p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl text-slate-100 font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
        <div>
          <span className="text-[10px] tracking-widest font-mono text-cyan-400 uppercase font-semibold">
            Commercial Feasibility Analysis
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
            CAPEX Pathway Modeling
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Comparative analysis: Refurbishment vs. New Build development options
          </p>
        </div>
        
        {/* Toggle Switch */}
        <div className="flex items-center gap-3 bg-[#112240] px-4 py-2.5 rounded-xl border border-slate-700/50 self-start md:self-auto">
          <Leaf className={`h-4 w-4 transition-colors ${includeSustainability ? 'text-cyan-400' : 'text-slate-500'}`} />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-200 leading-none">Sustainability Option</span>
            <span className="text-[10px] text-slate-400 mt-0.5">+AED 252,000 PQP Supervision</span>
          </div>
          <button
            onClick={() => setIncludeSustainability(!includeSustainability)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              includeSustainability ? 'bg-cyan-500' : 'bg-slate-700'
            }`}
            role="switch"
            aria-checked={includeSustainability}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                includeSustainability ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* KPI Cards (Crisp White Surfaces for Corporate Presentation Contrast) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Pathway 1 Card */}
        <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-lg border border-slate-100 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full flex items-start justify-end p-3 pointer-events-none">
            <ShieldAlert className="h-5 w-5 text-rose-500 opacity-60" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider mb-3">
              Pathway 1: Refurbishment
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {formatAED(p1Total)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Inclusive of critical asset diagnostics
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Supervision Role:</span>
              <span className="font-semibold text-slate-800">{formatAED(supervisionCost)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 flex items-center gap-1">
                Forensic/Sunk Cost:
                <span title="Non-recoverable preliminary expense incurred in verifying concrete structural integrity." className="cursor-help">
                  <Info className="h-3 w-3 text-rose-500" />
                </span>
              </span>
              <span className="font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                {formatAED(p1ForensicDesign)}
              </span>
            </div>
            {includeSustainability && (
              <div className="flex justify-between items-center text-xs text-cyan-700">
                <span>Sustainability Role (PQP):</span>
                <span className="font-semibold">{formatAED(sustainabilityCost)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Pathway 2 Card */}
        <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-lg border border-slate-100 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-50/50 rounded-bl-full flex items-start justify-end p-3 pointer-events-none">
            <Sparkles className="h-5 w-5 text-cyan-600 opacity-60" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 bg-cyan-50 text-cyan-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider mb-3">
              Pathway 2: New Build
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {formatAED(p2Total)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Maximized efficiency, zero legacy risk
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Supervision Role:</span>
              <span className="font-semibold text-slate-800">{formatAED(supervisionCost)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 flex items-center gap-1">
                Clean Slate Value:
                <span title="Direct design fee with no forensic investigations or legacy constraints required." className="cursor-help">
                  <Info className="h-3 w-3 text-cyan-600" />
                </span>
              </span>
              <span className="font-bold text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded">
                {formatAED(p2CleanDesign)}
              </span>
            </div>
            {includeSustainability && (
              <div className="flex justify-between items-center text-xs text-cyan-700">
                <span>Sustainability Role (PQP):</span>
                <span className="font-semibold">{formatAED(sustainabilityCost)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Savings Card (Highlight Emerald for Success Vector) */}
        <div className="bg-emerald-950 text-emerald-100 rounded-2xl p-6 shadow-lg border border-emerald-800 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-900/40 rounded-bl-full flex items-start justify-end p-3 pointer-events-none">
            <TrendingDown className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 bg-emerald-900/80 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider mb-3">
              Efficiency Savings Delta
            </div>
            <div className="text-4xl font-extrabold text-emerald-400 tracking-tight">
              {formatAED(savings)}
            </div>
            <p className="text-xs text-emerald-300 mt-1">
              Direct capital reduction by choosing Pathway 2
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-emerald-900 flex flex-col gap-2">
            <div className="text-xs text-emerald-200 leading-relaxed">
              New Build eliminates structural risk premiums and forensic engineering cost overlays, returning <span className="font-bold text-white">AED 390,000</span> straight to client reserves.
            </div>
          </div>
        </div>

      </div>

      {/* Visual Comparison Chart Section (On Crisp White Surface) */}
      <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-lg border border-slate-100 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Layers className="h-4 w-4 text-cyan-600" />
            Visual Budget Allocation Breakdowns
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">Interactive Stacked Segments</span>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-rose-500 inline-block shadow-sm"></span>
            <span>Forensic/Sunk Cost (P1)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-cyan-500 inline-block shadow-sm"></span>
            <span>Clean Slate Design Value (P2)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-slate-700 inline-block shadow-sm"></span>
            <span>Supervision Role</span>
          </div>
          {includeSustainability && (
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-teal-400 inline-block shadow-sm"></span>
              <span>Sustainability / PQP Role</span>
            </div>
          )}
        </div>

        {/* Horizontal Stacked Bars */}
        <div className="space-y-8 py-2">
          
          {/* Pathway 1 Horizontal Bar */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-slate-700">Pathway 1: Refurbishment</span>
              <span className="text-xs font-extrabold text-slate-900">{formatAED(p1Total)}</span>
            </div>
            
            <div className="h-10 w-full bg-slate-100 rounded-xl overflow-hidden flex shadow-inner border border-slate-200">
              {/* P1 Forensic Segment */}
              <motion.div
                layout
                initial={{ width: 0 }}
                animate={{ width: `${(p1ForensicDesign / maxPossibleCost) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                onMouseEnter={() => setHoveredSegment('p1-forensic')}
                onMouseLeave={() => setHoveredSegment(null)}
                className="relative h-full bg-rose-500 cursor-pointer flex items-center justify-center text-white font-bold text-xs hover:brightness-105 transition-all"
              >
                {hoveredSegment === 'p1-forensic' ? (
                  <span className="text-[10px] tracking-tight">Sunk Cost</span>
                ) : (
                  <span>24.5%</span>
                )}
              </motion.div>

              {/* Supervision Segment */}
              <motion.div
                layout
                initial={{ width: 0 }}
                animate={{ width: `${(supervisionCost / maxPossibleCost) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                onMouseEnter={() => setHoveredSegment('p1-supervision')}
                onMouseLeave={() => setHoveredSegment(null)}
                className="relative h-full bg-slate-700 border-l border-slate-600/30 cursor-pointer flex items-center justify-center text-white font-bold text-xs hover:brightness-105 transition-all"
              >
                {hoveredSegment === 'p1-supervision' ? (
                  <span className="text-[10px] tracking-tight">Supervision</span>
                ) : (
                  <span>66.3%</span>
                )}
              </motion.div>

              {/* Sustainability Segment */}
              <AnimatePresence>
                {includeSustainability && (
                  <motion.div
                    layout
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: `${(sustainabilityCost / maxPossibleCost) * 100}%`, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    onMouseEnter={() => setHoveredSegment('p1-sustainability')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    className="relative h-full bg-teal-400 border-l border-teal-300/30 cursor-pointer flex items-center justify-center text-slate-900 font-bold text-xs hover:brightness-105 transition-all"
                  >
                    {hoveredSegment === 'p1-sustainability' ? (
                      <span className="text-[10px] tracking-tight">PQP Cost</span>
                    ) : (
                      <span>9.1%</span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Pathway 2 Horizontal Bar */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-slate-700">Pathway 2: New Build</span>
              <span className="text-xs font-extrabold text-slate-900">{formatAED(p2Total)}</span>
            </div>

            <div className="h-10 w-full bg-slate-100 rounded-xl overflow-hidden flex shadow-inner border border-slate-200">
              {/* P2 Clean Slate Design Segment */}
              <motion.div
                layout
                initial={{ width: 0 }}
                animate={{ width: `${(p2CleanDesign / maxPossibleCost) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                onMouseEnter={() => setHoveredSegment('p2-design')}
                onMouseLeave={() => setHoveredSegment(null)}
                className="relative h-full bg-cyan-500 cursor-pointer flex items-center justify-center text-white font-bold text-xs hover:brightness-105 transition-all"
              >
                {hoveredSegment === 'p2-design' ? (
                  <span className="text-[10px] tracking-tight">Clean Slate</span>
                ) : (
                  <span>10.5%</span>
                )}
              </motion.div>

              {/* Supervision Segment */}
              <motion.div
                layout
                initial={{ width: 0 }}
                animate={{ width: `${(supervisionCost / maxPossibleCost) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                onMouseEnter={() => setHoveredSegment('p2-supervision')}
                onMouseLeave={() => setHoveredSegment(null)}
                className="relative h-full bg-slate-700 border-l border-slate-600/30 cursor-pointer flex items-center justify-center text-white font-bold text-xs hover:brightness-105 transition-all"
              >
                {hoveredSegment === 'p2-supervision' ? (
                  <span className="text-[10px] tracking-tight">Supervision</span>
                ) : (
                  <span>66.3%</span>
                )}
              </motion.div>

              {/* Sustainability Segment */}
              <AnimatePresence>
                {includeSustainability && (
                  <motion.div
                    layout
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: `${(sustainabilityCost / maxPossibleCost) * 100}%`, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    onMouseEnter={() => setHoveredSegment('p2-sustainability')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    className="relative h-full bg-teal-400 border-l border-teal-300/30 cursor-pointer flex items-center justify-center text-slate-900 font-bold text-xs hover:brightness-105 transition-all"
                  >
                    {hoveredSegment === 'p2-sustainability' ? (
                      <span className="text-[10px] tracking-tight">PQP Cost</span>
                    ) : (
                      <span>9.1%</span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Dynamic Tooltip Info Display based on Hover Segment */}
        <div className="mt-6 min-h-[50px] bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-600 flex items-start gap-2.5 transition-all">
          <Info className="h-4 w-4 text-cyan-600 mt-0.5 flex-shrink-0" />
          <div>
            {!hoveredSegment && (
              <p>Hover over the chart segments to read detailed descriptions of the underlying feasibility items.</p>
            )}
            {hoveredSegment === 'p1-forensic' && (
              <p>
                <strong className="text-rose-600 font-semibold">Forensic &amp; Sunk Cost (AED 680,000):</strong> This premium reflects the intensive testing, concrete core sampling, and design adjustments necessary to adapt existing structures. It presents a major sunk-cost risk as legacy integrity concerns persist.
              </p>
            )}
            {hoveredSegment === 'p2-design' && (
              <p>
                <strong className="text-cyan-600 font-semibold">Clean Slate Value (AED 290,000):</strong> By starting with a new build, structural engineering risks drop significantly. Architectural fees are fully optimized around direct asset utility without structural remediation constraints.
              </p>
            )}
            {(hoveredSegment === 'p1-supervision' || hoveredSegment === 'p2-supervision') && (
              <p>
                <strong className="text-slate-800 font-semibold">Supervision Role (AED 1,837,000):</strong> The core consultancy, project management, and site supervision costs which remain static across both development paths.
              </p>
            )}
            {(hoveredSegment === 'p1-sustainability' || hoveredSegment === 'p2-sustainability') && (
              <p>
                <strong className="text-teal-600 font-semibold">Sustainability / PQP Role (AED 252,000):</strong> The optional sustainability role ensures Estidama compliance, tracking materials provenance and carbon footprint reduction objectives.
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Corporate Advisory Insight Alert */}
      <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-5 text-slate-900 flex items-start gap-4">
        <div className="bg-emerald-100 p-2.5 rounded-xl border border-emerald-200 text-emerald-700 flex-shrink-0">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            Key Financial Advisory Advisory Alert
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded">RECOMMENDED</span>
          </h4>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            Pathway 2 (New Build) is <strong className="text-emerald-700 font-bold">{formatAED(savings)}</strong> cheaper than Pathway 1 (Refurbishment). Choosing the New Build strategy delivers a <span className="font-semibold text-slate-800">Clean Slate Design Advantage</span>, mitigating structural legacy risk and providing high feasibility viability.
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-emerald-700 text-xs font-semibold cursor-pointer group">
            <span>Review Full Risk Matrices</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

    </div>
  );
}
