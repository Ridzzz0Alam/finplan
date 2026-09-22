import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { ClientsRail } from "@/components/clients-rail";
import { InsightsRail } from "@/components/insights-rail";
import { MediaPanel } from "@/components/media-panel";

const arrowButton =
  "inline-flex items-center gap-1.5 rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85";

export default function HomePage() {
  return (
    <>
      {/* Hero: sits under the fixed header, which is transparent at the top of this page. */}
      <section className="hero-surface relative -mt-16 flex min-h-[34rem] items-center overflow-hidden pt-16 lg:min-h-[40rem]">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
          <h1 className="mx-auto max-w-3xl text-center font-heading text-4xl leading-[1.05] font-bold text-balance text-white sm:text-6xl lg:text-7xl">
            We bring people and planning together to{" "}
            <span className="text-ink">change how money feels.</span>
          </h1>
        </div>
      </section>

      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-3.5 text-center">
          <Link
            href="/services"
            className="inline-flex flex-col items-center gap-1 text-xs transition-opacity hover:opacity-80 sm:text-sm"
          >
            <span className="text-balance">
              FinPlan&apos;s 2026 fee schedule is published. See exactly what
              advice costs before you commit.
            </span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>

      {/* Intro: text left, media right */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <h2 className="max-w-lg font-heading text-3xl leading-tight font-bold text-balance sm:text-4xl">
              The best planning advice to grow your family&apos;s wealth,
              security and peace of mind.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              We are a fee-only advisory firm that, with planners and an
              investment desk under one roof, turns scattered accounts into a
              single strategy. Together with our clients we build plans where
              every account, every tax decision and every policy is working
              toward the same thing. For that to hold, advice has to be
              independent, so we take no commissions, no referral fees and no
              revenue sharing from anyone. By staying paid only by the people we
              advise, we keep the bar where a fiduciary relationship should be.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/services" className={arrowButton}>
                Our services
                <ArrowRightIcon className="size-4" />
              </Link>
              <Link href="/about" className={arrowButton}>
                Our approach
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>

          <MediaPanel
            corner="tl"
            tone="violet"
            alt="FinPlan advisers reviewing a client plan"
            className="mx-auto w-full max-w-lg"
          />
        </div>
      </section>

      {/* Business owners: media left, text right, on cream */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
          <MediaPanel
            corner="tl"
            tone="indigo"
            alt="A business owner working outside their office"
            className="mx-auto w-full max-w-lg lg:order-first"
          />

          <div>
            <h2 className="font-heading text-3xl leading-tight font-bold text-balance sm:text-4xl">
              FinPlan for business owners
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/70 sm:text-base">
              FinPlan advises founders and owner-operators whose personal and
              business finances have stopped being separate questions. Our
              planners coordinate entity structure, compensation, liquidity
              events and succession alongside the household plan, so the
              decision that helps the company does not quietly cost you at home.
            </p>
            <div className="mt-8">
              <Link href="/services/tax-planning" className={arrowButton}>
                Planning for owners
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InsightsRail />

      {/* Success stories: text left, media right */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <h2 className="max-w-md font-heading text-3xl leading-tight font-bold text-balance sm:text-4xl">
              Success stories with our clients
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              Our client stories cover the range of situations we work with: a
              first plan written at 34, a business sold at 58, a retirement that
              had to start three years earlier than anyone wanted. Read how
              households in very different circumstances got to the thing they
              were actually aiming at.
            </p>
            <div className="mt-8">
              <Link href="/about" className={arrowButton}>
                Client stories
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>

          <MediaPanel
            corner="tl"
            tone="sand"
            alt="A client reviewing their completed financial plan"
            className="mx-auto w-full max-w-lg"
          />
        </div>
      </section>

      <ClientsRail />
    </>
  );
}
