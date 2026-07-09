import { DeliveryHandoff, IntegrationEvent, ExternalSystemLink, ExpansionSignal, ProgramInstance } from "@/types/schema"

// In-memory store for integration events during development
let integrationEvents: IntegrationEvent[] = []
let handoffs: DeliveryHandoff[] = []
let externalLinks: ExternalSystemLink[] = []

export async function processDeliveryHandoff(payload: any): Promise<{ success: boolean; programInstance?: ProgramInstance; error?: string }> {
  try {
    // 1. Validate Payload
    const requiredFields = ["companyId", "opportunityId", "programTitle", "businessNeed", "targetAudience"]
    for (const field of requiredFields) {
      if (!payload[field]) {
        throw new Error(`Missing required field: ${field}`)
      }
    }

    // 2. Create DeliveryHandoff record
    const handoff: DeliveryHandoff = {
      id: `dh_${Math.random().toString(36).substring(2, 10)}`,
      companyId: payload.companyId,
      opportunityId: payload.opportunityId,
      programTitle: payload.programTitle,
      businessNeed: payload.businessNeed,
      targetAudience: payload.targetAudience,
      competencies: payload.competencies || [],
      assessmentPlan: payload.assessmentPlan || "Standard",
      successMeasures: payload.successMeasures || [],
      promisedDeliverables: payload.promisedDeliverables || [],
      status: "Processed",
      receivedAt: new Date().toISOString()
    }
    handoffs.push(handoff)

    // 3. Provision Program Instance
    const programInstance: ProgramInstance = {
      id: `pi_${Math.random().toString(36).substring(2, 10)}`,
      programTemplateId: "prog_custom", // placeholder
      companyId: handoff.companyId,
      name: handoff.programTitle,
      status: "Draft",
      startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
    }

    // 4. Create External Links
    externalLinks.push({
      id: `ext_${Math.random().toString(36).substring(2, 10)}`,
      entityType: "ProgramInstance",
      entityId: programInstance.id,
      systemName: "Zoho",
      externalId: handoff.opportunityId,
      externalUrl: `https://crm.zoho.in/crm/org/tab/Potentials/${handoff.opportunityId}`
    })

    return { success: true, programInstance }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function queueExpansionSignal(signal: ExpansionSignal): Promise<{ success: boolean; eventId?: string }> {
  const event: IntegrationEvent = {
    id: `ie_${Math.random().toString(36).substring(2, 10)}`,
    type: "Push",
    targetSystem: "Edge10",
    payload: signal,
    status: "Pending",
    createdAt: new Date().toISOString()
  }
  
  integrationEvents.push(event)
  return { success: true, eventId: event.id }
}

export async function getIntegrationEvents() {
  return integrationEvents
}
