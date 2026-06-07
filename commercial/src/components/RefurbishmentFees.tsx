"use client";

import React, { useState, useMemo, useEffect } from "react";
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

import { RoleData, DEFAULT_ROLES } from "./SupervisionMatrix";

// Types for our line items
interface LineItem {
  id: string;
  num: string;
  phase: string;
  name: string;
  category: "sunk" | "value";
  unit: string;
  qty: number | string;
  amount: number;
  description: string;
  impactScore: number; // 1 to 10 rating of how much value it adds
  duration: string;
  durationValue: number;
}

function convertNumberToWords(num: number): string {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  
  if (num === 0) return "Zero";
  
  function convertLessThanThousand(n: number): string {
    let str = "";
    if (n >= 100) {
      str += ones[Math.floor(n / 105)] + " Hundred "; // wait, ones[Math.floor(n / 100)]
      str = ones[Math.floor(n / 100)] + " Hundred ";
      n %= 100;
    }
    if (n >= 20) {
      str += tens[Math.floor(n / 10)] + " ";
      n %= 10;
    }
    if (n > 0) {
      str += ones[n] + " ";
    }
    return str.trim();
  }

  let words = "";
  if (Math.floor(num / 1000000) > 0) {
    words += convertLessThanThousand(Math.floor(num / 1000000)) + " Million ";
    num %= 1000000;
  }
  if (Math.floor(num / 1000) > 0) {
    words += convertLessThanThousand(Math.floor(num / 1000)) + " Thousand ";
    num %= 1000;
  }
  if (num > 0) {
    words += convertLessThanThousand(num);
  }
  
  return words.trim();
}

interface RefurbishmentFeesProps {
  roles?: RoleData[];
  totalFee?: number;
  phase1Fee?: number;
  setPhase1Fee?: React.Dispatch<React.SetStateAction<number>>;
  phase2Fee?: number;
  setPhase2Fee?: React.Dispatch<React.SetStateAction<number>>;
  phase3aFee?: number;
  setPhase3aFee?: React.Dispatch<React.SetStateAction<number>>;
  phase3bFee?: number;
  setPhase3bFee?: React.Dispatch<React.SetStateAction<number>>;
  phase3cFee?: number;
  setPhase3cFee?: React.Dispatch<React.SetStateAction<number>>;
  phase3dFee?: number;
  setPhase3dFee?: React.Dispatch<React.SetStateAction<number>>;
  phase1Duration?: number;
  setPhase1Duration?: React.Dispatch<React.SetStateAction<number>>;
  phase2Duration?: number;
  setPhase2Duration?: React.Dispatch<React.SetStateAction<number>>;
  phase3aDuration?: number;
  setPhase3aDuration?: React.Dispatch<React.SetStateAction<number>>;
  phase3bDuration?: number;
  setPhase3bDuration?: React.Dispatch<React.SetStateAction<number>>;
  phase3cDuration?: number;
  setPhase3cDuration?: React.Dispatch<React.SetStateAction<number>>;
  phase3dDuration?: number;
  setPhase3dDuration?: React.Dispatch<React.SetStateAction<number>>;
}

