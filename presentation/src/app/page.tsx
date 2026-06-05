"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Target, ArrowDown, ShieldAlert, ArrowRight, CalendarDays, Building2, Banknote, CheckSquare, Building, Activity } from "lucide-react";
import { useState, useEffect } from "react";

// Removed fadeInUp variant to use inline styles

export default function Presentation() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "summary", "dilemma", "pathways", "scorecard", "financials", "detailed", "recommendation"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen selection:bg-teal-200 selection:text-teal-900 overflow-x-hidden w-full">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center py-1">
              <img
                src="/logo.png"
                className="h-8 sm:h-9 w-auto object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
                alt="Dar Al Khalij Logo"
              />
            </div>
            <div className="flex space-x-1 sm:space-x-4 overflow-x-auto no-scrollbar">
              {[
                { id: "hero", label: "Overview" },
                { id: "summary", label: "Summary" },
                { id: "dilemma", label: "Dilemma" },
                { id: "pathways", label: "Pathways" },
                { id: "scorecard", label: "Scorecard" },
                { id: "financials", label: "Financials" },
                { id: "detailed", label: "Full Report" },
                { id: "recommendation", label: "Verdict" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                    activeSection === item.id
                      ? "bg-teal-600 text-white shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden pt-16">
        {/* Abstract corporate geometric background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-teal-900/50 to-transparent skew-x-12" />
          <div className="absolute top-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-slate-800/50 to-transparent -skew-x-12" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="h-20 sm:h-24 md:h-28 mb-8 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 transition-transform duration-300 cursor-pointer flex justify-center items-center"
          >
            <img src="/logo.png" className="h-full w-auto object-contain" alt="Dar Al Khalij Logo" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block px-5 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 font-bold text-xs sm:text-sm uppercase tracking-[0.2em] mb-8"
          >
            DAR AL KHALIJ ENGINEERING CONSULTANCY LLC
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            Strategic Route Analysis:<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
              Madinat Zayed Facilities
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl text-lg sm:text-xl md:text-2xl text-slate-300 font-light mb-12"
          >
            Comprehensive Assessment: Refurbishment vs. Demolition & Reconstruction
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onClick={() => scrollTo("dilemma")}
            className="group flex items-center gap-3 bg-teal-600 hover:bg-teal-500 text-white px-8 py-4 rounded-full text-lg font-medium transition-all shadow-[0_0_40px_-10px_rgba(13,148,136,0.5)] hover:shadow-[0_0_60px_-15px_rgba(13,148,136,0.7)]"
          >
            Begin Executive Briefing
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </section>

      {/* QUICK SUMMARY */}
      <section id="summary" className="py-24 sm:py-32 bg-slate-900 border-t border-slate-800 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-24"
          >
            <h2 className="text-sm font-bold text-teal-400 uppercase tracking-widest mb-3">At A Glance</h2>
            <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Executive Summary</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-3xl"
            >
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-teal-400" />
              </div>
              <h4 className="text-xl font-bold mb-4">What: The Mandate</h4>
              <ul className="space-y-3 text-slate-300">
                <li className="flex gap-3"><span className="text-teal-400 mt-1">•</span> <span className="leading-snug">Address 3 aging scattered facilities (1,500m²) lacking proper documentation.</span></li>
                <li className="flex gap-3"><span className="text-teal-400 mt-1">•</span> <span className="leading-snug">Determine the optimal route: Refurbish (Option 1) vs. Demolish & Rebuild (Option 2).</span></li>
                <li className="flex gap-3"><span className="text-teal-400 mt-1">•</span> <span className="leading-snug">Ensure continuous business operations during the project.</span></li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-3xl"
            >
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6 text-teal-400" />
              </div>
              <h4 className="text-xl font-bold mb-4">Why: Capacity & Compliance</h4>
              <ul className="space-y-3 text-slate-300">
                <li className="flex gap-3"><span className="text-teal-400 mt-1">•</span> <span className="leading-snug">Expand capacity by 100 personnel (total 250).</span></li>
                <li className="flex gap-3"><span className="text-teal-400 mt-1">•</span> <span className="leading-snug">Mandatory ADCD (Fire/Life Safety) code compliance.</span></li>
                <li className="flex gap-3"><span className="text-teal-400 mt-1">•</span> <span className="leading-snug">Achieve DOE sustainability targets (-32% water, -22% power).</span></li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-3xl"
            >
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-teal-400" />
              </div>
              <h4 className="text-xl font-bold mb-4">How: Architectural & Structural Logic</h4>
              <ul className="space-y-3 text-slate-300">
                <li className="flex gap-3"><span className="text-teal-400 mt-1">•</span> <span className="leading-snug"><b>Structural constraints:</b> 30-year-old foundations cannot safely support a vertical expansion. Jacketing existing columns shrinks usable floor space.</span></li>
                <li className="flex gap-3"><span className="text-teal-400 mt-1">•</span> <span className="leading-snug"><b>Architectural clashes:</b> Retrofitting modern HVAC/Sprinklers into old shells results in oppressively low ceilings (&lt;2.5m).</span></li>
                <li className="flex gap-3"><span className="text-teal-400 mt-1">•</span> <span className="leading-snug"><b>The Clean Slate:</b> Rebuilding allows optimized column grids, open-plan workspaces, and natively integrated smart building tech.</span></li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THE DILEMMA */}
      <section id="dilemma" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-24"
          >
            <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">The Core Dilemma: The 30-Year Gap</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            {/* Card A: Current Reality */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-red-500" />
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900">The Current Reality</h4>
                  <p className="text-red-600 font-bold uppercase tracking-wider text-sm mt-1">(Baseline)</p>
                </div>
              </div>
              <ul className="space-y-6">
                {[
                  "3 scattered buildings",
                  "150 Personnel limit",
                  "0% As-Built Documentation",
                  "Fails ADCD fire codes (extinguishers only)",
                  "Uninsulated concrete"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <ShieldAlert className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-lg font-medium leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card B: The Mandate */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-2 h-full bg-teal-500" />
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                  <Target className="w-8 h-8 text-teal-400" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">The TAQA Mandate</h4>
                  <p className="text-teal-400 font-bold uppercase tracking-wider text-sm mt-1">(2026 Target)</p>
                </div>
              </div>
              <ul className="space-y-6 relative z-10">
                {[
                  "1 Unified HQ",
                  "250 Personnel Capacity (+100)",
                  "100% Legalized & Permitted",
                  "Integrated sprinklers natively built",
                  "DOE Compliant (-32% water, -22% power)"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle className="w-6 h-6 text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-lg font-medium leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-slate-900">Regulatory & Parking Roadblocks</h4>
              <p className="text-slate-600 leading-relaxed">
                Missing &quot;As-Built&quot; drawings and unapproved legacy modifications mean the buildings are technically not legalized. Furthermore, increasing staff by 100 triggers strict Department of Transport (DOT) parking quotas, which the current surface-level site cannot accommodate without underground facilities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. THE TWO PATHWAYS */}
      <section id="pathways" className="py-24 sm:py-32 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-24"
          >
            <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Analyzing the Development Routes</h3>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* OPTION 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col bg-white rounded-3xl p-8 sm:p-10 border-2 border-red-100 hover:border-red-200 transition-colors shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                <span className="text-3xl">⚠️</span>
                <h4 className="text-2xl font-bold text-slate-900">OPTION 1: THE BAND-AID (Refurbish)</h4>
              </div>
              
              <p className="text-lg text-slate-600 mb-10 font-medium leading-relaxed">
                A high-risk attempt to reverse-engineer and add weight to dying buildings.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-slate-600">
                  <ArrowRight className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <span>Requires highly invasive forensic concrete testing to check for cracks and load-bearing capacity.</span>
                </li>
                <li className="flex gap-3 text-slate-600">
                  <ArrowRight className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <span>Heavy column jacketing will severely reduce already limited usable office space.</span>
                </li>
                <li className="flex gap-3 text-slate-600">
                  <ArrowRight className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <span>Extensive consultant fees required just to discover existing MEP layouts (no as-built drawings exist).</span>
                </li>
              </ul>

              <div className="mt-12 p-6 bg-red-50 rounded-2xl border border-red-100">
                <p className="text-red-900 font-bold text-lg flex items-start gap-3">
                  <ArrowRight className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                  Result: A cramped, low-ceiling, compromised 15-year asset.
                </p>
              </div>
            </motion.div>

            {/* OPTION 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col bg-white rounded-3xl p-8 sm:p-10 border-2 border-emerald-500 shadow-[0_0_40px_-15px_rgba(16,185,129,0.4)] relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg whitespace-nowrap">
                RECOMMENDED
              </div>

              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100 mt-2">
                <span className="text-3xl">✅</span>
                <h4 className="text-2xl font-bold text-slate-900">OPTION 2: THE CLEAN SLATE (Demolish & Rebuild)</h4>
              </div>
              
              <p className="text-lg text-slate-600 mb-10 font-medium leading-relaxed">
                A predictable, value-driven investment into a brand-new asset.
              </p>

              <div className="space-y-8 flex-grow">
                {[
                  "Temporarily relocate staff.",
                  "Demolish scattered buildings to clear the plot.",
                  "Clean-slate modern design.",
                  "Fast-track construction."
                ].map((step, i) => (
                  <div key={i} className="relative pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-[-2rem] before:w-[2px] before:bg-emerald-100 last:before:hidden">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">{i + 1}</div>
                    <p className="text-slate-800 font-medium text-lg pt-0.5">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
                <p className="text-emerald-900 font-bold text-lg flex items-start gap-3">
                  <ArrowRight className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  Result: A stunning, 50-year lifespan TAQA Regional HQ.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. HEAD-TO-HEAD SCORECARD */}
      <section id="scorecard" className="py-24 sm:py-32 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-24"
          >
            <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">Technical & Architectural Weigh-In</h3>
          </motion.div>

          <div className="overflow-x-auto pb-8 rounded-2xl shadow-2xl">
            <table className="w-full min-w-[900px] border-collapse bg-slate-800/20">
              <thead>
                <tr>
                  <th className="w-1/4 text-left p-6 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-700">Metric</th>
                  <th className="w-[37.5%] text-left p-6 text-slate-200 font-bold text-xl border-b border-slate-700 bg-slate-800/80">Option 1: Refurbish</th>
                  <th className="w-[37.5%] text-left p-6 text-emerald-400 font-bold text-2xl border-b-2 border-emerald-500 bg-emerald-900/30 rounded-t-2xl">Option 2: Rebuild</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {[
                  { 
                    icon: <Building2 className="w-5 h-5" />, 
                    title: "Structural Risk", 
                    opt1: "Extreme (Hidden decay)", 
                    opt2: "Zero (Engineered to 2026 code)",
                    opt1Color: "text-red-400", opt2Color: "text-emerald-400"
                  },
                  { 
                    icon: <CalendarDays className="w-5 h-5" />, 
                    title: "Asset Lifespan", 
                    opt1: "10-15 years", 
                    opt2: "50+ years guaranteed",
                    opt1Color: "text-orange-400", opt2Color: "text-emerald-400"
                  },
                  { 
                    icon: <ArrowDown className="w-5 h-5" />, 
                    title: "Ceiling Heights", 
                    opt1: "Low (<2.5m) due to HVAC clashes", 
                    opt2: "High (3.2m+) bright workspace",
                    opt1Color: "text-orange-400", opt2Color: "text-emerald-400"
                  },
                  { 
                    icon: <ShieldAlert className="w-5 h-5" />, 
                    title: "Fire Safety", 
                    opt1: "Compromised (messy retrofits)", 
                    opt2: "Perfect (built into concrete core)",
                    opt1Color: "text-red-400", opt2Color: "text-emerald-400"
                  },
                  { 
                    icon: <Banknote className="w-5 h-5" />, 
                    title: "Cost Predictability", 
                    opt1: "Unpredictable (Hidden defects)", 
                    opt2: "Highly Predictable (Fixed contracts)",
                    opt1Color: "text-red-400", opt2Color: "text-emerald-400"
                  },
                ].map((row, i) => (
                  <motion.tr 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-3 text-slate-300 font-bold text-lg">
                        <span className="text-slate-500">{row.icon}</span>
                        {row.title}
                      </div>
                    </td>
                    <td className={`p-6 ${row.opt1Color} font-medium text-lg bg-slate-800/80`}>{row.opt1}</td>
                    <td className={`p-6 ${row.opt2Color} font-bold text-xl bg-emerald-900/30`}>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 shrink-0" />
                        {row.opt2}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. THE FINANCIAL ICEBERG */}
      <section id="financials" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-24"
          >
            <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Consultancy & Capital Sunk Costs</h3>
            <p className="text-xl sm:text-2xl text-slate-500 font-medium italic">&quot;Where does your capital actually go?&quot;</p>
          </motion.div>

          <div className="space-y-16 max-w-5xl mx-auto">
            {/* Block 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-4">
                Option 1 (Sunk Cost)
              </h4>
              <div className="h-24 w-full flex rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <div className="w-[80%] bg-red-500 flex items-center justify-center px-6 relative">
                  <span className="text-white font-bold text-center text-sm sm:text-lg lg:text-xl drop-shadow-md px-2">Discovery & Destructive Testing (Phase 1)</span>
                </div>
                <div className="w-[20%] bg-slate-200 flex items-center justify-center px-4">
                  <span className="text-slate-600 font-bold text-xs sm:text-sm text-center">Actual Value Added to Building</span>
                </div>
              </div>
            </motion.div>

            {/* Block 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-4">
                Option 2 (Value Creator)
              </h4>
              <div className="h-24 w-full flex rounded-2xl overflow-hidden shadow-xl shadow-emerald-500/20 border border-emerald-100">
                <div className="w-[10%] bg-slate-200 flex items-center justify-center px-2">
                  <span className="text-slate-600 font-bold text-xs sm:text-sm text-center">Standard Empty Plot Soil Testing</span>
                </div>
                <div className="w-[90%] bg-emerald-500 flex items-center justify-center px-6 relative">
                  <span className="text-white font-bold text-center text-sm sm:text-lg lg:text-xl drop-shadow-md px-2">Direct Value Added (Premium Facade, Smart Tech)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DETAILED FULL REPORT */}
      <section id="detailed" className="py-24 sm:py-32 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-3">Comprehensive Documentation</h2>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Detailed Advisory Report</h3>
          </motion.div>

          <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed">
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-200 mb-12">
              <h4 className="text-xl font-bold text-slate-900 mb-6 border-b pb-4">Report Metadata</h4>
              <p className="mb-3"><strong>Project:</strong> Detailed Condition Assessment, Modernization, and Consultancy Services for TAQA Madinat Zayed Buildings.</p>
              <p className="mb-3"><strong>Client:</strong> TAQA Distribution (TQD)</p>
              <p className="mb-3"><strong>Location:</strong> Al-Dhafra Region, Abu Dhabi, UAE (Plots P100 & P72)</p>
              <p className="mb-0"><strong>Subject:</strong> Strategic Route Analysis: Comprehensive Refurbishment vs. Demolition & Reconstruction</p>
            </div>

            <div className="space-y-16">
              <div>
                <h4 className="text-2xl font-bold text-slate-900 mb-6 text-teal-700">1. EXECUTIVE SUMMARY & THE CORE DILEMMA</h4>
                <p className="mb-4">Following the receipt of the Request for Proposal (RFP), the initial site visit conducted on June 3, 2026, and a comprehensive review of TAQA Distribution&apos;s strategic drivers, Dar Al Khalij Engineering Consultancy LLC has prepared this in-depth advisory report.</p>
                <p>The core objective of this document is to address the fundamental developmental dilemma facing TAQA higher management regarding the Madinat Zayed complex: Whether to execute a complex refurbishment, legalization, and expansion of the existing 30-year-old facilities (Option 1), OR to demolish the site and construct a purpose-built, unified, and fully compliant regional headquarters (Option 2).</p>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-slate-900 mb-6 text-teal-700">2. EXISTING BASELINE (THE 30-YEAR GAP)</h4>
                <p className="mb-4">The Madinat Zayed site currently comprises three scattered, aging structures:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Main Administration Building (G+2)</li>
                  <li>Customer Service Building</li>
                  <li>Emergency Building</li>
                </ul>
                <p>These facilities, estimated to be over 30 years old, suffer from a profound &quot;documentation vacuum&quot; (no approved authority drawings, no as-built records). Crucially, the buildings fail to meet modern Abu Dhabi Civil Defense (ADCD) Fire and Life Safety codes (relying primarily on portable extinguishers) and lack the structural framework to support the required capacity expansion (+100 personnel).</p>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-slate-900 mb-6 text-teal-700">3. OPTION 1: COMPREHENSIVE REFURBISHMENT (THE &quot;BAND-AID&quot; APPROACH)</h4>
                <p className="font-semibold text-slate-900 mb-4">Technical Feasibility & Risks:</p>
                <ul className="list-disc pl-6 space-y-4">
                  <li><strong>Structural Deficiencies:</strong> The existing foundations and columns were not designed for modern load-bearing standards or vertical expansion. Strengthening the structure will require heavy column jacketing, which will paradoxically reduce the already limited usable office space.</li>
                  <li><strong>MEP & Architectural Clashes:</strong> Retrofitting modern HVAC systems and fire sprinklers into the existing 1990s shell will result in severe ceiling height clashes, likely dropping finished ceilings to an oppressively low 2.4 - 2.5 meters.</li>
                  <li><strong>The &quot;Discovery&quot; Cost:</strong> Due to the absence of as-built drawings, the consultant must perform highly invasive, destructive forensic testing (concrete core sampling, 3D scanning, exposing concealed MEP services) merely to establish a baseline. This translates to high initial consultancy fees with zero tangible value added to the building itself.</li>
                  <li><strong>Financial Unpredictability:</strong> Refurbishment of undocumented 30-year-old structures carries an extreme risk of unforeseen variations and cost overruns during construction.</li>
                  <li><strong>Outcome:</strong> A compromised asset with a limited extended lifespan (10-15 years) that still feels like a retrofitted old building.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-slate-900 mb-6 text-teal-700">4. OPTION 2: DEMOLITION & RECONSTRUCTION (THE &quot;CLEAN SLATE&quot; APPROACH)</h4>
                <p className="font-semibold text-slate-900 mb-4">Technical Feasibility & Benefits:</p>
                <ul className="list-disc pl-6 space-y-4">
                  <li><strong>Unconstrained Design:</strong> Starting fresh allows for an optimized, open-plan structural grid specifically engineered to accommodate the target 250 personnel.</li>
                  <li><strong>Guaranteed Compliance:</strong> A new build ensures 100% native compliance with ADCD Fire & Life Safety codes, the UAE Building Code, and the aggressive Department of Energy (DOE) sustainability mandates (32% water and 22% electricity reduction).</li>
                  <li><strong>Cost Predictability:</strong> While the capital expenditure (CAPEX) for a new build may appear higher initially, the costs are highly predictable. The budget is spent on creating tangible asset value (premium facades, smart technologies, sustainable materials) rather than funding forensic investigations of dying concrete.</li>
                  <li><strong>Outcome:</strong> A 50-year asset that serves as a modern, unified, and authoritative regional headquarters for TAQA Distribution.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-slate-900 mb-6 text-teal-700">5. COMMERCIAL PROPOSAL & FEE RESTRUCTURING</h4>
                <p className="mb-4">Dar Al Khalij emphasizes that quoting a standard consultancy fee for Option 1 is inherently flawed, as the required forensic assessment phase alone will consume a disproportionate percentage of the budget before design even begins.</p>
                <p className="font-semibold text-slate-900 mt-6 mb-3">Recommendation on Fees:</p>
                <p>We propose structuring the commercial offer to heavily incentivize Option 2. The fees for designing a new build (Option 2) will be significantly more competitive and predictable than the open-ended, high-risk consultancy required to reverse-engineer Option 1.</p>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-slate-900 mb-6 text-teal-700">6. STRATEGIC CONCLUSION & NEXT STEPS</h4>
                <p className="mb-6 border-l-4 border-teal-500 pl-4 bg-teal-50 py-3 pr-4 rounded-r-lg">Dar Al Khalij Engineering Consultancy LLC firmly advises TAQA Distribution to abandon the refurbishment route (Option 1). Investing heavy capital into a 30-year-old, non-compliant, undocumented structure is a sunk-cost fallacy.</p>
                <p className="font-semibold text-slate-900 mb-4">We recommend that TAQA management immediately:</p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>Adopt Option 2 (Demolition & Reconstruction) as the official project pathway.</li>
                  <li>Bypass Phase 1 (Detailed Condition Assessment) of the current RFP, eliminating the need for expensive forensic testing of the old structures.</li>
                  <li><strong>Approve Commercial Fees:</strong> Authorize the Lead Design Consultant to submit the finalized fee proposal and commence Phase 1 & 2 based on the streamlined &quot;New Build&quot; fee structure.</li>
                  <li><strong>Initiate Relocation Planning:</strong> Begin identifying temporary operational strategies for the current 150 employees to facilitate a clean, rapid demolition of the existing plot.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL RECOMMENDATION & ROADMAP */}
      <section id="recommendation" className="py-24 sm:py-32 bg-slate-900 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h3 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-12">The Definitive Verdict</h3>
            <div className="p-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl mt-8">
              <p className="text-2xl sm:text-3xl text-white font-light leading-relaxed mb-6">
                &ldquo;Option 1 is a <span className="text-red-400 font-semibold">sunk-cost fallacy</span>.&rdquo;
              </p>
              <p className="text-xl sm:text-2xl text-teal-50 font-medium leading-relaxed">
                Dar Al Khalij Engineering Consultancy LLC strongly advises formally adopting <strong className="text-teal-400 font-bold">Option 2 (Demolition & Reconstruction)</strong>.
              </p>
            </div>
          </motion.div>

          {/* Roadmap */}
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Horizontal line for desktop */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2" />
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {[
                  { step: "1", title: "Relocate Staff" },
                  { step: "2", title: "Demolish & Clear" },
                  { step: "3", title: "Clean-Slate Design" },
                  { step: "4", title: "Fast-Track Construction" },
                  { step: "5", title: "Handover New HQ" },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="relative flex flex-row lg:flex-col items-center text-left lg:text-center gap-6 lg:gap-0"
                  >
                    {/* Desktop connection dot */}
                    <div className="hidden lg:flex w-14 h-14 rounded-full bg-slate-900 border-4 border-teal-500 items-center justify-center mb-6 relative z-10 shadow-[0_0_20px_rgba(20,184,166,0.4)]">
                      <span className="text-teal-400 font-bold text-xl">{item.step}</span>
                    </div>
                    
                    {/* Mobile numbering */}
                    <div className="lg:hidden w-14 h-14 shrink-0 rounded-full bg-slate-800 border-2 border-teal-500 flex items-center justify-center">
                      <span className="text-teal-400 font-bold text-xl">{item.step}</span>
                    </div>

                    <div className="flex-1 bg-slate-800/50 lg:bg-transparent p-5 lg:p-0 rounded-2xl border border-slate-700/50 lg:border-none">
                      <h5 className="text-white font-bold text-lg lg:text-xl leading-tight">{item.title}</h5>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-24 text-center pb-12"
          >
            <button className="group relative inline-flex items-center justify-center gap-3 bg-teal-500 text-slate-900 px-10 py-5 rounded-full text-xl font-bold uppercase tracking-wide overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_-5px_rgba(20,184,166,0.6)]">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">Approve Option 2 Route</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
