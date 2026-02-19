import Image from "next/image";
import { SMCC_PHONE_DISPLAY, SMCC_PHONE_WA } from "@/data/programs";

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
              href={`https://wa.me/${SMCC_PHONE_WA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-gold transition-colors text-sm"
            >
              {SMCC_PHONE_DISPLAY}
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

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/35 text-xs space-y-3">
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
