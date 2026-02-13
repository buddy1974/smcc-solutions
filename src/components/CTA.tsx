export default function CTA() {
  return (
    <section id="enroll" className="py-20 px-4 bg-gradient-to-br from-plum via-plum to-plum/90">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl text-blush/90 mb-12 max-w-2xl mx-auto">
          Join Cohort 2026 and become a certified marriage counselor and coach equipped to restore marriages and transform generations.
        </p>
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-4 text-gold">
            Enrollment Opening Soon
          </h3>
          <p className="text-blush/90 mb-8">
            Be the first to receive updates about program dates, curriculum details, and early bird registration.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
              <button
                type="submit"
                className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
              >
                Notify Me
              </button>
            </div>
          </form>
          <p className="text-blush/70 text-sm mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <div className="text-gold text-3xl font-bold mb-2">12+</div>
            <p className="text-blush/90">Weeks of Intensive Training</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <div className="text-gold text-3xl font-bold mb-2">50+</div>
            <p className="text-blush/90">Hours of Practical Sessions</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <div className="text-gold text-3xl font-bold mb-2">100%</div>
            <p className="text-blush/90">Biblical Foundation</p>
          </div>
        </div>
      </div>
    </section>
  );
}
