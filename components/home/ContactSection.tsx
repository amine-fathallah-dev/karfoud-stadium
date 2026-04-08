export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 bg-bg">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl tracking-widest text-primary mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Réservez votre créneau
        </h2>
        <p className="text-text-muted text-base md:text-lg mb-10 max-w-md mx-auto">
          Vous avez repéré un créneau libre ? Contactez-nous directement par
          téléphone pour confirmer votre réservation.
        </p>

        <a
          href="tel:+21620995569"
          className="group inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-5 rounded-xl transition-colors duration-200 min-h-[56px]"
        >
          <span
            className="text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
          >
            📞
          </span>
          <span className="text-2xl md:text-3xl tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>
            20 99 55 69
          </span>
        </a>

        <p className="mt-6 text-text-muted text-sm">
          Disponible tous les jours, 24h/24
        </p>

        <div className="mt-12">
          <p className="text-text-muted text-sm mb-4">
            📍 Route Grombalia – Beni Khaled, à côté de Dream Park
          </p>
          <div className="rounded-xl overflow-hidden border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1097.0657216885072!2d10.53840077151365!3d36.61938555211592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd59eb0ac36c6b%3A0x8d1983149fe9a36e!2sWembley%20stadium!5e0!3m2!1sfr!2sfr!4v1775676122176!5m2!1sfr!2sfr"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation Karfoud Stadium"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
