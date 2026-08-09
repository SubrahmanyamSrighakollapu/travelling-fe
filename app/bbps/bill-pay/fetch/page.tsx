"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Search, ArrowLeft, ArrowRight, Smartphone, User, Mail, 
  Hash, Shield, CheckCircle2, Zap, HelpCircle 
} from "lucide-react";
import { BBPSLayout } from "@/components/bbps/bbps-layout";
import { useBBPSStore } from "@/lib/bbps-store";

export default function BBPSBillFetchPage() {
  const router = useRouter();
  const { currentFetchParams, setFetchParams, setBillDetails } = useBBPSStore();

  const [mobileNumber, setMobileNumber] = useState(
    currentFetchParams.mobileNumber || "9898990084"
  );
  const [customerNumber, setCustomerNumber] = useState(
    currentFetchParams.customerNumber || "9898990084"
  );
  const [caNumber, setCaNumber] = useState(currentFetchParams.caNumber || "102938475");
  const [customerName, setCustomerName] = useState(
    currentFetchParams.customerName || "Rajesh Sharma"
  );
  const [email, setEmail] = useState(
    currentFetchParams.email || "rajesh.sharma@example.com"
  );

  // Dynamic parameters state: e.g. a=10, ab=20, etc.
  const [paramKey, setParamKey] = useState("a");
  const [paramVal, setParamVal] = useState("10");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const billerId = currentFetchParams.billerId || "OTME00005XXZ43";
  const billerName = currentFetchParams.billerName || "Adani Electricity Mumbai Ltd";
  const category = currentFetchParams.category || "Electricity";

  // Quick Preset Handlers
  const handleApplyPreset1 = () => {
    setMobileNumber("9898990084");
    setCustomerNumber("9898990084");
    setCustomerName("Rajesh Sharma");
    setFetchError("");
  };

  const handleApplyPreset2 = () => {
    setMobileNumber("9898990083");
    setCustomerNumber("9898990083");
    setCustomerName("Priya Sundaram");
    setFetchError("");
  };

  const handleApplyAddParam = (key: string, val: string) => {
    setParamKey(key);
    setParamVal(val);
  };

  const handleFetchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFetchError("");

    setTimeout(() => {
      setIsLoading(false);

      // Populate bill details into Zustand store
      setFetchParams({
        mobileNumber,
        customerNumber,
        caNumber,
        customerName,
        email,
        additionalParams: { [paramKey]: paramVal },
      });

      setBillDetails({
        billerId,
        billerName,
        category,
        customerName,
        customerNumber,
        caNumber,
        billDate: "2026-07-28",
        billPeriod: "JUL-2026",
        billNumber: `EL-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        dueDate: "2026-08-20",
        baseAmount: mobileNumber === "9898990083" ? 899 : 1450,
        latePaymentFee: 50,
        additionalCharges: 25,
        fixedCharges: 15,
        convenienceFee: 10,
        selectedOptions: {
          baseAmount: true,
          latePaymentFee: true,
          additionalCharges: true,
          fixedCharges: true,
        },
        paymentMode: "Agent Wallet",
      });

      router.push("/bbps/bill-pay/details");
    }, 700);
  };

  return (
    <BBPSLayout pageTitle="Fetch Customer Bill Parameters">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top Back Navigation & Biller Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/bbps/bill-pay"
            className="text-xs text-slate-500 hover:text-slate-900 font-semibold flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Categories
          </Link>
          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
            Category: {category}
          </span>
        </div>

        {/* Selected Biller Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Selected Biller
            </span>
            <h2 className="text-lg font-bold text-slate-900">{billerName}</h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Biller ID: <span className="font-bold text-slate-800">{billerId}</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg">
            BBPS
          </div>
        </div>

        {/* UAT Sample Inputs Preset Toolbar */}
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" /> Mandatory UAT Quick Presets
            </h4>
            <span className="text-[10px] text-amber-800 font-medium">Click to load test vectors</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleApplyPreset1}
              className="text-left p-2.5 bg-white border border-amber-200 rounded-lg hover:border-amber-500 transition-colors text-xs"
            >
              <div className="font-bold text-slate-800">9898990084 (Fetch & Pay)</div>
              <div className="text-[11px] text-slate-500">Adani Electricity Standard Fetch</div>
            </button>

            <button
              type="button"
              onClick={handleApplyPreset2}
              className="text-left p-2.5 bg-white border border-amber-200 rounded-lg hover:border-amber-500 transition-colors text-xs"
            >
              <div className="font-bold text-slate-800">9898990083 (Quick Pay)</div>
              <div className="text-[11px] text-slate-500">Airtel Postpaid Quick Pay</div>
            </button>
          </div>

          {/* Additional Dynamic Parameters toolbar: a=10, a b=20, etc */}
          <div className="pt-2 border-t border-amber-200/60">
            <div className="text-[11px] font-semibold text-amber-900 mb-1.5">
              Additional Parameters (UAT Required):
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { k: "a", v: "10" },
                { k: "a b", v: "20" },
                { k: "a b c", v: "30" },
                { k: "a b c d", v: "40" },
                { k: "a b c d e", v: "50" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyAddParam(item.k, item.v)}
                  className={`px-2.5 py-1 text-xs rounded-md border font-mono transition-colors ${
                    paramKey === item.k
                      ? "bg-amber-600 text-white font-bold border-amber-700"
                      : "bg-white text-slate-700 border-amber-300 hover:bg-amber-100"
                  }`}
                >
                  {item.k} = {item.v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bill Fetch Form */}
        <form onSubmit={handleFetchSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-5">
          <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
            Enter Biller Dynamic Input Parameters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mobile Number */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="9898990084"
                  className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                />
              </div>
            </div>

            {/* Customer Number */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Customer Number / Account ID <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={customerNumber}
                  onChange={(e) => setCustomerNumber(e.target.value)}
                  placeholder="9898990084"
                  className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                />
              </div>
            </div>

            {/* CA Number */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                CA Number / Consumer No.
              </label>
              <input
                type="text"
                value={caNumber}
                onChange={(e) => setCaNumber(e.target.value)}
                placeholder="102938475"
                className="w-full h-10 px-3 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
              />
            </div>

            {/* Customer Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Customer Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Rajesh Sharma"
                  className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Customer Email ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rajesh.sharma@example.com"
                  className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                />
              </div>
            </div>

            {/* Additional Parameter Key-Value */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Additional Biller Parameter ({paramKey})
              </label>
              <input
                type="text"
                value={paramVal}
                onChange={(e) => setParamVal(e.target.value)}
                placeholder="10"
                className="w-full h-10 px-3 text-xs bg-white border border-slate-200 rounded-lg font-mono focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
              />
            </div>
          </div>

          {/* Prominent Fetch Bill Button */}
          <div className="pt-3 border-t border-slate-100">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Fetching Bill Details from BBPS Server...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" /> Fetch Bill Details
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </BBPSLayout>
  );
}
