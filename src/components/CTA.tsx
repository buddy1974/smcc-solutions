export default function CTA() {
  return (
    <section id="enroll" className="py-24 px-4 bg-gradient-to-br from-plum via-plum to-plum/90">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Answer the Call. Restore the Covenant.
        </h2>
        <p className="text-xl md:text-2xl text-blush/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          The next generation of marriage counselors must be trained with clarity, conviction, and competence. Step into your assignment.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <a
            href="#admissions"
            className="inline-block bg-gold hover:bg-gold/90 text-charcoal font-semibold px-10 py-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Start Your Application
          </a>
          <a
            href="https://wa.me/237671652144"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-transparent hover:bg-white/10 text-white font-semibold px-10 py-5 rounded-lg transition-all duration-300 border-2 border-white/30 hover:border-white/50"
          >
            Speak With Admissions
          </a>
        </div>

        <p className="text-blush/70 text-sm">
          Limited seats available for Cohort I &mdash; April 2026.
        </p>
      </div>
    </section>
  );
}
