"use client";

import { useState } from "react";
import { Collapsible } from "@base-ui/react/collapsible";
import { GlobeIcon, XIcon } from "lucide-react";

import { languages, type LanguageCode } from "@/lib/site";
import { cn } from "cn";

/**
 * Opens by expanding the header bar itself rather than floating a panel over
 * the page: the trigger turns into "Close" and the locales list drops in
 * underneath it, aligned with the trigger's label. Open state is owned by the
 * header, which keeps this and the menu from opening at once.
 */
export function LanguageSwitcher({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  // The site is English-only so far; this holds the choice until the copy for
  // the other locales exists.
  const [code, setCode] = useState<LanguageCode>("en");
  const current = languages.find((language) => language.code === code)!;

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={onOpenChange}
      className="flex flex-col"
    >
      <div className="flex h-16 items-center">
        <Collapsible.Trigger
          aria-label={open ? "Close language menu" : `Language: ${current.label}`}
          className="flex h-10 items-center gap-2 rounded-sm px-2 text-sm font-medium text-white transition-colors outline-none hover:bg-white/10 focus-visible:bg-white/10"
        >
          {open ? (
            <XIcon className="size-5" />
          ) : (
            <GlobeIcon className="size-5" />
          )}
          <span className="hidden sm:inline">
            {open ? "Close" : current.label}
          </span>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
        {/* pl-9 lines the locales up with the trigger's label, past its icon. */}
        <ul className="flex flex-col items-start pb-8 pl-9">
          {languages.map((language, index) => {
            const active = language.code === code;
            return (
              <li
                key={language.code}
                className="menu-item"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <button
                  type="button"
                  aria-current={active ? "true" : undefined}
                  onClick={() => {
                    setCode(language.code);
                    onOpenChange(false);
                  }}
                  className={cn(
                    "py-1.5 text-base transition-all duration-200 outline-none",
                    active
                      ? "text-lime underline underline-offset-4"
                      : "text-white/80 hover:translate-x-1 hover:text-white focus-visible:text-white"
                  )}
                >
                  {language.label}
                </button>
              </li>
            );
          })}
        </ul>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
