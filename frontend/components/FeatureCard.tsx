// components/FeatureCard.tsx
import Link from "next/link";

type Props = {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
};

export default function FeatureCard({ href, icon, title, desc }: Props) {
  return (
    <Link href={href} className="group block focus:outline-none">
      <article
        className="card bg-base-100 border border-base-200 shadow-sm transition
                   hover:shadow-md hover:-translate-y-0.5 focus-visible:ring
                   focus-visible:ring-primary/30"
        role="link"
        aria-label={title}
      >
        <div className="card-body">
          <div className="flex items-center gap-3">
            <span aria-hidden className="text-2xl">{icon}</span>
            <h3 className="card-title text-base group-hover:text-primary m-0">{title}</h3>
          </div>
          <p className="text-sm text-base-content/70 mt-2">{desc}</p>
        </div>
      </article>
    </Link>
  );
}
