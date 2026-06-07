"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Hammer,
  ClipboardCheck,
  Menu,
  X,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  TrendingDown,
  Info,
  Layers,
  FileSpreadsheet,
  Download
} from "lucide-react";


export type DashboardTab =
  | "Option 2: New Build"
  | "Option 1: Refurbishment"
  | "Site Supervision"
  | "Executive Summary";

export interface HeaderNavbarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  projectName?: string;
  children?: React.ReactNode;
}

export default function HeaderNavbar({
  activeTab,
  onTabChange,
  projectName = "TAQA Madinat Zayed Study",
  children,
}: HeaderNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabItems = [
    {
      id: "Executive Summary" as DashboardTab,
      title: "Executive Summary",
      subtitle: "Consolidated feasibility summary",
      icon: LayoutDashboard,
      metric: "ROI: 14.8%",
      metricType: "success" as const,
    },
    {
      id: "Option 1: Refurbishment" as DashboardTab,
      title: "Option 1: Refurbishment",
      subtitle: "Brownfield lifecycle analysis",
      icon: Hammer,
      metric: "CapEx: AED 18,200,000",
      metricType: "neutral" as const,
    },
    {
      id: "Option 2: New Build" as DashboardTab,
      title: "Option 2: New Build",
      subtitle: "Greenfield commercial assessment",
      icon: Building2,
      metric: "CapEx: AED 45,200,000",
      metricType: "neutral" as const,
    },
    {
      id: "Site Supervision" as DashboardTab,
      title: "Site Supervision",
      subtitle: "Construction quality assurance",
      icon: ClipboardCheck,
      metric: "Compliance: 100%",
      metricType: "success" as const,
    },
  ];

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 antialiased">
      {/* Top Header - McKinsey / BCG Corporate Visual Identity */}
      <header className="sticky top-0 z-40 w-full h-16 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 shadow-lg shadow-slate-950/20">
        
        {/* Brand/Logo Section */}
        <div className="flex items-center py-1">
          <img
            src="/logo.png"
            className="h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
            alt="Dar Al Khalij Logo"
          />
        </div>

        {/* Global Feasibility Metrics Panel - Desktop Only */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="h-6 w-px bg-slate-800" />
          <div className="flex items-center gap-5">
            {/* Study Badge */}
            <div className="flex items-center gap-2 bg-slate-900/60 py-1 px-3 rounded-full border border-slate-800">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
              <span className="text-[10px] font-medium tracking-wide text-slate-400">Study:</span>
              <span className="text-[10px] text-white font-semibold tracking-wide">{projectName}</span>
            </div>
            {/* NPV Status */}
            <div className="flex items-center gap-2 bg-slate-900/60 py-1 px-3 rounded-full border border-slate-800">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              <span className="text-[10px] font-medium tracking-wide text-slate-400">NPV:</span>
              <span className="text-[10px] text-emerald-400 font-semibold tracking-wide">Positive (AED 42,800,000)</span>
            </div>
            {/* Risk Index */}
            <div className="flex items-center gap-2 bg-slate-900/60 py-1 px-3 rounded-full border border-slate-800">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
              <span className="text-[10px] font-medium tracking-wide text-slate-400">Risk Profile:</span>
              <span className="text-[10px] text-cyan-400 font-semibold tracking-wide">Mitigated</span>
            </div>
          </div>
        </div>

        {/* Top Right Actions Section */}
        <div className="flex items-center gap-4">
          <img
            src="/taqa-logo.png"
            className="h-7 sm:h-9 w-auto object-contain"
            alt="TAQA Logo"
          />
          <div className="hidden sm:flex items-center gap-3 bg-slate-950/40 border border-slate-800/60 p-1 rounded-lg">
            <span className="px-2 py-1 text-[10px] font-bold text-cyan-400 bg-cyan-500/10 rounded tracking-wider uppercase">
              Feasibility Study
            </span>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 relative min-h-0">
        
        {/* Left Sidebar (Desktop Only) */}
        <aside className="hidden md:flex flex-col w-64 border-r border-slate-800/60 bg-slate-950/40 backdrop-blur-sm p-4 justify-between shrink-0 select-none">
          <div className="space-y-6">
            
            {/* Navigation Section Header */}
            <div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.2em] px-2 block mb-3">
                Feasibility Options
              </span>
              
              {/* Tab Navigation List */}
              <nav className="space-y-1.5">
                {tabItems.map((tab) => {
                  const IconComponent = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => onTabChange(tab.id)}
                      className={`relative w-full flex flex-col items-start px-3 py-2.5 rounded-lg text-left transition-all duration-200 group overflow-hidden ${
                        isActive
                          ? "text-white font-medium"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                      }`}
                    >
                      {/* Active Tab Glow Backdrop */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTabGlow"
                          className="absolute inset-0 bg-gradient-to-r from-cyan-950/40 via-slate-900/20 to-transparent border-l-2 border-cyan-400 rounded-r-lg"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      
                      {/* Tab Row Layout */}
                      <div className="flex items-center gap-2.5 w-full relative z-10">
                        <IconComponent
                          className={`w-4 h-4 transition-colors ${
                            isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-400"
                          }`}
                        />
                        <span className="text-xs font-semibold tracking-wide">
                          {tab.title}
                        </span>
                      </div>

                      {/* Subtitle / Mini Stats */}
                      <div className="mt-1 pl-6.5 flex items-center justify-between w-full relative z-10">
                        <span className="text-[10px] text-slate-500 line-clamp-1 group-hover:text-slate-400 transition-colors">
                          {tab.subtitle}
                        </span>
                        
                        {/* Tab Metric tag */}
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                            tab.metricType === "success"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-slate-800 text-slate-400 border border-slate-700/50"
                          }`}
                        >
                          {tab.metric.split(": ")[1] || tab.metric}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Supplementary Context / Metadata */}
            <div className="border-t border-slate-900 pt-4 px-2 space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest block">
                  Study Parameters
                </span>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="bg-slate-900/40 p-2 rounded border border-slate-800/40">
                    <span className="text-[8px] text-slate-500 block uppercase">Supervision</span>
                    <span className="text-[9px] text-cyan-400 font-bold">18 Months</span>
                  </div>
                  <div className="bg-slate-900/40 p-2 rounded border border-slate-800/40">
                    <span className="text-[8px] text-slate-500 block uppercase">Structure</span>
                    <span className="text-[9px] text-cyan-400 font-bold">Reinforced</span>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[9px] font-semibold text-slate-400">
                  <span className="uppercase tracking-widest text-slate-500">Report Status</span>
                  <span>85%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/60">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400"
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Footer */}
          <div className="border-t border-slate-900 pt-4 px-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/30 border border-slate-800/40">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-semibold leading-tight">Draft Report v2.4</span>
                <span className="text-[9px] text-slate-500">Last updated: Today</span>
              </div>
              <button 
                onClick={() => window.print()}
                className="p-1.5 hover:bg-slate-800 hover:text-cyan-400 rounded text-slate-400 transition-colors cursor-pointer"
                title="Export Feasibility PDF"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="md:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
              />

              {/* Sidebar Content Panel */}
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="md:hidden fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-800 p-5 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Branding in Mobile Drawer */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-900">
                    <div className="flex items-center py-1">
                      <img
                        src="/logo.png"
                        className="h-8 w-auto object-contain"
                        alt="Dar Al Khalij Logo"
                      />
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-1.5 hover:bg-slate-800 hover:text-white rounded transition-colors text-slate-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Nav links */}
                  <div>
                    <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest block mb-2 px-1">
                      Dashboard Navigation
                    </span>
                    <nav className="space-y-1">
                      {tabItems.map((tab) => {
                        const IconComponent = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              onTabChange(tab.id);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-150 ${
                              isActive
                                ? "bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400"
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <IconComponent className="w-4 h-4 shrink-0" />
                              <div>
                                <span className="text-xs font-bold tracking-wide block leading-none">{tab.title}</span>
                                <span className="text-[9px] text-slate-500 mt-1 block">{tab.subtitle}</span>
                              </div>
                            </div>
                            <span className="text-[8px] font-mono bg-slate-900 px-1 py-0.5 text-slate-400 border border-slate-800 rounded">
                              {tab.metric.split(": ")[1] || tab.metric}
                            </span>
                          </button>
                        );
                      })}
                    </nav>
                  </div>
                </div>

                {/* Footer in Drawer */}
                <div className="border-t border-slate-900 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Study: {projectName}</span>
                    <span className="text-cyan-400">v2.4</span>
                  </div>
                  <button 
                    onClick={() => window.print()}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold py-2 rounded transition-all shadow-md shadow-cyan-500/10 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF Report
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Content Area Section */}
        {children ? (
          <main className="flex-1 min-w-0 w-full max-w-full overflow-x-hidden bg-slate-900/20 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        ) : (
          /* Fallback view if no children are provided, to prevent blank workspace rendering */
          <main className="flex-1 min-w-0 w-full max-w-full overflow-x-hidden bg-slate-900/20 p-6 sm:p-8 flex flex-col justify-center items-center text-center">
            <div className="max-w-md bg-slate-900/40 border border-slate-800/80 p-8 rounded-xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full filter blur-xl" />
              <Layers className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg font-bold text-white mb-2">Dar Al Khalij Commercial Dashboard</h3>
              <p className="text-xs text-slate-400 mb-6">
                Active tab is <strong className="text-cyan-400">{activeTab}</strong>. Render tab content as children inside the HeaderNavbar component shell.
              </p>
              <div className="grid grid-cols-2 gap-3 text-left">
                {tabItems.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      activeTab === tab.id
                        ? "border-cyan-400/50 bg-cyan-950/20 text-white"
                        : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-[10px] block text-slate-500 leading-none mb-1">Select</span>
                    <span className="text-xs font-bold tracking-wide">{tab.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </main>
        )}

      </div>
    </div>
  );
}
