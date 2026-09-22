import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Service } from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Card className="group relative h-full transition-shadow hover:shadow-md">
      <CardHeader className="gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
        <CardTitle className="text-lg">
          <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0">
            {service.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-pretty">{service.summary}</CardDescription>
        <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Learn more
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </CardHeader>
    </Card>
  );
}
