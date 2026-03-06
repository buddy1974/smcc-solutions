import Image from "next/image";



export default function Footer() {
  return (
    <footer id="contact" className="bg-charcoal text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Main footer row: info left · badge right */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-0 justify-between">

          {/* Left — name, location, phone */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-1">
              School of Marriage Counseling &amp; Coaching (SMCC)
            </h3>
            <p className="text-white/50 text-sm mb-4">Yaound&eacute;, Cameroon</p>
            <a
              href="https://wa.me/237683493220"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-gold transition-colors text-sm"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Right — footer brand image */}
          <div className="flex-shrink-0">
            <Image
              src="/footer-logo.png"
              alt="SMCC"
              width={175}
              height={175}
              className="h-auto"
            />
          </div>

        </div>

        {/* Resources links */}
        <div className="border-t border-white/10 mt-10 pt-8 pb-4">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4 text-center md:text-left">Resources</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start">
            <a href="/marriage-restoration" className="text-white/50 hover:text-gold transition-colors text-sm">Marriage Restoration</a>
            <a href="/how-to-restore-a-broken-marriage" className="text-white/50 hover:text-gold transition-colors text-sm">How to Restore a Broken Marriage</a>
            <a href="/biblical-marriage-counseling" className="text-white/50 hover:text-gold transition-colors text-sm">Biblical Marriage Counseling</a>
            <a href="/christian-counseling-training" className="text-white/50 hover:text-gold transition-colors text-sm">Christian Counseling Training</a>
            <a href="/marriage-health-test" className="text-white/50 hover:text-gold transition-colors text-sm">Marriage Health Test</a>
            <a href="/assessment" className="text-white/50 hover:text-gold transition-colors text-sm">Marriage Assessment</a>
            <a href="/cohort-1" className="text-white/50 hover:text-gold transition-colors text-sm">SMCC Certification Program</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-4 pt-6 text-center text-white/35 text-xs space-y-3">
          <p>&copy; 2026 SMCC. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <a href="/privacy-policy" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <span aria-hidden="true">&middot;</span>
            <a href="/terms" className="hover:text-white/60 transition-colors">Terms &amp; Conditions</a>
            <span aria-hidden="true">&middot;</span>
            <a href="/refund-policy" className="hover:text-white/60 transition-colors">Refund Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
