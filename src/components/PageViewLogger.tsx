"use client";

import { useEffect } from "react";

interface PageViewLoggerProps {
  page: string;
}

export default function PageViewLogger({ page }: PageViewLoggerProps) {
  useEffect(() => {
    // Future: wire into analytics provider
    void page;
  }, [page]);

  return null;
}
