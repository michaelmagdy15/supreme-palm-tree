"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  HelpCircle,
  TrendingUp,
  Clock,
  Percent,
  Coins,
  ShieldCheck,
  Building,
  Wrench,
  Users,
  Compass,
  FileText,
  ShieldAlert,
  Leaf,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Copy,
  Info,
  DollarSign
} from "lucide-react";

// Types
export interface RoleData {
  id: string;
  name: string;
  category: "technical" | "support" | "optional";
  duration: number; // months
  allocation: number; // percentage (0 - 100)
  rate: number; // AED monthly rate
  description: string;
  tooltip: string;
  isActive: boolean; // For optional toggle
}

export const DEFAULT_ROLES: RoleData[] = [
  {
    id: "pm",
    name: "Project Manager (Engr. Galal Sakran)",
    category: "technical",
    duration: 18,
    allocation: 100,
    rate: 36000,
    description: "Lead Project Manager responsible for overall contract execution, client liaison, and site management.",
    tooltip: "Full-time project management resource deployed for the entire 18 months supervision phase.",
    isActive: true
  },
  {
    id: "re",
    name: "Resident Engineer / Structural Engr (Engr. Ahmed Awad)",
    category: "technical",
    duration: 18,
    allocation: 10,
    rate: 32000,
    description: "Resident Engineer and Structural Engineer supervising general engineering quality and structural execution.",
    tooltip: "Part-time structural monitoring (10% allocation) throughout the 18 months timeline.",
    isActive: true
  },
  {
    id: "arch",
    name: "Architect / ID Engineer (Engr. Mohamed Al Mahdy)",
    category: "technical",
    duration: 18,
    allocation: 10,
    rate: 28000,
    description: "Architectural & Interior Design Supervisor reviewing fit-outs, spatial integration, and finishing quality.",
    tooltip: "Supervision support (10% allocation) aligned with finishing works.",
    isActive: true
  },
  {
    id: "me",
    name: "Mechanical Engineer (Engr. Lolla Kumar)",
    category: "technical",
    duration: 18,
    allocation: 10,
    rate: 30000,
    description: "Mechanical systems supervisor overseeing HVAC installation, firefighting, drainage, and plumbing works.",
    tooltip: "Mechanical systems engineering audit (10% allocation) across the project duration.",
    isActive: true
  },
  {
    id: "ee",
    name: "Electrical Engineer (Engr. Rafik Nabil)",
    category: "technical",
    duration: 18,
    allocation: 10,
    rate: 30000,
    description: "Electrical engineer supervising MV/LV networks, power generation, cabling, and safety systems.",
    tooltip: "Electrical safety and cabling auditing (10% allocation) for 18 months.",
    isActive: true
  },
  {
    id: "elv",
    name: "ELV Engineer (Engr. Ahamed Safiq)",
    category: "technical",
    duration: 18,
    allocation: 10,
    rate: 30000,
    description: "Extra-Low Voltage Engineer supervising telecom, surveillance (CCTV), access control, and smart building networks.",
    tooltip: "ELV and IT infrastructure supervision (10% allocation) for 18 months.",
    isActive: true
  },
  {
    id: "sust",
    name: "Sustainability Engineer (Engr. Elmorsi Elbarky)",
    category: "optional",
    duration: 18,
    allocation: 10,
    rate: 22000,
    description: "Estidama Pearl Qualified Professional / Sustainability Engineer overseeing green ratings and energy compliance.",
    tooltip: "Toggled role for green building Estidama certification compliance (10% allocation).",
    isActive: true
  },
  {
    id: "ci",
    name: "Civil Inspector (Albert Balingit)",
    category: "technical",
    duration: 18,
    allocation: 10,
    rate: 18000,
    description: "Civil inspector verifying daily structural concrete pours, steel reinforcement, and masonry work.",
    tooltip: "Daily civil works monitoring and site inspection (10% allocation) for 18 months.",
    isActive: true
  },
  {
    id: "mi",
    name: "Mechanical Inspector (Engr. Mithun Gangadharan)",
    category: "technical",
    duration: 18,
    allocation: 10,
    rate: 18000,
    description: "Mechanical inspector verifying daily HVAC ducting, plumbing pressure tests, and firefighting piping.",
    tooltip: "Daily mechanical installations inspection (10% allocation) for 18 months.",
    isActive: true
  },
  {
    id: "ei",
    name: "Electrical Inspector (Engr. Ahmed Hussain Khalifa)",
    category: "technical",
    duration: 18,
    allocation: 10,
    rate: 18000,
    description: "Electrical inspector conducting daily audits of conduits, wiring, and DB terminations on site.",
    tooltip: "Daily electrical safety and installation inspection (10% allocation) for 18 months.",
    isActive: true
  },
  {
    id: "qs",
    name: "Quantity Surveyor (Engr. Vener Moreno)",
    category: "technical",
    duration: 18,
    allocation: 10,
    rate: 18000,
    description: "Quantity Surveyor tracking monthly measurements, material inventories, and variation orders.",
    tooltip: "Commercial auditing and progress verification (10% allocation) for 18 months.",
    isActive: true
  },
  {
    id: "pe",
    name: "Planning Engineer (Engr. John Aboud)",
    category: "technical",
    duration: 18,
    allocation: 10,
    rate: 20000,
    description: "Planning engineer auditing schedule delays, critical paths, and project milestones.",
    tooltip: "Schedule audit and progress reports (10% allocation) for 18 months.",
    isActive: true
  },
  {
    id: "hse",
    name: "HSE Engineer (Engr. Khaled Mustafa)",
    category: "support",
    duration: 18,
    allocation: 10,
    rate: 20000,
    description: "Health, Safety & Environment engineer enforcing local safety codes and environmental regulations.",
    tooltip: "HSE safety compliance and incident prevention (10% allocation) for 18 months.",
    isActive: true
  },
  {
    id: "dc",
    name: "Document Controller (Evelyn Carettero)",
    category: "support",
    duration: 18,
    allocation: 10,
    rate: 12000,
    description: "Document controller administering logs of RFIs, technical submittals, and authority letters.",
    tooltip: "Correspondence record management and file archiving (10% allocation) for 18 months.",
    isActive: true
  }
];

