import { services } from "@/lib/services";

export type NavNode = {
  title: string;
  /** Omitted for entries that group or describe rather than link somewhere. */
  href?: string;
  children?: NavNode[];
};

/**
 * The header menu's tree. It only contains what exists today: the services
 * index, one node per service page, and each service's deliverables as a leaf
 * column. Deliverables have no page of their own, so they carry no href — give
 * them one here once they get routes and the column becomes navigable.
 */
export const navTree: NavNode[] = [
  {
    title: "Services",
    href: "/services",
    children: services.map((service) => ({
      title: service.title,
      href: `/services/${service.slug}`,
      children: service.deliverables.map((deliverable) => ({
        title: deliverable,
      })),
    })),
  },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];
