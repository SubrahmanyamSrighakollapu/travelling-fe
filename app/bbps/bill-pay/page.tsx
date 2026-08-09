"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, FileText } from "lucide-react";
import { BBPSLayout } from "@/components/bbps/bbps-layout";
import { useBBPSStore } from "@/lib/bbps-store";
import { playPaymentSuccessSound } from "@/lib/sound-utils";

const CATEGORIES_LIST = [
  "Electricity",
  "Broadband Postpaid",
  "Cable TV",
  "Clubs and Associations",
  "Credit Card",
  "Donation",
  "DTH",
  "Education Fees",
  "Fastag",
  "Gas",
  "Health Insurance",
  "Hospital",
  "Hospital and Pathology",
  "Housing Society",
  "Insurance",
  "Landline Postpaid",
  "Loan Repayment",
  "LPG Gas",
  "Mobile Postpaid",
  "Mobile Prepaid",
  "Municipal Services",
  "Municipal Taxes",
  "National Pension System",
  "NCMC Recharge",
  "Prepaid Meter",
  "Recurring Deposit",
  "Rental",
  "Subscription",
  "Water",
];

const BILLERS_MAP: Record<string, { id: string; name: string }[]> = {
  Electricity: [
    { id: "APCPDCL0001", name: "Andhra Pradesh Central Power Distribution Corporation" },
    { id: "OTME00005XXZ43", name: "Adani Electricity Mumbai Ltd (OTME)" },
    { id: "TATA00001", name: "Tata Power Mumbai" },
    { id: "BSES00001", name: "BSES Rajdhani Power Limited" },
  ],
  "Mobile Postpaid": [
    { id: "OTNS00005XXZ43", name: "Airtel Postpaid & Broadband (OTNS)" },
    { id: "JIO00001", name: "Jio Postpaid Mobile" },
    { id: "VI00001", name: "Vodafone Idea (VI) Postpaid" },
  ],
  Gas: [
    { id: "IGL00001", name: "Indraprastha Gas Limited (IGL)" },
    { id: "MGL00001", name: "Mahanagar Gas Limited (MGL)" },
  ],
};

