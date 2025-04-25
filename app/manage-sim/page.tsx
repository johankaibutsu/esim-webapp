"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiCheckCircle, FiArrowLeft, FiBox } from "react-icons/fi";
import { esimData, formatDate, isValidBookingId } from "@/lib/utils";

function ManageSimContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [isValidUser, setIsValidUser] = useState<boolean | null>(null);
  const [selectedPlanName, setSelectedPlanName] = useState<string | null>(null);
  const [rechargeStatus, setRechargeStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    const valid = isValidBookingId(bookingId);
    setIsValidUser(valid);
    if (!valid && bookingId !== null) {
      router.replace("/");
    }
  }, [bookingId, router]);

  const handleSelectPlan = (planName: string) => {
    setSelectedPlanName(planName);
    setRechargeStatus("idle");
  };

  const handleRecharge = () => {
    if (!selectedPlanName) {
      alert("Please select a plan first.");
      return;
    }
    console.log(
      `Simulating recharge with plan: ${selectedPlanName} for booking ID: ${bookingId}`,
    );
    setRechargeStatus("success");
  };
  if (isValidUser === null && bookingId !== null) {
    return <div className="text-center p-10">Validating...</div>;
  }
  if (isValidUser === null && bookingId === null) {
    return <div className="text-center p-10">Loading Manage SIM...</div>;
  }
  if (!isValidUser) {
    return (
      <div className="text-center p-10">Invalid Access. Redirecting...</div>
    );
  }

  const currentPlan = esimData.plan;
  const availablePlans = esimData.availablePlans;

  return (
    <div>
      <div className="mb-4">
        <Link
          href={`/dashboard?bookingId=${encodeURIComponent(bookingId || "")}`}
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <FiArrowLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Manage SIM</h1>

      {rechargeStatus === "success" && (
        <div
          className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-md shadow"
          role="alert"
        >
          <p className="font-bold">Recharge Successful!</p>
          <p>Your recharge with the '{selectedPlanName}' plan is complete.</p>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Current Plan</h2>
          <FiBox className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="text-gray-500">Plan Name</div>
          <div className="text-gray-900 font-medium">{currentPlan.name}</div>
          <div className="text-gray-500">Price</div>
          <div className="text-gray-900">{currentPlan.price}</div>
          <div className="text-gray-500">Validity</div>
          <div className="text-gray-900">
            {formatDate(currentPlan.validFrom)} -{" "}
            {formatDate(currentPlan.validUntil)}
          </div>
          <div className="text-gray-500">Remaining Data</div>
          <div className="text-gray-900">{currentPlan.remainingData}</div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Available Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availablePlans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white shadow rounded-lg p-6 border-2 transition-all duration-200 ease-in-out ${
                selectedPlanName === plan.name
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <h3 className="text-base font-semibold text-gray-900">
                {plan.name}
              </h3>
              <p className="text-2xl font-bold text-blue-600 my-2">
                {plan.price}
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mt-4 mb-6">
                {plan.data && (
                  <li className="flex items-center">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />{" "}
                    {plan.data} Data
                  </li>
                )}
                {plan.validity && (
                  <li className="flex items-center">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />{" "}
                    {plan.validity} Validity
                  </li>
                )}
                {plan.speed && (
                  <li className="flex items-center">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />{" "}
                    {plan.speed} Speed
                  </li>
                )}
                {plan.support && (
                  <li className="flex items-center">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />{" "}
                    {plan.support} Support
                  </li>
                )}
                {plan.roaming && (
                  <li className="flex items-center">
                    <FiCheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />{" "}
                    Global Roaming
                  </li>
                )}
              </ul>
              <button
                onClick={() => handleSelectPlan(plan.name)}
                disabled={rechargeStatus === "success"}
                className={`w-full py-2 px-4 rounded-md font-medium text-sm transition duration-150 ease-in-out ${
                  selectedPlanName === plan.name
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                    : "bg-gray-100 text-blue-600 border border-blue-300 hover:bg-blue-50"
                } ${rechargeStatus === "success" ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {selectedPlanName === plan.name ? "Selected" : "Select Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handleRecharge}
          disabled={!selectedPlanName || rechargeStatus === "success"}
          className={`py-2.5 px-8 rounded-lg text-white font-semibold shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            !selectedPlanName || rechargeStatus === "success"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {rechargeStatus === "success"
            ? "Recharge Successful"
            : selectedPlanName
              ? `Confirm Recharge`
              : "Select a Plan"}
        </button>
      </div>
    </div>
  );
}

export default function ManageSimPage() {
  return (
    <Suspense
      fallback={<div className="text-center p-10">Loading Manage SIM...</div>}
    >
      <ManageSimContent />
    </Suspense>
  );
}
