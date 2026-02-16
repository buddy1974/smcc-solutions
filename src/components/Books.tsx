import Image from "next/image";

export default function Books() {
  return (
    <section id="resources" className="py-20 px-4 bg-charcoal/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-plum mb-6">
          Books & Resources
        </h2>
        <p className="text-lg md:text-xl text-center text-charcoal/70 max-w-3xl mx-auto mb-12">
          Delphine Nforgwei has authored several books on marriage, relationships, and women&apos;s empowerment, available globally through Amazon and her official bookstore.
        </p>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Book 1 */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden text-center">
            <Image
              src="/books/book-1.jpg"
              alt="The Blossom Code"
              width={600}
              height={900}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg text-plum mb-2">The Blossom Code</h3>
              <p className="text-sm text-charcoal/70 mb-4">Unlocking a flourishing life and thriving relationships through biblical principles.</p>
              <a
                href="https://www.amazon.com/Blossom-Code-Delphine-Nforgwei/dp/B0DFSY9D7Y"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80 font-semibold text-sm"
              >
                View on Amazon →
              </a>
            </div>
          </div>

          {/* Book 2 */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden text-center">
            <Image
              src="/books/book-2.jpg"
              alt="Uprooting Thorns From Your Marriage"
              width={600}
              height={900}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg text-plum mb-2">Uprooting Thorns From Your Marriage</h3>
              <p className="text-sm text-charcoal/70 mb-4">Healing wounds and restoring joy in your covenant relationship.</p>
              <a
                href="https://www.amazon.com/Uprooting-Thorns-Your-Marriage-Relationship/dp/B0D6JB7J6K"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80 font-semibold text-sm"
              >
                View on Amazon →
              </a>
            </div>
          </div>

          {/* Book 3 */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden text-center">
            <Image
              src="/books/book-3.jpg"
              alt="Your Kingdom Marriage"
              width={600}
              height={900}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg text-plum mb-2">Your Kingdom Marriage</h3>
              <p className="text-sm text-charcoal/70 mb-4">Building a marriage that reflects God&apos;s kingdom on earth.</p>
              <a
                href="https://www.amazon.com/Your-Kingdom-Marriage-Delphine-Nforgwei/dp/B0CYL6RZHK"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80 font-semibold text-sm"
              >
                View on Amazon →
              </a>
            </div>
          </div>

          {/* Book 4 */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden text-center">
            <Image
              src="/books/book-4.jpg"
              alt="The Divine Order"
              width={600}
              height={900}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg text-plum mb-2">The Divine Order</h3>
              <p className="text-sm text-charcoal/70 mb-4">Restoring alignment with God&apos;s design for marriage and family.</p>
              <a
                href="https://www.amazon.com/Divine-Order-Delphine-Nforgwei/dp/B0CV6H3VJH"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80 font-semibold text-sm"
              >
                View on Amazon →
              </a>
            </div>
          </div>

          {/* Book 5 */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden text-center">
            <Image
              src="/books/book-5.jpg"
              alt="The Covenant Woman"
              width={600}
              height={900}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg text-plum mb-2">The Covenant Woman</h3>
              <p className="text-sm text-charcoal/70 mb-4">Empowering women to walk in purpose, strength, and divine identity.</p>
              <a
                href="https://www.amazon.com/Covenant-Woman-Delphine-Nforgwei/dp/B0CQGN3FZK"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80 font-semibold text-sm"
              >
                View on Amazon →
              </a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-charcoal/70 mb-6">
            Explore all publications and conference materials on Delphine&apos;s official website.
          </p>
          <a
            href="https://delphine-nforgwei.com/books"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-charcoal font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-gold/90 transition"
          >
            Visit Official Bookstore
          </a>
        </div>
      </div>
    </section>
  );
}
