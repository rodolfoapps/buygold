import type { ReactNode } from "react";

/**
 * Lightweight, branded in-article visuals. Pure presentational server
 * components, no images to load — they render as crisp HTML/SVG and stay
 * readable on mobile. Used inside MDX via the components map.
 */

function VisualFrame({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <figure className="not-prose my-8 rounded-xl border border-line bg-paper-raised p-6">
      {title ? (
        <figcaption className="mb-5 text-xs font-semibold uppercase tracking-wide text-gold-700">
          {title}
        </figcaption>
      ) : null}
      {children}
    </figure>
  );
}

/**
 * A left-to-right (stacked on mobile) flow of steps with connectors.
 * Good for processes: a rollover path, a buying sequence, a money flow.
 */
export function FlowSteps({
  title,
  steps,
}: {
  title?: string;
  steps: { label: string; sub?: string }[];
}) {
  return (
    <VisualFrame title={title}>
      <ol className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
        {steps.map((step, i) => (
          <li
            key={step.label}
            className="flex flex-1 items-center gap-3 md:flex-col md:items-stretch md:gap-0"
          >
            <div className="flex flex-1 flex-col rounded-lg border border-line bg-paper-sunken px-4 py-3 md:min-h-[92px]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-100 text-xs font-bold text-gold-700">
                {i + 1}
              </span>
              <span className="mt-2 text-sm font-semibold text-ink">
                {step.label}
              </span>
              {step.sub ? (
                <span className="mt-1 text-xs leading-snug text-ink-muted">
                  {step.sub}
                </span>
              ) : null}
            </div>
            {i < steps.length - 1 ? (
              <span
                aria-hidden
                className="flex-none px-1 text-gold-400 md:py-2 md:text-center"
              >
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </VisualFrame>
  );
}

/* --------------------------------------------------------------------- *
 * Article-specific presets.
 *
 * MDX is finicky about passing complex array/object props through JSX
 * attributes, so each cornerstone diagram is exposed as a no-prop preset
 * that carries its own data. They reuse the primitives above.
 * --------------------------------------------------------------------- */

export function GoldIraFlow() {
  return (
    <FlowSteps
      title="How the money and metal move in a gold IRA"
      steps={[
        { label: "Your old account", sub: "401(k) or existing IRA" },
        { label: "New IRA custodian", sub: "Receives the direct transfer" },
        { label: "Approved dealer", sub: "Custodian buys your chosen metal" },
        { label: "Insured depository", sub: "Holds the metal in your name" },
      ]}
    />
  );
}

export function GoldPriceStack() {
  return (
    <FlowSteps
      title="What you actually pay for a gold coin or bar"
      steps={[
        { label: "Spot price", sub: "The live market price per ounce" },
        { label: "+ Premium", sub: "Minting, dealer margin, shipping" },
        { label: "= Your price", sub: "The all-in cost per ounce" },
      ]}
    />
  );
}

export function GoldPriceForces() {
  return (
    <FactGrid
      title="The six forces that move the gold price"
      items={[
        { term: "Real interest rates", detail: "The yield on safe assets after inflation — gold's biggest rival." },
        { term: "The U.S. dollar", detail: "Gold is priced in dollars, so the two usually move opposite." },
        { term: "Inflation expectations", detail: "What people expect inflation to do, via its effect on real rates." },
        { term: "Central-bank buying", detail: "Steady, large, price-insensitive reserve demand." },
        { term: "Fear & crisis", detail: "Safe-haven spikes — real but usually temporary." },
        { term: "Supply & demand", detail: "Slow-growing supply against shifting physical demand." },
      ]}
    />
  );
}

/**
 * A responsive grid of labeled facts/forces. Good for "the N things that
 * drive X" — turns a list into a scannable, branded panel.
 */
export function FactGrid({
  title,
  items,
}: {
  title?: string;
  items: { term: string; detail: string }[];
}) {
  return (
    <VisualFrame title={title}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.term}
            className="rounded-lg border border-line bg-paper-sunken p-4"
          >
            <p className="border-l-2 border-gold-400 pl-3 text-sm font-semibold text-ink">
              {item.term}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}
