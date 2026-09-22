import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, CheckIcon } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getService, services } from "@/lib/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  return {
    title: service.title,
    description: service.summary,
    openGraph: { title: service.title, description: service.summary },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const Icon = service.icon;
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Section className="border-b border-border/60 bg-muted/30 py-16 sm:py-20">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          All services
        </Link>

        <div className="mt-6 flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-6" />
          </span>
          <div className="max-w-2xl">
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {service.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              {service.summary}
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="space-y-5">
            {service.overview.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-pretty">
                {paragraph}
              </p>
            ))}

            <div className="pt-2">
              <Badge variant="secondary">Best for</Badge>
              <p className="mt-2 text-muted-foreground text-pretty">
                {service.bestFor}
              </p>
            </div>
          </div>

          <Card className="lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle>What you receive</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={buttonVariants({ size: "lg", className: "mt-6 w-full" })}
              >
                Talk to an adviser
              </Link>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="border-t border-border/60 bg-muted/30 py-16">
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Often paired with
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/services/${item.slug}`}
                className="block rounded-lg bg-background p-5 ring-1 ring-foreground/10 transition-shadow hover:shadow-md"
              >
                <span className="font-medium">{item.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground text-pretty">
                  {item.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
