import { TenantSecurity } from "../tenant"
import { seedUsers } from "@/data/seed/users"

// Simple mock test fixture to verify our security assumptions from Prompt 3
describe("Tenant Isolation Security", () => {
  it("Learner from Company A cannot access Company B data", () => {
    const learnerA = seedUsers.find(u => u.role === "Learner" && u.companyId === "comp_acme")
    
    // Expect access to own company to be true
    expect(TenantSecurity.hasTenantAccess(learnerA!, "comp_acme")).toBe(true)
    
    // Expect access to other company to be false
    expect(TenantSecurity.hasTenantAccess(learnerA!, "comp_globex")).toBe(false)
  })

  it("Platform SuperAdmin can access any company data", () => {
    const superAdmin = seedUsers.find(u => u.role === "SuperAdmin")
    
    expect(TenantSecurity.hasTenantAccess(superAdmin!, "comp_acme")).toBe(true)
    expect(TenantSecurity.hasTenantAccess(superAdmin!, "comp_globex")).toBe(true)
  })
})
