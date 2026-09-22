import type { Metadata } from "next";

import { CtaBand } from "@/components/cta-band";
import { Section, SectionHeading } from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.legalName} is an independent, fee-only advisory firm. Meet the team and the principles we work by.`,
};

const values = [
  {
    title: "Plain language",
    body: "If a recommendation cannot be explained in a sentence you would repeat to a friend, it is not ready to give.",
  },
  {
    title: "No hidden incentives",
    body: "We are fee-only and independent. Nobody pays us to prefer their product, because nobody can.",
  },
  {
    title: "Long horizons",
    body: "Our advice is judged over decades, not quarters. That shapes everything from portfolio design to how we bill.",
  },
];

const team = [
  {
    name: "Amara Osei",
    role: "Founder & Principal Adviser, CFP®",
    bio: "Twenty-two years in planning, the last nine building FinPlan around fee-only advice. Leads retirement and tax strategy.",
  },
  {
    name: "Daniel Whitmore",
    role: "Director of Investments, CFA",
    bio: "Designs the firm's portfolio models and oversees trading, rebalancing and asset location across client accounts.",
  },
  {
    name: "Priya Raman",
    role: "Senior Financial Planner, CFP®",
    bio: "Works with business owners and equity-compensated employees on cash flow, liquidity events and charitable giving.",
  },
  {
    name: "Tom Belcher",
    role: "Client Service Lead",
    bio: "Handles onboarding, custodial paperwork and the quarterly review calendar so nothing slips between meetings.",
  },
];

const milestones = [
  { year: "2016", event: "FinPlan founded as an independent, fee-only practice." },
  { year: "2019", event: "Investment management brought in-house under a CFA-led team." },
  { year: "2022", event: "Flat-fee pricing published openly; asset minimums removed." },
  { year: "2025", event: "310 households served across 14 states." },
];

export default function AboutPage() {
  return (
    <>
      <Section className="border-b border-border/60 bg-muted/30 py-16 sm:py-20">
        <SectionHeading
          eyebrow="About us"
          title="An advisory firm that answers only to its clients"
          description={`${siteConfig.legalName} was founded on a simple frustration: most financial advice is shaped by how the adviser gets paid. We built a firm where that is not possible.`}
        />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="space-y-5 text-base leading-relaxed text-pretty">
            <p>
              We are a team of eleven: planners, an investment desk and the
              people who keep the paperwork moving, working with families and
              business owners who want one coherent strategy instead of six
              disconnected accounts.
            </p>
            <p>
              Every engagement starts with the same question: what is this money
              actually for? The portfolio, the tax plan and the insurance review
              all follow from the answer, and we will tell you plainly when the
              honest recommendation is to do nothing at all.
            </p>
            <p>
              As a registered investment adviser we hold a fiduciary duty to you
              at all times. It is not a marketing line; it is the legal standard
              our recommendations are held to.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {milestones.map((item, index) => (
                  <li key={item.year}>
                    {index > 0 ? <Separator className="mb-4" /> : null}
                    <div className="flex gap-4">
                      <span className="font-mono text-sm text-primary">
                        {item.year}
                      </span>
                      <span className="text-muted-foreground text-pretty">
                        {item.event}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="border-t border-border/60 bg-muted/30">
        <SectionHeading eyebrow="Principles" title="How we work" />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title} className="h-full bg-background">
              <CardHeader className="gap-2">
                <CardTitle>{value.title}</CardTitle>
                <p className="text-muted-foreground text-pretty">{value.body}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Team"
          title="The people you will actually talk to"
          description="You are assigned a lead adviser at the start and keep them for the life of the relationship."
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {team.map((member) => (
            <li key={member.name}>
              <Card className="h-full">
                <CardHeader className="gap-1">
                  <span
                    aria-hidden
                    className="mb-2 grid size-11 place-items-center rounded-full bg-primary/10 font-heading text-sm font-semibold text-primary"
                  >
                    {member.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <CardTitle>{member.name}</CardTitle>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="mt-1 text-muted-foreground text-pretty">
                    {member.bio}
                  </p>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
