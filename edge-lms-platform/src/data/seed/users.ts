import { User } from "@/types/schema"

export const seedUsers: User[] = [
  // Strengthscape Internal (5 users)
  { id: "usr_sa_01", companyId: "comp_strengthscape", name: "Priya Sharma", email: "priya.sharma@strengthscape.com", role: "SuperAdmin", isActive: true },
  { id: "usr_sa_02", companyId: "comp_strengthscape", name: "Rahul Verma", email: "rahul.v@strengthscape.com", role: "StrengthscapeAdmin", isActive: true },

  { id: "usr_cn_01", companyId: "comp_strengthscape", name: "Vikram Singh", email: "vikram.s@strengthscape.com", role: "Consultant", isActive: true },
  { id: "usr_cn_02", companyId: "comp_strengthscape", name: "Neha Gupta", email: "neha.g@strengthscape.com", role: "Consultant", isActive: true },

  // Acme Logistics (15 users)
  { id: "usr_acme_admin1", companyId: "comp_acme", name: "Sarah Jenkins", email: "s.jenkins@acme.com", role: "Learner", isActive: true },
  { id: "usr_acme_admin2", companyId: "comp_acme", name: "David Chen", email: "d.chen@acme.com", role: "Learner", isActive: true },
  
  { id: "usr_acme_mgr1", companyId: "comp_acme", name: "Marcus Johnson", email: "m.johnson@acme.com", role: "Learner", isActive: true },
  { id: "usr_acme_mgr2", companyId: "comp_acme", name: "Elena Rodriguez", email: "e.rodriguez@acme.com", role: "Learner", isActive: true },
  { id: "usr_acme_mgr3", companyId: "comp_acme", name: "Tom Baker", email: "t.baker@acme.com", role: "Learner", isActive: true },
  
  { id: "usr_acme_lrn1", companyId: "comp_acme", name: "Alice Smith", email: "a.smith@acme.com", role: "Learner", isActive: true },
  { id: "usr_acme_lrn2", companyId: "comp_acme", name: "Bob Miller", email: "b.miller@acme.com", role: "Learner", isActive: true },
  { id: "usr_acme_lrn3", companyId: "comp_acme", name: "Charlie Davis", email: "c.davis@acme.com", role: "Learner", isActive: true },
  { id: "usr_acme_lrn4", companyId: "comp_acme", name: "Diana Prince", email: "d.prince@acme.com", role: "Learner", isActive: true },
  { id: "usr_acme_lrn5", companyId: "comp_acme", name: "Evan Wright", email: "e.wright@acme.com", role: "Learner", isActive: true },
  { id: "usr_acme_lrn6", companyId: "comp_acme", name: "Fiona Gallagher", email: "f.gallagher@acme.com", role: "Learner", isActive: true },
  { id: "usr_acme_lrn7", companyId: "comp_acme", name: "George Clark", email: "g.clark@acme.com", role: "Learner", isActive: true },
  { id: "usr_acme_lrn8", companyId: "comp_acme", name: "Hannah Lee", email: "h.lee@acme.com", role: "Learner", isActive: true },
  { id: "usr_acme_lrn9", companyId: "comp_acme", name: "Ian Stone", email: "i.stone@acme.com", role: "Learner", isActive: true },
  { id: "usr_acme_lrn10", companyId: "comp_acme", name: "Julia Roberts", email: "j.roberts@acme.com", role: "Learner", isActive: true },
]