// Preset Scenarios for feasibility study
interface Scenario {
  name: string;
  description: string;
  adjustments: { [key: string]: { duration?: number; allocation?: number; rate?: number; isActive?: boolean } };
}

const PRESET_SCENARIOS: { [key: string]: Scenario } = {
  baseline: {
    name: "Standard Proposal",
    description: "The baseline feasibility estimate using standard staffing durations and split engineer allocations.",
    adjustments: {}
  },
  fastTrack: {
    name: "Fast-Track Build (10m)",
    description: "Compressed timeline with heightened engineering allocations to fast-track testing & handover.",
    adjustments: {
      pm: { duration: 10, allocation: 100 },
      re: { duration: 10, allocation: 20 },
      arch: { duration: 10, allocation: 20 },
      me: { duration: 10, allocation: 20 },
      ee: { duration: 10, allocation: 20 },
      elv: { duration: 10, allocation: 20 },
      sust: { duration: 10, allocation: 20, isActive: true },
      ci: { duration: 10, allocation: 20 },
      mi: { duration: 10, allocation: 20 },
      ei: { duration: 10, allocation: 20 },
      qs: { duration: 10, allocation: 20 },
      pe: { duration: 10, allocation: 20 },
      hse: { duration: 10, allocation: 20 },
      dc: { duration: 10, allocation: 20 }
    }
  },
  complexInfrastructure: {
    name: "Complex Dev (24m)",
    description: "Extended infrastructure schedule with permanent civil inspections and multi-year coordination.",
    adjustments: {
      pm: { duration: 24, allocation: 100 },
      re: { duration: 24, allocation: 15 },
      arch: { duration: 24, allocation: 15 },
      me: { duration: 24, allocation: 15 },
      ee: { duration: 24, allocation: 15 },
      elv: { duration: 24, allocation: 15 },
      sust: { duration: 24, allocation: 15, isActive: true },
      ci: { duration: 24, allocation: 15 },
      mi: { duration: 24, allocation: 15 },
      ei: { duration: 24, allocation: 15 },
      qs: { duration: 24, allocation: 15 },
      pe: { duration: 24, allocation: 15 },
      hse: { duration: 24, allocation: 15 },
      dc: { duration: 24, allocation: 15 }
    }
  }
};

interface SupervisionMatrixProps {
  roles: RoleData[];
  setRoles: React.Dispatch<React.SetStateAction<RoleData[]>>;
  activeScenario: string;
  setActiveScenario: (scenario: string) => void;
}

