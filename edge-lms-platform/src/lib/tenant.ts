import { User } from "@/types/schema"
import { seedCompanies } from "@/data/seed/companies"

export class TenantSecurity {
  /**
   * Checks if the user has permission to access a specific tenant's data.
   * SuperAdmins have access to everything.
   * StrengthscapeAdmins have access to all client data but maybe restricted config.
   * ContentAdmins are internal but focus on templates.
   * Client roles MUST match the companyId.
   */
  static hasTenantAccess(user: User, targetCompanyId: string): boolean {
    if (user.role === "SuperAdmin" || user.role === "StrengthscapeAdmin") {
      return true
    }
    
    // For Consultants, in a real app, we'd check if they are assigned to a cohort in this company.
    // For this mock, we assume Internal users (Strengthscape) can access client companies if assigned.
    const isUserInternal = seedCompanies.find(c => c.id === user.companyId)?.isInternal
    if (isUserInternal && user.role === "Consultant") {
      return true
    }

    // Client roles are strictly isolated to their own company
    return user.companyId === targetCompanyId
  }

  /**
   * Throws an error if tenant access is denied. Useful for API route protection.
   */
  static requireTenantAccess(user: User, targetCompanyId: string): void {
    if (!this.hasTenantAccess(user, targetCompanyId)) {
      throw new Error(`TENANT_ISOLATION_VIOLATION: User ${user.id} attempted to access data for Company ${targetCompanyId}`)
    }
  }

  /**
   * Helper to automatically inject tenant filters into mock database queries.
   */
  static enforceTenantQuery(user: User, baseQuery: Record<string, unknown> = {}): Record<string, unknown> {
    if (user.role === "SuperAdmin" || user.role === "StrengthscapeAdmin") {
      return baseQuery
    }
    
    return {
      ...baseQuery,
      companyId: user.companyId
    }
  }
}
