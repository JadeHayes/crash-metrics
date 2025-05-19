"use client";

import React from "react";
import styles from "./styles/page.module.css";
import CrashChart from "./components/CrashChart";
import { useCrashMetrics } from "./hooks/useCrashMetrics";
import LoadingSpinner from "./components/primitives/LoadingSpinner";
import ErrorMessage from "./components/primitives/ErrorMessage";

export default function Home() {
  const { crashMetrics, loading, error } = useCrashMetrics();

  if (loading) {
    return <LoadingSpinner><p>Loading App crash metrics...</p></LoadingSpinner>;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!crashMetrics) {
    return (
      <div className={styles.page}>
        <div className={styles.noDataMessage}>No crash metrics available.</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h3>App Version Crashes</h3>
      <CrashChart
        start={crashMetrics.start}
        end={crashMetrics.end}
        data={crashMetrics.data}
      />
    </div>
  );
}
