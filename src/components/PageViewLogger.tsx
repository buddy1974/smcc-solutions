"use client";

import { useEffect } from "react";

interface PageViewLoggerProps {
  page: string;
}

export default function PageViewLogger({ page }: PageViewLoggerProps) {
  useEffect(() => {
    console.log("[SMCC Track] Page viewed:", page);
  }, [page]);

  return null;
}
