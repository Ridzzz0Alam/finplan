"use server";

import type { ContactState } from "@/app/contact/form-state";
import { services } from "@/lib/services";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: ContactState["errors"] = {};

  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";
  if (service && !services.some((item) => item.slug === service)) {
    errors.service = "Choose one of the listed services.";
  }
  if (message.length < 10) {
    errors.message = "A sentence or two about your situation helps us prepare.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      errors,
    };
  }

  // TODO: deliver the enquiry via an email provider, CRM or database write.
  // Kept as a log so the form is functional out of the box.
  console.info("[contact] new enquiry", { name, email, service, message });

  return {
    status: "success",
    message: `Thanks, ${name}. We'll reply within one business day.`,
    errors: {},
  };
}
