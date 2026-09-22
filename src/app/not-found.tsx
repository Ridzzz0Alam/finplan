import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-start px-6 py-32">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground text-pretty">
        The link may be out of date. Our services and contact details are all
        one click away.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          Back to home
        </Link>
        <Link
          href="/services"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          View services
        </Link>
      </div>
    </div>
  );
}
