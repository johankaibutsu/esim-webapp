"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiBarChart2, FiTrendingUp, FiInfo } from "react-icons/fi";
import {
  esimData,
  parseDataValueUnit,
  parseDataToMB,
  formatDate,
  formatSessionTimestamp,
  isValidBookingId,
} from "@/lib/utils";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [isValidUser, setIsValidUser] = useState<boolean | null>(null);

  useEffect(() => {
    const valid = isValidBookingId(bookingId);
    setIsValidUser(valid);
    if (!valid && bookingId !== null) {
      router.replace("/");
    }
  }, [bookingId, router]);

  const plan = isValidUser ? esimData.plan : null;
  const usage = isValidUser ? esimData.usage : null;
  const session = isValidUser ? esimData.currentSession : null;

  const usedDataMB = usage ? parseDataToMB(usage.usedData) : 0;
  const totalDataMB = usage ? parseDataToMB(usage.totalData) : 0;
  const dataUsagePercentage =
    totalDataMB > 0
      ? Math.min(Math.round((usedDataMB / totalDataMB) * 100), 100)
      : 0;
  const remainingDataParsed = plan
    ? parseDataValueUnit(plan.remainingData)
    : { value: 0, unit: "N/A" };
  const currentSessionUsageMB = session ? session.usageMB : 0;

  if (isValidUser === null && bookingId !== null) {
    return <div className="text-center p-10">Validating...</div>;
  }

  if (isValidUser === null && bookingId === null) {
    return <div className="text-center p-10">Loading Dashboard...</div>;
  }

  if (!isValidUser) {
    return (
      <div className="text-center p-10">Invalid Access. Redirecting...</div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <Link
          href={`/manage-sim?bookingId=${encodeURIComponent(bookingId || "")}`}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Manage SIM
        </Link>
      </div>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
        <div className="flex justify-between items-center mb-1">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Data Usage</h3>
            <p className="text-sm text-gray-500">{plan?.name}</p>
          </div>
          <FiBarChart2 className="h-5 w-5 text-gray-400" />
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${dataUsagePercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>{usage?.usedData}</span>
            <span>{usage?.totalData}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-base font-medium text-gray-500">
                Remaining Data
              </h3>
              <p className="mt-1 text-3xl font-semibold text-gray-900">
                {remainingDataParsed.value}{" "}
                <span className="text-xl font-medium text-gray-500">
                  {remainingDataParsed.unit}
                </span>
              </p>
              <p className="text-sm text-gray-500">Available for use</p>
            </div>
            <FiInfo className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4 border-t border-gray-200 pt-4">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-gray-500">Total Data</dt>
              <dd className="text-gray-900 text-right">{usage?.totalData}</dd>
              <dt className="text-gray-500">Used Data</dt>
              <dd className="text-gray-900 text-right">{usage?.usedData}</dd>
              <dt className="text-gray-500">SMS Total</dt>
              <dd className="text-gray-900 text-right">{usage?.smsTotal}</dd>
              <dt className="text-gray-500">SMS Used</dt>
              <dd className="text-gray-900 text-right">{usage?.smsUsed}</dd>
              <dt className="text-gray-500">Voice Total</dt>
              <dd className="text-gray-900 text-right">{usage?.voiceTotal}</dd>
              <dt className="text-gray-500">Voice Used</dt>
              <dd className="text-gray-900 text-right">{usage?.voiceUsed}</dd>
              <dt className="text-gray-500 col-span-2 mt-2 pt-2 border-t">
                Validity
              </dt>
              <dd className="text-gray-900 col-span-2 text-right">
                {formatDate(plan?.validFrom)} - {formatDate(plan?.validUntil)}
              </dd>
            </dl>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-base font-medium text-gray-500">
                Current Session
              </h3>
              <p className="mt-1 text-3xl font-semibold text-gray-900">
                {currentSessionUsageMB}{" "}
                <span className="text-xl font-medium text-gray-500">MB</span>
              </p>
              <p className="text-sm text-gray-500">
                Last updated: {formatSessionTimestamp(session?.started)}
              </p>
            </div>
            <FiTrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4 border-t border-gray-200 pt-4">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-gray-500">Session ID</dt>
              <dd className="text-gray-900 text-right truncate">
                {session?.sessionId}
              </dd>
              <dt className="text-gray-500">Started</dt>
              <dd className="text-gray-900 text-right">
                {formatSessionTimestamp(session?.started)}
              </dd>
              <dt className="text-gray-500">Usage</dt>
              <dd className="text-gray-900 text-right">
                {session?.usageMB} MB
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={<div className="text-center p-10">Loading Dashboard...</div>}
    >
      <DashboardContent />
    </Suspense>
  );
}
