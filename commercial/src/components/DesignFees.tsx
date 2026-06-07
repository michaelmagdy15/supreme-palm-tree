"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Sliders,
  Layers,
  FileText,
  CheckCircle,
  Info,
  TrendingUp,
  Coins,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  FileSpreadsheet
} from "lucide-react";

interface Phase {
  name: string;
  percentage: number;
  description: string;
  deliverables: string[];
  color: string;
  textColor: string;
  borderColor: string;
  glowColor: string;
  bgColor: string;
}

const phases: Phase[] = [
  {
    name: "Concept Design",
    percentage: 0.20,
    description: "Initial spatial layouts, site analysis, block/massing models, and aesthetic visioning boards.",
    deliverables: [
      "Site analysis & accessibility planning",
      "Massing studies & volumetric layout options",
      "Mood boards & material direction guidelines"
    ],
    color: "bg-teal-500",
    textColor: "text-teal-400",
    borderColor: "border-teal-500/20",
    glowColor: "shadow-teal-500/10",
    bgColor: "bg-teal-500/5"
  },
  {
    name: "Schematic Design",
    percentage: 0.30,
    description: "Refining approved concept into scale drawings, floor plans, elevations, sections, and preliminary structural/MEP layout.",
    deliverables: [
      "Scaled floor plans, elevations & building sections",
      "Photorealistic architectural 3D exterior/interior drafts",
      "Initial MEP load calculations & structural grid system"
    ],
    color: "bg-cyan-500",
    textColor: "text-cyan-400",
    borderColor: "border-cyan-500/20",
    glowColor: "shadow-cyan-500/10",
    bgColor: "bg-cyan-500/5"
  },
  {
    name: "Detailed Design",
    percentage: 0.45,
    description: "Comprehensive architectural specifications, millwork details, material schedules, and fully coordinated MEP & structural engineering blueprints.",
    deliverables: [
      "Execution architectural blueprints & millwork drawings",
      "Coordinated MEP, structural & civil construction sets",
      "Complete fixtures, fittings & equipment (FF&E) schedule"
    ],
    color: "bg-emerald-500",
    textColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    glowColor: "shadow-emerald-500/10",
    bgColor: "bg-emerald-500/5"
  },
  {
    name: "Tender Package",
    percentage: 0.05,
    description: "Bill of quantities, contract conditions, and detailed procurement specifications structured for general contractor bidding.",
    deliverables: [
      "Comprehensive Bill of Quantities (BOQ)",
      "Standard contract conditions & project bidding forms",
      "Pre-qualification guidelines & technical specifications"
    ],
    color: "bg-blue-500",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    glowColor: "shadow-blue-500/10",
    bgColor: "bg-blue-500/5"
  }
];

const PRESETS = [
  { label: "Boutique Retail / Fit-out", value: 150000 },
  { label: "Standard Commercial", value: 380000 },
  { label: "Premium Development", value: 550000 },
  { label: "Flagship Corporate Complex", value: 1200000 }
];

interface DesignFeesProps {
  totalFee: number;
  setTotalFee: React.Dispatch<React.SetStateAction<number>>;
}

