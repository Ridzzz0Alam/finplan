import type { Metadata } from "next";

import { CtaBand } from "@/components/cta-band";
import { Section, SectionHeading } from "@/components/section";
import { ServiceCard } from "@/components/service-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Financial planning, investment management, retirement, tax, risk and education funding, delivered as one coordinated, fee-only engagement.",
};

const faqs = [
  {
    question: "How are you paid?",
    answer:
      "A flat annual fee based on the complexity of your situation, billed quarterly. We receive no commissions, referral fees or revenue sharing from any product provider.",
  },
  {
    question: "Is there an asset minimum?",
    answer:
      "No. We work with households at very different stages, and planning-only engagements are available without any assets under management.",
  },
  {
    question: "Who holds my money?",
    answer:
      "An independent custodian, in accounts registered in your name. We have authority to trade and to deduct our stated fee, never to move money elsewhere.",
  },
  {
    question: "What happens in the first meeting?",
    answer:
      "Forty-five minutes of questions about your situation and goals, and an honest answer about whether we are the right firm for you. There is no cost and no obligation.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Section className="border-b border-border/60 bg-muted/30 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Services"
          title="Everything your plan needs, under one roof"
          description="Each service stands on its own, but they are designed to work together. A tax decision made in isolation tends to cost you somewhere else."
        />
      </Section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <Section className="border-t border-border/60 bg-muted/30">
        <SectionHeading eyebrow="Questions" title="Before you get in touch" />
        <Accordion className="mt-10 max-w-3xl">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <CtaBand />
    </>
  );
}
