import Link from "next/link";

/**
 * Wordmark logo. Editorial: serif name with a small gold bar mark.
 * No external image needed, so it stays crisp and fast.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Buy Gold Insider — home"
    >
      <span
        aria-hidden
        className="h-6 w-1.5 rounded-full bg-gradient-to-b from-gold-300 to-gold-600"
      />
      <span className="font-serif text-lg font-semibold tracking-tight text-ink">
        Buy Gold <span className="text-gold-700">Insider</span>
      </span>
    </Link>
  );
}
