import { LinkButton } from "@/components/ui/LinkButton";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70svh] flex-col items-start justify-center pt-28">
      <p className="text-sm text-slate">404</p>
      <h1 className="t-h1 mt-3 text-ink">This page isn&apos;t here</h1>
      <p className="t-lead mt-4 max-w-[32rem]">The link may be out of date. Head back to the homepage to find what you need.</p>
      <div className="mt-8">
        <LinkButton href="/en">Go to the homepage</LinkButton>
      </div>
    </section>
  );
}
