export type Insight = {
  slug: string;
  category: string;
  title: string;
  tone: "violet" | "indigo" | "plum";
};

export const insights: Insight[] = [
  {
    slug: "roth-conversion-window",
    category: "Tax planning",
    title:
      "The Roth conversion window most people miss, and why it closes at 63",
    tone: "indigo",
  },
  {
    slug: "cash-is-not-safe",
    category: "Investing",
    title: "What does holding cash cost you if nobody's checked it in 2 years?",
    tone: "violet",
  },
  {
    slug: "sequence-risk",
    category: "Retirement",
    title:
      "Sequence-of-returns risk: how long can your first five years carry you?",
    tone: "plum",
  },
  {
    slug: "advice-fees",
    category: "How we work",
    title:
      "You don't have to choose between low fees and advice that actually fits",
    tone: "indigo",
  },
  {
    slug: "equity-comp",
    category: "Tax planning",
    title:
      "RSUs vested and the stock dropped. Behind the panic, the maths is more nuanced.",
    tone: "violet",
  },
  {
    slug: "automating-savings",
    category: "Financial planning",
    title: "You can automate your saving. But should you automate the decisions?",
    tone: "plum",
  },
];
