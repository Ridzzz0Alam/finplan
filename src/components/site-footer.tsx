import Link from "next/link";

import { Logo } from "@/components/logo";
import { services } from "@/lib/services";
import { mainNav, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold">Services</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {services.slice(0, 4).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="transition-colors hover:text-foreground"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold">Firm</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold">Get in touch</h2>
          <address className="space-y-2 text-sm text-muted-foreground not-italic">
            <p>
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}, {siteConfig.address.region}{" "}
              {siteConfig.address.postalCode}
            </p>
            <p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-foreground"
              >
                {siteConfig.email}
              </a>
              <br />
              <a
                href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                className="transition-colors hover:text-foreground"
              >
                {siteConfig.phone}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights
            reserved.
          </p>
          <p>
            Advisory services offered through a registered investment adviser.
          </p>
        </div>
      </div>
    </footer>
  );
}
