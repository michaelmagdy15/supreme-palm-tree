"use client";

import React, { useState } from "react";
import HeaderNavbar, { DashboardTab } from "@/components/HeaderNavbar";
import SummaryCards from "@/components/SummaryCards";
import CostComparisonChart from "@/components/CostComparisonChart";
import RefurbishmentFees from "@/components/RefurbishmentFees";
import DesignFees from "@/components/DesignFees";
import SupervisionMatrix from "@/components/SupervisionMatrix";

export default function Home() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("Executive Summary");

  return (
    <HeaderNavbar activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="space-y-6 w-full max-w-full overflow-x-hidden">
        {activeTab === "Executive Summary" && (
          <div className="space-y-8">
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Commercial Performance Metrics
                </h2>
                <span className="text-[10px] text-slate-500 font-medium">Dubai Feasibility Unit</span>
              </div>
              <SummaryCards />
            </section>
            <section className="space-y-4">
              <CostComparisonChart />
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
        )}
        {activeTab === "Option 1: Refurbishment" && (
          <div className="rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl">
            <RefurbishmentFees />
          </div>
        )}
        {activeTab === "Option 2: New Build" && (
          <div className="rounded-2xl overflow-hidden bg-slate-950/20 border border-slate-800/80 p-6 md:p-8 shadow-2xl">
            <DesignFees />
          </div>
        )}
        {activeTab === "Site Supervision" && (
          <div className="rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl">
            <SupervisionMatrix />
          </div>
        )}
      </div>
    </HeaderNavbar>
  );
}
