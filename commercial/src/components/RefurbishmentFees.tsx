"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  TrendingDown, 
  FileSpreadsheet, 
  Calculator, 
  ShieldAlert, 
  ArrowRightLeft, 
  Info,
  ChevronRight,
  TrendingUp,
  DollarSign
} from "lucide-react";

// Types for our line items
interface LineItem {
  id: string;
  name: string;
  category: "sunk" | "value";
  amount: number;
  description: string;
  impactScore: number; // 1 to 10 rating of how much value it adds
}

export default function RefurbishmentFees() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "sunk" | "value">("all");
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  // Line items data as specified in the requirements
  const lineItems: LineItem[] = useMemo(() => [
    {
      id: "initial-studies",
      name: "Initial Studies: Structure Tests & Analysis",
      category: "sunk",
      amount: 80000,
      description: "Forensic structural concrete coring, carbonation testing, and reinforcement corrosion analysis to gauge structural load integrity.",
      impactScore: 1,
    },
    {
      id: "building-survey",
      name: "Site & Existing Building Survey",
      category: "sunk",
      amount: 40000,
      description: "Laser scanning and dimensional surveys to document existing floor level deflections and structural shifts.",
      impactScore: 2,
    },
    {
      id: "mep-survey",
      name: "Existing MEP / Site Survey",
      category: "sunk",
      amount: 100000,
      description: "Detailed forensic tracking of aging, embedded mechanical, electrical, and plumbing infrastructure inside concrete shafts.",
      impactScore: 1,
    },
    {
      id: "as-built",
      name: "As-Built Drawings",
      category: "sunk",
      amount: 80000,
      description: "Compiling and drafting new structural records since original architectural documents are missing or obsolete.",
      impactScore: 2,
    },
    {
      id: "concept-design",
      name: "New Concept Design",
      category: "value",
      amount: 60000,
      description: "Redesigning interior spatial layouts within the rigid boundaries of the existing column grids.",
      impactScore: 7,
    },
    {
      id: "schematic-design",
      name: "Schematic Design",
      category: "value",
      amount: 90000,
      description: "Developing building services and structural integration blueprints based on the new concepts.",
      impactScore: 8,
    },
    {
      id: "detailed-design",
      name: "Detailed Design",
      category: "value",
      amount: 135000,
      description: "Final tender-ready construction blueprints, detailed connection calculations, and architectural finishes specifications.",
      impactScore: 9,
    },
    {
      id: "tender-stage",
      name: "Tender Stage",
      category: "value",
      amount: 15000,
      description: "Managing contractor queries, evaluating bids, and preparing detailed Bills of Quantities (BOQs).",
      impactScore: 5,
    },
    {
      id: "interior-ffe",
      name: "Interior Package + FF&E",
      category: "value",
      amount: 80000,
      description: "Sourcing and specifying interior loose furniture, fit-outs, fixtures, and surface finishes.",
      impactScore: 9,
    },
  ], []);

  // Mathematical validations
  const calculations = useMemo(() => {
    const total = lineItems.reduce((acc, curr) => acc + curr.amount, 0);
    const sunkAmount = lineItems
      .filter((item) => item.category === "sunk")
      .reduce((acc, curr) => acc + curr.amount, 0);
    const valueAmount = lineItems
      .filter((item) => item.category === "value")
      .reduce((acc, curr) => acc + curr.amount, 0);

    const statedTotal = 680000;
    const isVerified = total === statedTotal;

    const sunkPercentage = (sunkAmount / total) * 100; // ~44.11%
    const valuePercentage = (valueAmount / total) * 100; // ~55.88%

    return {
      total,
      sunkAmount,
      valueAmount,
      isVerified,
      sunkPercentage: Math.round(sunkPercentage),
      valuePercentage: Math.round(valuePercentage),
    };
  }, [lineItems]);

  // Filtered items based on interactive selection
  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return lineItems;
    return lineItems.filter((item) => item.category === selectedCategory);
  }, [lineItems, selectedCategory]);

  // Formatter for currency
  const formatCurrency = (val: number) => {
    return `AED ${val.toLocaleString()}`;
  };

  // Hovered item detailed info card helper
  const activeHoveredItem = useMemo(() => {
    return lineItems.find((item) => item.id === hoveredItemId) || null;
  }, [lineItems, hoveredItemId]);

  return (
    <div className="w-full w-full max-w-full overflow-x-hidden bg-[#070b13] text-slate-100 p-4 sm:p-8 font-sans antialiased selection:bg-teal-500/30 selection:text-teal-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP BAR / NAVIGATION BREADCRUMB */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-5 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-500 mb-1">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              Strategic Option 1: Structural Remedial Route
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Refurbishment Consultancy Services
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Analysis of fee allocations, structural risk diagnostics, and physical modernization yields.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {calculations.isVerified && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider"
              >
                <CheckCircle2 className="h-4 w-4" />
                Total Verified
              </motion.div>
            )}
            <div className="px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
              Remedial Route Warn
            </div>
          </div>
        </div>

        {/* HIGH-LEVEL METRICS PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Stated & Verified Total */}
          <div className="relative overflow-hidden bg-slate-900/40 border border-slate-800 rounded-xl p-6 shadow-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-500/5 to-transparent rounded-bl-full pointer-events-none" />
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Stated Investment Total</p>
                <h3 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
                  {formatCurrency(680000)}
                </h3>
              </div>
              <div className="p-2 bg-slate-800 rounded-lg text-teal-400">
                <Calculator className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs text-slate-400">Calculated:</span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/50">
                {formatCurrency(calculations.total)}
              </span>
              <span className="text-xs font-bold text-teal-400 animate-pulse ml-auto">VERIFIED ✓</span>
            </div>
          </div>

          {/* Sunk & Forensic Invested Capital */}
          <div className="relative overflow-hidden bg-slate-900/40 border border-rose-950/40 rounded-xl p-6 shadow-xl group hover:border-rose-900/60 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-rose-500/5 to-transparent rounded-bl-full pointer-events-none" />
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold uppercase text-rose-400 tracking-wider">Forensic & Diagnostic Sunk Costs</p>
                <h3 className="text-3xl font-extrabold text-rose-500 mt-2 tracking-tight">
                  {formatCurrency(calculations.sunkAmount)}
                </h3>
              </div>
              <div className="p-2 bg-rose-950/30 rounded-lg text-rose-400 border border-rose-900/30">
                <TrendingDown className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-400">Diagnostic Structural Overheads</span>
              <span className="font-bold text-rose-400 bg-rose-950/50 px-2 py-0.5 rounded border border-rose-900/50">
                {calculations.sunkPercentage}% of Total
              </span>
            </div>
          </div>

          {/* Value Add Design Capital */}
          <div className="relative overflow-hidden bg-slate-900/40 border border-teal-950/40 rounded-xl p-6 shadow-xl group hover:border-teal-900/60 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-500/5 to-transparent rounded-bl-full pointer-events-none" />
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold uppercase text-teal-400 tracking-wider">Productive Value-Add Design</p>
                <h3 className="text-3xl font-extrabold text-teal-400 mt-2 tracking-tight">
                  {formatCurrency(calculations.valueAmount)}
                </h3>
              </div>
              <div className="p-2 bg-teal-950/30 rounded-lg text-teal-400 border border-teal-900/30">
                <Layers className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-400">Architectural & Spatial Upgrades</span>
              <span className="font-bold text-teal-400 bg-teal-950/50 px-2 py-0.5 rounded border border-teal-900/50">
                {calculations.valuePercentage}% of Total
              </span>
            </div>
          </div>

        </div>

        {/* HIGH-IMPACT WARNING CALLOUT */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-l-4 border-rose-500 bg-gradient-to-r from-rose-950/30 to-slate-900/40 p-6 rounded-r-xl border border-slate-800/80 shadow-md relative overflow-hidden"
        >
          <div className="absolute -right-8 -bottom-8 text-rose-500/5 pointer-events-none">
            <ShieldAlert className="h-32 w-32" />
          </div>
          
          <div className="flex gap-4">
            <div className="p-3 bg-rose-500/10 rounded-lg text-rose-500 h-fit border border-rose-500/20">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                Sunk Capital Exposure Warning: The dying concrete penalty
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed max-w-5xl">
                A massive <span className="text-rose-400 font-semibold">{calculations.sunkPercentage}% ({formatCurrency(calculations.sunkAmount)})</span> of your entire refurbishment consultancy fee budget is spent on <span className="text-white underline decoration-rose-500/50 underline-offset-4 decoration-2">forensic diagnostics, testing dying structures, and drafting obsolete as-built setups</span>. This diagnostic overhead is entirely non-productive; it is a mandatory tax spent purely to inspect deteriorating physical elements without introducing a single square foot of tenant upgrades, aesthetic updates, or modern asset appreciation.
              </p>
              <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 text-xs">
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  No Asset Modernization Yield
                </span>
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  Mandatory Remedial Cost
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                  Option 2 Avoids This Diagnosis Ratio
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* VISUAL SEGMENTATION / BAR & SEGMENT VISUALIZATION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Segment visualization card */}
          <div className="lg:col-span-1 bg-slate-900/40 border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight mb-1">Fee Classification Profile</h3>
              <p className="text-xs text-slate-400">Interactive division of Option 1 investment components.</p>
              
              {/* Custom SVG Ring / Circle visualization */}
              <div className="relative flex justify-center items-center my-8">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle 
                    cx="55" 
                    cy="50" 
                    r="40" 
                    className="stroke-slate-800 fill-none" 
                    strokeWidth="10" 
                  />
                  {/* Sunk Costs circle arc (44.11%) */}
                  {/* circumference: 2 * pi * 40 = 251.3 */}
                  <motion.circle 
                    cx="55" 
                    cy="50" 
                    r="40" 
                    className="stroke-rose-500 fill-none cursor-pointer" 
                    strokeWidth="10" 
                    strokeDasharray="251.3"
                    initial={{ strokeDashoffset: 251.3 }}
                    animate={{ strokeDashoffset: 251.3 - (251.3 * 44.11) / 100 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    onClick={() => setSelectedCategory("sunk")}
                    whileHover={{ strokeWidth: 12 }}
                  />
                  {/* Value Add design circle arc (55.88%) */}
                  {/* start offset is Sunk portion offset */}
                  <motion.circle 
                    cx="55" 
                    cy="50" 
                    r="40" 
                    className="stroke-teal-400 fill-none cursor-pointer" 
                    strokeWidth="10" 
                    strokeDasharray="251.3"
                    initial={{ strokeDashoffset: 251.3 }}
                    animate={{ strokeDashoffset: 251.3 - (251.3 * 55.89) / 100 }}
                    style={{ rotate: "158.8deg", transformOrigin: "55px 50px" }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    onClick={() => setSelectedCategory("value")}
                    whileHover={{ strokeWidth: 12 }}
                  />
                </svg>

                {/* Donut Center Info */}
                <div className="absolute text-center">
                  <span className="text-2xl font-black text-white">AED 680,000</span>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Total Allocation</p>
                </div>
              </div>

              {/* Legends with interactivity triggers */}
              <div className="space-y-3">
                <button 
                  onClick={() => setSelectedCategory(selectedCategory === "sunk" ? "all" : "sunk")}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                    selectedCategory === "sunk" 
                      ? "bg-rose-500/10 border-rose-500/40 text-white" 
                      : "bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500" />
                    <span className="text-xs font-semibold">Sunk Forensic Audits</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-white">{formatCurrency(calculations.sunkAmount)}</span>
                    <span className="block text-[10px] text-rose-400 font-semibold">{calculations.sunkPercentage}%</span>
                  </div>
                </button>

                <button 
                  onClick={() => setSelectedCategory(selectedCategory === "value" ? "all" : "value")}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                    selectedCategory === "value" 
                      ? "bg-teal-500/10 border-teal-500/40 text-white" 
                      : "bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-teal-400" />
                    <span className="text-xs font-semibold">Value-Add Architect Design</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-white">{formatCurrency(calculations.valueAmount)}</span>
                    <span className="block text-[10px] text-teal-400 font-semibold">{calculations.valuePercentage}%</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-[10px] text-slate-400">Click segments to filter line-items</span>
              {selectedCategory !== "all" && (
                <button 
                  onClick={() => setSelectedCategory("all")}
                  className="text-xs text-teal-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  Reset Filter <ArrowRightLeft className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Line Items List / Table */}
          <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-xl shadow-xl flex flex-col overflow-hidden">
            
            {/* Table Header Controls */}
            <div className="p-5 border-b border-slate-800 bg-slate-900/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Line-Item Fee Breakdown</h3>
                <p className="text-xs text-slate-400">9 Core Services of Refurbishment Option 1.</p>
              </div>
              
              {/* Category Filter Buttons */}
              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 w-fit">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    selectedCategory === "all" 
                      ? "bg-slate-850 text-white shadow-sm border border-slate-700/50" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  All (9)
                </button>
                <button
                  onClick={() => setSelectedCategory("sunk")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    selectedCategory === "sunk" 
                      ? "bg-rose-950/40 text-rose-400 border border-rose-900/50" 
                      : "text-slate-400 hover:text-rose-400"
                  }`}
                >
                  Sunk (4)
                </button>
                <button
                  onClick={() => setSelectedCategory("value")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    selectedCategory === "value" 
                      ? "bg-teal-950/40 text-teal-400 border border-teal-900/50" 
                      : "text-slate-400 hover:text-teal-400"
                  }`}
                >
                  Value-Add (5)
                </button>
              </div>
            </div>

            {/* Table Container */}
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-850 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/10">
                    <th className="py-3 px-5">Consultancy Line Item</th>
                    <th className="py-3 px-4">Classification</th>
                    <th className="py-3 px-4 text-right">Fee amount</th>
                    <th className="py-3 px-4 text-center">Value Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => {
                      const isHovered = hoveredItemId === item.id;
                      const itemPercentage = (item.amount / 680000) * 100;
                      
                      return (
                        <motion.tr
                          key={item.id}
                          layoutId={item.id}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => setHoveredItemId(item.id)}
                          onMouseLeave={() => setHoveredItemId(null)}
                          className={`group cursor-pointer transition-colors ${
                            isHovered 
                              ? "bg-slate-850/60" 
                              : item.category === "sunk" 
                                ? "hover:bg-rose-950/10" 
                                : "hover:bg-teal-950/10"
                          }`}
                        >
                          {/* Name & Subtext */}
                          <td className="py-3.5 px-5">
                            <div className="font-semibold text-white text-sm group-hover:text-teal-300 transition-colors">
                              {item.name}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5 line-clamp-1 max-w-[28rem]">
                              {item.description}
                            </div>
                          </td>

                          {/* Classification Badge */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {item.category === "sunk" ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 uppercase tracking-wider">
                                <AlertTriangle className="h-3 w-3" />
                                Diagnostic Sunk
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400 uppercase tracking-wider">
                                <TrendingUp className="h-3 w-3" />
                                Value-Add Design
                              </span>
                            )}
                          </td>

                          {/* Amount */}
                          <td className="py-3.5 px-4 text-right font-mono text-sm whitespace-nowrap">
                            <span className={`font-bold ${item.category === "sunk" ? "text-slate-300" : "text-teal-300"}`}>
                              {formatCurrency(item.amount)}
                            </span>
                            <span className="block text-[10px] text-slate-500">
                              {itemPercentage.toFixed(1)}% weight
                            </span>
                          </td>

                          {/* Impact Score Visual Rating */}
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1">
                              {[...Array(5)].map((_, i) => {
                                const scaledImpact = Math.round(item.impactScore / 2);
                                return (
                                  <span
                                    key={i}
                                    className={`h-1.5 w-1.5 rounded-full ${
                                      i < scaledImpact
                                        ? item.category === "sunk"
                                          ? "bg-rose-500"
                                          : "bg-teal-400"
                                        : "bg-slate-750"
                                    }`}
                                  />
                                );
                              })}
                              <span className="text-[10px] text-slate-400 ml-1.5">
                                {item.impactScore}/10
                              </span>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile Card List (Mobile-First responsive layout) */}
            <div className="md:hidden space-y-3 p-4 bg-slate-950/20">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => {
                  const isHovered = hoveredItemId === item.id;
                  const itemPercentage = (item.amount / 680000) * 100;

                  return (
                    <motion.div
                      key={item.id}
                      onClick={() => setHoveredItemId(hoveredItemId === item.id ? null : item.id)}
                      className={`p-4 rounded-xl border transition-all ${
                        isHovered
                          ? "bg-slate-850/80 border-slate-700 text-white"
                          : item.category === "sunk"
                          ? "bg-rose-950/5 border-rose-950/30 border text-slate-300"
                          : "bg-teal-950/5 border-teal-950/30 border text-slate-300"
                      }`}
                    >
                      {/* Title & Badge */}
                      <div className="flex justify-between items-start gap-2.5 mb-2 pb-2 border-b border-slate-800/40">
                        <span className="font-semibold text-xs text-white leading-snug">
                          {item.name}
                        </span>
                        <span className="shrink-0">
                          {item.category === "sunk" ? (
                            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 tracking-wider">
                              Sunk
                            </span>
                          ) : (
                            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400 tracking-wider">
                              Value-Add
                            </span>
                          )}
                        </span>
                      </div>

                      {/* Cost details */}
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500">Allocation Weight</span>
                          <span className="font-mono text-slate-300 font-semibold">{itemPercentage.toFixed(1)}%</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-slate-500">Fee Amount</span>
                          <span className={`font-mono font-bold ${item.category === "sunk" ? "text-slate-300" : "text-teal-400"}`}>
                            {formatCurrency(item.amount)}
                          </span>
                        </div>
                      </div>

                      {/* Impact rating bar */}
                      <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Value Impact Rating</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => {
                            const scaledImpact = Math.round(item.impactScore / 2);
                            return (
                              <span
                                key={i}
                                className={`h-1 w-1 rounded-full ${
                                  i < scaledImpact
                                    ? item.category === "sunk"
                                      ? "bg-rose-500"
                                      : "bg-teal-400"
                                    : "bg-slate-750"
                                }`}
                              />
                            );
                          })}
                          <span className="ml-1 font-semibold">{item.impactScore}/10</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Live Contextual Detail Box */}
            <div className="bg-slate-950 p-4 border-t border-slate-800 text-xs flex items-center justify-between min-h-[5rem]">
              <AnimatePresence mode="wait">
                {activeHoveredItem ? (
                  <motion.div
                    key={activeHoveredItem.id}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    className="flex items-start gap-3 w-full"
                  >
                    <div className={`p-2 rounded mt-0.5 ${
                      activeHoveredItem.category === "sunk" ? "bg-rose-950/50 text-rose-400" : "bg-teal-950/50 text-teal-400"
                    }`}>
                      <Info className="h-4 w-4" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white">{activeHoveredItem.name}</span>
                        <span className={`font-semibold ${
                          activeHoveredItem.category === "sunk" ? "text-rose-400" : "text-teal-400"
                        }`}>
                          Impact Rating: {activeHoveredItem.impactScore}/10
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{activeHoveredItem.description}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    className="text-slate-400 flex items-center gap-2"
                  >
                    <Info className="h-4 w-4 text-teal-400" />
                    <span>Hover over any consultancy line item above to inspect detailed forensic and spatial descriptions.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* CONTRAST PANEL: OPTION 1 VS STRATEGIC REALITY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          {/* Card: Option 1 structural liability */}
          <div className="bg-[#0b1323] border border-rose-950/30 rounded-xl p-6 relative overflow-hidden shadow-xl">
            <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              Sunk Diagnostic Liabilities
            </h4>
            <ul className="space-y-3.5 text-xs text-slate-300 mt-4 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-rose-500 font-bold">1.</span>
                <span>
                  <strong>Structure Concrete Integrity (AED 80,000):</strong> Mandatory core testing to inspect chemical carbonation. This checks if the skeletal concrete is physically decaying. No value added, only maps existing lifespan.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-rose-500 font-bold">2.</span>
                <span>
                  <strong>Existing MEP Mapping (AED 100,000):</strong> Heavy forensic trace of services in floor slabs. 100% sunk cost as services are mostly rusted and decayed, requiring mapping just to trace pathways.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-rose-500 font-bold">3.</span>
                <span>
                  <strong>As-Built Redrafts (AED 80,000):</strong> Substantial engineering overhead spent just to create drawing documents that the building should already possess.
                </span>
              </li>
            </ul>
          </div>

          {/* Card: Option 2 modern design opportunities */}
          <div className="bg-[#0c1a22] border border-teal-950/30 rounded-xl p-6 relative overflow-hidden shadow-xl">
            <h4 className="text-sm font-bold text-teal-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-teal-400" />
              Value-Add Architectural Yield
            </h4>
            <ul className="space-y-3.5 text-xs text-slate-300 mt-4 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-teal-400 font-bold">1.</span>
                <span>
                  <strong>Detailed Design blue-prints (AED 135,000):</strong> High-yield architectural design of new, upgraded, functional layouts built to modern standards.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-400 font-bold">2.</span>
                <span>
                  <strong>Spatial Layout Re-Concept (AED 60,000):</strong> Fresh concepts mapping optimized commercial floor space, enhancing future rental yield possibilities.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-400 font-bold">3.</span>
                <span>
                  <strong>Interior Fit-Out Package (AED 80,000):</strong> Specifying modern finishes, styling, loose furniture, fixtures and hardware to appeal to high-tier commercial tenants.
                </span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
