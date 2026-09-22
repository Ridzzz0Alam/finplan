import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="border-y border-border/60 bg-muted/40">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Start with a conversation, not a contract
          </h2>
          <p className="mt-3 text-muted-foreground text-pretty">
            The first meeting is 45 minutes, costs nothing, and ends with a
            straight answer about whether we can help.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link href="/contact" className={buttonVariants({ size: "lg" })}>
            Book a consultation
          </Link>
          <a
            href={`mailto:${siteConfig.email}`}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Email us
          </a>
        </div>
      </div>
    </section>
  );
}
