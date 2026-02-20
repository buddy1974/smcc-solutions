export type Testimonial = {
  slug: string;
  name: string;
  title: string;
  location: string;
  excerpt: string;
  content: string; // Full story — paragraphs separated by \n\n
};

export const testimonials: Testimonial[] = [
  {
    slug: "baikao-angele",
    name: "Baikao Guidona Angele",
    title: "Graduate, SMCC Cohort I",
    location: "Yaoundé, Cameroon",
    excerpt:
      "After more than forty years of marriage, I believed I had learned everything there was to know about building a home. Then I joined SMCC — and I discovered I had only just begun. What the program offered me was not a set of quick fixes. It was a deep, structured invitation to refine — to examine the foundations of covenant, communication, and spiritual alignment with fresh eyes.",
    content: `After more than forty years of marriage, I believed I had learned everything there was to know about building a home. Then I joined SMCC — and I discovered I had only just begun.

What the School of Marriage Counseling and Coaching offered me was not a set of quick fixes or surface-level advice. It was a deep, structured invitation to refine — to examine the foundations of covenant, communication, and spiritual alignment with fresh eyes.

I came expecting to be a quiet observer, perhaps to offer my own experience to younger participants. Instead, I found myself being the one transformed. The frameworks around conflict resolution gave me language for patterns I had never been able to name in four decades together. The biblical foundations reoriented how I understood my role as a wife, a partner, and a leader in my home.

The program reminded me that marriage is not a destination you arrive at — it is a living relationship that requires constant tending, growth, and God's presence at the center.

To every couple who believes they have already figured it out — I invite you to come and discover what refinement truly looks like. SMCC gave me tools I never expected to need, and I am a better wife, mentor, and counselor because of them.`,
  },

  {
    slug: "nkengafack-shanel",
    name: "Nkengafack Shanel",
    title: "Counseling Graduate, SMCC Cohort I",
    location: "Cameroon",
    excerpt:
      "I first encountered SMCC through the E-Women Conference. I had no idea that attending a conference could redirect the entire trajectory of my calling. For years, I had felt a quiet pull toward counseling — toward sitting with couples in their hardest moments and offering them something beyond platitudes. SMCC gave me the structure, the methodology, and the confidence I had been searching for.",
    content: `I first encountered SMCC through the E-Women Conference. I had no idea that attending a conference could redirect the entire trajectory of my calling.

For years, I had felt a quiet pull toward counseling — toward sitting with couples in their hardest moments and offering them something beyond platitudes. But I lacked structure, certification, and confidence in my methodology. I knew how to listen. I did not yet know how to guide.

The E-Women Conference introduced me to Pastor Delphine Nforgwei and the vision of SMCC. From the moment I heard her speak about marriage restoration and the sacred responsibility of the counselor, I knew: this was where I needed to be.

Enrolling in Cohort I was one of the most significant decisions I have made in my adult life. The 12-week program gave me not only frameworks and tools, but a community of fellow learners who were serious about transformation. We studied conflict resolution, trauma-informed care, premarital counseling methodology, and spiritual leadership — all grounded in a biblical framework that made the practical feel sacred.

I graduated with a certification I am proud of. But more than that, I graduated with a clear sense of purpose. I now counsel couples at my church and in my community with confidence, structure, and deep spiritual grounding.

SMCC did not just train me. It called me forward into who I was always meant to become.`,
  },

  {
    slug: "caroline-yembe",
    name: "Caroline Yembe",
    title: "Graduate, SMCC Cohort I",
    location: "Douala, Cameroon",
    excerpt:
      "We plan weddings. We rarely prepare for marriages. That one sentence from Pastor Rogers Nforgwei in our first session changed the lens through which I saw everything. I had been married for many years before joining SMCC. I thought I understood what it meant to build a home with someone. What I discovered was that I had been building habits rather than foundations.",
    content: `We plan weddings. We rarely prepare for marriages. That one sentence from Pastor Rogers Nforgwei in our first session changed the lens through which I saw everything.

I had been married for many years before joining SMCC. I thought I understood what it meant to build a home with someone. What I discovered was that I had been building habits rather than foundations — patterns of communication, expectation, and emotional response that had never been examined, never refined.

The SMCC curriculum was unlike anything I had encountered in church programs or secular counseling resources. It held both together. The spiritual and the practical were not treated as separate tracks — they were woven into every session, every framework, every conversation.

Like Sister Baikao, I came in thinking that my years of experience would make me a resource for others. And while I did share, I received far more than I gave.

The conflict resolution modules helped me understand what was actually happening in the most difficult moments of our marriage. The restoration framework gave us language — and hope — for the places we had been too afraid to examine. And the premarital sections opened my eyes to the work I could have saved us both if I had known then what I know now.

After forty years and more, I can say with confidence: refinement is not a sign of failure. It is the mark of a marriage that is still growing.

If you are considering SMCC — whether your marriage is flourishing or fractured — come. There is room for you here, and there is more for you than you know.`,
  },
];

export function getTestimonialBySlug(slug: string): Testimonial | undefined {
  return testimonials.find((t) => t.slug === slug);
}
