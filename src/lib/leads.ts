import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const phone = z
  .string()
  .trim()
  .regex(/^[0-9+\s-]{10,15}$/, { message: "Enter a valid phone number" });
const optionalEmail = z
  .string()
  .trim()
  .max(255)
  .email({ message: "Enter a valid email" })
  .optional()
  .or(z.literal(""));

export const applicationSchema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(100),
  phone,
  email: optionalEmail,
  program_track: z.string().min(1, "Choose a programme"),
  branch: z.string().optional().or(z.literal("")),
  center: z.string().min(1, "Choose a centre"),
  education: z.string().trim().max(120).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  dob: z.string().optional().or(z.literal("")),
  school_name: z.string().trim().optional().or(z.literal("")),
  college_name: z.string().trim().optional().or(z.literal("")),
  specialization: z.string().trim().optional().or(z.literal("")),
  year_of_passing: z.string().trim().optional().or(z.literal("")),
  aadhar_no: z.string().trim().optional().or(z.literal("")),
  religion_caste: z.string().trim().optional().or(z.literal("")),
  reference_by: z.string().trim().optional().or(z.literal("")),
  languages_known: z.string().trim().optional().or(z.literal("")),
  mother_name: z.string().trim().optional().or(z.literal("")),
  father_name: z.string().trim().optional().or(z.literal("")),
  mother_occupation: z.string().trim().optional().or(z.literal("")),
  father_occupation: z.string().trim().optional().or(z.literal("")),
  emergency_contact_no: z.string().trim().optional().or(z.literal("")),
  annual_income: z.string().trim().optional().or(z.literal("")),
});
export type ApplicationInput = z.infer<typeof applicationSchema>;

export const donationSchema = z.object({
  donor_name: z.string().trim().min(2, "Enter your name").max(100),
  phone,
  email: optionalEmail,
  organisation: z.string().trim().max(120).optional().or(z.literal("")),
  amount: z.string().trim().max(12).optional().or(z.literal("")),
  purpose: z.string().min(1, "Choose what you want to support"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});
export type DonationInput = z.infer<typeof donationSchema>;

export const employerSchema = z.object({
  company_name: z.string().trim().min(2, "Enter your company name").max(120),
  contact_person: z.string().trim().min(2, "Enter a contact name").max(100),
  phone,
  email: optionalEmail,
  roles_needed: z.string().trim().max(200).optional().or(z.literal("")),
  openings: z.string().trim().max(5).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});
export type EmployerInput = z.infer<typeof employerSchema>;

export const contactSchema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(100),
  phone,
  email: optionalEmail,
  center: z.string().optional().or(z.literal("")),
  message: z.string().trim().min(5, "Tell us how we can help").max(1000),
});
export type ContactInput = z.infer<typeof contactSchema>;

const clean = <T extends Record<string, unknown>>(values: T) =>
  Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v === "" ? null : v]));

export async function submitApplication(values: ApplicationInput) {
  const { data, error } = await supabase
    .from("applications")
    .insert(clean(values) as never)
    .select("reference_no")
    .single();
  if (error) throw error;
  return data;
}

export async function submitDonation(values: DonationInput) {
  const payload = clean({ ...values, amount: values.amount ? Number(values.amount) : "" });
  const { error } = await supabase.from("donations").insert(payload as never);
  if (error) throw error;
}

export async function submitEmployerRequest(values: EmployerInput) {
  const payload = clean({ ...values, openings: values.openings ? Number(values.openings) : "" });
  const { error } = await supabase.from("employer_requests").insert(payload as never);
  if (error) throw error;
}

export async function submitContactMessage(values: ContactInput) {
  const { error } = await supabase.from("contact_messages").insert(clean(values) as never);
  if (error) throw error;
}
