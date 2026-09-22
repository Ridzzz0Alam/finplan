import {
  Briefcase,
  GraduationCap,
  LineChart,
  PiggyBank,
  ShieldCheck,
  Scale,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  /** Shown on the detail page, under the hero. */
  overview: string[];
  deliverables: string[];
  bestFor: string;
};

export const services: Service[] = [
  {
    slug: "financial-planning",
    title: "Financial planning",
    summary:
      "A written plan that connects your income, savings and goals into one timeline you can actually follow.",
    icon: LineChart,
    overview: [
      "We start by mapping everything you own, owe and earn, then model the decisions ahead of you, such as buying a home, changing careers or supporting a parent, so you can see the trade-offs before you commit.",
      "The plan is revisited every quarter. When your life changes, the numbers change with it.",
    ],
    deliverables: [
      "Cash-flow and net-worth baseline",
      "Goal timeline with funding targets",
      "Scenario modelling for major decisions",
      "Quarterly plan review and rebalance",
    ],
    bestFor: "Households consolidating scattered accounts into one strategy.",
  },
  {
    slug: "investment-management",
    title: "Investment management",
    summary:
      "Low-cost, globally diversified portfolios managed to your risk tolerance and tax situation.",
    icon: PiggyBank,
    overview: [
      "Portfolios are built from broad index funds and held in the accounts where they are taxed most favourably. We rebalance on drift, not on a calendar, and we tell you what every basis point of cost is buying you.",
      "You keep custody of your assets at an independent broker. We never hold client funds.",
    ],
    deliverables: [
      "Investment policy statement",
      "Asset-location and tax-lot strategy",
      "Automatic drift rebalancing",
      "Consolidated performance reporting",
    ],
    bestFor: "Investors who want disciplined management without stock picking.",
  },
  {
    slug: "retirement-strategy",
    title: "Retirement strategy",
    summary:
      "Decumulation planning that answers the real question: how much can you safely spend, and for how long?",
    icon: Briefcase,
    overview: [
      "We model Social Security timing, pension elections and withdrawal order across taxable, tax-deferred and Roth accounts to find the sequence that leaves the most in your pocket.",
      "Stress tests cover early-retirement market shocks, long-term care costs and a surviving spouse's tax bracket.",
    ],
    deliverables: [
      "Sustainable spending analysis",
      "Social Security and pension timing",
      "Withdrawal-sequencing plan",
      "Roth conversion roadmap",
    ],
    bestFor: "Anyone within ten years of leaving full-time work.",
  },
  {
    slug: "tax-planning",
    title: "Tax planning",
    summary:
      "Forward-looking tax work that shapes the year ahead instead of reporting on the one behind.",
    icon: Scale,
    overview: [
      "We coordinate with your CPA on bracket management, charitable bunching, equity-compensation timing and loss harvesting. These are decisions that have to be made before December, not at filing.",
      "Business owners get entity-level review alongside personal returns.",
    ],
    deliverables: [
      "Annual projection and bracket plan",
      "Equity-compensation timing review",
      "Charitable giving strategy",
      "CPA coordination and filing support",
    ],
    bestFor: "High earners with equity compensation or business income.",
  },
  {
    slug: "risk-and-insurance",
    title: "Risk & insurance",
    summary:
      "An independent read on what could derail the plan, and the cheapest honest way to cover it.",
    icon: ShieldCheck,
    overview: [
      "We do not sell insurance products, which means our review of your life, disability, liability and long-term care coverage carries no commission behind it.",
      "Most clients finish this review paying less than they were before.",
    ],
    deliverables: [
      "Coverage gap analysis",
      "Policy cost and benefit comparison",
      "Estate and beneficiary audit",
      "Claims-time support",
    ],
    bestFor: "Families whose coverage has never been reviewed as a whole.",
  },
  {
    slug: "education-funding",
    title: "Education funding",
    summary:
      "Funding college without quietly borrowing from your own retirement to do it.",
    icon: GraduationCap,
    overview: [
      "We size the realistic cost of each child's education, choose between 529 plans, custodial accounts and cash flow, and check the result against financial-aid formulas.",
      "The plan is built so that tuition years and your retirement date do not compete.",
    ],
    deliverables: [
      "Per-child cost projection",
      "529 and account-type selection",
      "Financial-aid impact review",
      "Annual contribution schedule",
    ],
    bestFor: "Parents with children more than three years from enrolment.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
