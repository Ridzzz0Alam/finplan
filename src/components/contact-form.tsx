"use client";

import { useActionState } from "react";
import { CheckCircle2Icon } from "lucide-react";

import { submitContactForm } from "@/app/contact/actions";
import { initialContactState } from "@/app/contact/form-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/lib/services";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialContactState
  );

  if (state.status === "success") {
    return (
      <div className="flex gap-3 rounded-xl bg-primary/5 p-6 ring-1 ring-primary/20">
        <CheckCircle2Icon className="mt-0.5 size-5 shrink-0 text-primary" />
        <div>
          <p className="font-medium">Message sent</p>
          <p className="mt-1 text-muted-foreground text-pretty">
            {state.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(state.errors.name)}
            aria-describedby={state.errors.name ? "name-error" : undefined}
          />
          {state.errors.name ? (
            <p id="name-error" className="text-sm text-destructive">
              {state.errors.name}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(state.errors.email)}
            aria-describedby={state.errors.email ? "email-error" : undefined}
          />
          {state.errors.email ? (
            <p id="email-error" className="text-sm text-destructive">
              {state.errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">What can we help with?</Label>
        <select
          id="service"
          name="service"
          defaultValue=""
          className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="">Not sure yet</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.title}
            </option>
          ))}
        </select>
        {state.errors.service ? (
          <p className="text-sm text-destructive">{state.errors.service}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Your situation</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="A couple of sentences about where you are and what you'd like to change."
          aria-invalid={Boolean(state.errors.message)}
          aria-describedby={state.errors.message ? "message-error" : undefined}
        />
        {state.errors.message ? (
          <p id="message-error" className="text-sm text-destructive">
            {state.errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={isPending}>
          {isPending ? "Sending…" : "Send message"}
        </Button>
        <p className="text-sm text-muted-foreground">
          We reply within one business day.
        </p>
      </div>

      {state.status === "error" ? (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
