import { User } from "@/types/schema"

/**
 * Mock Audit Logger to simulate recording important security events.
 * In a real application, this would write to an immutable database table or external log service.
 */
export class AuditLogger {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static logs: any[] = []

  static log(user: User | null, action: string, targetId: string, details: Record<string, unknown> = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      userId: user?.id || "SYSTEM",
      companyId: user?.companyId || "SYSTEM",
      action,
      targetId,
      details
    }
    
    this.logs.push(entry)
    
    // In dev environment, we log to console for visibility
    if (process.env.NODE_ENV !== "production") {
      console.log(`[AUDIT] ${entry.userId} performed ${action} on ${targetId}`, details)
    }
  }

  static getRecentLogs() {
    return [...this.logs].reverse()
  }
}
