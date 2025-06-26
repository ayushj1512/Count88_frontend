"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import * as gtag from "../tags/gtag";

export default function GATracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    gtag.pageview(url);
  }, [pathname, searchParams]);

  return null;
}
