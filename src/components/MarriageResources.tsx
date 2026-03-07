const resources = [
  {
    title: "Marriage Restoration",
    desc: "The complete guide to biblical principles and frameworks for restoring broken relationships.",
    href: "/marriage-restoration",
  },
  {
    title: "How to Restore a Broken Marriage",
    desc: "A step-by-step biblical framework for guiding couples from crisis to covenant renewal.",
    href: "/how-to-restore-a-broken-marriage",
  },
  {
    title: "Biblical Marriage Counseling",
    desc: "The scriptural principles that form the foundation of effective marriage counseling.",
    href: "/biblical-marriage-counseling",
  },
  {
    title: "Christian Counseling Training",
    desc: "What Christian marriage counseling training involves and how SMCC certifies counselors.",
    href: "/christian-counseling-training",
  },
  {
    title: "Marriage Health Test",
    desc: "Evaluate the current health of your relationship across five key dimensions.",
    href: "/marriage-health-test",
  },
];

export default function MarriageResources({ currentPage }: { currentPage?: string }) {
  const filtered = currentPage
    ? resources.filter((r) => r.href !== currentPage)
    : resources;

  return (
    <div className="mb-14">
      <h2 className="font-playfair text-3xl font-bold text-plum mb-3">
        Marriage Restoration Resources
      </h2>
      <p className="text-charcoal/65 text-lg leading-relaxed mb-6">
        Learn more about the principles of restoring relationships in our complete guide.{" "}
        {currentPage !== "/marriage-restoration" && (
          <a href="/marriage-restoration" className="text-plum font-semibold underline">
            Read the full Marriage Restoration guide →
          </a>
        )}
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map(({ title, desc, href }) => (
          <a
            key={href}
            href={href}
            className="block p-6 rounded-xl border border-charcoal/10 hover:border-plum/30 transition-colors group"
          >
            <h3 className="font-playfair text-lg font-bold text-plum mb-2 group-hover:text-plum/80">
              {title}
            </h3>
            <p className="text-charcoal/60 text-sm leading-relaxed">{desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
