"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SourceLogger() {
  const params = useSearchParams();
  useEffect(() => {
    const source = params.get("source");
    if (source) {
      console.log(`Enrollment source: ${source}`);
    }
  }, [params]);
  return null;
}
