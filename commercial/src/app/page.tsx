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
  const [phase1Fee, setPhase1Fee] = useState<number>(340000);
  const [phase2Fee, setPhase2Fee] = useState<number>(100000);
  const [phase3aFee, setPhase3aFee] = useState<number>(76000);
  const [phase3bFee, setPhase3bFee] = useState<number>(114000);
  const [phase3cFee, setPhase3cFee] = useState<number>(171000);
  const [phase3dFee, setPhase3dFee] = useState<number>(19000);
  const [roles, setRoles] = useState<RoleData[]>(DEFAULT_ROLES);
  const [activeScenario, setActiveScenario] = useState<string>("baseline");
  const [isLoaded, setIsLoaded] = useState(false);

  const [phase1Duration, setPhase1Duration] = useState<number>(6);
  const [phase2Duration, setPhase2Duration] = useState<number>(6);
  const [phase3aDuration, setPhase3aDuration] = useState<number>(12);
  const [phase3bDuration, setPhase3bDuration] = useState<number>(6);
  const [phase3cDuration, setPhase3cDuration] = useState<number>(12);
  const [phase3dDuration, setPhase3dDuration] = useState<number>(6);

  // Load state from localStorage on client mount
  useEffect(() => {
    const savedTab = localStorage.getItem("commercial_activeTab");
    if (savedTab) {
      setActiveTab(savedTab as DashboardTab);
    }

    const savedFee = localStorage.getItem("commercial_design_totalFee");
    let currentTotalFee = 380000;
    if (savedFee) {
      const parsed = parseInt(savedFee, 10);
      if (!isNaN(parsed)) {
        setTotalFee(parsed);
        currentTotalFee = parsed;
      }
    }

    const savedP1 = localStorage.getItem("commercial_refurb_phase1Fee");
    if (savedP1) {
      const parsed = parseInt(savedP1, 10);
      if (!isNaN(parsed)) setPhase1Fee(parsed);
    }

    const savedP2 = localStorage.getItem("commercial_refurb_phase2Fee");
    if (savedP2) {
      const parsed = parseInt(savedP2, 10);
      if (!isNaN(parsed)) setPhase2Fee(parsed);
    }

    const savedP3a = localStorage.getItem("commercial_refurb_phase3aFee");
    if (savedP3a) {
      const parsed = parseInt(savedP3a, 10);
      if (!isNaN(parsed)) setPhase3aFee(parsed);
    } else {
      setPhase3aFee(Math.round(currentTotalFee * 0.20));
    }

    const savedP3b = localStorage.getItem("commercial_refurb_phase3bFee");
    if (savedP3b) {
      const parsed = parseInt(savedP3b, 10);
      if (!isNaN(parsed)) setPhase3bFee(parsed);
    } else {
      setPhase3bFee(Math.round(currentTotalFee * 0.30));
    }

    const savedP3c = localStorage.getItem("commercial_refurb_phase3cFee");
    if (savedP3c) {
      const parsed = parseInt(savedP3c, 10);
      if (!isNaN(parsed)) setPhase3cFee(parsed);
    } else {
      setPhase3cFee(Math.round(currentTotalFee * 0.45));
    }

    const savedP3d = localStorage.getItem("commercial_refurb_phase3dFee");
    if (savedP3d) {
      const parsed = parseInt(savedP3d, 10);
      if (!isNaN(parsed)) setPhase3dFee(parsed);
    } else {
      setPhase3dFee(currentTotalFee - Math.round(currentTotalFee * 0.20) - Math.round(currentTotalFee * 0.30) - Math.round(currentTotalFee * 0.45));
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

    const savedP1Dur = localStorage.getItem("commercial_refurb_phase1Duration");
    if (savedP1Dur) {
      const parsed = parseInt(savedP1Dur, 10);
      if (!isNaN(parsed)) setPhase1Duration(parsed);
    }

    const savedP2Dur = localStorage.getItem("commercial_refurb_phase2Duration");
    if (savedP2Dur) {
      const parsed = parseInt(savedP2Dur, 10);
      if (!isNaN(parsed)) setPhase2Duration(parsed);
    }

    const savedP3aDur = localStorage.getItem("commercial_refurb_phase3aDuration");
    if (savedP3aDur) {
      const parsed = parseInt(savedP3aDur, 10);
      if (!isNaN(parsed)) setPhase3aDuration(parsed);
    }

    const savedP3bDur = localStorage.getItem("commercial_refurb_phase3bDuration");
    if (savedP3bDur) {
      const parsed = parseInt(savedP3bDur, 10);
      if (!isNaN(parsed)) setPhase3bDuration(parsed);
    }

    const savedP3cDur = localStorage.getItem("commercial_refurb_phase3cDuration");
    if (savedP3cDur) {
      const parsed = parseInt(savedP3cDur, 10);
      if (!isNaN(parsed)) setPhase3cDuration(parsed);
    }

    const savedP3dDur = localStorage.getItem("commercial_refurb_phase3dDuration");
    if (savedP3dDur) {
      const parsed = parseInt(savedP3dDur, 10);
      if (!isNaN(parsed)) setPhase3dDuration(parsed);
    }

    setIsLoaded(true);
  }, []);

  // Save states to localStorage when they change
  useEffect(() => {
    localStorage.setItem("commercial_activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("commercial_design_totalFee", totalFee.toString());
  }, [totalFee]);

  useEffect(() => {
    localStorage.setItem("commercial_refurb_phase1Fee", phase1Fee.toString());
  }, [phase1Fee]);

  useEffect(() => {
    localStorage.setItem("commercial_refurb_phase2Fee", phase2Fee.toString());
  }, [phase2Fee]);

  useEffect(() => {
    localStorage.setItem("commercial_refurb_phase3aFee", phase3aFee.toString());
  }, [phase3aFee]);

  useEffect(() => {
    localStorage.setItem("commercial_refurb_phase3bFee", phase3bFee.toString());
  }, [phase3bFee]);

  useEffect(() => {
    localStorage.setItem("commercial_refurb_phase3cFee", phase3cFee.toString());
  }, [phase3cFee]);

  useEffect(() => {
    localStorage.setItem("commercial_refurb_phase3dFee", phase3dFee.toString());
  }, [phase3dFee]);

  useEffect(() => {
    localStorage.setItem("commercial_supervision_roles", JSON.stringify(roles));
  }, [roles]);

  useEffect(() => {
    localStorage.setItem("commercial_supervision_activeScenario", activeScenario);
  }, [activeScenario]);

  useEffect(() => {
    localStorage.setItem("commercial_refurb_phase1Duration", phase1Duration.toString());
  }, [phase1Duration]);

  useEffect(() => {
    localStorage.setItem("commercial_refurb_phase2Duration", phase2Duration.toString());
  }, [phase2Duration]);

  useEffect(() => {
    localStorage.setItem("commercial_refurb_phase3aDuration", phase3aDuration.toString());
  }, [phase3aDuration]);

  useEffect(() => {
    localStorage.setItem("commercial_refurb_phase3bDuration", phase3bDuration.toString());
  }, [phase3bDuration]);

  useEffect(() => {
    localStorage.setItem("commercial_refurb_phase3cDuration", phase3cDuration.toString());
  }, [phase3cDuration]);

  useEffect(() => {
    localStorage.setItem("commercial_refurb_phase3dDuration", phase3dDuration.toString());
  }, [phase3dDuration]);

  const handleTotalFeeChange = (value: React.SetStateAction<number>) => {
    // Standard setter that handles both direct numbers and updater functions
    const newFee = typeof value === "function" ? (value as Function)(totalFee) : value;
    setTotalFee(newFee);
    setPhase3aFee(Math.round(newFee * 0.20));
    setPhase3bFee(Math.round(newFee * 0.30));
    setPhase3cFee(Math.round(newFee * 0.45));
    setPhase3dFee(newFee - Math.round(newFee * 0.20) - Math.round(newFee * 0.30) - Math.round(newFee * 0.45));
  };

  // Derived refurbishment costs
  const refurbSunk = phase1Fee + phase2Fee;
  const refurbValue = phase3aFee + phase3bFee + phase3cFee + phase3dFee;
  const refurbTotal = refurbSunk + refurbValue;

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
              <SummaryCards totalFee={totalFee} roles={roles} setRoles={setRoles} refurbTotal={refurbTotal} refurbSunk={refurbSunk} refurbValue={refurbValue} />
            </section>
            <section className="space-y-4">
              <CostComparisonChart totalFee={totalFee} roles={roles} setRoles={setRoles} refurbTotal={refurbTotal} />
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
          <RefurbishmentFees 
            roles={roles} 
            totalFee={totalFee} 
            phase1Fee={phase1Fee} 
            setPhase1Fee={setPhase1Fee} 
            phase2Fee={phase2Fee} 
            setPhase2Fee={setPhase2Fee}
            phase3aFee={phase3aFee}
            setPhase3aFee={setPhase3aFee}
            phase3bFee={phase3bFee}
            setPhase3bFee={setPhase3bFee}
            phase3cFee={phase3cFee}
            setPhase3cFee={setPhase3cFee}
            phase3dFee={phase3dFee}
            setPhase3dFee={setPhase3dFee}
            phase1Duration={phase1Duration}
            setPhase1Duration={setPhase1Duration}
            phase2Duration={phase2Duration}
            setPhase2Duration={setPhase2Duration}
            phase3aDuration={phase3aDuration}
            setPhase3aDuration={setPhase3aDuration}
            phase3bDuration={phase3bDuration}
            setPhase3bDuration={setPhase3bDuration}
            phase3cDuration={phase3cDuration}
            setPhase3cDuration={setPhase3cDuration}
            phase3dDuration={phase3dDuration}
            setPhase3dDuration={setPhase3dDuration}
          />
        </div>

        {/* Option 2: New Build Section */}
        <div className={`${activeTab === "Option 2: New Build" ? "block" : "hidden print:block"} print-page-break rounded-2xl overflow-hidden bg-slate-950/20 border border-slate-800/80 p-6 md:p-8 shadow-2xl`}>
          <DesignFees totalFee={totalFee} setTotalFee={handleTotalFeeChange} />
        </div>

        {/* Site Supervision Section */}
        <div className={`${activeTab === "Site Supervision" ? "block" : "hidden print:block"} print-page-break rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl`}>
          <SupervisionMatrix roles={roles} setRoles={setRoles} activeScenario={activeScenario} setActiveScenario={setActiveScenario} />
        </div>
      </div>
    </HeaderNavbar>
  );
}
