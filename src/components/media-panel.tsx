import Image from "next/image";

import { cn } from "cn";

type MediaPanelProps = {
  /** Drop a real photo in here: anything under /public or a configured remote host. */
  src?: string;
  alt?: string;
  /** Which corner carries the oversized radius. */
  corner?: "tl" | "tr";
  /** Tints the placeholder so adjacent panels don't look identical. */
  tone?: "violet" | "indigo" | "plum" | "sand";
  className?: string;
};

// Stand-in artwork until real photography lands: a soft two-stop wash plus a
// light bloom, so adjacent panels read as distinct images rather than swatches.
const tones: Record<NonNullable<MediaPanelProps["tone"]>, string> = {
  violet:
    "radial-gradient(28rem 20rem at 24% 18%, #d26aa8 0%, #d26aa800 58%), linear-gradient(140deg, #8a2a86, #4b1a86 55%, #1d1240)",
  indigo:
    "radial-gradient(26rem 20rem at 78% 22%, #5fa8d8 0%, #5fa8d800 58%), linear-gradient(140deg, #2b5c9c, #23306f 55%, #14122e)",
  plum: "radial-gradient(26rem 20rem at 30% 80%, #c6567a 0%, #c6567a00 58%), linear-gradient(140deg, #6a2350, #3a1a52 55%, #171034)",
  sand: "radial-gradient(24rem 20rem at 38% 26%, #f4d7c0 0%, #f4d7c000 62%), linear-gradient(150deg, #edc4a8, #d9a684 58%, #c08e6d)",
};

export function MediaPanel({
  src,
  alt = "",
  corner = "tl",
  tone = "violet",
  className,
}: MediaPanelProps) {
  return (
    <figure
      className={cn(
        "relative aspect-square overflow-hidden bg-ink",
        corner === "tl" ? "rounded-tl-[5rem]" : "rounded-tr-[5rem]",
        className
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
      ) : (
        <div
          aria-hidden
          className="size-full"
          style={{ backgroundImage: tones[tone] }}
        />
      )}
    </figure>
  );
}
