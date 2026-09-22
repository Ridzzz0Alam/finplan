import type { Metadata } from "next";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Section } from "@/components/section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free 45-minute consultation with a FinPlan adviser, or reach the office directly by phone or email.",
};

export default function ContactPage() {
  const details = [
    {
      icon: MailIcon,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: PhoneIcon,
      label: "Phone",
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`,
    },
    {
      icon: MapPinIcon,
      label: "Office",
      value: `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`,
    },
    {
      icon: ClockIcon,
      label: "Hours",
      value: "Monday to Friday, 9:00–17:30 ET",
    },
  ];

  return (
    <Section className="py-16 sm:py-20">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Book a consultation
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Forty-five minutes, no cost, no obligation. You will leave with a
            straight answer about whether we can help, and if we cannot, who
            can.
          </p>

          <dl className="mt-10 space-y-6">
            {details.map((detail) => {
              const Icon = detail.icon;
              return (
                <div key={detail.label} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <dt className="text-sm font-medium">{detail.label}</dt>
                    <dd className="text-muted-foreground text-pretty">
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="transition-colors hover:text-foreground"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        detail.value
                      )}
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="rounded-xl bg-card p-6 ring-1 ring-foreground/10 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
