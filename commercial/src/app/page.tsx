"use client";

import React, { useState, useEffect } from "react";
import HeaderNavbar, { DashboardTab } from "@/components/HeaderNavbar";
import SummaryCards from "@/components/SummaryCards";
import CostComparisonChart from "@/components/CostComparisonChart";
import RefurbishmentFees from "@/components/RefurbishmentFees";
import DesignFees from "@/components/DesignFees";
import SupervisionMatrix, { DEFAULT_ROLES, RoleData } from "@/components/SupervisionMatrix";

export default function Home() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("Executive Summary");
  const [totalFee, setTotalFee] = useState<number>(380000);
  const [roles, setRoles] = useState<RoleData[]>(DEFAULT_ROLES);
  const [activeScenario, setActiveScenario] = useState<string>("baseline");

  // Load state from localStorage on client mount
  useEffect(() => {
    const savedTab = localStorage.getItem("commercial_activeTab");
    if (savedTab) {
      setActiveTab(savedTab as DashboardTab);
    }

    const savedFee = localStorage.getItem("commercial_design_totalFee");
    if (savedFee) {
      const parsed = parseInt(savedFee, 10);
      if (!isNaN(parsed)) setTotalFee(parsed);
    }

    const savedRoles = localStorage.getItem("commercial_supervision_roles");
    if (savedRoles) {
      try {
        const parsed = JSON.parse(savedRoles);
        if (Array.isArray(parsed)) setRoles(parsed);
      } catch (e) {
        console.error("Failed to parse saved roles", e);
      }
    }

    const savedScenario = localStorage.getItem("commercial_supervision_activeScenario");
    if (savedScenario) {
      setActiveScenario(savedScenario);
    }
  }, []);

  // Save states to localStorage when they change
  useEffect(() => {
    localStorage.setItem("commercial_activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("commercial_design_totalFee", totalFee.toString());
  }, [totalFee]);

  useEffect(() => {
    localStorage.setItem("commercial_supervision_roles", JSON.stringify(roles));
  }, [roles]);

  useEffect(() => {
    localStorage.setItem("commercial_supervision_activeScenario", activeScenario);
  }, [activeScenario]);

  return (
    <HeaderNavbar activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="space-y-6 w-full max-w-full overflow-x-hidden">
        {/* Executive Summary Section */}
        <div className={`${activeTab === "Executive Summary" ? "block" : "hidden print:block"} print-page-break`}>
          <div className="space-y-8">
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Commercial Performance Metrics
                </h2>
                <span className="text-[10px] text-slate-500 font-medium">Dubai Feasibility Unit</span>
              </div>
              <SummaryCards totalFee={totalFee} roles={roles} setRoles={setRoles} />
            </section>
            <section className="space-y-4">
              <CostComparisonChart totalFee={totalFee} roles={roles} setRoles={setRoles} />
            </section>
            <section className="rounded-xl border border-[#1E2E4F]/40 bg-[#0B1528]/50 p-4 text-xs text-slate-400 flex items-center gap-3">
              <span className="text-cyan-400 font-bold uppercase text-[10px] tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 shrink-0">
                Payment Terms
              </span>
              <span>
                Payment should be done within 30 days of the submission of each stage's deliverables. All payments are excluded from VAT.
              </span>
            </section>
          </div>
        </div>

        {/* Option 1: Refurbishment Section */}
        <div className={`${activeTab === "Option 1: Refurbishment" ? "block" : "hidden print:block"} print-page-break rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl`}>
          <RefurbishmentFees roles={roles} totalFee={totalFee} />
        </div>

        {/* Option 2: New Build Section */}
        <div className={`${activeTab === "Option 2: New Build" ? "block" : "hidden print:block"} print-page-break rounded-2xl overflow-hidden bg-slate-950/20 border border-slate-800/80 p-6 md:p-8 shadow-2xl`}>
          <DesignFees totalFee={totalFee} setTotalFee={setTotalFee} />
        </div>

        {/* Site Supervision Section */}
        <div className={`${activeTab === "Site Supervision" ? "block" : "hidden print:block"} rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl`}>
          <SupervisionMatrix roles={roles} setRoles={setRoles} activeScenario={activeScenario} setActiveScenario={setActiveScenario} />
        </div>
      </div>
    </HeaderNavbar>
  );
}