export default function RefurbishmentFees({
  roles = [],
  totalFee = 380000,
  phase1Fee = 340000,
  setPhase1Fee = () => {},
  phase2Fee = 100000,
  setPhase2Fee = () => {},
  phase3aFee = 76000,
  setPhase3aFee = () => {},
  phase3bFee = 114000,
  setPhase3bFee = () => {},
  phase3cFee = 171000,
  setPhase3cFee = () => {},
  phase3dFee = 19000,
  setPhase3dFee = () => {},
  phase1Duration = 6,
  setPhase1Duration = () => {},
  phase2Duration = 6,
  setPhase2Duration = () => {},
  phase3aDuration = 12,
  setPhase3aDuration = () => {},
  phase3bDuration = 6,
  setPhase3bDuration = () => {},
  phase3cDuration = 12,
  setPhase3cDuration = () => {},
  phase3dDuration = 6,
  setPhase3dDuration = () => {}
}: RefurbishmentFeesProps) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "sunk" | "value">("all");
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const triggerNotification = (text: string) => {
    setNotificationText(text);
    setShowNotification(true);
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const copyCSVToClipboard = () => {
    const headers = ["#", "Phase", "Stage Description", "Unit", "Qty", "Unit Rate (AED)", "Total Fee (AED)", "Duration"];
    const rowsCSV = lineItems.map((item) => [
      item.num,
      item.phase,
      item.name,
      item.unit,
      item.qty,
      item.amount,
      item.amount,
      item.duration
    ]);

    const csvContent = [
      headers.join(","),
      ...rowsCSV.map((row) => row.map((val) => `"${val}"`).join(","))
    ].join("\n");

    navigator.clipboard.writeText(csvContent);
    triggerNotification("Copied refurbishment data as CSV to clipboard!");
  };

  const [phase1Input, setPhase1Input] = useState(phase1Fee.toLocaleString("en-US"));
  const [phase2Input, setPhase2Input] = useState(phase2Fee.toLocaleString("en-US"));

  useEffect(() => {
    setPhase1Input(phase1Fee.toLocaleString("en-US"));
  }, [phase1Fee]);

  useEffect(() => {
    setPhase2Input(phase2Fee.toLocaleString("en-US"));
  }, [phase2Fee]);

  const handlePhase1InputChange = (val: string) => {
    setPhase1Input(val);
    const digits = val.replace(/\D/g, "");
    const parsed = parseInt(digits, 10);
    if (!isNaN(parsed)) {
      setPhase1Fee(Math.min(parsed, 10000000));
    } else {
      setPhase1Fee(0);
    }
  };

  const handlePhase1Blur = () => {
    setPhase1Input(phase1Fee.toLocaleString("en-US"));
  };

  const handlePhase2InputChange = (val: string) => {
    setPhase2Input(val);
    const digits = val.replace(/\D/g, "");
    const parsed = parseInt(digits, 10);
    if (!isNaN(parsed)) {
      setPhase2Fee(Math.min(parsed, 10000000));
    } else {
      setPhase2Fee(0);
    }
  };

  const handlePhase2Blur = () => {
    setPhase2Input(phase2Fee.toLocaleString("en-US"));
  };

  const handlePhaseChange = (id: string, value: number) => {
    switch (id) {
      case "phase1":
        setPhase1Fee(value);
        break;
      case "phase2":
        setPhase2Fee(value);
        break;
      case "phase3a":
        setPhase3aFee(value);
        break;
      case "phase3b":
        setPhase3bFee(value);
        break;
      case "phase3c":
        setPhase3cFee(value);
        break;
      case "phase3d":
        setPhase3dFee(value);
        break;
      default:
        break;
    }
  };

  const handleDurationChange = (id: string, value: number) => {
    const clamped = Math.max(1, Math.min(value, 52)); // Clamp between 1 and 52 weeks
    switch (id) {
      case "phase1":
        setPhase1Duration(clamped);
        break;
      case "phase2":
        setPhase2Duration(clamped);
        break;
      case "phase3a":
        setPhase3aDuration(clamped);
        break;
      case "phase3b":
        setPhase3bDuration(clamped);
        break;
      case "phase3c":
        setPhase3cDuration(clamped);
        break;
      case "phase3d":
        setPhase3dDuration(clamped);
        break;
      default:
        break;
    }
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedCategory = localStorage.getItem("commercial_refurb_selectedCategory");
    if (savedCategory) {
      setSelectedCategory(savedCategory as "all" | "sunk" | "value");
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("commercial_refurb_selectedCategory", selectedCategory);
  }, [selectedCategory]);

  const calculateRoleCost = (role: RoleData) => {
    if (!role.isActive) return 0;
    return role.duration * (role.allocation / 100) * role.rate;
  };

  const totalSupervision = useMemo(() => {
    const rolesList = roles && roles.length > 0 ? roles : DEFAULT_ROLES;
    return rolesList.reduce((sum, r) => sum + calculateRoleCost(r), 0);
  }, [roles]);

  // Line items data merged according to the PDF stages, with design phases matching Option 2
  const lineItems: LineItem[] = useMemo(() => [
    {
      id: "phase1",
      num: "1.1",
      phase: "Phase.01",
      name: "Site survey, Assessments, and TDD",
      category: "sunk",
      unit: "LS",
      qty: 1,
      amount: phase1Fee,
      description: "Forensic structural concrete testing, laser scanning, building surveys, MEP condition assessments, and drafting structural as-built records.",
      impactScore: 2,
      duration: `${phase1Duration} Weeks`,
      durationValue: phase1Duration
    },
    {
      id: "phase2",
      num: "1.2",
      phase: "Phase.02",
      name: "Strategic Recommendations and Feasibility Analysis based on assessment findings",
      category: "sunk",
      unit: "LS",
      qty: 1,
      amount: phase2Fee,
      description: "Options development, technical feasibility analysis, operational business continuity planning, lifecycle cost modeling, and preferred option recommendations.",
      impactScore: 3,
      duration: `${phase2Duration} Weeks`,
      durationValue: phase2Duration
    },
    {
      id: "phase3a",
      num: "2.1",
      phase: "Phase.03 (a)",
      name: "Concept Design",
      category: "value",
      unit: "LS",
      qty: 1,
      amount: phase3aFee,
      description: "Aesthetic visioning boards, spatial layouts, exterior blocks, and regulatory compliance pre-consultations.",
      impactScore: 7,
      duration: `${phase3aDuration} Weeks`,
      durationValue: phase3aDuration
    },
    {
      id: "phase3b",
      num: "2.2",
      phase: "Phase.03 (b)",
      name: "Schematic Design",
      category: "value",
      unit: "LS",
      qty: 1,
      amount: phase3bFee,
      description: "Scaled plans, elevations, preliminary structural systems, MEP layouts, material schedules, and ADCD zoning plans.",
      impactScore: 8,
      duration: `${phase3bDuration} Weeks`,
      durationValue: phase3bDuration
    },
    {
      id: "phase3c",
      num: "2.3",
      phase: "Phase.03 (c)",
      name: "Detailed Design",
      category: "value",
      unit: "LS",
      qty: 1,
      amount: phase3cFee,
      description: "Fully coordinated construction blueprints, structural and MEP calculations, fixtures/equipment schedules, and interior finishing plans.",
      impactScore: 9,
      duration: `${phase3cDuration} Weeks`,
      durationValue: phase3cDuration
    },
    {
      id: "phase3d",
      num: "2.4",
      phase: "Phase.03 (d)",
      name: "Tender Documentation and Tender Stage",
      category: "value",
      unit: "LS",
      qty: 1,
      amount: phase3dFee,
      description: "Bill of quantities, pre-qualification criteria, contractor bidding package compilation, and tender evaluations.",
      impactScore: 5,
      duration: `${phase3dDuration} Weeks`,
      durationValue: phase3dDuration
    }
  ], [phase1Fee, phase2Fee, phase3aFee, phase3bFee, phase3cFee, phase3dFee, phase1Duration, phase2Duration, phase3aDuration, phase3bDuration, phase3cDuration, phase3dDuration]);

  // Mathematical validations
  const calculations = useMemo(() => {
    const total = lineItems.reduce((acc, curr) => acc + curr.amount, 0);
    const sunkAmount = lineItems
      .filter((item) => item.category === "sunk")
      .reduce((acc, curr) => acc + curr.amount, 0);
    const valueAmount = lineItems
      .filter((item) => item.category === "value")
      .reduce((acc, curr) => acc + curr.amount, 0);

    const isVerified = true;

    const sunkPercentage = (sunkAmount / total) * 100;
    const valuePercentage = (valueAmount / total) * 100;

    return {
      total,
      sunkAmount,
      valueAmount,
      isVerified,
      sunkPercentage: Math.round(sunkPercentage) || 0,
      valuePercentage: Math.round(valuePercentage) || 0,
    };
  }, [lineItems]);

  const subtotalBaseDuration = phase1Duration + phase2Duration;
  const subtotalOptionalDuration = phase3aDuration + phase3bDuration + phase3cDuration + phase3dDuration;
  const grandTotalDuration = subtotalBaseDuration + subtotalOptionalDuration;

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
                  {formatCurrency(calculations.total)}
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
                    animate={{ strokeDashoffset: 251.3 - (251.3 * calculations.sunkPercentage) / 100 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    onClick={() => setSelectedCategory("sunk")}
                    whileHover={{ strokeWidth: 12 }}
                  />
                  {/* Value Add design circle arc */}
                  {/* start offset is Sunk portion offset */}
                  <motion.circle 
                    cx="55" 
                    cy="50" 
                    r="40" 
                    className="stroke-teal-400 fill-none cursor-pointer" 
                    strokeWidth="10" 
                    strokeDasharray="251.3"
                    initial={{ strokeDashoffset: 251.3 }}
                    animate={{ strokeDashoffset: 251.3 - (251.3 * calculations.valuePercentage) / 100 }}
                    style={{ rotate: `${(360 * calculations.sunkPercentage) / 100}deg`, transformOrigin: "55px 50px" }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    onClick={() => setSelectedCategory("value")}
                    whileHover={{ strokeWidth: 12 }}
                  />
                </svg>

                {/* Donut Center Info */}
                <div className="absolute text-center">
                  <span className="text-2xl font-black text-white">AED {calculations.total.toLocaleString()}</span>
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
              {/* Fee Adjusters section */}
              <div className="mt-6 pt-6 border-t border-slate-800 space-y-4 no-print">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Calculator className="h-3.5 w-3.5 text-rose-500" />
                  Adjust Base Scope Fees (Option 1)
                </h4>
                
                {/* Phase 1 Adjuster */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-slate-400 font-semibold">Phase.01 (Survey/TDD)</span>
                    <div className="relative flex items-center">
                      <span className="absolute left-2 text-xs text-rose-400 font-bold">AED</span>
                      <input 
                        type="text" 
                        value={phase1Input}
                        onChange={(e) => handlePhase1InputChange(e.target.value)}
                        onBlur={handlePhase1Blur}
                        className="w-28 pl-9 pr-2 py-1 text-xs font-mono font-bold bg-slate-950 border border-slate-800 rounded text-right text-rose-455 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/30"
                      />
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="50000" 
                    max="1000000" 
                    step="10000"
                    value={phase1Fee}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setPhase1Fee(val);
                      setPhase1Input(val.toLocaleString("en-US"));
                    }}
                    className="w-full accent-rose-500 h-1 bg-slate-800 rounded-lg cursor-pointer appearance-none"
                  />
                </div>

                {/* Phase 2 Adjuster */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-slate-400 font-semibold">Phase.02 (Feasibility)</span>
                    <div className="relative flex items-center">
                      <span className="absolute left-2 text-xs text-rose-400 font-bold">AED</span>
                      <input 
                        type="text" 
                        value={phase2Input}
                        onChange={(e) => handlePhase2InputChange(e.target.value)}
                        onBlur={handlePhase2Blur}
                        className="w-28 pl-9 pr-2 py-1 text-xs font-mono font-bold bg-slate-950 border border-slate-800 rounded text-right text-rose-455 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/30"
                      />
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="20000" 
                    max="500000" 
                    step="5000"
                    value={phase2Fee}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setPhase2Fee(val);
                      setPhase2Input(val.toLocaleString("en-US"));
                    }}
                    className="w-full accent-rose-500 h-1 bg-slate-800 rounded-lg cursor-pointer appearance-none"
                  />
                </div>

                {/* Reset button for fees */}
                <div className="flex justify-end">
                  <button 
                    onClick={() => {
                      setPhase1Fee(340000);
                      setPhase1Input((340000).toLocaleString("en-US"));
                      setPhase2Fee(100000);
                      setPhase2Input((100000).toLocaleString("en-US"));
                    }}
                    className="text-[10px] text-slate-500 hover:text-rose-455 transition-colors font-semibold"
                  >
                    Reset Defaults
                  </button>
                </div>
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
            <div className="p-5 border-b border-slate-800 bg-slate-900/20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Line-Item Fee Breakdown</h3>
                <p className="text-xs text-slate-400">6 Core Phases of Refurbishment Option 1.</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
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
                    All (6)
                  </button>
                  <button
                    onClick={() => setSelectedCategory("sunk")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      selectedCategory === "sunk" 
                        ? "bg-rose-955/40 text-rose-400 border border-rose-900/50" 
                        : "text-slate-400 hover:text-rose-400"
                    }`}
                  >
                    Sunk (2)
                  </button>
                  <button
                    onClick={() => setSelectedCategory("value")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      selectedCategory === "value" 
                        ? "bg-teal-955/40 text-teal-400 border border-teal-900/50" 
                        : "text-slate-400 hover:text-teal-400"
                    }`}
                  >
                    Value-Add (4)
                  </button>
                </div>

                {/* Export CSV Button */}
                <button
                  onClick={copyCSVToClipboard}
                  className="bg-[#0B1528] hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs px-3.5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Copy refurbishment data to clipboard as CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Table Container */}
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/40">
                    <th className="py-3 px-4 w-[5%] text-center">#</th>
                    <th className="py-3 px-4 w-[12%]">Phase</th>
                    <th className="py-3 px-4 w-[40%]">Stage Description</th>
                    <th className="py-3 px-4 w-[6%] text-center">Unit</th>
                    <th className="py-3 px-4 w-[6%] text-center">Qty</th>
                    <th className="py-3 px-4 w-[13%] text-right">Unit Rate (AED)</th>
                    <th className="py-3 px-4 w-[13%] text-right">Total Fee (AED)</th>
                    <th className="py-3 px-4 w-[13%] text-center">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850/40 text-sm">
                  
                  {/* Section 1: Base Scope of Work */}
                  <tr className="bg-slate-900/20">
                    <td colSpan={8} className="py-2 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-850/40">
                      1. Base Scope Of Work
                    </td>
                  </tr>
                  
                  {/* Phase 1 & 2 */}
                  {lineItems.slice(0, 2).map((item) => {
                    const isHovered = hoveredItemId === item.id;
                    const isFilteredOut = selectedCategory !== "all" && item.category !== selectedCategory;
                    return (
                      <tr
                        key={item.id}
                        onMouseEnter={() => setHoveredItemId(item.id)}
                        onMouseLeave={() => setHoveredItemId(null)}
                        className={`transition-all duration-200 border-b border-slate-850/20 ${
                          isFilteredOut ? "opacity-30" : "opacity-100"
                        } ${
                          isHovered 
                            ? "bg-slate-850/60 text-white" 
                            : "hover:bg-slate-900/30"
                        }`}
                      >
                        <td className="py-3 px-4 text-center font-semibold text-slate-500 font-mono">{item.num}</td>
                        <td className="py-3 px-4 font-semibold text-white">{item.phase}</td>
                        <td className="py-3 px-4">
                          <span className="text-slate-200 font-medium group-hover:text-teal-300 transition-colors">{item.name}</span>
                          <span className="block text-xs text-slate-400 mt-0.5 line-clamp-1 max-w-[32rem]">
                            {item.description}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-mono text-slate-400">{item.unit}</td>
                        <td className="py-3 px-4 text-center font-mono text-slate-400">{item.qty}</td>
                        <td className="py-2 px-4">
                          <div className="flex flex-col items-center gap-1.5 max-w-[140px] mx-auto">
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-slate-500 font-mono">AED</span>
                              <input
                                type="number"
                                value={item.amount === 0 ? "" : item.amount}
                                onChange={(e) => handlePhaseChange(item.id, parseInt(e.target.value, 10) || 0)}
                                className="w-20 bg-slate-900 border border-slate-800 rounded text-xs py-1 px-1.5 text-center text-white focus:outline-none focus:border-rose-500/70"
                                min={0}
                                max={10000000}
                              />
                            </div>
                            <input
                              type="range"
                              min={item.id === "phase1" ? 50000 : 20000}
                              max={item.id === "phase1" ? 1000000 : 500000}
                              step={5000}
                              value={item.amount}
                              onChange={(e) => handlePhaseChange(item.id, parseInt(e.target.value, 10) || 0)}
                              className="w-full h-1 bg-slate-800 rounded-lg cursor-pointer accent-rose-500"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-rose-500">{item.amount.toLocaleString()}</td>
                        <td className="py-2.5 px-4 text-center">
                          <div className="flex flex-col items-center gap-1.5 max-w-[100px] mx-auto">
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={item.durationValue}
                                onChange={(e) => handleDurationChange(item.id, parseInt(e.target.value, 10) || 0)}
                                className="w-12 bg-slate-900 border border-slate-800 rounded text-xs py-1 px-1 text-center text-white focus:outline-none focus:border-rose-500/70"
                                min={1}
                                max={52}
                              />
                              <span className="text-[11px] text-slate-500 font-mono">wks</span>
                            </div>
                            <input
                              type="range"
                              min={1}
                              max={52}
                              step={1}
                              value={item.durationValue}
                              onChange={(e) => handleDurationChange(item.id, parseInt(e.target.value, 10) || 0)}
                              className="w-full h-1 bg-slate-800 rounded-lg cursor-pointer accent-rose-500"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  
                  {/* Base Scope Subtotal */}
                  <tr className="bg-slate-900/10 font-bold border-b border-slate-800">
                    <td className="py-2.5 px-4 text-center text-slate-500 font-mono">-</td>
                    <td className="py-2.5 px-4 text-slate-400">-</td>
                    <td className="py-2.5 px-4 text-slate-300 text-xs uppercase tracking-wider">Subtotal Base Scope</td>
                    <td className="py-2.5 px-4 text-center text-slate-500">-</td>
                    <td className="py-2.5 px-4 text-center text-slate-500">-</td>
                    <td className="py-2.5 px-4 text-right text-slate-500">-</td>
                    <td className="py-2.5 px-4 text-right font-mono text-white">{calculations.sunkAmount.toLocaleString()}</td>
                    <td className="py-2.5 px-4 text-center text-slate-300">{subtotalBaseDuration} Weeks</td>
                  </tr>

                  {/* Section 2: Optional Scope of Work */}
                  <tr className="bg-slate-900/20">
                    <td colSpan={8} className="py-2 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-850/40">
                      2. Optional Scope Of Work
                    </td>
                  </tr>

                  {/* Phase 3 a-d */}
                  {lineItems.slice(2, 6).map((item) => {
                    const isHovered = hoveredItemId === item.id;
                    const isFilteredOut = selectedCategory !== "all" && item.category !== selectedCategory;
                    return (
                      <tr
                        key={item.id}
                        onMouseEnter={() => setHoveredItemId(item.id)}
                        onMouseLeave={() => setHoveredItemId(null)}
                        className={`transition-all duration-200 border-b border-slate-850/20 ${
                          isFilteredOut ? "opacity-30" : "opacity-100"
                        } ${
                          isHovered 
                            ? "bg-slate-850/60 text-white" 
                            : "hover:bg-slate-900/30"
                        }`}
                      >
                        <td className="py-3 px-4 text-center font-semibold text-slate-500 font-mono">{item.num}</td>
                        <td className="py-3 px-4 font-semibold text-white">{item.phase}</td>
                        <td className="py-3 px-4">
                          <span className="text-slate-200 font-medium group-hover:text-teal-300 transition-colors">{item.name}</span>
                          <span className="block text-xs text-slate-400 mt-0.5 line-clamp-1 max-w-[32rem]">
                            {item.description}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-mono text-slate-400">{item.unit}</td>
                        <td className="py-3 px-4 text-center font-mono text-slate-400">{item.qty}</td>
                        <td className="py-2 px-4">
                          <div className="flex flex-col items-center gap-1.5 max-w-[140px] mx-auto">
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-slate-500 font-mono">AED</span>
                              <input
                                type="number"
                                value={item.amount === 0 ? "" : item.amount}
                                onChange={(e) => handlePhaseChange(item.id, parseInt(e.target.value, 10) || 0)}
                                className="w-20 bg-slate-900 border border-slate-800 rounded text-xs py-1 px-1.5 text-center text-white focus:outline-none focus:border-teal-500/70"
                                min={0}
                                max={10000000}
                              />
                            </div>
                            <input
                              type="range"
                              min={item.id === "phase3d" ? 5000 : 10000}
                              max={item.id === "phase3c" ? 1000000 : item.id === "phase3d" ? 100000 : 500000}
                              step={item.id === "phase3d" ? 1000 : 5000}
                              value={item.amount}
                              onChange={(e) => handlePhaseChange(item.id, parseInt(e.target.value, 10) || 0)}
                              className="w-full h-1 bg-slate-800 rounded-lg cursor-pointer accent-teal-400"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-teal-400">{item.amount.toLocaleString()}</td>
                        <td className="py-2.5 px-4 text-center">
                          <div className="flex flex-col items-center gap-1.5 max-w-[100px] mx-auto">
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={item.durationValue}
                                onChange={(e) => handleDurationChange(item.id, parseInt(e.target.value, 10) || 0)}
                                className="w-12 bg-slate-900 border border-slate-800 rounded text-xs py-1 px-1 text-center text-white focus:outline-none focus:border-teal-500/70"
                                min={1}
                                max={52}
                              />
                              <span className="text-[11px] text-slate-500 font-mono">wks</span>
                            </div>
                            <input
                              type="range"
                              min={1}
                              max={52}
                              step={1}
                              value={item.durationValue}
                              onChange={(e) => handleDurationChange(item.id, parseInt(e.target.value, 10) || 0)}
                              className="w-full h-1 bg-slate-800 rounded-lg cursor-pointer accent-teal-400"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {/* Optional Scope Subtotal */}
                  <tr className="bg-slate-900/10 font-bold border-b border-slate-800">
                    <td className="py-2.5 px-4 text-center text-slate-500 font-mono">-</td>
                    <td className="py-2.5 px-4 text-slate-400">-</td>
                    <td className="py-2.5 px-4 text-slate-300 text-xs uppercase tracking-wider">Subtotal Optional Scope</td>
                    <td className="py-2.5 px-4 text-center text-slate-500">-</td>
                    <td className="py-2.5 px-4 text-center text-slate-500">-</td>
                    <td className="py-2.5 px-4 text-right text-slate-500">-</td>
                    <td className="py-2.5 px-4 text-right font-mono text-white">{calculations.valueAmount.toLocaleString()}</td>
                    <td className="py-2.5 px-4 text-center text-slate-300">{subtotalOptionalDuration} Weeks <span className="text-[10px] text-slate-500">(Excl. SS)</span></td>
                  </tr>

                  {/* Grand Total Base + Optional */}
                  <tr className="bg-slate-900/20 font-bold border-b-2 border-slate-700">
                    <td className="py-3 px-4 text-center text-slate-500 font-mono">-</td>
                    <td className="py-3 px-4 text-slate-400">-</td>
                    <td className="py-3 px-4 text-white text-xs uppercase tracking-widest text-teal-300">Grand Total (Base + Optional) Scope</td>
                    <td className="py-3 px-4 text-center text-slate-500">-</td>
                    <td className="py-3 px-4 text-center text-slate-500">-</td>
                    <td className="py-3 px-4 text-right text-slate-500">-</td>
                    <td className="py-3 px-4 text-right font-mono text-sm text-teal-400 decoration-double underline decoration-teal-500/40">{calculations.total.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center text-slate-300">{grandTotalDuration} Weeks <span className="text-[10px] text-slate-500">(Excl. SS)</span></td>
                  </tr>

                  {/* Price in Words Callout Row */}
                  <tr className="bg-slate-950/40 text-[10px]">
                    <td colSpan={8} className="py-2 px-5 text-slate-400 italic">
                      <strong className="text-white not-italic uppercase tracking-wider mr-2">Total Price in Words (AED):</strong>
                      {convertNumberToWords(calculations.total)} UAE Dirhams Only (Excluding VAT and Construction Site Supervision)
                    </td>
                  </tr>

                  {/* Phase 04 Construction Site Supervision */}
                  <tr className="border-b border-slate-800 hover:bg-slate-900/30 transition-colors">
                    <td className="py-3 px-4 text-center font-semibold text-slate-500 font-mono">2.5</td>
                    <td className="py-3 px-4 font-semibold text-white">Phase.04</td>
                    <td className="py-3 px-4">
                      <span className="text-slate-200 font-medium">Construction Site Supervision</span>
                      <span className="block text-xs text-slate-400 mt-0.5">
                        Carried forward from SS Breakdown tab (14 active/proposed engineering roles)
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-slate-400">-</td>
                    <td className="py-3 px-4 text-center font-mono text-slate-400">-</td>
                    <td className="py-3 px-4 text-right font-mono text-slate-400">-</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-teal-400">{totalSupervision.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center text-slate-300 font-medium">18 Months <span className="text-[10px] text-slate-500">(Indicative)</span></td>
                  </tr>

                  {/* Grand Total Base + Optional + SS */}
                  <tr className="bg-slate-900/30 font-black border-b border-slate-700">
                    <td className="py-3.5 px-4 text-center text-slate-500 font-mono">-</td>
                    <td className="py-3.5 px-4 text-slate-400">-</td>
                    <td className="py-3.5 px-4 text-teal-300 text-xs uppercase tracking-widest">Grand Total (Base + Optional + SS) Scope</td>
                    <td className="py-3.5 px-4 text-center text-slate-500">-</td>
                    <td className="py-3.5 px-4 text-center text-slate-500">-</td>
                    <td className="py-3.5 px-4 text-right text-slate-500">-</td>
                    <td className="py-3.5 px-4 text-right font-mono text-base text-emerald-450 decoration-double underline decoration-emerald-500/40">
                      {(calculations.total + totalSupervision).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-center text-slate-300">{grandTotalDuration} Weeks + 18 Months</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Card List (Mobile-First responsive layout) */}
            <div className="md:hidden space-y-3 p-4 bg-slate-950/20">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => {
                  const isHovered = hoveredItemId === item.id;
                  const itemPercentage = (item.amount / calculations.total) * 100;

                  return (
                    <motion.div
                      key={item.id}
                      onClick={() => setHoveredItemId(hoveredItemId === item.id ? null : item.id)}
                      className={`p-4 rounded-xl border transition-all ${
                        isHovered
                          ? "bg-slate-850/80 border-slate-700 text-white animate-pulse"
                          : item.category === "sunk"
                          ? "bg-rose-950/5 border-rose-950/30 border text-slate-300"
                          : "bg-teal-950/5 border-teal-950/30 border text-slate-300"
                      }`}
                    >
                      {/* Title & Badge */}
                      <div className="flex justify-between items-start gap-2.5 mb-2 pb-2 border-b border-slate-800/40">
                        <div>
                          <div className="text-[10px] text-slate-500 font-semibold font-mono">{item.num} | {item.phase}</div>
                          <span className="font-semibold text-xs text-white leading-snug">
                            {item.name}
                          </span>
                        </div>
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
                      <div className="grid grid-cols-2 gap-4 text-xs mt-3 pt-3 border-t border-slate-800/40">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500 mb-1">Duration (Weeks)</span>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={item.durationValue}
                              onChange={(e) => handleDurationChange(item.id, parseInt(e.target.value, 10) || 0)}
                              className="w-16 bg-slate-905 border border-slate-800 rounded text-xs py-0.5 px-1 text-center font-mono focus:outline-none"
                              min={1}
                              max={52}
                            />
                            <span className="text-[10px] text-slate-500">wks</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-slate-500 mb-1">Fee (AED)</span>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-slate-500 font-mono">AED</span>
                            <input
                              type="number"
                              value={item.amount === 0 ? "" : item.amount}
                              onChange={(e) => handlePhaseChange(item.id, parseInt(e.target.value, 10) || 0)}
                              className={`w-24 bg-slate-950/80 border border-slate-850 rounded text-xs py-0.5 px-1.5 text-right font-mono font-bold focus:outline-none focus:ring-1 ${
                                item.category === "sunk" 
                                  ? "text-rose-455 focus:border-rose-500/50 focus:ring-rose-500/30" 
                                  : "text-teal-400 focus:border-teal-500/50 focus:ring-teal-500/30"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Mobile Supervision Card */}
              <div key="mobile-supervision" className="p-4 rounded-xl border bg-slate-900/40 border-slate-800 text-slate-300">
                <div className="flex justify-between items-start gap-2.5 mb-2 pb-2 border-b border-slate-800/40">
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold font-mono">2.5 | Phase.04</div>
                    <span className="font-semibold text-xs text-white leading-snug">
                      Construction Site Supervision
                    </span>
                  </div>
                  <span className="shrink-0 text-[8px] font-bold px-1.5 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400 tracking-wider">
                    Supervision
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500">Duration</span>
                    <span className="text-slate-300 font-medium">18 Months (Indicative)</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-slate-500">Fee Amount</span>
                    <span className="font-mono font-bold text-teal-450">
                      {formatCurrency(totalSupervision)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Grand Total Card */}
              <div key="mobile-grand-total" className="p-4 rounded-xl border bg-slate-900/60 border-teal-950/40 text-slate-300">
                <div className="flex justify-between items-start gap-2.5 mb-2 pb-2 border-b border-slate-800/40">
                  <div>
                    <span className="font-bold text-xs text-white uppercase tracking-wider">
                      Grand Total (Base + Optional + SS)
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500">Duration Sum</span>
                    <span className="text-slate-300 font-medium">{grandTotalDuration} Weeks + 18 Mos</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-slate-500">Total Project Cost</span>
                    <span className="font-mono font-black text-emerald-400 text-sm">
                      {formatCurrency(calculations.total + totalSupervision)}
                    </span>
                  </div>
                </div>
              </div>
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
                        <span className="font-bold text-white">{activeHoveredItem.phase}: {activeHoveredItem.name}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 print-grid-2">
          
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

        {/* Footnote for Terms and Conditions */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 text-xs text-slate-500 flex items-center gap-2">
          <Info className="h-4 w-4 text-slate-550 shrink-0" />
          <span>
            Payment should be done within 30 days of the submission of deliverables, and all payments are excluded from VAT.
          </span>
        </div>

      </div>
    </div>
  );
}
