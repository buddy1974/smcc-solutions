export default function Footer() {
  return (
    <footer id="contact" className="bg-charcoal text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-3">
              School of Marriage Counseling & Coaching (SMCC)
            </h3>
            <p className="text-white/80 mb-6">
              Yaoundé, Cameroon
            </p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <a
              href="https://wa.me/237671652744"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-gold transition-colors inline-block"
            >
              +237 671 652 744
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-white/60 text-sm">
          <p>© 2026 SMCC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
