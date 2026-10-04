"use client";

import { createContext, useContext, type ReactNode } from "react";
import { practice, type DemoClaim } from "@/content/practice";

const ClaimsContext = createContext<DemoClaim[]>(practice.demo.claims);

export function ClaimsProvider({ claims, children }: { claims: DemoClaim[]; children: ReactNode }) {
  return <ClaimsContext.Provider value={claims}>{children}</ClaimsContext.Provider>;
}

export function useClaims() {
  return useContext(ClaimsContext);
}
