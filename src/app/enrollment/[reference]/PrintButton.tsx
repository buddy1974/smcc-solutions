"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="flex-1 font-semibold py-3 px-6 rounded-xl bg-plum text-white hover:bg-plum/90 transition-colors text-sm"
    >
      Download / Print Receipt
    </button>
  );
}