export default function BBPSBillPayPage() {
  const router = useRouter();
  const { setFetchParams, setBillDetails, processPayment } = useBBPSStore();

  // Mode View: "FORM" (Step-by-step progressive disclosure) | "WORKSPACE" (Screenshot 3 view)
  const [viewMode, setViewMode] = useState<"FORM" | "WORKSPACE">("FORM");

  // Progressive Field States (Initially empty for manual step-by-step selection)
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBiller, setSelectedBiller] = useState("");
  const [billerId, setBillerId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [connectionNumber, setConnectionNumber] = useState("");

  // Workspace States
  const [subType, setSubType] = useState<"Prepaid" | "Postpaid">("Postpaid");
  const [payAmount, setPayAmount] = useState("1000");
  const [isFetching, setIsFetching] = useState(false);

  const handleCategoryChange = (catName: string) => {
    setSelectedCategory(catName);
    setSelectedBiller("");
    setBillerId("");
  };

  const handleBillerChange = (billerName: string) => {
    setSelectedBiller(billerName);
    const found = (BILLERS_MAP[selectedCategory] || []).find((b) => b.name === billerName);
    if (found) {
      setBillerId(found.id);
    } else {
      setBillerId("OTME00005XXZ43");
    }
  };

  const handleFetchBillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);

      setFetchParams({
        category: selectedCategory,
        billerId: billerId || "OTME00005XXZ43",
        billerName: selectedBiller || `${selectedCategory} Biller`,
        mobileNumber: mobileNumber || "7708841944",
        customerNumber: mobileNumber || "7708841944",
        caNumber: connectionNumber || "12303",
        customerName: "B-connect",
      });

      setBillDetails({
        billerId: billerId || "OTME00005XXZ43",
        billerName: selectedBiller || `${selectedCategory} Biller`,
        category: selectedCategory,
        customerName: "B-connect",
        customerNumber: mobileNumber || "7708841944",
        caNumber: connectionNumber || "12303",
        billDate: "2015-06-14",
        billPeriod: "june",
        billNumber: connectionNumber || "12303",
        dueDate: "2015-06-20",
        baseAmount: Number(payAmount) || 1000,
        latePaymentFee: 0,
        additionalCharges: 0,
        fixedCharges: 0,
        convenienceFee: 15,
        selectedOptions: {
          baseAmount: true,
          latePaymentFee: false,
          additionalCharges: false,
          fixedCharges: false,
        },
        paymentMode: "Agent Wallet",
      });

      setViewMode("WORKSPACE");
    }, 500);
  };

  const handleProceedToPayWorkspace = () => {
    playPaymentSuccessSound();
    processPayment();
    router.push("/bbps/bill-pay/success");
  };

  return (
    <BBPSLayout pageTitle="Bharat Connect Bill Pay">
      {/* ========================================================================= */}
      {/* VIEW 1: PROGRESSIVE STEP-BY-STEP MANUAL SELECTION INLINE FORM VIEW        */}
      {/* ========================================================================= */}
      {viewMode === "FORM" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            {/* Header Title Bar with Fixed 35px Bharat Connect Logo (PDF Page 7 Note 2) */}
            <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">BILL</h2>
              <div className="bg-white px-2 py-1 rounded">
                <Image
                  src="/assets/Bharat Connect Primary Logo_PNG.png"
                  alt="Bharat Connect"
                  width={140}
                  height={35}
                  className="h-[35px] w-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Content Split: Left Image Graphic & Right Progressive Selection Card */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left Side: Pay Bill Illustration Image */}
              <div className="flex flex-col items-center justify-center p-4 text-center my-auto">
                <Image
                  src="/assets/pay-bill-image.png"
                  alt="Bill Pay Illustration"
                  width={360}
                  height={360}
                  className="w-full max-w-[320px] h-auto object-contain"
                  priority
                />
              </div>

              {/* Right Side: Bharat Connect Billers Card */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800">Bharat Connect Billers</h3>
                </div>

                <form onSubmit={handleFetchBillSubmit} className="p-6 space-y-5 text-xs">
                  {/* Step 1: Biller Category* Dropdown */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800 block">
                      Biller Category<span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full h-10 px-3 border border-slate-300 rounded-md bg-white text-slate-900 font-semibold focus:border-blue-600 focus:outline-none"
                    >
                      <option value="" disabled>
                        -- Select Biller Category --
                      </option>
                      {CATEGORIES_LIST.map((cat, idx) => (
                        <option key={idx} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Step 2: Revealed ONLY after Category is selected */}
                  {selectedCategory !== "" && (
                    <div className="space-y-1 animate-in fade-in duration-200">
                      <label className="text-xs font-bold text-slate-800 block">
                        Biller Name<span className="text-red-500">*</span>
                      </label>
                      <select
                        value={selectedBiller}
                        onChange={(e) => handleBillerChange(e.target.value)}
                        className="w-full h-10 px-3 border border-slate-300 rounded-md bg-white text-slate-900 font-semibold focus:border-blue-600 focus:outline-none truncate"
                      >
                        <option value="" disabled>
                          -- Select Biller Name --
                        </option>
                        {(
                          BILLERS_MAP[selectedCategory] || [
                            {
                              id: "OTME00005XXZ43",
                              name: `${selectedCategory} Standard Biller (OTME)`,
                            },
                          ]
                        ).map((b, idx) => (
                          <option key={idx} value={b.name}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Step 3: Revealed ONLY after Biller Name is selected */}
                  {selectedBiller !== "" && (
                    <div className="space-y-4 pt-1 animate-in fade-in duration-200">
                      {/* Customer Mobile Number* */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800 block">
                          Customer Mobile Number<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="Enter customer 10-digit mobile number"
                          className="w-full h-10 px-3 border border-slate-300 rounded-md bg-white text-slate-900 font-semibold focus:border-blue-600 focus:outline-none"
                        />
                      </div>

                      {/* 13 Digit Service Connection Number / CA Number* */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800 block">
                          {selectedCategory === "Electricity"
                            ? "13 Digit Service Connection Number*"
                            : selectedCategory === "Mobile Postpaid"
                            ? "Account / Mobile Number*"
                            : "Customer Account / CA Number*"}
                        </label>
                        <input
                          type="text"
                          required
                          value={connectionNumber}
                          onChange={(e) => setConnectionNumber(e.target.value)}
                          placeholder="Enter account connection number"
                          className="w-full h-10 px-3 border border-slate-300 rounded-md bg-white text-slate-900 font-semibold focus:border-blue-600 focus:outline-none"
                        />
                      </div>

                      {/* Step 4: Centered Fetch Bill Button */}
                      <div className="text-center pt-3">
                        <button
                          type="submit"
                          disabled={isFetching}
                          className="px-8 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs rounded-md shadow-xs transition-colors cursor-pointer disabled:opacity-75"
                        >
                          {isFetching ? "Fetching Bill..." : "Fetch Bill"}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: SCREENSHOT 3 WORKSPACE VIEW WITH CLEAN DEDICATED LOGO HEADER      */}
      {/* ========================================================================= */}
      {viewMode === "WORKSPACE" && (
        <div className="space-y-6">
          <div className="bg-sky-400/90 rounded-2xl p-4 sm:p-6 shadow-sm min-h-[520px] space-y-4">
            {/* Clean Dedicated Canvas Top Header Row for Logo Alignment (PDF Page 7 Note 1 & 2) */}
            <div className="flex items-center justify-between bg-white/90 backdrop-blur-xs px-4 py-2 rounded-xl border border-white/40 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-900 tracking-tight">
                  BillPay
                </span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">
                  | Settlement Workspace
                </span>
              </div>
              {/* Clean White Badge Container for Fixed 35px Logo (PDF Page 7 Note 2 & 4) */}
              <div className="bg-white px-3 py-1 rounded-lg border border-slate-200/80 shadow-2xs flex items-center justify-center">
                <Image
                  src="/assets/Bharat Connect Primary Logo_PNG.png"
                  alt="Bharat Connect"
                  width={140}
                  height={35}
                  className="h-[35px] w-auto object-contain"
                  priority
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              {/* Left Sidebar Category List */}
              <div className="lg:col-span-1 bg-sky-300/60 rounded-xl p-3 space-y-2 text-xs font-semibold text-slate-800">
                <div className="text-sm font-extrabold text-slate-900 pb-2 border-b border-sky-400/50 flex items-center justify-between">
                  <span>BillPay</span>
                  <span className="text-[10px]">▼</span>
                </div>

                <div className="space-y-1 max-h-[380px] overflow-y-auto pr-1">
                  {[
                    "BroadBand PostPaid",
                    "Cable TV",
                    "Clubs and Associations",
                    "Credit Card",
                    "Donation",
                    "DTH",
                    "Education Fees",
                    "Electricity",
                    "E-Chellan",
                    "FASTag",
                    "Gas",
                    "Health Insurance",
                  ].map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setViewMode("FORM");
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                        selectedCategory.toLowerCase() === cat.toLowerCase()
                          ? "bg-white text-blue-900 font-extrabold shadow-2xs"
                          : "hover:bg-white/40 text-slate-900"
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content Area: Form Card + Customer Details Card */}
              <div className="lg:col-span-3 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Card: Recharge or Pay Mobile/Utility Bill Form */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-extrabold text-slate-900">
                        Recharge or Pay Mobile Bill
                      </h3>
                      <button
                        onClick={() => setViewMode("FORM")}
                        className="text-xs text-blue-600 font-semibold hover:underline"
                      >
                        ← Back to Form
                      </button>
                    </div>

                    {/* Radio Options: Prepaid / Postpaid */}
                    <div className="flex items-center gap-4 text-xs">
                      <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                        <input
                          type="radio"
                          name="subType"
                          value="Prepaid"
                          checked={subType === "Prepaid"}
                          onChange={() => setSubType("Prepaid")}
                        />
                        Prepaid
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-cyan-600">
                        <input
                          type="radio"
                          name="subType"
                          value="Postpaid"
                          checked={subType === "Postpaid"}
                          onChange={() => setSubType("Postpaid")}
                        />
                        Postpaid
                      </label>
                    </div>

                    {/* Input: Mobile / Account Number */}
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={mobileNumber || "7708841944"}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="w-full h-10 px-3 border-b-2 border-slate-300 bg-white font-mono font-bold text-slate-900 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    {/* Input: Operator Biller Code */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 border-b-2 border-slate-300 pb-1">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span className="font-bold text-slate-900 text-xs">OTME</span>
                      </div>
                    </div>

                    {/* Input: Amount */}
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={payAmount}
                        onChange={(e) => setPayAmount(e.target.value)}
                        className="w-full h-10 px-3 border-b-2 border-slate-300 bg-white font-mono font-bold text-slate-900 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    {/* Proceed to Pay Bill Button */}
                    <button
                      onClick={handleProceedToPayWorkspace}
                      className="w-full h-10 bg-cyan-500 hover:bg-cyan-600 text-white font-extrabold text-xs rounded-md shadow-xs transition-colors cursor-pointer"
                    >
                      Proceed to Pay Bill
                    </button>
                  </div>

                  {/* Right Card: Customer Details Itemized Box */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs">
                    <h3 className="text-xs font-bold text-cyan-600 uppercase tracking-wider pb-2 border-b border-slate-100">
                      CUSTOMER DETAILS
                    </h3>

                    <div className="space-y-2">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500 font-semibold">amountOptions</span>
                        <span className="font-mono text-slate-700">[object Object]</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500 font-semibold">billAmount</span>
                        <span className="font-mono font-bold text-slate-900">100000</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500 font-semibold">billDate</span>
                        <span className="font-mono text-slate-800">2015-06-14</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500 font-semibold">billNumber</span>
                        <span className="font-mono text-slate-800">{connectionNumber || "12303"}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500 font-semibold">billPeriod</span>
                        <span className="font-mono text-slate-800">june</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500 font-semibold">customerName</span>
                        <span className="font-bold text-slate-900">B-connect</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500 font-semibold">dueDate</span>
                        <span className="font-mono text-slate-800">2015-06-20</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500 font-semibold">operator_name</span>
                        <span className="font-mono font-bold text-slate-900">OTME</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Recent Response Table */}
                <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-purple-900 text-white font-bold uppercase">
                      <tr>
                        <th className="px-4 py-2.5">ID</th>
                        <th className="px-4 py-2.5">REFERENCE NUMBER</th>
                        <th className="px-4 py-2.5">SERVICE</th>
                        <th className="px-4 py-2.5">PROVIDER</th>
                        <th className="px-4 py-2.5">ACCOUNT</th>
                        <th className="px-4 py-2.5">RESPONSE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[11px]">
                      <tr className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-mono">295</td>
                        <td className="px-4 py-2.5 font-mono">
                          6C5376QV3923G7IGYO0INEK1C6MO68H23HP
                        </td>
                        <td className="px-4 py-2.5">POSTPAID</td>
                        <td className="px-4 py-2.5">OTME</td>
                        <td className="px-4 py-2.5 font-mono">{mobileNumber || "7708841944"}</td>
                        <td className="px-4 py-2.5 font-mono text-[10px] text-slate-600 truncate max-w-xs">
                          &#123;'ExtBillPayResponse': &#123;'responseCode': '000', 'txnRefId':
                          'CC015169BAAF00005009'&#125;&#125;
                        </td>
                      </tr>
                      <tr className="hover:bg-red-50 bg-red-50/30">
                        <td className="px-4 py-2.5 font-mono">294</td>
                        <td className="px-4 py-2.5 font-mono">
                          AM1EJNMBL8C16KYKU829NF37OQVQLPKNNQG
                        </td>
                        <td className="px-4 py-2.5">POSTPAID</td>
                        <td className="px-4 py-2.5">OTME</td>
                        <td className="px-4 py-2.5 font-mono">{mobileNumber || "7708841944"}</td>
                        <td className="px-4 py-2.5 font-mono text-[10px] text-slate-600 truncate max-w-xs">
                          &#123;'ExtBillPayResponse': &#123;'responseCode': '000', 'txnRefId':
                          'CC015169BAAF00005003'&#125;&#125;
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </BBPSLayout>
  );
}