export default function SupervisionMatrix({ roles, setRoles, activeScenario, setActiveScenario }: SupervisionMatrixProps) {
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);

  // Helper formatting functions
  const formatAED = (value: number) => {
    return `AED ${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const calculateRoleCost = (role: RoleData) => {
    if (!role.isActive) return 0;
    return role.duration * (role.allocation / 100) * role.rate;
  };

  // State Updates
  const handleValueChange = (id: string, key: "duration" | "allocation" | "rate", value: number) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => {
        if (role.id === id) {
          let updatedValue = value;
          // Apply validation bounds
          if (key === "duration") updatedValue = Math.max(0, Math.min(60, value));
          if (key === "allocation") updatedValue = Math.max(0, Math.min(100, value));
          if (key === "rate") updatedValue = Math.max(0, Math.min(150000, value));

          return { ...role, [key]: updatedValue };
        }
        return role;
      })
    );
    setActiveScenario("custom");
  };

  const toggleRoleActive = (id: string) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => {
        if (role.id === id) {
          // If turning on sustainability, set to 10% allocation by default if it was 0
          const updatedAlloc = role.id === "sust" && !role.isActive && role.allocation === 0 ? 10 : role.allocation;
          return { ...role, isActive: !role.isActive, allocation: updatedAlloc };
        }
        return role;
      })
    );
    setActiveScenario("custom");
  };

  const loadScenario = (key: string) => {
    setActiveScenario(key);
    const scenario = PRESET_SCENARIOS[key];
    if (!scenario) return;

    setRoles(
      DEFAULT_ROLES.map((defRole) => {
        const adjustment = scenario.adjustments[defRole.id];
        if (adjustment) {
          return {
            ...defRole,
            duration: adjustment.duration !== undefined ? adjustment.duration : defRole.duration,
            allocation: adjustment.allocation !== undefined ? adjustment.allocation : defRole.allocation,
            rate: adjustment.rate !== undefined ? adjustment.rate : defRole.rate,
            isActive: adjustment.isActive !== undefined ? adjustment.isActive : defRole.isActive
          };
        }
        // If it's the baseline scenario, it will naturally match defaults
        if (key === "baseline") {
          return { ...defRole };
        }
        return { ...defRole };
      })
    );

    triggerNotification(`Applied preset: ${scenario.name}`);
  };

  const resetToDefault = () => {
    setRoles(DEFAULT_ROLES.map((r) => ({ ...r })));
    setActiveScenario("baseline");
    triggerNotification("Reset staffing matrix to initial parameters.");
  };

  const triggerNotification = (message: string) => {
    setShowNotification(message);
    setTimeout(() => {
      setShowNotification(null);
    }, 3000);
  };

  // Calculations
  const coreTotal = useMemo(() => {
    return roles
      .filter((r) => r.category !== "optional")
      .reduce((sum, r) => sum + calculateRoleCost(r), 0);
  }, [roles]);

  const grandTotal = useMemo(() => {
    return roles.reduce((sum, r) => sum + calculateRoleCost(r), 0);
  }, [roles]);

  const totalStaffMonths = useMemo(() => {
    return roles
      .filter((r) => r.isActive)
      .reduce((sum, r) => sum + r.duration * (r.allocation / 100), 0);
  }, [roles]);

  const blendedMonthlyRate = useMemo(() => {
    const activeRoles = roles.filter((r) => r.isActive && r.duration > 0 && r.allocation > 0);
    if (activeRoles.length === 0) return 0;
    const weightedSum = activeRoles.reduce((sum, r) => sum + r.rate * (r.allocation / 100), 0);
    const sumAlloc = activeRoles.reduce((sum, r) => sum + r.allocation / 100, 0);
    return sumAlloc > 0 ? weightedSum / sumAlloc : 0;
  }, [roles]);

  const optionalCost = useMemo(() => {
    const optionalRole = roles.find((r) => r.category === "optional");
    return optionalRole && optionalRole.isActive ? calculateRoleCost(optionalRole) : 0;
  }, [roles]);

  // Role Icons mapper
  const renderRoleIcon = (iconName: string, category: string) => {
    const classStr = `w-5 h-5 ${
      category === "optional"
        ? "text-emerald-400"
        : category === "support"
        ? "text-slate-400"
        : "text-cyan-400"
    }`;

    switch (iconName) {
      case "pm":
        return <ShieldCheck className={classStr} />;
      case "re":
        return <ShieldCheck className={classStr} />;
      case "arch":
        return <Building className={classStr} />;
      case "me":
        return <Building className={classStr} />;
      case "ee":
        return <Wrench className={classStr} />;
      case "elv":
        return <Wrench className={classStr} />;
      case "ci":
        return <Users className={classStr} />;
      case "mi":
        return <Compass className={classStr} />;
      case "ei":
        return <Compass className={classStr} />;
      case "qs":
        return <FileText className={classStr} />;
      case "pe":
        return <Clock className={classStr} />;
      case "dc":
        return <FileText className={classStr} />;
      case "hse":
        return <ShieldAlert className={classStr} />;
      case "sust":
        return <Leaf className={classStr} />;
      default:
        return <Users className={classStr} />;
    }
  };

  // Export utility
  const copyCSVToClipboard = () => {
    const headers = ["Role", "Category", "Status", "Duration (Months)", "Allocation (%)", "Monthly Rate (AED)", "Total Cost (AED)"];
    const rowsCSV = roles.map((r) => [
      r.name,
      r.category,
      r.isActive ? "Active" : "Inactive",
      r.duration,
      `${r.allocation}%`,
      r.rate,
      calculateRoleCost(r)
    ]);

    const csvContent = [
      headers.join(","),
      ...rowsCSV.map((row) => row.map((val) => `"${val}"`).join(","))
    ].join("\n");

    navigator.clipboard.writeText(csvContent);
    triggerNotification("Copied staffing data as CSV to clipboard!");
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#030712] text-slate-100 font-sans antialiased p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
      {/* Toast Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-[#0B1528] border border-cyan-500/30 text-cyan-300 px-5 py-3.5 rounded-lg shadow-xl shadow-black/40 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-medium tracking-wide">{showNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto w-full flex-1">
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 border-b border-[#1E2E4F]/40 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Feasibility Study Unit
              </span>
              <span className="text-xs text-slate-400 font-medium">Dubai Commercial Dev</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
              Site Supervision Staffing Matrix
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Model resource allocations, staffing durations, and fee rates. Real-time updates for commercial feasibility and consultancy bid projections.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Scenarios Panel */}
            <div className="bg-[#0B1528] p-1 rounded-lg border border-[#1E2E4F]/50 flex items-center gap-1 w-full sm:w-auto">
              <button
                onClick={() => loadScenario("baseline")}
                className={`flex-1 sm:flex-initial text-xs px-3.5 py-2 rounded-md font-medium tracking-wide transition-all ${
                  activeScenario === "baseline"
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/10 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/30"
                }`}
              >
                Standard proposal
              </button>
              <button
                onClick={() => loadScenario("fastTrack")}
                className={`flex-1 sm:flex-initial text-xs px-3.5 py-2 rounded-md font-medium tracking-wide transition-all ${
                  activeScenario === "fastTrack"
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/10 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/30"
                }`}
              >
                Fast-Track (10m)
              </button>
              <button
                onClick={() => loadScenario("complexInfrastructure")}
                className={`flex-1 sm:flex-initial text-xs px-3.5 py-2 rounded-md font-medium tracking-wide transition-all ${
                  activeScenario === "complexInfrastructure"
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/10 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/30"
                }`}
              >
                Complex Dev (24m)
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={copyCSVToClipboard}
                className="flex-1 sm:flex-none justify-center bg-[#0B1528] hover:bg-slate-800 text-slate-300 border border-[#1E2E4F]/60 text-xs px-3.5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-1.5"
                title="Copy structured dataset to clipboard as CSV"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={resetToDefault}
                className="flex-1 sm:flex-none justify-center bg-[#0B1528] hover:bg-slate-800 text-slate-300 border border-[#1E2E4F]/60 text-xs px-3.5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-1.5"
                title="Reset components parameters to standard client defaults"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Reset Matrix</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bento Board / Financial KPI Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Grand Total Cost Card */}
          <motion.div
            layoutId="grand-total-card"
            className="relative overflow-hidden bg-gradient-to-br from-[#0B1528] to-[#0d2142] border border-cyan-500/40 rounded-xl p-5 shadow-lg shadow-black/20"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold tracking-wider text-cyan-400 uppercase">
                Grand Total (Staff Fees)
              </span>
              <Coins className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-1 mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_10px_rgba(6,182,212,0.15)]">
                {formatAED(grandTotal)}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span>Full duration staff deployment projection</span>
            </div>
          </motion.div>

          {/* Core Supervision Fee Card */}
          <div className="bg-[#0B1528] border border-[#1E2E4F] rounded-xl p-5 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                Core Staffing Total
              </span>
              <ShieldCheck className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-1 mt-3">
              <span className="text-2xl font-bold text-slate-200 tracking-tight">
                {formatAED(coreTotal)}
              </span>
            </div>
            <div className="text-[11px] mt-2 flex items-center gap-1 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Fixed 13 baseline roles (contractual)</span>
            </div>
          </div>

          {/* Optional Sustainability / PQP Card */}
          <div className={`border rounded-xl p-5 shadow-md transition-all ${
            roles.find((r) => r.id === "sust")?.isActive 
              ? "bg-[#0B1528]/80 border-emerald-500/30" 
              : "bg-[#0B1528]/40 border-dashed border-[#1E2E4F]"
          }`}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                Sustainability Support
              </span>
              <Leaf className={`w-4 h-4 ${roles.find((r) => r.id === "sust")?.isActive ? "text-emerald-400" : "text-slate-500"}`} />
            </div>
            <div className="flex items-baseline gap-1 mt-3">
              {roles.find((r) => r.id === "sust")?.isActive ? (
                <span className="text-2xl font-bold text-emerald-400 tracking-tight">
                  {formatAED(optionalCost)}
                </span>
              ) : (
                <span className="text-2xl font-semibold text-slate-600 tracking-tight">
                  AED 0
                </span>
              )}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                {roles.find((r) => r.id === "sust")?.isActive ? "Toggled ON (10% allocation)" : "Sustainability PQP off"}
              </span>
              <button
                onClick={() => toggleRoleActive("sust")}
                className={`text-[11px] px-2 py-0.5 rounded font-semibold border ${
                  roles.find((r) => r.id === "sust")?.isActive
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                    : "bg-[#1E2E4F]/20 text-slate-400 border-[#1E2E4F] hover:text-white"
                }`}
              >
                {roles.find((r) => r.id === "sust")?.isActive ? "Disable" : "Enable"}
              </button>
            </div>
          </div>

          {/* Total Staff-Months Metric */}
          <div className="bg-[#0B1528] border border-[#1E2E4F] rounded-xl p-5 shadow-md">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                Staff-Months Volume
              </span>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-1.5 mt-3">
              <span className="text-2xl font-bold text-slate-200 tracking-tight">
                {totalStaffMonths.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400">Months</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
              <span className="text-cyan-400 font-semibold">
                {formatAED(totalStaffMonths > 0 ? grandTotal / totalStaffMonths : 0)}
              </span>
              <span>/ staff-mo blended avg</span>
            </div>
          </div>
        </div>

        {/* Staffing Interactive Grid */}
        <div className="bg-[#0B1528] border border-[#1E2E4F] rounded-xl overflow-hidden shadow-xl mb-8">
          <div className="px-6 py-4 bg-[#0F1C36] border-b border-[#1E2E4F] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">Resources Allocation & Cost Matrix</h2>
              <p className="text-xs text-slate-400">Update Duration, Allocation % and Monthly rate to run custom feasibility calculations.</p>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400" /> Technical</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400" /> Support</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Optional</span>
            </div>
          </div>

          {/* Table Container */}
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-[#1E2E4F] text-xs font-semibold text-slate-300 uppercase bg-[#0D1B35]/40 tracking-wider">
                  <th className="py-4 px-6 w-1/4">Staff Position / Role</th>
                  <th className="py-4 px-4 w-[15%] text-center">Duration</th>
                  <th className="py-4 px-4 w-[20%] text-center">Allocation (%)</th>
                  <th className="py-4 px-4 w-[20%] text-center">Monthly Rate</th>
                  <th className="py-4 px-6 w-[20%] text-right">Estimated Cost (AED)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2E4F]/50">
                {roles.map((role) => {
                  const isOptional = role.category === "optional";
                  const cost = calculateRoleCost(role);

                  // Highlights for allocation/rate limits
                  const isAllocationZero = role.isActive && role.allocation === 0;
                  const isHighRate = role.rate > 35000;
                  const isLowRate = role.rate < 12000;

                  return (
                    <tr
                      key={role.id}
                      className={`group transition-colors relative ${
                        !role.isActive 
                          ? "bg-[#030712]/40 text-slate-500 opacity-60" 
                          : "hover:bg-[#0D1B35]/35 text-slate-200"
                      }`}
                    >
                      {/* Name / Category & Icon */}
                      <td className="py-4.5 px-6">
                        <div className="flex items-start gap-3.5">
                          <div className={`p-2 rounded-lg mt-0.5 transition-colors ${
                            !role.isActive 
                              ? "bg-slate-900 border border-slate-800" 
                              : role.category === "technical" 
                              ? "bg-cyan-500/5 border border-cyan-500/15" 
                              : role.category === "optional" 
                              ? "bg-emerald-500/5 border border-emerald-500/15" 
                              : "bg-slate-800 border border-slate-700/50"
                          }`}>
                            {renderRoleIcon(role.id, role.category)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold tracking-wide text-sm ${
                                !role.isActive 
                                  ? "text-slate-600 line-through" 
                                  : "text-white"
                              }`}>
                                {role.name}
                              </span>
                              {isOptional && (
                                <button
                                  onClick={() => toggleRoleActive(role.id)}
                                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border transition-colors ${
                                    role.isActive
                                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                                      : "bg-slate-800 text-slate-500 border-slate-700 hover:text-slate-300"
                                  }`}
                                  title="Toggle optional staff availability"
                                >
                                  {role.isActive ? "Optional: Active" : "Optional: Inactive"}
                                </button>
                              )}
                              {!role.isActive && !isOptional && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                  Suspended
                                </span>
                              )}
                              {role.isActive && role.allocation === 100 && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/15 hidden sm:inline">
                                  Full-time
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 max-w-sm font-light leading-relaxed">
                              {role.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Duration Controls */}
                      <td className="py-4.5 px-4">
                        <div className="flex flex-col items-center gap-1.5 max-w-[120px] mx-auto">
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              disabled={!role.isActive}
                              value={role.duration}
                              onChange={(e) => handleValueChange(role.id, "duration", parseFloat(e.target.value) || 0)}
                              className="w-12 bg-slate-900 border border-[#1E2E4F] rounded text-xs py-1 px-1.5 text-center text-white focus:outline-none focus:border-cyan-500/70 disabled:opacity-40"
                              min={0}
                              max={60}
                            />
                            <span className="text-[11px] text-slate-500">mo</span>
                          </div>
                          
                          <input
                            type="range"
                            disabled={!role.isActive}
                            min={0}
                            max={36}
                            step={1}
                            value={role.duration}
                            onChange={(e) => handleValueChange(role.id, "duration", parseInt(e.target.value))}
                            className="w-full accent-cyan-500 h-1 bg-slate-800 rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                          />
                        </div>
                      </td>

                      {/* Allocation Controls */}
                      <td className="py-4.5 px-4">
                        <div className="flex flex-col items-center gap-1.5 max-w-[150px] mx-auto">
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              disabled={!role.isActive}
                              value={role.allocation}
                              onChange={(e) => handleValueChange(role.id, "allocation", parseFloat(e.target.value) || 0)}
                              className={`w-12 border rounded text-xs py-1 px-1.5 text-center text-white focus:outline-none focus:border-cyan-500/70 disabled:opacity-40 ${
                                isAllocationZero 
                                  ? "bg-rose-500/10 border-rose-500/40 text-rose-300"
                                  : "bg-slate-900 border-[#1E2E4F]"
                              }`}
                              min={0}
                              max={100}
                            />
                            <span className="text-[11px] text-slate-500">%</span>
                            
                            {isAllocationZero && (
                              <div className="group relative" title="Role allocation is set to 0. Fee will not contribute to totals.">
                                <AlertCircle className="w-3.5 h-3.5 text-rose-400 cursor-help" />
                              </div>
                            )}
                          </div>
                          
                          <input
                            type="range"
                            disabled={!role.isActive}
                            min={0}
                            max={100}
                            step={5}
                            value={role.allocation}
                            onChange={(e) => handleValueChange(role.id, "allocation", parseInt(e.target.value))}
                            className="w-full accent-cyan-500 h-1 bg-slate-800 rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                          />
                        </div>
                      </td>

                      {/* Monthly Rate Controls */}
                      <td className="py-4.5 px-4">
                        <div className="flex flex-col items-center gap-1.5 max-w-[160px] mx-auto">
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-slate-500">AED</span>
                            <input
                              type="number"
                              disabled={!role.isActive}
                              value={role.rate}
                              step={500}
                              onChange={(e) => handleValueChange(role.id, "rate", parseFloat(e.target.value) || 0)}
                              className="w-20 bg-slate-900 border border-[#1E2E4F] rounded text-xs py-1 px-1.5 text-center text-white focus:outline-none focus:border-cyan-500/70 disabled:opacity-40"
                              min={0}
                              max={150000}
                            />
                            
                            {role.isActive && (isHighRate || isLowRate) && (
                              <div 
                                className="relative cursor-help" 
                                onMouseEnter={() => setHoveredTooltip(role.id)}
                                onMouseLeave={() => setHoveredTooltip(null)}
                              >
                                <Info className={`w-3.5 h-3.5 ${isHighRate ? "text-amber-400" : "text-cyan-400"}`} />
                                {hoveredTooltip === role.id && (
                                  <div className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#0B1528] border border-[#1E2E4F] text-slate-300 p-2.5 rounded text-[10px] leading-relaxed shadow-xl backdrop-blur-md">
                                    {isHighRate 
                                      ? "Premium fee bracket: Standard market rate usually tops around AED 35,000 for typical consultants." 
                                      : "Competitive budget bracket: May affect recruitment attraction indices."}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <input
                            type="range"
                            disabled={!role.isActive}
                            min={5000}
                            max={50000}
                            step={1000}
                            value={role.rate}
                            onChange={(e) => handleValueChange(role.id, "rate", parseInt(e.target.value))}
                            className="w-full accent-cyan-500 h-1 bg-slate-800 rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                          />
                        </div>
                      </td>

                      {/* Estimated Cost & Share */}
                      <td className="py-4.5 px-6 text-right">
                        <div className="flex flex-col items-end gap-1">
                          <span className={`font-mono text-sm font-bold tracking-tight ${
                            !role.isActive 
                              ? "text-slate-600 line-through" 
                              : "text-white"
                          }`}>
                            {formatAED(cost)}
                          </span>
                          
                          {role.isActive && grandTotal > 0 && (
                            <div className="flex items-center gap-1.5">
                              {/* Inline mini horizontal visual bar */}
                              <div className="w-12 bg-slate-800 h-1.5 rounded overflow-hidden">
                                <div 
                                  className="h-full bg-cyan-400/80 rounded transition-all duration-300"
                                  style={{ width: `${(cost / grandTotal) * 100}%` }}
                                />
                              </div>
                              <span className="text-[10px] text-slate-500 font-mono">
                                {((cost / grandTotal) * 100).toFixed(1)}%
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (Mobile-First responsive fallback) */}
          <div className="md:hidden space-y-4 p-4 bg-[#030712]/60">
            {roles.map((role) => {
              const isOptional = role.category === "optional";
              const cost = calculateRoleCost(role);
              const isAllocationZero = role.isActive && role.allocation === 0;

              return (
                <div
                  key={role.id}
                  className={`p-4 rounded-xl border transition-all ${
                    !role.isActive
                      ? "bg-[#030712]/30 border-slate-900/60 opacity-60 text-slate-500"
                      : "bg-[#0B1528] border-[#1E2E4F]/70 text-slate-200"
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#1E2E4F]/30 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg shrink-0 ${
                        !role.isActive
                          ? "bg-slate-900"
                          : role.category === "technical"
                          ? "bg-cyan-500/5 border border-cyan-500/10"
                          : role.category === "optional"
                          ? "bg-emerald-500/5 border border-emerald-500/10"
                          : "bg-slate-800"
                      }`}>
                        {renderRoleIcon(role.id, role.category)}
                      </div>
                      <div>
                        <h4 className={`font-bold text-xs ${!role.isActive ? "text-slate-600 line-through" : "text-white"}`}>
                          {role.name}
                        </h4>
                        <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">
                          {role.category}
                        </span>
                      </div>
                    </div>

                    {isOptional && (
                      <button
                        onClick={() => toggleRoleActive(role.id)}
                        className={`px-2 py-0.5 rounded text-[9px] font-bold border transition-colors ${
                          role.isActive
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-slate-800 text-slate-500 border-slate-700"
                        }`}
                      >
                        {role.isActive ? "Enabled" : "Disabled"}
                      </button>
                    )}
                  </div>

                  {/* Sliders Grid */}
                  <div className="space-y-3">
                    {/* Duration Slider */}
                    <div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span>Duration (Months)</span>
                        <div className="flex items-center gap-1 font-mono text-white">
                          <input
                            type="number"
                            disabled={!role.isActive}
                            value={role.duration}
                            onChange={(e) => handleValueChange(role.id, "duration", parseFloat(e.target.value) || 0)}
                            className="w-10 bg-slate-950 border border-[#1E2E4F]/80 text-center rounded text-[10px] py-0.5"
                          />
                          <span>mo</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        disabled={!role.isActive}
                        min={0}
                        max={36}
                        step={1}
                        value={role.duration}
                        onChange={(e) => handleValueChange(role.id, "duration", parseInt(e.target.value))}
                        className="w-full accent-cyan-500 h-1 bg-slate-850 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Allocation Slider */}
                    <div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span>Allocation %</span>
                        <div className="flex items-center gap-1 font-mono text-white">
                          <input
                            type="number"
                            disabled={!role.isActive}
                            value={role.allocation}
                            onChange={(e) => handleValueChange(role.id, "allocation", parseFloat(e.target.value) || 0)}
                            className={`w-10 bg-slate-950 border text-center rounded text-[10px] py-0.5 ${
                              isAllocationZero ? "border-rose-500/40 text-rose-300" : "border-[#1E2E4F]/80"
                            }`}
                          />
                          <span>%</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        disabled={!role.isActive}
                        min={0}
                        max={100}
                        step={5}
                        value={role.allocation}
                        onChange={(e) => handleValueChange(role.id, "allocation", parseInt(e.target.value))}
                        className="w-full accent-cyan-500 h-1 bg-slate-855 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Monthly Rate Slider */}
                    <div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span>Monthly Rate (AED)</span>
                        <div className="flex items-center gap-1 font-mono text-white">
                          <span className="text-[8px] text-slate-500">AED</span>
                          <input
                            type="number"
                            disabled={!role.isActive}
                            value={role.rate}
                            onChange={(e) => handleValueChange(role.id, "rate", parseFloat(e.target.value) || 0)}
                            className="w-16 bg-slate-950 border border-[#1E2E4F]/80 text-center rounded text-[10px] py-0.5"
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        disabled={!role.isActive}
                        min={5000}
                        max={50000}
                        step={1000}
                        value={role.rate}
                        onChange={(e) => handleValueChange(role.id, "rate", parseInt(e.target.value))}
                        className="w-full accent-cyan-500 h-1 bg-slate-850 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Calculated Cost footer */}
                  <div className="mt-3.5 pt-2.5 border-t border-[#1E2E4F]/30 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Est. Cost</span>
                    <div className="flex flex-col items-end">
                      <span className={`font-mono font-bold ${!role.isActive ? "text-slate-600 line-through" : "text-cyan-400"}`}>
                        {formatAED(cost)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Table Footer with Summary Breakdown */}
          <div className="bg-[#0D1B35]/40 border-t border-[#1E2E4F] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col gap-2 max-w-md">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Formula Ledger</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Consultancy fees are audited using the standard formula: <br />
                <code className="text-cyan-300 font-mono bg-[#0B1528] px-1.5 py-0.5 rounded border border-[#1E2E4F]/40">
                  Duration (Months) × Allocation (%) × Monthly Rate (AED)
                </code>
              </p>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-baseline gap-4 text-xs text-slate-400">
                <span>Core Supervision Total:</span>
                <span className="font-mono text-slate-300">{formatAED(coreTotal)}</span>
              </div>
              <div className="flex items-baseline gap-4 text-xs text-slate-400 border-b border-[#1E2E4F] pb-1.5">
                <span>Sustainability Add-on:</span>
                <span className={`font-mono ${optionalCost > 0 ? "text-emerald-400" : "text-slate-500"}`}>
                  +{formatAED(optionalCost)}
                </span>
              </div>
              <div className="flex items-baseline gap-5 mt-1.5">
                <span className="text-sm font-bold text-white uppercase tracking-wider">Staff Fees Grand Total:</span>
                <span className="text-2xl font-black text-cyan-400 font-mono tracking-tight">
                  {formatAED(grandTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Distribution Graphic List */}
        <div className="bg-[#0B1528] border border-[#1E2E4F] rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              Consultancy Fee Distribution Matrix
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left side: Stacked Progress visualization */}
            <div className="flex flex-col gap-3">
              <div className="text-xs text-slate-400 leading-relaxed mb-1">
                Visualizing the distribution of each staff role relative to the total estimated supervision fee of <strong className="text-white">{formatAED(grandTotal)}</strong>.
              </div>
              
              {/* Stacked multi-color bar */}
              <div className="w-full bg-[#030712] h-7 rounded-lg overflow-hidden flex border border-[#1E2E4F]">
                {roles
                  .filter((r) => r.isActive && calculateRoleCost(r) > 0)
                  .map((r, idx) => {
                    const cost = calculateRoleCost(r);
                    const pct = (cost / grandTotal) * 100;
                    
                    // Generate colors dynamically based on index and category
                    const colors = [
                      "bg-cyan-500", "bg-sky-500", "bg-indigo-500", 
                      "bg-teal-500", "bg-emerald-500", "bg-slate-400", 
                      "bg-blue-600", "bg-purple-600", "bg-emerald-400"
                    ];
                    const selectedColor = r.id === "sust" ? "bg-emerald-400" : colors[idx % colors.length];

                    return (
                      <div
                        key={r.id}
                        className={`${selectedColor} h-full transition-all hover:brightness-110 relative group cursor-help`}
                        style={{ width: `${pct}%` }}
                        title={`${r.name}: ${pct.toFixed(1)}% (${formatAED(cost)})`}
                      />
                    );
                  })}
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                {roles
                  .filter((r) => r.isActive && calculateRoleCost(r) > 0)
                  .map((r, idx) => {
                    const colors = [
                      "bg-cyan-500", "bg-sky-500", "bg-indigo-500", 
                      "bg-teal-500", "bg-emerald-500", "bg-slate-400", 
                      "bg-blue-600", "bg-purple-600", "bg-emerald-400"
                    ];
                    const dotColor = r.id === "sust" ? "bg-emerald-400" : colors[idx % colors.length];

                    return (
                      <div key={r.id} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                        <span className="text-slate-300 font-medium">{r.name}</span>
                        <span>({((calculateRoleCost(r) / grandTotal) * 100).toFixed(0)}%)</span>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Right side: Feasibility Analysis Notes */}
            <div className="bg-[#0F1C36]/60 border border-[#1E2E4F]/60 rounded-lg p-4 text-xs leading-relaxed text-slate-400 space-y-3">
              <span className="font-semibold text-white uppercase text-[10px] tracking-wider block mb-1">
                Supervision Feasibility Analysis
              </span>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Technical Concentration:</strong> Baselines allocate 72% of budget to Engineering and inspection roles, protecting structural and asset integrity indexes.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Cost Optimization Vectors:</strong> Document Control (AED 18,000) and Surveyor (AED 10,000) deployment are optimized to protect early and late logistics pipelines.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                {roles.find((r) => r.id === "sust")?.isActive ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                )}
                <span>
                  <strong>Green Building Auditing:</strong> Estidama Sustainability PQP is currently{" "}
                  <strong className={roles.find((r) => r.id === "sust")?.isActive ? "text-emerald-400" : "text-slate-400"}>
                    {roles.find((r) => r.id === "sust")?.isActive ? "Enabled" : "Disabled"}.
                  </strong>{" "}
                  {roles.find((r) => r.id === "sust")?.isActive 
                    ? "Allows submission of sustainability audits and guarantees regulatory Compliance certifications."
                    : "Recommended to enable if Pearl ratings are requested by municipal building codes."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer copyright and logo indicators */}
      <div className="max-w-7xl mx-auto w-full mt-12 pt-6 border-t border-[#1E2E4F]/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
        <div className="flex flex-col gap-1 text-left">
          <div>
            © {new Date().getFullYear()} Feasibility Study commercial models. Built for Site Supervision bids.
          </div>
          <div className="text-cyan-400/80 font-medium">
            * Payment should be done within 30 days of the submission and all payments are excluded from VAT.
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hover:text-slate-400 transition-colors">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-slate-400 transition-colors">Commercial Guidelines</span>
          <span>•</span>
          <span className="hover:text-slate-400 transition-colors">Feasibility Docs</span>
        </div>
      </div>
    </div>
  );
}