export default function DesignFees({ totalFee, setTotalFee }: DesignFeesProps) {
  const [feeInput, setFeeInput] = useState<string>(totalFee.toLocaleString("en-US"));
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const triggerNotification = (text: string) => {
    setNotificationText(text);
    setShowNotification(true);
  };

  React.useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const copyCSVToClipboard = () => {
    const headers = ["#", "Phase", "Percentage", "Cost (AED)", "Description", "Key Deliverables"];
    const rowsCSV = phases.map((phase, idx) => [
      idx + 1,
      phase.name,
      `${phase.percentage * 100}%`,
      Math.round(totalFee * phase.percentage),
      phase.description,
      phase.deliverables.join("; ")
    ]);

    const csvContent = [
      headers.join(","),
      ...rowsCSV.map((row) => row.map((val) => `"${val}"`).join(","))
    ].join("\n");

    navigator.clipboard.writeText(csvContent);
    triggerNotification("Copied Option 2 Design Fees data as CSV to clipboard!");
  };

  // Sync feeInput when totalFee prop changes
  React.useEffect(() => {
    setFeeInput(totalFee.toLocaleString("en-US"));
  }, [totalFee]);

  // Load expandedPhase from localStorage on mount
  React.useEffect(() => {
    const savedExpanded = localStorage.getItem("commercial_design_expandedPhase");
    if (savedExpanded) {
      setExpandedPhase(savedExpanded === "null" ? null : parseInt(savedExpanded, 10));
    }
  }, []);

  // Save expandedPhase to localStorage on change
  React.useEffect(() => {
    localStorage.setItem("commercial_design_expandedPhase", expandedPhase === null ? "null" : expandedPhase.toString());
  }, [expandedPhase]);

  const formatAED = (value: number) => {
    return `AED ${value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    setFeeInput(rawVal);

    // Filter only digits
    const digitsOnly = rawVal.replace(/\D/g, "");
    const parsed = parseInt(digitsOnly, 10);

    if (!isNaN(parsed)) {
      // Impose a reasonable maximum of 100M to avoid UI overflows
      const clampedVal = Math.min(parsed, 100000000);
      setTotalFee(clampedVal);
    } else {
      setTotalFee(0);
    }
  };

  const handleBlur = () => {
    setFeeInput(totalFee.toLocaleString("en-US"));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10);
    setTotalFee(parsed);
    setFeeInput(parsed.toLocaleString("en-US"));
  };

  const handlePresetSelect = (value: number) => {
    setTotalFee(value);
    setFeeInput(value.toLocaleString("en-US"));
  };

  const togglePhase = (index: number) => {
    setExpandedPhase(expandedPhase === index ? null : index);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-1 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-[#0B1528] border border-teal-500/30 text-teal-300 px-5 py-3.5 rounded-lg shadow-xl shadow-black/40 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide">{notificationText}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outer Card Wrap with Glassmorphism */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-md shadow-2xl shadow-slate-950/50">
        
        {/* Soft Background Glow Effects */}
        <div className="absolute -top-40 -right-40 -z-10 h-80 w-80 rounded-full bg-teal-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 -z-10 h-80 w-80 rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

        {/* Header Block */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-slate-800/80 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-teal-400 font-semibold tracking-wider text-xs uppercase mb-1">
              <Coins className="h-4 w-4" />
              Financial Allocation Model
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
              Option 2: New Build Design Fees
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Interactive fee distribution mapping standard Royal Institute of British Architects (RIBA) equivalent design phases.
            </p>
          </div>
          
          <div className="flex items-center gap-3 self-start md:self-center mt-3 md:mt-0 no-print">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/40 border border-slate-800/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-slate-300">Live Calculations</span>
            </div>
            
            <button
              onClick={copyCSVToClipboard}
              className="bg-[#0B1528] hover:bg-slate-800 text-slate-300 border border-[#1E2E4F]/60 text-xs px-3.5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Copy Option 2 Design Fees data to clipboard as CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Inputs & Presets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Controls */}
          <div className="lg:col-span-2 flex flex-col gap-5 justify-center">
            <div>
              <label htmlFor="total-fee-input" className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                <Calculator className="h-4 w-4 text-teal-400" />
                Target Total Design Fee
              </label>
              
              <div className="relative rounded-lg shadow-sm print-input-wrapper">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-slate-400 font-medium text-sm">AED</span>
                </div>
                <input
                  type="text"
                  id="total-fee-input"
                  className="block w-full rounded-lg border border-slate-700 bg-slate-950/50 py-3 pl-12 pr-4 text-xl font-bold text-white placeholder-slate-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all"
                  value={feeInput}
                  onChange={handleTextChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 380,000"
                />
              </div>
            </div>

            {/* Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                  <Sliders className="h-3 w-3" /> Drag Slider
                </span>
                <span className="text-xs text-slate-400 font-semibold">{formatAED(totalFee)}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="5000"
                className="w-full h-1.5 rounded-lg bg-slate-800 appearance-none cursor-pointer accent-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={totalFee}
                onChange={handleSliderChange}
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-semibold">
                <span>AED 50,000</span>
                <span>AED 500,000</span>
                <span>AED 1,000,000</span>
                <span>AED 1,500,000</span>
                <span>AED 2,000,000</span>
              </div>
            </div>
          </div>

          {/* Quick Presets Sidepanel */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <LayoutGrid className="h-3.5 w-3.5 text-teal-400" />
                Benchmark Presets
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {PRESETS.map((preset) => {
                  const isSelected = totalFee === preset.value;
                  return (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => handlePresetSelect(preset.value)}
                      className={`text-left text-xs px-3 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer flex justify-between items-center ${
                        isSelected
                          ? "bg-teal-500/10 border-teal-500/40 text-teal-300 font-semibold"
                          : "bg-slate-900/40 border-slate-800/80 text-slate-400 hover:bg-slate-800/50 hover:text-white"
                      }`}
                    >
                      <span className="truncate max-w-[130px]">{preset.label}</span>
                      <span className={`${isSelected ? "text-teal-400" : "text-slate-500"} font-mono font-medium`}>
                        {formatAED(preset.value)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Progress Stacked Bar */}
        <div className="mb-8 bg-slate-950/40 rounded-xl border border-slate-800 p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-teal-400" />
              Proportional Budget Split
            </span>
            <span className="text-xs text-slate-400 font-medium">100% Consolidated</span>
          </div>
          
          <div className="h-4 w-full rounded-full bg-slate-800 flex overflow-hidden">
            {phases.map((phase) => {
              const widthPct = `${phase.percentage * 100}%`;
              return (
                <motion.div
                  key={phase.name}
                  style={{ width: widthPct }}
                  className={`${phase.color} h-full relative cursor-pointer group`}
                  layoutId={`progress-bar-${phase.name}`}
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, scaleY: 1.15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 border border-slate-800 text-[10px] text-white px-2 py-1 rounded shadow-lg whitespace-nowrap z-20 pointer-events-none">
                    <span className="font-semibold">{phase.name}</span>: {phase.percentage * 100}%
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="flex flex-wrap gap-4 mt-3 justify-center">
            {phases.map((phase) => (
              <div key={phase.name} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${phase.color}`} />
                <span className="text-xs text-slate-400">{phase.name}</span>
                <span className="text-xs font-mono font-semibold text-slate-300">({phase.percentage * 100}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Interactive Phase Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                <th className="py-3 px-4">Phase</th>
                <th className="py-3 px-4 text-center">Percentage</th>
                <th className="py-3 px-4 text-right">Cost in AED</th>
                <th className="py-3 px-4 w-12"></th>
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-slate-800/40"
            >
              {phases.map((phase, index) => {
                const phaseCost = totalFee * phase.percentage;
                const isExpanded = expandedPhase === index;
                
                return (
                  <React.Fragment key={phase.name}>
                    {/* Main Row */}
                    <motion.tr
                      variants={itemVariants}
                      onClick={() => togglePhase(index)}
                      className={`group hover:bg-slate-900/60 cursor-pointer transition-colors duration-150 ${
                        isExpanded ? "bg-slate-900/30" : ""
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-white group-hover:text-teal-400 transition-colors">
                            {phase.name}
                          </span>
                          <span className="text-xs text-slate-500 line-clamp-1 group-hover:text-slate-400 transition-colors">
                            {phase.description}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${phase.bgColor} ${phase.textColor} border ${phase.borderColor}`}>
                          {phase.percentage * 100}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <motion.span
                          key={phaseCost}
                          initial={{ scale: 0.95, opacity: 0.7 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className="font-mono text-sm font-bold text-white group-hover:text-emerald-400 transition-colors"
                        >
                          {formatAED(phaseCost)}
                        </motion.span>
                      </td>
                      <td className="py-4 px-4 text-center text-slate-500 hover:text-slate-300">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </td>
                    </motion.tr>

                    {/* Expandable Details Block */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <tr>
                          <td colSpan={4} className="p-0 border-none">
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden bg-slate-950/40 border-l-2 border-teal-500"
                            >
                              <div className="p-4 pl-6 flex flex-col md:flex-row gap-6 md:gap-12">
                                {/* Description */}
                                <div className="flex-1">
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                    <Info className="h-3 w-3 text-teal-400" />
                                    Phase Overview
                                  </h4>
                                  <p className="text-sm text-slate-300 leading-relaxed">
                                    {phase.description}
                                  </p>
                                </div>
                                
                                {/* Deliverables List */}
                                <div className="flex-1">
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <FileText className="h-3 w-3 text-teal-400" />
                                    Key Deliverables
                                  </h4>
                                  <ul className="space-y-1.5">
                                    {phase.deliverables.map((item) => (
                                      <li key={item} className="flex items-start gap-2 text-xs text-slate-300">
                                        <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })}
            </motion.tbody>
          </table>
        </div>

        {/* Footer Summary / Milestones */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-teal-500/80 shrink-0" />
            <span className="leading-relaxed">
              Payment should be done within 30 days of the submission of each stage's deliverables, and all payments are excluded from VAT.
            </span>
          </div>
          <div className="font-semibold text-slate-400 hover:text-teal-400 cursor-pointer select-none transition-colors">
            Terms & Conditions Apply
          </div>
        </div>
      </div>
    </div>
  );
}
