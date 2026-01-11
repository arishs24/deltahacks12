"use client";

import { Suspense } from "react";
import SetupFlow from "../../../components/setup/SetupFlow";

export default function SetupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetupFlow />
    </Suspense>
  );
}
