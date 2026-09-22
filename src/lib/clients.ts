/**
 * Placeholder wordmarks for the client wall: invented names, not real firms.
 * Replace each entry with a real client logo (and written permission to use it)
 * before this page goes live; swap `name`/`treatment` for an <Image src="..." />
 * in ClientsRail once you have artwork.
 */
export type Client = {
  name: string;
  treatment: "bold" | "serif" | "wide" | "mono";
};

export const clients: Client[] = [
  { name: "NORTHWIND", treatment: "bold" },
  { name: "Harbour & Co", treatment: "serif" },
  { name: "MERIDIAN", treatment: "wide" },
  { name: "Vantage Group", treatment: "serif" },
  { name: "ACACIA", treatment: "bold" },
  { name: "Brightline", treatment: "mono" },
  { name: "KESTREL", treatment: "wide" },
  { name: "Delta Works", treatment: "serif" },
];
