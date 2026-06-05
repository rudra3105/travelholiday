export function AboutHero() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80"
          alt="About"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 to-brand-700/70" />
      </div>
      <div className="relative container mx-auto px-4 text-center text-white">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-6">
          Since 2005
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          About <span className="text-gold-400">Travel Holiday</span>
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          India's most trusted travel partner. 18+ years of crafting extraordinary journeys for 50,000+ happy travelers.
        </p>
      </div>
    </section>
  );
}
