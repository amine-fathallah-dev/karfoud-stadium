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
          href="tel:+216XXXXXXXX"
          className="group inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-5 rounded-xl transition-colors duration-200 min-h-[56px]"
        >
          <span
            className="text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
          >
            📞
          </span>
          <span className="text-2xl md:text-3xl tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>
            +216 XX XXX XXX
          </span>
        </a>

        <p className="mt-6 text-text-muted text-sm">
          Disponible tous les jours, 24h/24
        </p>
      </div>
    </section>
  )
}
