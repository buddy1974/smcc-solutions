import Link from "next/link";

export default function Enrolled() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">

        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-plum mb-6">
          Your Application Has Been Received.
        </h1>

        {/* Next Step */}
        <p className="text-lg md:text-xl text-charcoal/80 mb-10 leading-relaxed max-w-xl mx-auto">
          We will contact you within 24 hours via email or WhatsApp to provide payment
          instructions and confirm your enrollment.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          {/* Return to Home */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-plum hover:bg-plum/90 text-white font-semibold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Return to Home
          </Link>

          {/* WhatsApp */}
          <a
            href="https://wa.me/237671652144?text=Hello%20SMCC%20Admissions%2C%20I%20just%20submitted%20my%20application."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Contact Us on WhatsApp
          </a>

        </div>

        {/* Footer note */}
        <p className="text-sm text-charcoal/40 mt-10">
          Check your inbox — our admissions team will reach out shortly.
        </p>

      </div>
    </div>
  );
}
