import { TenantSecurity } from "../src/lib/tenant"
import { seedUsers } from "../src/data/seed/users"
import { AuditLogger } from "../src/lib/audit"

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`)
    process.exit(1)
  }
  console.log(`✅ PASSED: ${message}`)
}

console.log("Running Tenant Isolation Security Tests...")
console.log("------------------------------------------")

// 1. Get test users
const learnerA = seedUsers.find(u => u.id === "usr_acme_lrn1")! // Acme Learner
const superAdmin = seedUsers.find(u => u.id === "usr_sa_01")! // Strengthscape Super Admin
const clientAdmin = seedUsers.find(u => u.id === "usr_acme_admin1")! // Acme Admin

const acmeCompanyId = "comp_acme"
const someOtherCompanyId = "comp_techflow" // Imaginary other company

// Test 1: Learner A can access Acme data
assert(
  TenantSecurity.hasTenantAccess(learnerA, acmeCompanyId) === true,
  "Learner can access their own company's data"
)

// Test 2: Learner A CANNOT access Other Company data
assert(
  TenantSecurity.hasTenantAccess(learnerA, someOtherCompanyId) === false,
  "Learner CANNOT access another company's data"
)

// Test 3: Client Admin CANNOT access Other Company data
assert(
  TenantSecurity.hasTenantAccess(clientAdmin, someOtherCompanyId) === false,
  "Client Admin CANNOT access another company's data"
)

// Test 4: Super Admin CAN access Other Company data
assert(
  TenantSecurity.hasTenantAccess(superAdmin, someOtherCompanyId) === true,
  "Super Admin can access any company's data"
)

// Test 5: Enforced Query Filtering
const baseQuery = { status: "Active" }
const securedLearnerQuery = TenantSecurity.enforceTenantQuery(learnerA, baseQuery)

assert(
  securedLearnerQuery.companyId === acmeCompanyId,
  "TenantSecurity automatically injects companyId into database queries for client roles"
)

const securedAdminQuery = TenantSecurity.enforceTenantQuery(superAdmin, baseQuery)
assert(
  securedAdminQuery.companyId === undefined,
  "TenantSecurity does NOT inject companyId into queries for Super Admins"
)

// Test 6: Audit Logging
AuditLogger.log(learnerA, "VIEW_PROGRAM", "pi_123")
const logs = AuditLogger.getRecentLogs()
assert(
  logs[0].userId === learnerA.id && logs[0].action === "VIEW_PROGRAM",
  "AuditLogger successfully records mock actions"
)

console.log("------------------------------------------")
console.log("All security tests passed successfully.")
