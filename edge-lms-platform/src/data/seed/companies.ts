import { Company } from "@/types/schema"

export const seedCompanies: Company[] = [
  {
    id: "comp_strengthscape",
    name: "Strengthscape Internal Academy",
    industry: "Consulting",
    isInternal: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "comp_acme",
    name: "Acme Logistics Corp",
    industry: "Supply Chain",
    isInternal: false,
    createdAt: "2024-03-15T00:00:00Z"
  }
]
